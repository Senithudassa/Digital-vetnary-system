import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AssistantPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Assistant Dashboard</h1>
                    <p className="text-muted-foreground">Manage till, billing, and entry records.</p>
                </div>
                <Button>New Transaction</Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Current Till Balance</CardTitle>
                        <CardDescription>Expected cash on hand</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-green-600">Rs. 45,000</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Transactions Today</CardTitle>
                        <CardDescription>Total bills processed</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">24</p>
                    </CardContent>
                </Card>
                <Card className="col-span-1 md:col-span-2 lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Unapproved Records</CardTitle>
                        <CardDescription>Waiting for Vet approval</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-amber-500">5</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
