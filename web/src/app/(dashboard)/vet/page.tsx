import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function VetPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Vet Portal</h1>
                    <p className="text-muted-foreground">View appointments and approve patient records.</p>
                </div>
                <Button variant="outline">Schedule Absence</Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Appointments Today</CardTitle>
                        <CardDescription>Scheduled patients</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">12</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Pending Approvals</CardTitle>
                        <CardDescription>Records awaiting your signature</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-amber-500">5</p>
                    </CardContent>
                </Card>
                <Card className="col-span-1 md:col-span-2 lg:col-span-1">
                    <CardHeader>
                        <CardTitle>AI Alerts</CardTitle>
                        <CardDescription>Skin Checker flags to review</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-red-500">2</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
