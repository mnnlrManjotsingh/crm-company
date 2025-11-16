import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { TrendingUp, Users, Package, Clock, ArrowUp, ArrowDown } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Page Header */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--sitecolordark)' }}>
                        Dashboard
                    </h1>
                    <p className="text-muted-foreground">Welcome to your organization overview</p>
                </div>

                {/* Stats Cards with Icons */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Loads</p>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-3xl font-bold" style={{ color: 'var(--sitecolor)' }}>1</h3>
                                    
                                </div>
                            </div>
                            <div className="rounded-lg p-3" style={{ backgroundColor: 'var(--sitecolorlight)' }}>
                                <Package className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Converted Loads</p>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-3xl font-bold" style={{ color: 'var(--sitecolor)' }}>0</h3>
                                    
                                </div>
                            </div>
                            <div className="rounded-lg p-3" style={{ backgroundColor: 'var(--sitecolorlight)' }}>
                                <TrendingUp className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Rejected Loads</p>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-3xl font-bold" style={{ color: 'var(--sitecolor)' }}>0</h3>
                                    
                                </div>
                            </div>
                            <div className="rounded-lg p-3" style={{ backgroundColor: 'var(--sitecolorlight)' }}>
                                <Users className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Today Reminders</p>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-3xl font-bold" style={{ color: 'var(--sitecolor)' }}>0</h3>
                                    
                                </div>
                            </div>
                            <div className="rounded-lg p-3" style={{ backgroundColor: 'var(--sitecolorlight)' }}>
                                <Clock className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts and Tables Section */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Today Sales */}
                    <div className="rounded-xl border bg-card p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold" style={{ color: 'var(--sitecolordark)' }}>
                                Today Sales
                            </h3>
                            <span className="rounded-full px-3 py-1 text-xs font-medium" 
                                  style={{ backgroundColor: 'var(--sitecolorlight)', color: 'white' }}>
                                Latest
                            </span>
                        </div>
                        <div className="overflow-hidden rounded-lg border ">
                            <table className="w-full ">
                                <thead>
                                    <tr style={{ backgroundColor: 'var(--sitecolorlight)' }}>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            ID
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Total Sales
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-background divide-y divide-border">
                                    <tr>
                                        <td colSpan={3} className="px-4 py-12 text-center">
                                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                                <Package className="h-8 w-8 opacity-50" />
                                                <p className="text-sm">No sales records found for today</p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Weekly Sales */}
                    <div className="rounded-xl border bg-card p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold" style={{ color: 'var(--sitecolordark)' }}>
                                Weekly Sales
                            </h3>
                            <span className="rounded-full px-3 py-1 text-xs font-medium" 
                                  style={{ backgroundColor: 'var(--sitecolorlight)', color: 'white' }}>
                                This Week
                            </span>
                        </div>
                        <div className="overflow-hidden rounded-lg border">
                            <table className="w-full">
                                <thead>
                                    <tr style={{ backgroundColor: 'var(--sitecolorlight)' }}>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            ID
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Total Sales
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-background divide-y divide-border">
                                    <tr>
                                        <td colSpan={3} className="px-4 py-12 text-center">
                                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                                <TrendingUp className="h-8 w-8 opacity-50" />
                                                <p className="text-sm">No weekly sales data available</p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

               
            </div>
        </AppLayout>
    );
}