import dotenv from "dotenv";
import twilio from "twilio";
import { Stripe } from "stripe";

dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const stripe = new Stripe(process.env.STRIPE_KEY!, {
    apiVersion: "2022-11-15"
});

const message = async () => {
    try {
        await client.messages.create({
            body: "This is a custom message",
            to: process.env.TWILIO_RECEIVER!,
            from: process.env.TWILIO_PHONE_NUMBER!
        });
        console.log("Successfully sent message to verified number since this is a trial account");
    }
    catch (e) {
        throw e;
    }
};

const payment = async () => {
    try {
        await stripe.paymentIntents.create({
            amount: 200,
            currency: "usd"
        });
        console.log("Successfully made payment");
    }
    catch (e) {
        throw e;
    }
};

(async () => {
    const messagePromise = message();
    const paymentPromise= payment();
    await Promise.all([messagePromise, paymentPromise]);
})();