// resources/js/Pages/Employee/EmployeeReport.tsx
import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import employees from '@/routes/employees';
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
    created_at: string;
    employee: {
        id: number;
        name: string;
    };
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
}

const EmployeeReport: React.FC<Props> = ({ employee, leads }) => {
    const { flash } = usePage().props as PageProps;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Employee Listing',
            href: employees.index(),
        },
        {
            title: `Report: ${employee.name}`,
            href: employees.report(employee.id),
        },
    ];

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'confirmed':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Employee Report: ${employee.name}`} />
            
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
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-blue-600 font-medium text-lg">
                                        {employee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Employee Report</h1>
                                    <div className="flex items-center space-x-4 mt-2">
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Name:</span> {employee.name}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Role:</span> {employee.role}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Email:</span> {employee.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <Link
                                href={employees.index()}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-50 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-200 transition ease-in-out duration-150"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Employees
                            </Link>
                            {/* <button
                                onClick={() => window.print()}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs text-white bg-blue-600 uppercase tracking-widest hover:bg-blue-700 focus:outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-300 transition ease-in-out duration-150"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                </svg>
                                Print Report
                            </button> */}
                        </div>
                    </div>
                    
                    {/* Summary Stats */}
                    {/* <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Leads</p>
                                    <p className="text-2xl font-semibold text-gray-900">{leads.total}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Confirmed</p>
                                    <p className="text-2xl font-semibold text-gray-900">
                                        {leads.data.filter(lead => lead.status.toLowerCase() === 'confirmed').length}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-yellow-100 p-3 rounded-lg">
                                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Pending</p>
                                    <p className="text-2xl font-semibold text-gray-900">
                                        {leads.data.filter(lead => lead.status.toLowerCase() === 'pending').length}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-red-100 p-3 rounded-lg">
                                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Rejected</p>
                                    <p className="text-2xl font-semibold text-gray-900">
                                        {leads.data.filter(lead => lead.status.toLowerCase() === 'rejected').length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>

                {/* Leads Table */}
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
                                        Phone No
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        City
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Address
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Remark
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Lead Type
                                    </th>
                                    {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th> */}
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Client Added
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {leads.data && leads.data.length > 0 ? (
                                    leads.data.map((lead) => (
                                        <tr key={lead.id} className="hover:bg-gray-50 transition-colors duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                #{lead.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {lead.company_name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {lead.phone_no || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {lead.city}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs truncate">
                                                {lead.address}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {lead.email || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs truncate">
                                                {lead.remark || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full ${
                                                    lead.lead_type === 'Domestic'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-blue-100 text-blue-800'
                                                }`}>
                                                    {lead.lead_type}
                                                </span>
                                            </td>
                                            {/* <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(lead.status)}`}>
                                                    {lead.status}
                                                </span>
                                            </td> */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(lead.created_at)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={10} className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                <h3 className="text-lg font-medium text-gray-900 mb-2">No leads assigned</h3>
                                                <p className="text-gray-500 mb-4">
                                                    This employee doesn't have any assigned leads yet.
                                                </p>
                                                <Link
                                                    href={employees.index()}
                                                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-300 transition ease-in-out duration-150"
                                                >
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                                    </svg>
                                                    Back to Employees
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {leads.data && leads.data.length > 0 && (
                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                        <div className="text-sm text-gray-700">
                            Showing <span className="font-medium">{leads.from}</span> to <span className="font-medium">{leads.to}</span> of <span className="font-medium">{leads.total}</span> results
                        </div>
                        
                        <div className="flex items-center space-x-1">
                            <Link
                                href={employees.report(employee.id, { page: leads.current_page - 1 })}
                                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                    leads.current_page === 1
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                }`}
                                onClick={(e) => leads.current_page === 1 && e.preventDefault()}
                            >
                                Previous
                            </Link>
                            
                            {[...Array(leads.last_page)].map((_, index) => (
                                <Link
                                    key={index + 1}
                                    href={employees.report(employee.id, { page: index + 1 })}
                                    className={`px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                                        leads.current_page === index + 1
                                            ? 'bg-blue-600 text-white border-blue-600'
                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    {index + 1}
                                </Link>
                            ))}
                            
                            <Link
                                href={employees.report(employee.id, { page: leads.current_page + 1 })}
                                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                    leads.current_page === leads.last_page
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                }`}
                                onClick={(e) => leads.current_page === leads.last_page && e.preventDefault()}
                            >
                                Next
                            </Link>
                        </div>
                    </div>
                )}

                {/* Print Styles (hidden on screen) */}
                <style>
                    {`
                        @media print {
                            nav, .no-print {
                                display: none !important;
                            }
                            .container {
                                padding: 0 !important;
                            }
                            table {
                                font-size: 12px !important;
                            }
                            .px-6 {
                                padding-left: 8px !important;
                                padding-right: 8px !important;
                            }
                            .py-4 {
                                padding-top: 4px !important;
                                padding-bottom: 4px !important;
                            }
                        }
                    `}
                </style>
            </div>
        </AppLayout>
    );
};

export default EmployeeReport;