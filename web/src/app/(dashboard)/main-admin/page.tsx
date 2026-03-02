import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { PlusCircle, Search, Filter } from "lucide-react"

export default function MainAdminPage() {
    const clinics = [
        { id: "CL-01", name: "River Edge Vet Hospital", location: "Colombo", status: "Active", revenue: "Rs. 450,000", patients: 142 },
        { id: "CL-02", name: "Pet Care Center", location: "Kandy", status: "Active", revenue: "Rs. 280,000", patients: 89 },
        { id: "CL-03", name: "Paws & Claws", location: "Galle", status: "Pending", revenue: "-", patients: 0 },
        { id: "CL-04", name: "City Vet Clinic", location: "Colombo", status: "Suspended", revenue: "Rs. 12,000", patients: 4 },
    ]

    return (
        <div className="space-y-8 p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">System Overview</h1>
                    <p className="text-muted-foreground mt-1">Monitor all registered clinics and system-wide analytics.</p>
                </div>
                <div className="flex gap-2">
                    <Button><PlusCircle className="mr-2 h-4 w-4" /> Register Clinic</Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Rs. 1,245,000</div>
                        <p className="text-xs text-muted-foreground">+14% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Clinics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">42</div>
                        <p className="text-xs text-muted-foreground">+2 new this month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-amber-500">8</div>
                        <p className="text-xs text-muted-foreground">Requires your review</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">System Health</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">Great</div>
                        <p className="text-xs text-muted-foreground">99.9% uptime</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Registered Clinics</CardTitle>
                        <CardDescription>Manage veterinary partners across the country.</CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Filter className="mr-2 h-4 w-4" /> Filter
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Clinic Name</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Patients (30d)</TableHead>
                                <TableHead className="text-right">Revenue</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {clinics.map((clinic) => (
                                <TableRow key={clinic.id}>
                                    <TableCell className="font-medium">{clinic.id}</TableCell>
                                    <TableCell>{clinic.name}</TableCell>
                                    <TableCell>{clinic.location}</TableCell>
                                    <TableCell>
                                        <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold
                                            ${clinic.status === 'Active' ? 'border-green-500 text-green-700 bg-green-50' :
                                                clinic.status === 'Pending' ? 'border-amber-500 text-amber-700 bg-amber-50' :
                                                    'border-red-500 text-red-700 bg-red-50'}`}>
                                            {clinic.status}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">{clinic.patients}</TableCell>
                                    <TableCell className="text-right font-medium">{clinic.revenue}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
