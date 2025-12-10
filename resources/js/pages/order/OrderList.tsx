import React from 'react';
import { Link, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Orders Listing',
        href: '/orders',
    },
];

export default function OrderList() {
    // Sample data for demonstration
    // const sampleOrders = [
    //     {
    //         id: 1,
    //         customer_name: 'John Doe',
    //         order_no: 'ORD-2024-001',
    //         phone_no: '+1 234-567-8900',
    //         address: '123 Main Street, New York',
    //         email: 'john.doe@email.com',
    //         order_date: '2024-01-15',
    //         order_detail: 'Product A, Product B',
    //         status: 'Completed'
    //     },
      
    // ];

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            'Completed': { class: 'bg-green-100 text-green-800', label: 'Completed' },
            'Pending': { class: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
            'Processing': { class: 'bg-blue-100 text-blue-800', label: 'Processing' },
            'Shipped': { class: 'bg-purple-100 text-purple-800', label: 'Shipped' },
            'Cancelled': { class: 'bg-red-100 text-red-800', label: 'Cancelled' }
        };
        
        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.Pending;
        
        return (
            <span className={`px-2 py-1 rounded text-xs font-medium ${config.class}`}>
                {config.label}
            </span>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Orders" />
            <div className="p-6">
                {/* Header Section */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
                        {/* <Link 
                            href="/orders/create"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
                        >
                            Create Order
                        </Link> */}
                    </div>
                </div>

                {/* Export Button */}
                <div className="flex flex-wrap gap-4 justify-between items-center mb-6 p-4">
                    <div className="flex gap-2 flex-wrap">
                        <button className="flex items-center gap-2 px-3 py-2 rounded text-sm border border-gray-300 bg-gray-100 hover:bg-gray-200 cursor-pointer">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Export CSV
                        </button>
                    </div>
                </div>

                {/* Orders Table with Proper Scroll */}
                <div className="bg-white rounded-lg shadow border overflow-hidden">
                    <div className="overflow-x-auto"> {/* Horizontal scroll container */}
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
                                        Order No
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                                        Phone No
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                                        Address
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                                        Email
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                                        Order Date
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                                        Order Detail
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
                                {/* {sampleOrders.length > 0 ? (
                                    sampleOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 border">
                                                {order.id}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border">
                                                {order.customer_name}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600 border">
                                                {order.order_no}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border">
                                                {order.phone_no}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border">
                                                {order.address}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border">
                                                {order.email}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border">
                                                {new Date(order.order_date).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border">
                                                {order.order_detail}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border">
                                                {getStatusBadge(order.status)}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium space-x-2 border">
                                                <Link 
                                                    href={`/orders/${order.id}/edit`} 
                                                    className="text-blue-600 hover:text-blue-900 hover:underline"
                                                >
                                                    Edit
                                                </Link>
                                                <Link 
                                                    href={`/orders/${order.id}`} 
                                                    className="text-green-600 hover:text-green-900 hover:underline"
                                                >
                                                    View
                                                </Link>
                                                <button 
                                                    className="text-red-600 hover:text-red-900 hover:underline"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : ( */}
                                    <tr>
                                        <td colSpan={10} className="px-6 py-8 text-center text-gray-500 border">
                                            <div className="flex flex-col items-center justify-center">
                                                <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                <p className="text-lg font-medium text-gray-600 mb-2">No orders found</p>
                                                <p className="text-gray-500 mb-4">Get started by creating your first order</p>
                                                {/* <Link 
                                                    href="/orders/create" 
                                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
                                                >
                                                    Create Your First Order
                                                </Link> */}
                                            </div>
                                        </td>
                                    </tr>
                                {/* )} */}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination and Summary */}
                <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                        {/* Showing {sampleOrders.length} to {sampleOrders.length} of {sampleOrders.length} entries */}
                    </div>
                    
                    {/* Simple Pagination */}
                    <div className="flex space-x-2">
                        <button className="px-3 py-1 rounded border text-sm bg-gray-100 text-gray-400 cursor-not-allowed">
                            Previous
                        </button>
                        <button className="px-3 py-1 rounded border text-sm bg-gray-100 text-gray-400 cursor-not-allowed">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}