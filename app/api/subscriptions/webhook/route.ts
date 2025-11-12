import { type NextRequest, NextResponse } from "next/server"
import { runDb } from "@/lib/db"
import { generateId } from "@/lib/auth"

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature")

    if (!STRIPE_WEBHOOK_SECRET || !signature) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 })
    }

    // Verify webhook signature (simplified - in production use Stripe library)
    const event = JSON.parse(body)

    if (event.type === "checkout.session.completed") {
      const session = event.data.object
      const userId = session.client_reference_id
      const tier = session.metadata?.tier

      if (userId && tier) {
        const expiresAt = new Date()
        expiresAt.setMonth(expiresAt.getMonth() + 1)

        await runDb(
          `INSERT INTO subscriptions (id, user_id, stripe_subscription_id, stripe_customer_id, tier, status, price_per_month, started_at, expires_at)
           VALUES (?, ?, ?, ?, ?, 'active', ?, CURRENT_TIMESTAMP, ?)`,
          [generateId(), userId, session.subscription, session.customer, tier, 9.99, expiresAt.toISOString()],
        )

        await runDb("UPDATE users SET subscription_tier = ?, subscription_expires_at = ? WHERE id = ?", [
          tier,
          expiresAt.toISOString(),
          userId,
        ])
      }
    }

    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object
      await runDb(
        'UPDATE subscriptions SET status = "cancelled", cancelled_at = CURRENT_TIMESTAMP WHERE stripe_subscription_id = ?',
        [subscription.id],
      )
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
