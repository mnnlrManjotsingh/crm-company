// resources/js/Pages/Employee/EmployeeList.tsx
import React, { useState } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import employees from '@/routes/employees';
import { type BreadcrumbItem } from '@/types';

interface Employee {
    id: number;
    name: string;
    email: string;
    mobile: string;
    gender: string;
    address: string;
    city: string;
    about: string;
    role: string;
}

interface Props {
    employees: {
        data: Employee[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

interface PageProps {
    flash?: {
        success?: string;
        error?: string;
    };
}
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Employee Listing',
        href: employees.store().url,
    },
];



const EmployeeList: React.FC<Props> = ({ employees: employeeData }) => {
    const { flash } = usePage().props as PageProps;
    const [isExporting, setIsExporting] = useState(false);

    const handleExportExcel = () => {
        setIsExporting(true);
        
        // Create a hidden link to trigger download
        const link = document.createElement('a');
        link.href = '/employees/export/excel';
        link.download = 'employees.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setIsExporting(false);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Employee Listing" />
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Success Message */}
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

                {/* Error Message */}
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
                            <h1 className="text-2xl font-bold text-gray-900">Employee Management</h1>
                            <p className="mt-1 text-sm text-gray-600">
                                Manage your team members and their details
                            </p>
                        </div>
                        <Link
                            href={employees.create()}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-300 transition ease-in-out duration-150"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Employee
                        </Link>
                    </div>
                </div>

                {/* Export Buttons */}
                <div className="mb-6 flex space-x-3">
                     <button 
                        onClick={handleExportExcel}
                        disabled={isExporting}
                        className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest transition ease-in-out duration-150 ${
                            isExporting 
                                ? 'bg-green-400 cursor-not-allowed' 
                                : 'bg-green-600 hover:bg-green-700 active:bg-green-800 focus:outline-none focus:border-green-800 focus:ring-2 focus:ring-green-300'
                        }`}
                    >
                        {isExporting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Exporting...
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Export Excel
                            </>
                        )}
                    </button>
               
                    
                </div>

                {/* Employee Table */}
                <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Mobile
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    
                                    <th scope="col" className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                  {employeeData.data && employeeData.data.length > 0 ? (
                                    employeeData.data.map((employee) => (
                                        <EmployeeRow key={employee.id} employee={employee} />
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                                </svg>
                                                <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
                                                <p className="text-gray-500 mb-4">Get started by adding your first employee to the system.</p>
                                                
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                    <div className="text-sm text-gray-700">
                        Showing <span className="font-medium">{((employeeData.current_page - 1) * 10) + 1}</span> to <span className="font-medium">{Math.min(employeeData.current_page * 10, employeeData.total)}</span> of <span className="font-medium">{employeeData.total}</span> results
                    </div>
                    
                    <div className="flex items-center space-x-1">
                        <button 
                            disabled={employeeData.current_page === 1}
                            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Previous
                        </button>
                        
                        {[...Array(employeeData.last_page)].map((_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => {/* Add page change logic */}}
                                className={`px-3 py-2 text-sm font-medium border rounded-lg transition-colors ${
                                    employeeData.current_page === index + 1 
                                        ? 'bg-blue-600 text-white border-blue-600' 
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        
                        <button 
                            disabled={employeeData.current_page === employeeData.last_page}
                            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

// Employee Row Component
const EmployeeRow: React.FC<{ employee: Employee }> = ({ employee }) => {
    const [showActions, setShowActions] = useState(false);

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this employee?')) {
            router.delete(employees.destroy(employee.id));
        }
    };

    return (
        <tr className="hover:bg-gray-50 transition-colors duration-150">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                #{employee.id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium text-sm">
                            {employee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 flex items-center">
                            {employee.name}
                            {employee.name.includes('(ERROR)') && (
                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                    Error
                                </span>
                            )}
                        </div>
                        <div className="text-sm text-gray-500 capitalize">{employee.gender}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {employee.mobile}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {employee.email}
                </div>
            </td>
          
            <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium relative text-center">
                <div className="flex justify-center space-x-2">
                    <Link
                        href={employees.edit(employee.id)}
                        className="text-orange-600 hover:text-orange-900 bg-orange-50 hover:bg-orange-100 px-2 py-1 mt-1     rounded-lg text-sm font-medium transition-colors duration-150"
                    >
                        <svg className=" h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        {/* Edit */}
                    </Link>
                    {/* <button 
                        onClick={handleDelete}
                        className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-150"
                    >
                        Delete
                    </button> */}
                    <button className="text-blue-600 hover:text-blue-900 bg-blue-50 rounded-lg w-full text-left px-1 py-2 text-sm  hover:bg-gray-100 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Assign Leads
                    </button>
                        <button className="w-full text-left px-1 py-2 text-sm text-blue-600 hover:text-blue-900 bg-blue-50 rounded-lg hover:bg-gray-100 flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            View Report
                        </button>
                    
                    {/* <button className="w-full text-left px-1 py-2 text-sm text-blue-600 hover:text-blue-900 bg-blue-50 rounded-lg hover:bg-gray-100 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        View Notes
                    </button> */}
                    {/* <button className="w-full text-left px-1 py-2 text-sm text-blue-600 hover:text-blue-900 bg-blue-50 rounded-lg hover:bg-gray-100 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                        Assign to Other
                    </button> */}
                    
                </div>
            </td>
        </tr>
    );
};

export default EmployeeList;