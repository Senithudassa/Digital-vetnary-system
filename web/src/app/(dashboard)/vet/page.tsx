import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Calendar, Stethoscope, Clock, CheckCircle2 } from "lucide-react"

export default function VetPage() {
    const appointments = [
        { id: "APT-01", time: "09:00 AM", petName: "Max", breed: "Golden Retriever", reason: "Annual Vaccination", status: "Waiting" },
        { id: "APT-02", time: "09:30 AM", petName: "Luna", breed: "Persian Cat", reason: "Skin Allergy Check", status: "In Progress" },
        { id: "APT-03", time: "10:15 AM", petName: "Rocky", breed: "German Shepherd", reason: "General Consult", status: "Upcoming" },
        { id: "APT-04", time: "11:00 AM", petName: "Bella", breed: "Poodle", reason: "Follow-up", status: "Upcoming" },
    ]

    return (
        <div className="space-y-8 p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Doctor Portal</h1>
                    <p className="text-muted-foreground mt-1">Hello Dr. Silva, here is your schedule for today.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"><Calendar className="mr-2 h-4 w-4" /> View Calendar</Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Today's Patients</CardTitle>
                        <Stethoscope className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">14</div>
                        <p className="text-xs text-muted-foreground">3 completed, 11 remaining</p>
                    </CardContent>
                </Card>
                <Card className="bg-primary text-primary-foreground">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-primary-foreground">Next Patient</CardTitle>
                        <Clock className="h-4 w-4 text-primary-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Rocky (GS)</div>
                        <p className="text-xs opacity-90">In 15 minutes - Rm 02</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2</div>
                        <p className="text-xs text-muted-foreground">Prescriptions to sign</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Today's Appointments</CardTitle>
                    <CardDescription>
                        Manage your queue. The Assistant will move patients to "Waiting" when they arrive.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Time</TableHead>
                                <TableHead>Pet Name</TableHead>
                                <TableHead>Breed / Species</TableHead>
                                <TableHead>Reason</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {appointments.map((apt) => (
                                <TableRow key={apt.id}>
                                    <TableCell className="font-medium">{apt.time}</TableCell>
                                    <TableCell>{apt.petName}</TableCell>
                                    <TableCell className="text-muted-foreground">{apt.breed}</TableCell>
                                    <TableCell>{apt.reason}</TableCell>
                                    <TableCell>
                                        <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold
                                            ${apt.status === 'In Progress' ? 'border-primary text-primary bg-primary/10' :
                                                apt.status === 'Waiting' ? 'border-amber-500 text-amber-700 bg-amber-50' :
                                                    'border-muted text-muted-foreground'}`}>
                                            {apt.status}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant={apt.status === 'Waiting' ? 'default' : 'secondary'} size="sm">
                                            {apt.status === 'Waiting' ? 'Start Consult' : 'View Record'}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
