const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

export const SUBSCRIPTION_TIERS = {
  free: {
    name: "Free",
    price: 0,
    features: ["5 likes per day", "Basic messaging", "View matches"],
  },
  premium: {
    name: "Premium",
    price: 9.99,
    stripePriceId: "price_premium_monthly",
    features: ["Unlimited likes", "Priority messaging", "Advanced filters", "See who liked you"],
  },
  vip: {
    name: "VIP",
    price: 19.99,
    stripePriceId: "price_vip_monthly",
    features: ["All Premium features", "Verified badge", "Boost profile", "Ad-free experience"],
  },
  agency: {
    name: "Agency",
    price: 49.99,
    stripePriceId: "price_agency_monthly",
    features: ["Manage multiple models", "Agency dashboard", "Booking system", "Revenue analytics"],
  },
}

export async function createCheckoutSession(userId: string, tier: string, successUrl: string, cancelUrl: string) {
  if (!STRIPE_SECRET_KEY) {
    throw new Error("Stripe API key not configured")
  }

  const tierConfig = SUBSCRIPTION_TIERS[tier as keyof typeof SUBSCRIPTION_TIERS]
  if (!tierConfig || tierConfig.price === 0) {
    throw new Error("Invalid subscription tier")
  }

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      "payment_method_types[]": "card",
      "line_items[0][price]": tierConfig.stripePriceId || "",
      "line_items[0][quantity]": "1",
      mode: "subscription",
      success_url: successUrl,
      cancel_url: cancelUrl,
      client_reference_id: userId,
      "metadata[tier]": tier,
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to create checkout session")
  }

  return response.json()
}

export async function createCustomer(email: string, name: string) {
  if (!STRIPE_SECRET_KEY) {
    throw new Error("Stripe API key not configured")
  }

  const response = await fetch("https://api.stripe.com/v1/customers", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      email,
      name,
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to create customer")
  }

  return response.json()
}

export async function getSubscription(subscriptionId: string) {
  if (!STRIPE_SECRET_KEY) {
    throw new Error("Stripe API key not configured")
  }

  const response = await fetch(`https://api.stripe.com/v1/subscriptions/${subscriptionId}`, {
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to get subscription")
  }

  return response.json()
}
