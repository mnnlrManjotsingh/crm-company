import { NavFooter } from '@/components/nav-footer';
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
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import employees from '@/routes/employees';
import leads from '@/routes/leads';
import { BookOpen, Folder, LayoutGrid,TrendingUp,        
    Target,            
    Trash2,            
    Briefcase,         
    UserCheck,         
    ClipboardList,     
    PackageCheck,      
    Ban,               
    UserMinus,         
    Users2,            
    Warehouse,         
    Key,      } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Reports',
        href: "#",
        icon: TrendingUp,
    },
    {
        title: 'Lead',
        href: leads.index(),
        icon: Target,
    },
    {
        title: 'Deleted Lead',
        href: "#",
        icon: Trash2,
    },
    {
        title: 'Client Listing',
        href: "#",
        icon: Briefcase,
    },
    {
        title: 'Customer',
        href: "#",
        icon: UserCheck,
    },
    {
        title: 'Order Listing',
        href: "#",
        icon: ClipboardList,
    },
    {
        title: 'Dispatch Listing',
        href: "#",
        icon: PackageCheck,
    },
    {
        title: 'Lost Products',
        href: "#",
        icon: Ban,
    },
    {
        title: 'Lost Customer',
        href: "#",
        icon: UserMinus,
    },
    {
        title: 'Employees',
        href: employees.index(),
        icon: Users2,
    },
    {
        title: 'Manage Stocks',
        href: "#",
        icon: Warehouse,
    },
    {
        title: 'Manage Roles',
        href: "#",
        icon: Key,
    },
    
];

// const footerNavItems: NavItem[] = [
//     {
//         title: 'Repository',
//         href: 'https://github.com/laravel/react-starter-kit',
//         icon: Folder,
//     },
//     {
//         title: 'Documentation',
//         href: 'https://laravel.com/docs/starter-kits#react',
//         icon: BookOpen,
//     },
// ];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset"   >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
