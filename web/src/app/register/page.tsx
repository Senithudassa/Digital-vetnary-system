import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Activity } from "lucide-react"

export default function RegisterPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">

            {/* Branding */}
            <div className="flex flex-col items-center mb-8">
                <Link href="/" className="flex items-center gap-2 mb-2">
                    <Activity className="h-8 w-8 text-primary" />
                    <span className="text-3xl font-bold tracking-tight">VetNary<span className="text-primary">.io</span></span>
                </Link>
                <p className="text-muted-foreground text-center">Join the #1 veterinary network in Sri Lanka.</p>
            </div>

            {/* Registration Card */}
            <Card className="w-full max-w-lg shadow-md border-primary/10">
                <CardHeader className="space-y-1 pb-4">
                    <CardTitle className="text-xl font-bold">Register your Clinic</CardTitle>
                    <CardDescription className="text-sm">
                        Submit your details. A Main Admin will review and approve your branch account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <Label htmlFor="clinicName">Clinic Name</Label>
                            <Input id="clinicName" placeholder="e.g. River Edge Vet" required />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="doctorName">Primary Doctor</Label>
                            <Input id="doctorName" placeholder="e.g. Dr. Silva" required />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <Label htmlFor="email">Work Email</Label>
                            <Input id="email" type="email" placeholder="m@example.com" required />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="phone">Contact Number</Label>
                            <Input id="phone" type="tel" placeholder="07X XXX XXXX" required />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="address">Clinic Address</Label>
                        <Textarea
                            id="address"
                            placeholder="Full physical address for the mobile app map..."
                            className="resize-none"
                            rows={2}
                            required
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="password">Create Password</Label>
                        <Input id="password" type="password" required />
                        <p className="text-[11px] text-muted-foreground">Must be at least 8 characters securely hashed.</p>
                    </div>

                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                    <Link href="/login" className="w-full">
                        <Button className="w-full shadow-sm">Submit Registration</Button>
                    </Link>
                    <div className="text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="font-semibold text-primary hover:underline">
                            Sign in
                        </Link>
                    </div>
                </CardFooter>
            </Card>

        </div>
    )
}
