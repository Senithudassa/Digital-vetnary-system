import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function MainAdminPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Main Admin Dashboard</h1>
                <p className="text-muted-foreground">Monitor clinics and system-wide P&L.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Clinics</CardTitle>
                        <CardDescription>Active veterinary hospitals</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">42</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Pending Approvals</CardTitle>
                        <CardDescription>Minor Admin changes requiring review</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-amber-500">8</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Revenue</CardTitle>
                        <CardDescription>System-wide generated revenue (LKR)</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-green-600">Rs. 1.2M</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
