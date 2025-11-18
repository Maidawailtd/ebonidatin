import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-black bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            404
          </h1>
          <p className="text-2xl font-semibold mt-4">Page Not Found</p>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. Perhaps you've mistyped the URL or the page has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
              <Home className="mr-2" size={20} />
              Go Home
            </Button>
          </Link>
          <Link href="/discover">
            <Button size="lg" variant="outline">
              <Search className="mr-2" size={20} />
              Browse Profiles
            </Button>
          </Link>
        </div>

        <div className="mt-12 text-sm text-muted-foreground">
          <p>Need help? <Link href="/contact" className="text-primary hover:underline">Contact our support team</Link></p>
        </div>
      </div>
    </div>
  )
}
