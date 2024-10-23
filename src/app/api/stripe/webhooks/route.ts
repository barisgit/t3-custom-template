import { db } from "~/server/db";
import Stripe from "stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-09-30.acacia",
});

type StripeMetadata = {
  clerkEmailAddress: string;
  clerkFullName: string;
  clerkId: string;
};

// remember to add your_url/api/stripe/webhooks to the stripe dashboard

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.log(`❌ Error message: ${message}`);
    return new Response(`Webhook Error: ${message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const paymentIntent = event.data.object;
    console.log(
      `🔔 Stripe PaymentIntent status 💸: ${paymentIntent.payment_status}`,
    );
    const { clerkId, clerkFullName, clerkEmailAddress } =
      paymentIntent.metadata as StripeMetadata;

    await db.user.update({
      where: { id: clerkId },
      data: {
        isPremium: true,
        PremiumUntil: new Date(
          new Date().setMonth(new Date().getMonth() + 1),
        ).toISOString(),
      },
    });
  } else
    console.warn(`💸 Stripe Webhook : Unhandled event type: ${event.type}`);

  return new Response(JSON.stringify({ received: true }));
}

// export
