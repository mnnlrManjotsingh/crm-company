// resources/js/Pages/Employee/EmployeeList.tsx
import React, { useState, useEffect } from 'react';
import { Head, Link, usePage, router,useForm  } from '@inertiajs/react';
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

interface Lead {
    id: number;
    company_name: string;
    city: string;
    address: string;
    phone_no: string;
    email: string;
    remark: string;
    quotation: string;
    lead_type: string;
    documentation: string;
    status: string;
    employee_id: number | null;
}

interface Props {
    employees: {
        data: Employee[];
        current_page: number;
        last_page: number;
        total: number;
    };
    unassignedLeads?: Lead[];
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

const EmployeeList: React.FC<Props> = ({ employees: employeeData, unassignedLeads: initialUnassignedLeads = [] }) => {
    const { flash } = usePage().props as PageProps;
    const [isExporting, setIsExporting] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [unassignedLeads, setUnassignedLeads] = useState<Lead[]>(initialUnassignedLeads);
    const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
    const [isAssigning, setIsAssigning] = useState(false);

    const { post, processing, reset } = useForm({
        employee_id: null as number | null,
        lead_ids: [] as number[],
    });

    // Helper function to get CSRF token
    const getCsrfToken = () => {
        return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
    };

    // Fetch unassigned leads when modal opens
    useEffect(() => {
        if (showAssignModal && selectedEmployee) {
            fetchUnassignedLeads();
        }
    }, [showAssignModal, selectedEmployee]);

    const fetchUnassignedLeads = async () => {
        try {
            const response = await fetch('/employees/unassigned-leads');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setUnassignedLeads(data);
        } catch (error) {
            console.error('Error fetching unassigned leads:', error);
            setUnassignedLeads([]);
        }
    };

    const handleExportExcel = () => {
        setIsExporting(true);
        const link = document.createElement('a');
        link.href = '/employees/export/excel';
        link.download = 'employees.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsExporting(false);
    };

    const openAssignModal = (employee: Employee) => {
        setSelectedEmployee(employee);
        setSelectedLeads([]);
        setShowAssignModal(true);
    };

    const closeAssignModal = () => {
        setShowAssignModal(false);
        setSelectedEmployee(null);
        setSelectedLeads([]);
    };

    const handleLeadSelect = (leadId: number) => {
        setSelectedLeads(prev => 
            prev.includes(leadId) 
                ? prev.filter(id => id !== leadId)
                : [...prev, leadId]
        );
    };

    const handleAssignLeads = () => {
    if (!selectedEmployee || selectedLeads.length === 0) return;
    
    
    // Use Inertia's post method - it automatically handles CSRF
    router.post('/employees/assign-leads', {
        employee_id: selectedEmployee.id,
        lead_ids: selectedLeads,
    }, {
        preserveScroll: true,
        preserveState: true, // Change to true to preserve modal state
        onSuccess: (page) => {
            
            // Check for flash messages in the response
            const flash = page.props.flash;
            
            if (flash?.success) {
                alert('✅ ' + flash.success);
            } else if (flash?.error) {
                alert('❌ ' + flash.error);
                return; // Don't close modal on error
            }
            
            // Close modal
            closeAssignModal();
            
            // Clear selected leads
            setSelectedLeads([]);
            
            // Refresh unassigned leads
            fetchUnassignedLeads();
            
            // Force reload the page to show updated data
            router.reload({ preserveScroll: true });
        },
        onError: (errors) => {
            console.error('❌ Error assigning leads:', errors);
            
            // Show specific error message
            if (errors.message) {
                alert('❌ Error: ' + errors.message);
            } else if (errors.employee_id || errors.lead_ids) {
                alert('❌ Validation error: Please check your inputs');
            } else {
                alert('❌ Unknown error occurred');
            }
        },
    });
};

    const handleSelectAll = () => {
        if (selectedLeads.length === unassignedLeads.length) {
            setSelectedLeads([]);
        } else {
            setSelectedLeads(unassignedLeads.map(lead => lead.id));
        }
    };

     const handlePageChange = (page: number) => {
        if (page < 1 || page > employeeData.last_page) return;
        
        router.get('/employees', { page }, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    // Fix NaN calculations
    const currentPage = employeeData.current_page || 1;
    const total = employeeData.total || 0;
    const lastPage = employeeData.last_page || 1;
    const showingFrom = ((currentPage - 1) * 10) + 1;
    const showingTo = Math.min(currentPage * 10, total);

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Employee Listing" />
            
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
                        className={`flex items-center gap-2 px-3 py-2 rounded text-sm border border-gray-300 ${
                            isExporting 
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                : 'bg-gray-100 hover:bg-gray-200 cursor-pointer'
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
                                        <EmployeeRow 
                                            key={employee.id} 
                                            employee={employee}
                                            onAssignLeads={openAssignModal}
                                        />
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

                {/* Pagination - Fixed NaN calculations */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                    <div className="text-sm text-gray-700">
                        Showing <span className="font-medium">{showingFrom}</span> to <span className="font-medium">{showingTo}</span> of <span className="font-medium">{total}</span> results
                    </div>
                    
                    <div className="flex items-center space-x-1">
                        <button 
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Previous
                        </button>
                        
                        {getPageNumbers().map((page, index) => {
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
                                        currentPage === page 
                                            ? 'bg-blue-600 text-white border-blue-600' 
                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    {page}
                                </button>
                            );
                        })}
                        
                        <button 
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === lastPage}
                            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Assign Leads Modal */}
            {showAssignModal && selectedEmployee && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Assign Leads to {selectedEmployee.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Select leads to assign to this employee
                                    </p>
                                </div>
                                <button
                                    onClick={closeAssignModal}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="px-6 py-4 overflow-y-auto max-h-[60vh]">
                            {unassignedLeads.length > 0 ? (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={unassignedLeads.length > 0 && selectedLeads.length === unassignedLeads.length}
                                                onChange={handleSelectAll}
                                                className="h-4 w-4 text-blue-600 rounded"
                                            />
                                            <span className="ml-2 text-sm font-medium text-gray-700">
                                                Select All ({unassignedLeads.length} leads available)
                                            </span>
                                        </div>
                                        <span className="text-sm text-gray-500">
                                            {selectedLeads.length} selected
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {unassignedLeads.map(lead => (
                                            <div
                                                key={lead.id}
                                                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                                                    selectedLeads.includes(lead.id)
                                                        ? 'border-blue-500 bg-blue-50'
                                                        : 'border-gray-200 hover:bg-gray-50'
                                                }`}
                                                onClick={() => handleLeadSelect(lead.id)}
                                            >
                                                <div className="flex items-start">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedLeads.includes(lead.id)}
                                                        onChange={() => handleLeadSelect(lead.id)}
                                                        className="h-4 w-4 mt-1 text-blue-600 rounded"
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                    <div className="ml-3">
                                                        <div className="flex items-center justify-between">
                                                            <h4 className="font-medium text-gray-900">
                                                                {lead.company_name}
                                                            </h4>
                                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                                lead.lead_type === 'Domestic'
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : 'bg-blue-100 text-blue-800'
                                                            }`}>
                                                                {lead.lead_type}
                                                            </span>
                                                        </div>
                                                        <div className="mt-2 text-sm text-gray-600 space-y-1">
                                                            <div className="flex items-center">
                                                                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                </svg>
                                                                {lead.city}
                                                            </div>
                                                            <div className="flex items-center">
                                                                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                                </svg>
                                                                {lead.phone_no || 'No phone'}
                                                            </div>
                                                            <div className="flex items-center">
                                                                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                                </svg>
                                                                {lead.email || 'No email'}
                                                            </div>
                                                        </div>
                                                        {lead.remark && (
                                                            <p className="mt-2 text-sm text-gray-500">
                                                                <span className="font-medium">Remark:</span> {lead.remark}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <h3 className="mt-4 text-lg font-medium text-gray-900">No unassigned leads</h3>
                                    <p className="mt-2 text-gray-500">
                                        All leads are currently assigned to employees.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                            <div className="flex items-center justify-between">
                                <button
                                    type="button"
                                    onClick={closeAssignModal}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Cancel
                                </button>
                                <button
        type="button"
        onClick={handleAssignLeads}
        disabled={selectedLeads.length === 0 || processing}
        className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            selectedLeads.length === 0 || processing
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
        }`}
    >
        {processing ? (
            <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Assigning...
            </span>
        ) : (
            `Assign ${selectedLeads.length} Lead${selectedLeads.length !== 1 ? 's' : ''}`
        )}
    </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
};

// Employee Row Component
const EmployeeRow: React.FC<{ 
    employee: Employee;
    onAssignLeads: (employee: Employee) => void;
}> = ({ employee, onAssignLeads }) => {
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
                        <div className="text-sm font-medium text-gray-900">
                            {employee.name}
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
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium relative text-center">
                <div className="flex justify-center space-x-2">
                    <Link
                        href={employees.edit(employee.id)}
                        className="text-orange-600 hover:text-orange-900 bg-orange-50 hover:bg-orange-100 px-2 py-1 rounded-lg text-sm font-medium transition-colors duration-150"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </Link>
                    <button 
                        onClick={() => onAssignLeads(employee)}
                        className="text-blue-600 hover:text-blue-900 bg-blue-50 rounded-lg px-3 py-1 text-sm font-medium hover:bg-gray-100 flex items-center transition-colors duration-150"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Assign Leads
                    </button>
                     <Link
                        href={employees.report(employee.id)}
                        className="text-blue-600 hover:text-blue-900 bg-blue-50 rounded-lg px-3 py-1 text-sm font-medium hover:bg-gray-100 flex items-center transition-colors duration-150"
                        title="View Report"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        View Report
                    </Link>
                </div>
            </td>
        </tr>
    );
};

export default EmployeeList;