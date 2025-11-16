import React from 'react';
import { Link, Head, useForm } from '@inertiajs/react';
import leads from '@/routes/leads';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Plus, X } from 'lucide-react';

interface ProductItem {
    id: number;
    product: string;
    quantity: number;
}

interface Lead {
    id?: number;
    company_name: string;
    city: string;
    address: string;
    lead_type: string;
    documentation: string;
    products: ProductItem[];
    phone_no: string;
    email: string;
    reminder: string;
    quotation: string;
}

interface Props {
    mode: 'create' | 'edit';
    lead?: Lead;
}

export default function LeadCreateEdit({ mode, lead }: Props) {
    // Initialize products array - if editing, use existing products, otherwise start with one empty product
    const initialProducts = lead?.products && lead.products.length > 0 
        ? lead.products 
        : [{ id: Date.now(), product: '', quantity: 0 }];

    const { data, setData, post, put, processing, errors } = useForm({
        company_name: lead?.company_name || '',
        city: lead?.city || '',
        address: lead?.address || '',
        lead_type: lead?.lead_type || 'domestic',
        documentation: lead?.documentation || 'no',
        products: initialProducts,
        phone_no: lead?.phone_no || '',
        email: lead?.email || '',
        reminder: lead?.reminder || '',
        quotation: lead?.quotation || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (mode === 'create') {
            post(leads.store().url);
        } else {
            put(leads.edit(lead?.id || 0).url);
        }
    };

    // Add new product field
    const addProductField = () => {
        const newProducts = [
            ...data.products,
            { id: Date.now() + Math.random(), product: '', quantity: 0 }
        ];
        setData('products', newProducts);
    };

    // Remove product field
    const removeProductField = (index: number) => {
        if (data.products.length > 1) {
            const newProducts = data.products.filter((_, i) => i !== index);
            setData('products', newProducts);
        }
    };

    // Update product field
    const updateProductField = (index: number, field: keyof ProductItem, value: string | number) => {
        const newProducts = [...data.products];
        newProducts[index] = {
            ...newProducts[index],
            [field]: value
        };
        setData('products', newProducts);
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Leads',
            href: leads.index().url,
        },
        {
            title: mode === 'create' ? 'Create Lead' : 'Edit Lead',
            href: mode === 'create' ? leads.create().url : leads.edit(lead?.id || 0).url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={mode === 'create' ? 'Create Lead' : 'Edit Lead'} />
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">
                        {mode === 'create' ? 'Create New Lead' : 'Edit Lead'}
                    </h1>
                    <Link 
                        href={leads.index()} 
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                    >
                        Back to Leads
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Company Information */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Company Name:
                                </label>
                                <input
                                    type="text"
                                    value={data.company_name}
                                    onChange={e => setData('company_name', e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                                    required
                                />
                                {errors.company_name && (
                                    <div className="text-red-600 text-sm">{errors.company_name}</div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    City:
                                </label>
                                <input
                                    type="text"
                                    value={data.city}
                                    onChange={e => setData('city', e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                                    required
                                />
                                {errors.city && (
                                    <div className="text-red-600 text-sm">{errors.city}</div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Address:
                                </label>
                                <input
                                    type="text"
                                    value={data.address}
                                    onChange={e => setData('address', e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                                    required
                                />
                                {errors.address && (
                                    <div className="text-red-600 text-sm">{errors.address}</div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Lead Type:
                                </label>
                                <div className="mt-1 space-x-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            value="domestic"
                                            checked={data.lead_type === 'domestic'}
                                            onChange={e => setData('lead_type', e.target.value)}
                                            className="mr-2"
                                        />
                                        Domestic
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            value="international"
                                            checked={data.lead_type === 'international'}
                                            onChange={e => setData('lead_type', e.target.value)}
                                            className="mr-2"
                                        />
                                        International
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Phone No:
                                </label>
                                <input
                                    type="tel"
                                    value={data.phone_no}
                                    onChange={e => setData('phone_no', e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                                />
                                {errors.email && (
                                    <div className="text-red-600 text-sm">{errors.email}</div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Reminder:
                                </label>
                                <input
                                    type="date"
                                    value={data.reminder}
                                    onChange={e => setData('reminder', e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Quotation:
                                </label>
                                <input
                                    type="text"
                                    value={data.quotation}
                                    onChange={e => setData('quotation', e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Products Section */}
                    <div className="mt-6 border-t pt-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Products</h3>
                            <button
                                type="button"
                                onClick={addProductField}
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <Plus className="h-4 w-4 mr-1" />
                                Add Product
                            </button>
                        </div>

                        {data.products.map((product, index) => (
                            <div key={product.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border border-gray-200 rounded-lg relative">
                                {/* Remove button - only show if there's more than one product */}
                                {data.products.length > 1 && index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => removeProductField(index)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none transition-opacity duration-200"
                                        title="Remove product"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Product:
                                    </label>
                                    <select
                                        value={product.product}
                                        onChange={(e) => updateProductField(index, 'product', e.target.value)}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                                    >
                                        <option value="">Select Product</option>
                                        <option value="final-test-product">Final test product</option>
                                        <option value="new-medicine-1">New Medicine 1</option>
                                        
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Quantity:
                                    </label>
                                    <input
                                        type="number"
                                        value={product.quantity}
                                        onChange={(e) => updateProductField(index, 'quantity', parseInt(e.target.value) )}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                                        placeholder="Enter quantity"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Documentation */}
                    <div className="mt-6 border-t pt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-4">
                            Documentation:
                        </label>
                        <div className="space-x-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    value="yes"
                                    checked={data.documentation === 'yes'}
                                    onChange={e => setData('documentation', e.target.value)}
                                    className="mr-2"
                                />
                                Yes
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    value="no"
                                    checked={data.documentation === 'no'}
                                    onChange={e => setData('documentation', e.target.value)}
                                    className="mr-2"
                                />
                                No
                            </label>
                        </div>
                    </div>

                    

                    <div className="mt-6">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : mode === 'create' ? 'Create Lead' : 'Update Lead'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}