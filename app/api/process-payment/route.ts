
import { type NextRequest, NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

// TODO: Replace with actual Cloudflare D1 logic for updating subscriptions
async function updateUserSubscription(userId: string, plan: string) {
  // This is a placeholder. In a real scenario, you would update the user's subscription in your D1 database.
  console.log(`Updating subscription for user ${userId} to plan ${plan}`);
  return { success: true };
}

export async function POST(request: NextRequest) {
  try {
    const { userId, email, amount, plan, cardNumber, cardExpiry, cardCVC } = await request.json()

    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
      metadata: {
        userId,
        plan,
      },
    })

    const result = await updateUserSubscription(userId, plan);

    if (!result.success) {
      throw new Error("Failed to update subscription");
    }

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
