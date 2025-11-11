export const runtime = 'nodejs';
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

// Use the latest API version without specifying a fixed version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
// Remove the apiVersion line to use the latest version

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get("stripe-signature")!

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        // Handle successful payment
        console.log("Payment succeeded:", event.data.object)
        break
      case "payment_intent.succeeded":
        // Handle successful payment intent
        console.log("Payment intent succeeded:", event.data.object)
        break
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 }
    )
  }
}
