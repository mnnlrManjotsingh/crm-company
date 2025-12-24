// resources/js/Pages/Employee/AssignedLeads.tsx
import React, { useState } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface Employee {
    id: number;
    name: string;
    email: string;
    mobile: string;
    role: string;
}

interface Lead {
    id: number;
    company_name: string;
    city: string;
    address: string;
    phone_no: string;
    email: string;
    remark: string;
    lead_type: string;
    documentation: string;
    status: string;
    reminder: string | null;
    created_at: string;
    updated_at: string;
    lead_source: string;
    products: string[];
}

interface Props {
    employee: Employee;
    leads: {
        data: Lead[];
        current_page: number;
        last_page: number;
        total: number;
        from: number;
        to: number;
    };
}

interface PageProps {
    flash?: {
        success?: string;
        error?: string;
    };
    auth?: {
        user: Employee;
    };
}

const AssignedLeads: React.FC<Props> = ({ employee, leads }) => {
    const { flash } = usePage().props as PageProps;
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
    
    // ✅ ADDED: State for remark editing
    const [editingRemark, setEditingRemark] = useState<{
        leadId: number | null;
        remark: string;
    }>({ leadId: null, remark: '' });
    const [isSavingRemark, setIsSavingRemark] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Leads',
            href: '/viewleads',
        },
    ];

    // ✅ ADDED: Handle remark editing
    const startEditRemark = (leadId: number, currentRemark: string) => {
        setEditingRemark({
            leadId,
            remark: currentRemark || ''
        });
    };

    const cancelEditRemark = () => {
        setEditingRemark({ leadId: null, remark: '' });
    };

    const saveRemark = async (leadId: number) => {
        if (!editingRemark.remark.trim()) return;
        
        setIsSavingRemark(true);
        
        try {
            await router.patch(`/leads/${leadId}/update-remark`, {
                remark: editingRemark.remark.trim(),
            }, {
                preserveScroll: true,
                onSuccess: () => {
                    setEditingRemark({ leadId: null, remark: '' });
                    // Success message will come from flash
                },
                onError: (errors) => {
                    console.error('Error saving remark:', errors);
                    alert('Failed to save remark. Please try again.');
                }
            });
        } catch (error) {
            console.error('Error:', error);
            alert('Network error occurred.');
        } finally {
            setIsSavingRemark(false);
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'confirmed':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'rejected':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getLeadTypeColor = (type: string) => {
        switch (type.toLowerCase()) {
            case 'domestic':
                return 'bg-blue-100 text-blue-800';
            case 'international':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredLeads = selectedStatus === 'all' 
        ? leads.data 
        : leads.data.filter(lead => lead.status.toLowerCase() === selectedStatus.toLowerCase());

    const handleStatusUpdate = (leadId: number, newStatus: string) => {
        if (confirm('Are you sure you want to update the status?')) {
            router.post(`/leads/${leadId}/update-status`, {
                status: newStatus,
            }, {
                preserveScroll: true,
                onSuccess: () => {
                    // Success handled by flash messages
                },
                onError: (errors) => {
                    console.error('Error updating status:', errors);
                }
            });
        }
    };

    // ✅ ADDED: Render remark cell with edit functionality
    const renderRemarkCell = (lead: Lead) => {
        if (editingRemark.leadId === lead.id) {
            return (
                <div className="flex items-center space-x-2">
                    <textarea
                        value={editingRemark.remark}
                        onChange={(e) => setEditingRemark({...editingRemark, remark: e.target.value})}
                        className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={2}
                        placeholder="Add remark..."
                        autoFocus
                    />
                    <div className="flex flex-col space-y-1">
                        <button
                            onClick={() => saveRemark(lead.id)}
                            disabled={isSavingRemark}
                            className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                        >
                            {isSavingRemark ? 'Saving...' : 'Save'}
                        </button>
                        <button
                            onClick={cancelEditRemark}
                            className="px-2 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            );
        }
        
        return (
            <div className="flex items-center justify-between group">
                <span className="text-sm text-gray-700 cursor-pointer" onClick={() => startEditRemark(lead.id, lead.remark || '')}>
                    {lead.remark || 'Add remarks'}
                </span>
                <button
                    onClick={() => startEditRemark(lead.id, lead.remark || '')}
                    className="ml-2 opacity-0 group-hover:opacity-100 cursor-pointer text-blue-600 hover:text-blue-800 text-xs bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded transition-opacity"
                    title="Edit Remark"
                >
                    Edit
                </button>
            </div>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Leads" />
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Flash Messages */}
                {flash?.success && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-r-lg">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-green-700">{flash.success}</p>
                            </div>
                        </div>
                    </div>
                )}

                {flash?.error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{flash.error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="mb-4 sm:mb-0">
                            <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
                        </div>
                        <div className="text-sm text-gray-700">
                            Total Leads: <span className="font-semibold">{leads.total}</span>
                        </div>
                    </div>
                </div>

                {/* TABLE VIEW */}
                <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Company Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Contact
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Location
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Lead Type
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Documentation
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Remark
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Created
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredLeads.length > 0 ? (
                                    filteredLeads.map((lead) => (
                                        <tr key={lead.id} className="hover:bg-gray-50 transition-colors duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                #{lead.id}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{lead.company_name}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{lead.phone_no || 'N/A'}</div>
                                                <div className="text-xs text-gray-500">{lead.email || 'N/A'}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{lead.city}</div>
                                                <div className="text-xs text-gray-500 truncate max-w-xs">{lead.address}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full ${getLeadTypeColor(lead.lead_type)}`}>
                                                    {lead.lead_type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full ${
                                                    lead.documentation === 'yes' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : lead.documentation === 'no'
                                                        ? 'bg-red-100 text-red-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {lead.documentation || 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {renderRemarkCell(lead)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(lead.created_at)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                <h3 className="text-lg font-medium text-gray-900 mb-2">No leads found</h3>
                                                <p className="text-gray-500 mb-4">
                                                    {selectedStatus === 'all' 
                                                        ? "You don't have any assigned leads yet."
                                                        : `No ${selectedStatus} leads found.`}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {/* Pagination */}
{leads.data && leads.data.length > 0 && (
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{leads.from}</span> to <span className="font-medium">{leads.to}</span> of <span className="font-medium">{leads.total}</span> results
        </div>
        
        <div className="flex items-center space-x-1">
            {/* Previous Button */}
            <Link
                href={leads.current_page > 1 ? `/viewleads?page=${leads.current_page - 1}` : '#'}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    leads.current_page === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
                preserveScroll
                preserveState
                replace
            >
                Previous
            </Link>
            
            {/* Page Numbers */}
            {(() => {
                const pages = [];
                const maxVisiblePages = 5;
                const currentPage = leads.current_page;
                const lastPage = leads.last_page;
                
                if (lastPage <= maxVisiblePages) {
                    // Show all pages
                    for (let i = 1; i <= lastPage; i++) {
                        pages.push(i);
                    }
                } else {
                    // Show first 3, current, last 3, or similar
                    pages.push(1);
                    
                    if (currentPage > 3) {
                        pages.push('...');
                    }
                    
                    // Show pages around current
                    const start = Math.max(2, currentPage - 1);
                    const end = Math.min(lastPage - 1, currentPage + 1);
                    
                    for (let i = start; i <= end; i++) {
                        pages.push(i);
                    }
                    
                    if (currentPage < lastPage - 2) {
                        pages.push('...');
                    }
                    
                    if (lastPage > 1) {
                        pages.push(lastPage);
                    }
                }
                
                return pages.map((page, index) => {
                    if (page === '...') {
                        return (
                            <span key={`ellipsis-${index}`} className="px-3 py-2 text-sm text-gray-500">
                                ...
                            </span>
                        );
                    }
                    
                    const isCurrent = page === leads.current_page;
                    
                    return (
                        <Link
                            key={page}
                            href={`/viewleads?page=${page}`}
                            className={`px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                                isCurrent
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                            preserveScroll
                            preserveState
                            replace
                        >
                            {page}
                        </Link>
                    );
                });
            })()}
            
            {/* Next Button */}
            <Link
                href={leads.current_page < leads.last_page ? `/viewleads?page=${leads.current_page + 1}` : '#'}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    leads.current_page === leads.last_page
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
                preserveScroll
                preserveState
                replace
            >
                Next
            </Link>
        </div>
    </div>
)}
            </div>
        </AppLayout>
    );
};

export default AssignedLeads;