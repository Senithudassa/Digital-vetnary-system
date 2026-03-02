import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                <div className="flex shrink-0 items-center justify-between p-4 border-b">
                    <SidebarTrigger />
                    <div className="font-semibold">VetNary Web Portal</div>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    )
}
