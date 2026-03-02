import { Calendar, Home, Inbox, Search, Settings, Activity, Users, FileText, Banknote } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

// Note: In reality, these routes would be filtered by user role
const items = [
    { title: "Main Admin Dashboard", url: "/main-admin", icon: Activity },
    { title: "Minor Admin Panel", url: "/minor-admin", icon: Settings },
    { title: "Vet Portal", url: "/vet", icon: Activity },
    { title: "Assistant Till", url: "/assistant", icon: Banknote },
    { title: "Patient Records", url: "/records", icon: FileText },
    { title: "User Management", url: "/users", icon: Users },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>VetNary System</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
