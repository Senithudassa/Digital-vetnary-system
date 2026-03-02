import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function MinorAdminPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Minor Admin Panel</h1>
                    <p className="text-muted-foreground">Manage system data and submit changes for review.</p>
                </div>
                <Button>Register New Clinic</Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>My Submissions</CardTitle>
                        <CardDescription>Changes pending Main Admin review</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-amber-500">3</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Rejected Changes</CardTitle>
                        <CardDescription>Requires your attention</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-red-500">1</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
