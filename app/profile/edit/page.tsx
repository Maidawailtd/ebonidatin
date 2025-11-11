
import { redirect } from "next/navigation"
import ProfileEditForm from "@/components/profile-edit-form"

// TODO: Replace with actual Cloudflare authentication and data fetching
async function getUserProfile() {
  // This is a placeholder. In a real scenario, you would check the user's authentication status and fetch their profile from your D1 database.
  const isAuthenticated = true; // Simulate an authenticated user
  const profile = {
    id: "user-123",
    username: "johndoe",
    full_name: "John Doe",
    bio: "This is a sample bio.",
    website: "https://example.com",
  };

  return { isAuthenticated, profile };
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ProfileEditPage() {
  const { isAuthenticated, profile } = await getUserProfile();

  if (!isAuthenticated) {
    redirect("/auth/login");
  }

  if (!profile) {
    redirect("/onboarding");
  }

  return <ProfileEditForm profile={profile} />
}
