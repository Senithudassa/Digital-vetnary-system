import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Activity } from "lucide-react"

export default function LoginPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">

            {/* Branding */}
            <div className="flex flex-col items-center mb-8">
                <Link href="/" className="flex items-center gap-2 mb-2">
                    <Activity className="h-8 w-8 text-primary" />
                    <span className="text-3xl font-bold tracking-tight">VetNary<span className="text-primary">.io</span></span>
                </Link>
                <p className="text-muted-foreground">Sign in to your specialized portal</p>
            </div>

            {/* Login Card */}
            <Card className="w-full max-w-md shadow-lg border-primary/10">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
                    <CardDescription>
                        Enter your credentials to securely access your data.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Work Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <Link href="#" className="text-sm font-medium text-primary hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                        <Input id="password" type="password" required />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="remember" />
                        <label
                            htmlFor="remember"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Remember me for 30 days
                        </label>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Link href="/vet" className="w-full">
                        <Button className="w-full shadow-md text-base h-11">Sign in securely</Button>
                    </Link>
                    <div className="text-center text-sm">
                        Don't have a clinic account?{" "}
                        <Link href="/register" className="font-semibold text-primary hover:underline">
                            Register now
                        </Link>
                    </div>

                    {/* Phase 2 Mock View Links - Remove in Phase 3 */}
                    <div className="mt-4 pt-4 border-t w-full text-center">
                        <p className="text-xs text-muted-foreground mb-2">Role Previews (Phase 2):</p>
                        <div className="flex justify-center gap-3 text-xs">
                            <Link href="/main-admin" className="underline hover:text-primary">Main Admin</Link>
                            <Link href="/minor-admin" className="underline hover:text-primary">Contact Center</Link>
                            <Link href="/assistant" className="underline hover:text-primary">Till</Link>
                        </div>
                    </div>
                </CardFooter>
            </Card>

        </div>
    )
}
