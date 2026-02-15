
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    // En un caso real, aquí validaríamos o crearíamos un usuario temporal en DB.
    // Para este demo, simulamos una sesión exitosa.

    const demoToken = "demo-session-token-" + Date.now();

    // Create response object
    const response = NextResponse.json({ ok: true });

    // Set cookie on response object
    response.cookies.set("session", demoToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60, // 1 hour
        path: "/",
    });

    return response;
}
