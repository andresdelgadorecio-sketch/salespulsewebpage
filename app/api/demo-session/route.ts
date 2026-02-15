
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    // En un caso real, aquí validaríamos o crearíamos un usuario temporal en DB.
    // Para este demo, simulamos una sesión exitosa.

    const demoToken = "demo-session-token-" + Date.now();

    // Crear la cookie de sesión
    // Nota: En Next.js 15+, cookies() retorna una promesa
    const cookieStore = await cookies();
    cookieStore.set("session", demoToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60, // 1 hora
        path: "/",
    });

    return NextResponse.json({ ok: true });
}
