import { Metadata } from "next"
import Link from "next/link"
import { LayoutDashboard, Users, ShieldAlert, BarChart3, Settings } from 'lucide-react'

export const metadata: Metadata = {
  title: "Admin Dashboard | Eboni Dating",
  description: "Administration panel for Eboni Dating",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border hidden md:block fixed h-full">
        <div className="p-6 border-b border-border">
          <h2 className="text-2xl font-black tracking-tight">eboni<span className="text-primary">.admin</span></h2>
        </div>
        <nav className="p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg bg-primary/10 text-primary">
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Users size={20} />
            Users
          </Link>
          <Link href="/admin/verifications" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <ShieldAlert size={20} />
            Verifications
          </Link>
          <Link href="/admin/reports" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <BarChart3 size={20} />
            Reports
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Settings size={20} />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        {children}
      </main>
    </div>
  )
}
