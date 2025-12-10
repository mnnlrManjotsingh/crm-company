import React from 'react';
import { Link, Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

interface Customer {
    id?: number;
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
    mode: 'create' | 'edit';
    customer?: Customer;
}

export default function CustomerCreateEdit({ mode, customer }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        customer_name: customer?.customer_name || '',
        city: customer?.city || '',
        address: customer?.address || '',
        phone_no: customer?.phone_no || '',
        email: customer?.email || '',
        reminder: customer?.reminder || '',
        quotation: customer?.quotation || '',
        status: customer?.status || 'active',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (mode === 'create') {
            post('/customers');
        } else {
            put(`/customers/${customer?.id}`);
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Customers',
            href: '/customers',
        },
        {
            title: mode === 'create' ? 'Add Customer' : 'Edit Customer',
            href: mode === 'create' ? '/customers/create' : `/customers/${customer?.id}/edit`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={mode === 'create' ? 'Add Customer' : 'Edit Customer'} />
            <div className="p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow border">
                        <div className="px-6 py-4 border-b">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {mode === 'create' ? 'Add New Customer' : 'Edit Customer'}
                            </h2>
                        </div>
                        
                        <form onSubmit={submit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Customer Name */}
                                <div>
                                    <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Customer Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="customer_name"
                                        value={data.customer_name}
                                        onChange={e => setData('customer_name', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter customer name"
                                    />
                                    {errors.customer_name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.customer_name}</p>
                                    )}
                                </div>

                                {/* City */}
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                                        City *
                                    </label>
                                    <input
                                        type="text"
                                        id="city"
                                        value={data.city}
                                        onChange={e => setData('city', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter city"
                                    />
                                    {errors.city && (
                                        <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                                    )}
                                </div>

                                {/* Address */}
                                <div className="md:col-span-2">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                                        Address *
                                    </label>
                                    <textarea
                                        id="address"
                                        value={data.address}
                                        onChange={e => setData('address', e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter full address"
                                    />
                                    {errors.address && (
                                        <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                                    )}
                                </div>

                                {/* Phone No */}
                                <div>
                                    <label htmlFor="phone_no" className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone No
                                    </label>
                                    <input
                                        type="text"
                                        id="phone_no"
                                        value={data.phone_no}
                                        onChange={e => setData('phone_no', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter phone number"
                                    />
                                    {errors.phone_no && (
                                        <p className="mt-1 text-sm text-red-600">{errors.phone_no}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter email address"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                    )}
                                </div>

                                {/* Reminder */}
                                <div>
                                    <label htmlFor="reminder" className="block text-sm font-medium text-gray-700 mb-2">
                                        Reminder
                                    </label>
                                    <input
                                        type="date"
                                        id="reminder"
                                        value={data.reminder}
                                        onChange={e => setData('reminder', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">mm/dd/yyyy</p>
                                    {errors.reminder && (
                                        <p className="mt-1 text-sm text-red-600">{errors.reminder}</p>
                                    )}
                                </div>

                                {/* Quotation */}
                                <div>
                                    <label htmlFor="quotation" className="block text-sm font-medium text-gray-700 mb-2">
                                        Quotation
                                    </label>
                                    <input
                                        type="text"
                                        id="quotation"
                                        value={data.quotation}
                                        onChange={e => setData('quotation', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter quotation details"
                                    />
                                    {errors.quotation && (
                                        <p className="mt-1 text-sm text-red-600">{errors.quotation}</p>
                                    )}
                                </div>

                                {/* Status (only for edit mode) */}
                                {mode === 'edit' && (
                                    <div className="md:col-span-2">
                                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                                            Status *
                                        </label>
                                        <select
                                            id="status"
                                            value={data.status}
                                            onChange={e => setData('status', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                        {errors.status && (
                                            <p className="mt-1 text-sm text-red-600">{errors.status}</p>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Form Actions */}
                            <div className="flex justify-end space-x-3 pt-6 border-t">
                                <Link
                                    href="/customers"
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                >
                                    {processing ? 'Saving...' : mode === 'create' ? 'Create Customer' : 'Update Customer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}