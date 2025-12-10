import React from 'react';
import { Link, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Lost Product Listing',
        href: '/lost-products',
    },
];

export default function LostProductList() {
    // Sample data for demonstration
    // const sampleLostProducts = [
    //     {
    //         id: 1,
    //         product_name: 'Laptop Dell XPS 13',
    //         last_purchased_date: '2024-01-10',
    //         last_purchased_by: 'John Doe'
    //     },
    //     {
    //         id: 2,
    //         product_name: 'iPhone 15 Pro',
    //         last_purchased_date: '2024-01-12',
    //         last_purchased_by: 'Jane Smith'
    //     },
    //     {
    //         id: 3,
    //         product_name: 'Samsung Galaxy Tab S9',
    //         last_purchased_date: '2024-01-15',
    //         last_purchased_by: 'Mike Johnson'
    //     },
    //     {
    //         id: 4,
    //         product_name: 'MacBook Pro 16"',
    //         last_purchased_date: '2024-01-18',
    //         last_purchased_by: 'Sarah Wilson'
    //     },
    //     {
    //         id: 5,
    //         product_name: 'iPad Air 5th Gen',
    //         last_purchased_date: '2024-01-20',
    //         last_purchased_by: 'Robert Brown'
    //     },
    //     {
    //         id: 6,
    //         product_name: 'Microsoft Surface Pro 9',
    //         last_purchased_date: '2024-01-22',
    //         last_purchased_by: 'Emily Davis'
    //     }
    // ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lost Products" />
            <div className="p-6">
                {/* Header Section */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-gray-800">Lost Products</h1>
                            {/* <Link 
                                href="/lost-products/create"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
                            >
                                Report Lost Product
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

                {/* Lost Products Table with Proper Scroll */}
                <div className="bg-white rounded-lg shadow border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                                        ID
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                                        Product Name
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                                        Last Purchased Date
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                                        Last Purchased By
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {/* {sampleLostProducts.length > 0 ? (
                                    sampleLostProducts.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 border">
                                                {product.id}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border">
                                                {product.product_name}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border">
                                                {new Date(product.last_purchased_date).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border">
                                                <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                                                    {product.last_purchased_by}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium space-x-2 border">
                                                <Link 
                                                    href={`/lost-products/${product.id}/edit`} 
                                                    className="text-blue-600 hover:text-blue-900 hover:underline"
                                                >
                                                    Edit
                                                </Link>
                                                <Link 
                                                    href={`/lost-products/${product.id}`} 
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
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500 border">
                                            <div className="flex flex-col items-center justify-center">
                                                <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                <p className="text-lg font-medium text-gray-600 mb-2">No lost products found</p>
                                                <p className="text-gray-500 mb-4">Report a lost product to get started</p>
                                                {/* <Link 
                                                    href="/lost-products/create" 
                                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
                                                >
                                                    Report Lost Product
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
                        {/* Showing {sampleLostProducts.length} to {sampleLostProducts.length} of {sampleLostProducts.length} entries */}
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