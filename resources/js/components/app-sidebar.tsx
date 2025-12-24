import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import { type NavItem } from '@/types';
import { 
    LayoutGrid,
    TrendingUp,        
    Target,            
    Trash2,            
    UserCheck,         
    ClipboardList,     
    PackageCheck,      
    Ban,               
    UserMinus,         
    Users2,            
    BarChart3,
    User,
    Settings,
    Home,
    ListChecks
} from 'lucide-react';
import AppLogo from './app-logo';

// Admin navigation items (for web guard users)
const adminNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Reports',
        href: "/leadreports",
        icon: TrendingUp,
    },
    {
        title: 'Lead',
        href: '/leads',
        icon: Target,
    },
    {
        title: 'Deleted Lead',
        href: '/leads/deleted/list',
        icon: Trash2,
    },
    // {
    //     title: 'Customer',
    //     href: '/customers',
    //     icon: UserCheck,
    // },
    {
        title: 'Customer',
        href: '/employee/all-assigned-leads',
        icon: UserCheck,
    },
    {
        title: 'Order Listing',
        href: "/orderlisting",
        icon: ClipboardList,
    },
    {
        title: 'Dispatch Listing',
        href: "/dispatchlisting",
        icon: PackageCheck,
    },
    {
        title: 'Lost Products',
        href: "/lostproduct",
        icon: Ban,
    },
    {
        title: 'Lost Customer',
        href: "/customers/deleted/list",
        icon: UserMinus,
    },
    {
        title: 'Employees',
        href: "/employees",
        icon: Users2,
    },
];

// Employee navigation items (for employee guard users)
const employeeNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: Home,
    },
    {
        title: ' Leads',
        href: '/viewleads',
        icon: Target,
    },
   
];

export function AppSidebar() {
      const { auth } = usePage().props as any;
    
    // Check if user exists and has a role
    const user = auth?.user;
    const userRole = user?.role; // 'admin', 'employee', or undefined
    
    // Select appropriate navigation items
    let navItems: NavItem[] = [];
    let portalTitle = 'Portal';
    
    if (!user) {
        
        portalTitle = 'Welcome';
    } else if (userRole === 'employee') {
        // Employee is logged in
        navItems = employeeNavItems;
        portalTitle = 'Employee Portal';
    } else if (userRole === 'admin') {
        // Admin is logged in
        navItems = adminNavItems;
        portalTitle = 'Admin Portal';
    } else {
        // Fallback - should not happen if roles are set correctly
        navItems = [];
        portalTitle = 'Portal';
    }

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                              
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}