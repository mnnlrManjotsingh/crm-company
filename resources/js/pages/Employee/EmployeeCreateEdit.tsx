// resources/js/Pages/Employee/EmployeeCreateEdit.tsx
import React from 'react';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import employees from '@/routes/employees';
import { type BreadcrumbItem } from '@/types';

interface Employee {
    id?: number;
    name: string;
    email: string;
    mobile: string;
    password?: string;
    gender: string;
    address: string;
    city: string;
    about: string;
    role: string;
}

interface Props {
    employee?: Employee;
}

interface FormErrors {
    name?: string;
    email?: string;
    mobile?: string;
    password?: string;
    gender?: string;
    address?: string;
    city?: string;
    about?: string;
    role?: string;
    [key: string]: string | undefined;
}

interface PageProps {
    errors: FormErrors;
    flash?: {
        success?: string;
        error?: string;
    };
}

const EmployeeCreateEdit: React.FC<Props> = ({ employee }) => {
    const { errors, flash } = usePage().props as PageProps;
    const isEdit = !!employee;

    const { data, setData, post, put, processing, reset } = useForm({
        name: employee?.name || '',
        email: employee?.email || '',
        mobile: employee?.mobile || '',
        password: '',
        gender: employee?.gender || 'female',
        address: employee?.address || '',
        city: employee?.city || '',
        about: employee?.about || '',
        role: employee?.role || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Prepare form data - ensure empty strings instead of null
        const formData = {
            ...data,
            about: data.about || '',
            address: data.address || '',
            city: data.city || '',
        };

        // Remove password if empty in edit mode
        if (isEdit && !formData.password) {
            delete formData.password;
        }

        // console.log('Submitting data:', formData); // Debug log
        
        if (isEdit && employee?.id) {
            put(employees.update(employee.id).url, {
                data: formData, // Make sure to pass data
                onError: (errors) => {
                    console.log('Update errors:', errors); // Debug log
                },
                onFinish: () => {
                    reset('password'); // Clear password field after submission
                }
            });
        } else {
            post(employees.store().url, {
                data: formData,
                onError: (errors) => {
                    console.log('Create errors:', errors); // Debug log
                },
                onFinish: () => {
                    reset('password');
                }
            });
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: isEdit ? 'Edit Employee' : 'Create Employee',
            href: isEdit ? employees.edit(employee!.id!).url : employees.create().url,
        },
    ];
    return (
        <AppLayout  breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Edit Employee' : 'Create Employee'} />
            
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    {/* Flash Messages */}
                    {flash?.success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                            {flash.success}
                        </div>
                    )}
                    
                    {flash?.error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                            {flash.error}
                        </div>
                    )}

                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">
                            {isEdit ? `Edit Employee: ${employee.name}` : 'Add New Employee'}
                        </h1>
                        <p className="text-gray-600 mt-2">
                            {isEdit ? 'Update employee information' : 'Create a new employee account'}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
                        {/* Name */}
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Name *
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.name ? 'border-red-500' : 'border-gray-300'
                                }`}
                                required
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Email *
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                                required
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Mobile */}
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Mobile *
                            </label>
                            <input
                                type="text"
                                value={data.mobile}
                                onChange={(e) => setData('mobile', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.mobile ? 'border-red-500' : 'border-gray-300'
                                }`}
                                required
                            />
                            {errors.mobile && (
                                <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
                            )}
                        </div>

                        {/* Password */}
                        {!isEdit && (
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Password {!isEdit && '*'}
                            </label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.password ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder={isEdit ? 'Leave blank to keep current password' : ''}
                                required={!isEdit}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                            )}
                            
                        </div>
                        )}

                        {/* Gender */}
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Gender *
                            </label>
                            <div className="flex space-x-6">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="male"
                                        checked={data.gender === 'male'}
                                        onChange={(e) => setData('gender', e.target.value)}
                                        className="form-radio h-4 w-4 text-blue-600"
                                    />
                                    <span className="ml-2">Male</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        value="female"
                                        checked={data.gender === 'female'}
                                        onChange={(e) => setData('gender', e.target.value)}
                                        className="form-radio h-4 w-4 text-blue-600"
                                    />
                                    <span className="ml-2">Female</span>
                                </label>
                            </div>
                            {errors.gender && (
                                <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                            )}
                        </div>

                        {/* Address */}
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Address
                            </label>
                            <input
                                type="text"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.address ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Enter address"
                            />
                            {errors.address && (
                                <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                            )}
                        </div>

                        {/* City */}
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                City
                            </label>
                            <input
                                type="text"
                                value={data.city}
                                onChange={(e) => setData('city', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.city ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Enter city"
                            />
                            {errors.city && (
                                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                            )}
                        </div>

                        {/* About */}
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                About
                            </label>
                            <textarea
                                value={data.about}
                                onChange={(e) => setData('about', e.target.value)}
                                rows={3}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.about ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Tell us about the employee"
                            />
                            {errors.about && (
                                <p className="text-red-500 text-xs mt-1">{errors.about}</p>
                            )}
                        </div>

                        {/* Role */}
                        <div className="mb-8">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Role *
                            </label>
                            <input
                                type="text"
                                value={data.role}
                                onChange={(e) => setData('role', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.role ? 'border-red-500' : 'border-gray-300'
                                }`}
                                required
                                placeholder="e.g., Manager, Sales Executive"
                            />
                            {errors.role && (
                                <p className="text-red-500 text-xs mt-1">{errors.role}</p>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                            <Link
                                href={employees.index()}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {processing ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Saving...
                                    </span>
                                ) : (
                                    isEdit ? 'Update Employee' : 'Create Employee'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default EmployeeCreateEdit;