import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { resolveUrl } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={page.url.startsWith(
                                resolveUrl(item.href),
                            )}
                            tooltip={{ children: item.title }}
                            size="lg"
                            className="group relative transition-all duration-200 hover:translate-x-1"
                            style={{ 
                                             backgroundColor: page.url === resolveUrl(item.href) 
                                                 ? 'var(--sitecolor)' 
                                                 : 'transparent',
                                             color: page.url === resolveUrl(item.href) ? 'white' : 'currentColor'
                                         }}
                        >
                            <Link href={item.href} prefetch className="flex items-center gap-1">
                             <div className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors "
                                         style={{ 
                                             backgroundColor: page.url === resolveUrl(item.href) 
                                                 ? 'var(--sitecolor)' 
                                                 : 'transparent',
                                             color: page.url === resolveUrl(item.href) ? 'white' : 'currentColor'
                                         }}>
                                {item.icon && <item.icon />}
                                </div>
                                 <span className="font-medium transition-all ">{item.title}</span>
                              
                            </Link>
                        </SidebarMenuButton>
                         {/* Active indicator */}
                            {page.url === resolveUrl(item.href) && (
                                <div className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full"
                                     style={{ backgroundColor: 'var(--sitecolor)' }} />
                            )}
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
