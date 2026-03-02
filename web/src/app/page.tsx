import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Activity, ShieldCheck, MapPin } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navigation Bar */}
      <header className="px-6 lg:px-14 h-20 border-b flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">VetNary<span className="text-primary">.io</span></span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
          <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
          <Link href="#security" className="hover:text-primary transition-colors">Security</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="font-semibold">Sign In</Button>
          </Link>
          <Link href="/register">
            <Button className="font-semibold shadow-md">Register Clinic <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-24 lg:py-32 xl:py-40 flex flex-col items-center justify-center text-center px-4 md:px-6 bg-gradient-to-b from-primary/5 to-white">
          <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary border-none text-sm px-4 py-1.5 rounded-full">
            The #1 Clinic Management Software in Sri Lanka
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6 max-w-4xl text-balance">
            Run your veterinary clinic like a <span className="text-primary">modern bank.</span>
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl mb-10 text-balance">
            VetNary is a powerful, secure operating system for veterinary branches. Manage queueing, process billing, and sync straight to your customers' mobile VetBook.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base shadow-lg">Start your 14-day free trial</Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base bg-white">Access Portal</Button>
            </Link>
          </div>
        </section>

        {/* Feature Highlights */}
        <section id="features" className="w-full py-24 bg-muted/30">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Why choose VetNary?</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Built from the ground up to support high-volume branches and stringent data privacy laws.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Independent Branches</h3>
                <p className="text-muted-foreground">Manage your own budgets, staff, and queues entirely isolated from the rest of the network for maximum efficiency.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <div className="h-12 w-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-6">
                  <ShieldCheck className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Military-Grade Privacy</h3>
                <p className="text-muted-foreground">Financial targets are cryptographically hashed. We strictly adhere to Sri Lanka Data Protection laws. Zero third-party sharing.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border">
                <div className="h-12 w-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-6">
                  <MapPin className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Get Discovered</h3>
                <p className="text-muted-foreground">Automatically appear on the VetNary Mobile Customer app. Let pet owners find you, book appointments, and view their digital VetBooks.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-10 bg-zinc-950 text-zinc-400">
        <div className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Activity className="h-5 w-5 text-zinc-50" />
            <span className="text-zinc-50 font-semibold">VetNary System</span>
          </div>
          <p>© 2026 VetNary SL. All rights reserved. Built for Clinic Excellence.</p>
        </div>
      </footer>
    </div>
  )
}

function Badge({ className, children }: { className?: string, children: React.ReactNode }) {
  return <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>{children}</div>
}
