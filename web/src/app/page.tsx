import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4 bg-muted/50">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">VetNary Portal</CardTitle>
          <CardDescription>
            Enter your email below to login to your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          {/* Note: This is an unauthenticated mock linking to the dashboards */}
          <Link href="/main-admin" className="w-full">
            <Button className="w-full">Sign in</Button>
          </Link>
          <div className="text-sm text-center text-muted-foreground mt-2 flex flex-col gap-1">
            <span>Mock Links:</span>
            <div className="flex gap-2 justify-center text-xs">
              <Link href="/minor-admin" className="underline hover:text-primary">Minor Admin</Link>
              <Link href="/vet" className="underline hover:text-primary">Vet</Link>
              <Link href="/assistant" className="underline hover:text-primary">Assistant</Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
