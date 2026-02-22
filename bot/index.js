import { Telegraf, Markup } from 'telegraf';
import 'dotenv/config';

console.log('[DEBUG] Starting bot script...');

// 1. Initialize Bot
const bot = new Telegraf(process.env.BOT_TOKEN);

// 2. Middleware for logging
bot.use(async (ctx, next) => {
    const start = new Date();
    try {
        await next();
    } catch (err) {
        console.error('Error in middleware:', err);
    }
    const ms = new Date() - start;
    console.log(`Response time: ${ms}ms`);
});

// Global error handler
bot.catch((err, ctx) => {
    console.error(`Ooops, encountered an error for ${ctx.updateType}`, err);
});

// 3. Start Command
const sendWelcome = (ctx) => {
    ctx.reply(
        `👋 *¡Hola! Bienvenido al Soporte de SalesPulse.*

Soy tu asistente de Inteligencia Artificial. ¿En qué puedo ayudarte hoy?`,
        {
            parse_mode: 'Markdown',
            ...Markup.inlineKeyboard([
                [Markup.button.callback('💰 Consultar Precios', 'pricing')],
                [Markup.button.callback('🚀 Hablar con Ventas', 'talk_sales')],
                [Markup.button.callback('❓ Preguntas Frecuentes', 'faq')],
            ])
        }
    );
};

// 3. Start Command and Text Handler
bot.start(sendWelcome);

bot.on('text', (ctx) => {
    // Respond to greetings or just show menu for any text for now
    sendWelcome(ctx);
});

// 4. Pricing Flow
bot.action('pricing', (ctx) => {
    ctx.reply(
        `*💎 DOMINIO DEL MERCADO - Planes 2026:*

1️⃣ *FRANCOTIRADOR ($49 USD/mes)*
   - Para Closers y Freelancers
   - Análisis Táctico (15 leads/mes)
   - Predictor Quirúrgico

2️⃣ *TRACCIÓN ÉLITE ($149 USD/mes)* 🔥 _Recomendado_
   - Para Equipos (hasta 5)
   - Dashboard de Comando Grupal
   - Sincronización Neural (Slack/Telegram)

3️⃣ *SOBERANÍA ($449 USD/mes)*
   - Corporativo / Scale-ups
   - API Ilimitada "God Mode"
   - Soporte Línea Roja 24/7

¿Listo para dominar tu mercado?`,
        {
            parse_mode: 'Markdown',
            ...Markup.inlineKeyboard([
                [Markup.button.url('🔥 Dominar mi Mercado (7 días gratis)', 'http://aplicacion-salespulse.testn8n.online/demo')],
                [Markup.button.callback('🔙 Volver', 'start_over')]
            ])
        }
    );
});

// 5. Sales Handoff
bot.action('talk_sales', async (ctx) => {
    try {
        // Answer the callback query to remove the loading state on the button
        await ctx.answerCbQuery();

        const salesBotUsername = "ventassalespulse";
        const salesLink = `https://t.me/${salesBotUsername}`;

        await ctx.reply(
            `Perfecto. Para una atención personalizada, por favor contacta a nuestro equipo de ventas directamente aquí:`,
            {
                parse_mode: 'Markdown',
                ...Markup.inlineKeyboard([
                    [Markup.button.url('💼 Hablar con Asesor de Ventas', salesLink)],
                    [Markup.button.callback('🔙 Volver', 'start_over')]
                ])
            }
        );

        // Trigger n8n webhook for tracking (asynchronous to not block the bot)
        fetch('https://n8n.testn8n.online/webhook/sales-handoff', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...ctx.from,
                action: 'handoff_to_sales',
                target_bot: salesBotUsername
            })
        }).then(res => {
            if (res.ok) console.log(`[SUCCESS] Tracking handoff for User ${ctx.from.id}`);
            else console.error(`[ERROR] n8n responded with status ${res.status}`);
        }).catch(error => {
            console.error(`[ERROR] Failed to trigger tracking:`, error);
        });

    } catch (error) {
        console.error(`[ERROR] Error in talk_sales action:`, error);
    }
});

// 6. FAQ
bot.action('faq', (ctx) => {
    ctx.reply(
        `*Preguntas Frecuentes:*

Q: ¿Necesito tarjeta de crédito?
A: Solo para el plan Growth y superior.

Q: ¿Se integra con HubSpot?
A: Sí, en el plan Command Center.

Q: ¿La precisión es real?
A: Garantizamos un 94% basándonos en 6 meses de data histórica.`,
        {
            parse_mode: 'Markdown',
            ...Markup.inlineKeyboard([
                [Markup.button.callback('🔙 Volver', 'start_over')]
            ])
        }
    );
});

// 7. Navigation Handlers
bot.action('start_over', (ctx) => {
    ctx.reply(
        '¿En qué más te puedo ayudar?',
        Markup.inlineKeyboard([
            [Markup.button.callback('💰 Consultar Precios', 'pricing')],
            [Markup.button.callback('🚀 Hablar con Ventas', 'talk_sales')],
        ])
    );
});

// 8. Launch
console.log('[DEBUG] Calling bot.launch()...');
bot.launch().then(() => {
    console.log('🤖 SalesPulse Support Bot is running...');
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
