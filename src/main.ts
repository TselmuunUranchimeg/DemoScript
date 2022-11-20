import dotenv from "dotenv";
import twilio from "twilio";
import { Stripe } from "stripe";

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const stripe = new Stripe(process.env.STRIPE_KEY!, {
    apiVersion: "2022-11-15"
});

(async () => {
    try {
        const messagePromise = client.messages.create({
            body: "This is a custom message",
            to: process.env.TWILIO_RECEIVER!,
            from: process.env.TWILIO_PHONE_NUMBER!
        });
        const stripePromise = stripe.paymentIntents.create({
            amount: 200,
            currency: "usd"
        });
        await Promise.all([messagePromise, stripePromise]);
    }
    catch (e) {
        console.log(e);
    }
})();