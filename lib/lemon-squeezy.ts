import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";

export const setupLS = () => {
    lemonSqueezySetup({
        apiKey: process.env.LEMON_SQUEEZY_API_KEY as string,
        onError: (error) => console.error("LS Error:", error),
    });
};
