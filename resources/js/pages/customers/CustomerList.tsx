import React, { useState } from 'react';
import { Link, Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

interface Customer {
    id: number;
    customer_name: string;
    city: string;
    address: string;
    phone_no: string;
    email: string;
    reminder: string;
    quotation: string;
    status: string;
}

interface Props {
    customers: {
        data: Customer[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Customers Listing',
        href: '/customers',
    },
];

export default function CustomerList({ customers }: Props) {
    const [selectedStatus, setSelectedStatus] = useState<{ [key: number]: string }>({});
    const [isExporting, setIsExporting] = useState(false);
    
    const { post } = useForm();

    const handleStatusChange = (customerId: number, newStatus: string) => {
        setSelectedStatus(prev => ({
            ...prev,
            [customerId]: newStatus
        }));

        post(`/customers/${customerId}/status`, {
            status: newStatus
        });
    };

    const handleExportExcel = () => {
        setIsExporting(true);
        
        const link = document.createElement('a');
        link.href = '/customers/export/excel';
        link.download = 'customers.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setIsExporting(false);
    };

    const handleDeleteCustomer = (customerId: number) => {
        if (confirm('Are you sure you want to delete this customer?')) {
            router.delete(`/customers/${customerId}`);
        }
    };
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customers" />
            <div className="p-6">
                {/* Header Section */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
                        <div className="flex gap-2">
                            {/* <Link 
                                href="/customers/deleted/list"
                                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 text-sm font-medium"
                            >
                                View Trash
                            </Link> */}
                            <Link 
                                href="/customers/create"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
                            >
                                Add Customer
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                {/* <div className="mb-6 bg-white p-4 rounded-lg shadow border"> */}
                    <div className="flex flex-wrap gap-4 justify-between items-center mb-6  p-4" >
                        <div className="flex gap-2 flex-wrap">
                            <button 
                                onClick={handleExportExcel}
                                disabled={isExporting}
                                className={`flex items-center gap-2 px-3 py-2 rounded text-sm border border-gray-300 ${
                                    isExporting 
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                        : 'bg-gray-100 hover:bg-gray-200 cursor-pointer'
                                }`}
                            >
                                {isExporting ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Exporting...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Export CSV
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                {/* </div> */}

                {/* Customers Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden border">
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
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {customers.data && customers.data.length > 0 ? (
                                customers.data.map((customer) => (
                                    <tr key={customer.id} className="hover:bg-gray-50">
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
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border">
                                            <select 
                                                value={selectedStatus[customer.id] || customer.status}
                                                onChange={(e) => handleStatusChange(customer.id, e.target.value)}
                                                className={`px-2 py-1 rounded text-xs border-0 focus:ring-2 focus:ring-opacity-50 ${
                                                    (selectedStatus[customer.id] || customer.status) === 'active' 
                                                        ? 'bg-green-100 text-green-800 focus:ring-green-500' :
                                                    'bg-red-100 text-red-800 focus:ring-red-500'
                                                }`}
                                            >
                                                <option value="active" className="bg-green-100 text-green-800">Active</option>
                                                <option value="inactive" className="bg-red-100 text-red-800">Inactive</option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium space-x-2 border">
                                            <Link 
                                                href={`/customers/${customer.id}/edit`} 
                                                className="text-blue-600 hover:text-blue-900 hover:underline"
                                            >
                                                Edit
                                            </Link>
                                            <button 
                                                onClick={() => handleDeleteCustomer(customer.id)}
                                                className="text-red-600 hover:text-red-900 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={10} className="px-6 py-8 text-center text-gray-500 border">
                                        <div className="flex flex-col items-center justify-center">
                                            <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="text-lg font-medium text-gray-600 mb-2">No customers found</p>
                                            <p className="text-gray-500 mb-4">Get started by creating your first customer</p>
                                            <Link 
                                                href="/customers/create" 
                                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
                                            >
                                                Create Your First Customer
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination and Summary */}
                <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                        Showing {customers.data?.length || 0} to {customers.total || 0} of {customers.total || 0} entries
                    </div>
                    
                    {/* Simple Pagination */}
                    {customers.last_page > 1 && (
                        <div className="flex space-x-2">
                            <button 
                                disabled={customers.current_page === 1}
                                className={`px-3 py-1 rounded border text-sm ${
                                    customers.current_page === 1 
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                        : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                                }`}
                            >
                                Previous
                            </button>
                            <button 
                                disabled={customers.current_page === customers.last_page}
                                className={`px-3 py-1 rounded border text-sm ${
                                    customers.current_page === customers.last_page 
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                        : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                                }`}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}