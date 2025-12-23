import React from 'react';
import { Link, Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

interface DeletedCustomer {
    id: number;
    customer_name: string;
    city: string;
    address: string;
    phone_no: string;
    email: string;
    reminder: string;
    quotation: string;
    status: string;
    deleted_at: string;
}

interface Props {
    deletedCustomers: {
        data: DeletedCustomer[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Deleted Customers',
        href: '/customers/deleted/list',
    },
];

export default function DeletedCustomer({ deletedCustomers }: Props) {

    const handleRestoreCustomer = (customerId: number) => {
        if (confirm('Are you sure you want to restore this customer?')) {
            router.post(`/customers/${customerId}/restore`, {}, {
                onSuccess: () => {
                    router.reload();
                }
            });
        }
    };

    const handlePermanentDelete = (customerId: number) => {
        if (confirm('Are you sure you want to permanently delete this customer? This action cannot be undone.')) {
            router.delete(`/customers/${customerId}/force-delete`, {
                onSuccess: () => {
                    router.reload();
                }
            });
        }
    };

    const handlePageChange = (page: number) => {
        if (page < 1 || page > deletedCustomers.last_page) return;
        
        router.get('/customers/deleted/list', { page }, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    // Generate page numbers with ellipsis
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        const currentPage = deletedCustomers.current_page;
        const lastPage = deletedCustomers.last_page;
        
        if (lastPage <= maxVisiblePages) {
            // Show all pages if total pages is less than or equal to maxVisiblePages
            for (let i = 1; i <= lastPage; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);
            
            // Calculate start and end of page range
            let start = Math.max(2, currentPage - 1);
            let end = Math.min(lastPage - 1, currentPage + 1);
            
            // Adjust if we're near the beginning
            if (currentPage <= 3) {
                end = Math.min(maxVisiblePages - 1, lastPage - 1);
            }
            
            // Adjust if we're near the end
            if (currentPage >= lastPage - 2) {
                start = Math.max(2, lastPage - maxVisiblePages + 2);
            }
            
            // Add ellipsis after first page if needed
            if (start > 2) {
                pages.push('...');
            }
            
            // Add middle pages
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            
            // Add ellipsis before last page if needed
            if (end < lastPage - 1) {
                pages.push('...');
            }
            
            // Always show last page
            if (lastPage > 1) {
                pages.push(lastPage);
            }
        }
        
        return pages;
    };

    // Calculate showing from/to
    const showingFrom = deletedCustomers.from || ((deletedCustomers.current_page - 1) * 10) + 1;
    const showingTo = deletedCustomers.to || Math.min(deletedCustomers.current_page * 10, deletedCustomers.total);
    const pageNumbers = getPageNumbers();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Deleted Customers" />
            <div className="p-6">
                {/* Header Section */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Deleted Customers</h1>
                            <p className="text-gray-600">Manage your deleted customers - restore or permanently delete them</p>
                        </div>
                        <Link 
                            href="/customers"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
                        >
                            Back to Active Customers
                        </Link>
                    </div>
                </div>

                {/* Deleted Customers Table */}
                <div className="bg-white rounded-lg shadow  border">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                                    ID
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                                    Customer Name
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                                    City
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                                    Address
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                                    Phone No
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                                    Email
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                                    Reminder
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                                    Quotation
                                </th>
                                {/* <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                                    Status
                                </th> */}
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                                    Deleted At
                                </th>
                                {/* <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                                    Actions
                                </th> */}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {deletedCustomers.data && deletedCustomers.data.length > 0 ? (
                                deletedCustomers.data.map((customer) => (
                                    <tr key={customer.id} className="hover:bg-gray-50 bg-red-50">
                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 border">
                                            {customer.id}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border">
                                            {customer.customer_name}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border">
                                            {customer.city}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border">
                                            {customer.address}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border">
                                            {customer.phone_no}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border">
                                            {customer.email}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border">
                                            {customer.reminder ? new Date(customer.reminder).toLocaleDateString() : '-'}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border">
                                            {customer.quotation}
                                        </td>
                                        {/* <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border">
                                            <span className={`px-2 py-1 rounded text-xs ${
                                                customer.status === 'active' ? 'bg-green-100 text-green-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                                            </span>
                                        </td> */}
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border">
                                            {new Date(customer.deleted_at).toLocaleDateString()} at {new Date(customer.deleted_at).toLocaleTimeString()}
                                        </td>
                                        {/* <td className="px-4 py-3 whitespace-nowrap text-sm font-medium space-x-2 border">
                                            <button 
                                                onClick={() => handleRestoreCustomer(customer.id)}
                                                className="text-green-600 hover:text-green-900 hover:underline"
                                            >
                                                Restore
                                            </button>
                                            <button 
                                                onClick={() => handlePermanentDelete(customer.id)}
                                                className="text-red-600 hover:text-red-900 hover:underline"
                                            >
                                                Delete Permanently
                                            </button>
                                        </td> */}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={11} className="px-6 py-8 text-center text-gray-500 border">
                                        <div className="flex flex-col items-center justify-center">
                                            <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4m10 6-6-6 6-6" />
                                            </svg>
                                            <p className="text-lg font-medium text-gray-600 mb-2">No deleted customers found</p>
                                            <p className="text-gray-500 mb-4">All your active customers are in the main customers section</p>
                                            <Link 
                                                href="/customers" 
                                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
                                            >
                                                Go to Active Customers
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                        Showing {deletedCustomers.data?.length || 0} of {deletedCustomers.total || 0} deleted customers
                    </div>

                    {deletedCustomers.last_page > 1 && (
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="flex items-center space-x-1">
                                <button 
                                    onClick={() => handlePageChange(deletedCustomers.current_page - 1)}
                                    disabled={deletedCustomers.current_page === 1}
                                    className={`px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                                        deletedCustomers.current_page === 1
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                                    }`}
                                >
                                    Previous
                                </button>
                                
                                {pageNumbers.map((page, index) => {
                                    if (page === '...') {
                                        return (
                                            <span key={`ellipsis-${index}`} className="px-3 py-2 text-sm text-gray-500">
                                                ...
                                            </span>
                                        );
                                    }
                                    
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page as number)}
                                            className={`px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                                                deletedCustomers.current_page === page
                                                    ? 'bg-blue-600 text-white border-blue-600'
                                                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}
                                
                                <button 
                                    onClick={() => handlePageChange(deletedCustomers.current_page + 1)}
                                    disabled={deletedCustomers.current_page === deletedCustomers.last_page}
                                    className={`px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                                        deletedCustomers.current_page === deletedCustomers.last_page
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                                    }`}
                                >
                                    Next
                                </button>
                            </div>
                            
                            <div className="text-sm text-gray-600">
                                Page <span className="font-medium">{deletedCustomers.current_page}</span> of <span className="font-medium">{deletedCustomers.last_page}</span>
                            </div>
                        </div>
                    )}
                    
                    
                </div>
            </div>
        </AppLayout>
    );
}