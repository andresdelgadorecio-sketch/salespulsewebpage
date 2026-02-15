// import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
    try {
        const payload = await req.text();
        const signature = req.headers.get('x-signature') || '';
        const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || '';

        // Validar firma del webhook
        const hmac = crypto.createHmac('sha256', secret);
        const digest = Buffer.from(hmac.update(payload).digest('hex'), 'utf8');
        const signatureBuffer = Buffer.from(signature, 'utf8');

        if (!crypto.timingSafeEqual(digest, signatureBuffer)) {
            return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
        }

        const data = JSON.parse(payload);
        const eventName = data.meta.event_name;
        // const obj = data.data.attributes;
        // const customId = data.meta.custom_data?.user_id; // Pasado durante el checkout

        // const cookieStore = cookies();
        // const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

        // if (eventName === 'subscription_created' || eventName === 'subscription_updated') {
        //     await supabase.from('subscriptions').upsert({
        //         user_id: customId,
        //         lemon_squeezy_id: data.data.id,
        //         variant_id: obj.variant_id.toString(),
        //         status: obj.status,
        //         renews_at: obj.renews_at,
        //         ends_at: obj.ends_at,
        //     });
        // }

        // if (eventName === 'subscription_cancelled') {
        //     await supabase.from('subscriptions')
        //         .update({ status: 'cancelled', ends_at: obj.ends_at })
        //         .eq('lemon_squeezy_id', data.data.id);
        // }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('Webhook Error:', error);
        return NextResponse.json({ error: 'Webhook Handler Failed' }, { status: 500 });
    }
}
