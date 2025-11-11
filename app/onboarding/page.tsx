
import { redirect } from "next/navigation"
import SinglePageOnboarding from "@/components/single-page-onboarding"

// TODO: Replace with actual Cloudflare authentication and data fetching
async function getUserOnboardingState() {
  // This is a placeholder. In a real scenario, you would check the user's authentication status and fetch their profile from your D1 database.
  const isAuthenticated = true; // Simulate an authenticated user
  const isProfileComplete = false; // Simulate an incomplete profile
  const userId = "user-123"; // Example user ID
  const userEmail = "user@example.com"; // Example user email

  return { isAuthenticated, isProfileComplete, userId, userEmail };
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function OnboardingPage() {
  const { isAuthenticated, isProfileComplete, userId, userEmail } = await getUserOnboardingState();

  if (!isAuthenticated) {
    redirect("/auth/login");
  }

  if (isProfileComplete) {
    redirect("/dashboard");
  }

  return <SinglePageOnboarding userId={userId} userEmail={userEmail} />
}
