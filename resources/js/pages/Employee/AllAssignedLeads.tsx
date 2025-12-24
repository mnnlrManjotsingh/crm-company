// pages/employee/AllAssignedLeads.tsx
import React, { useState, useEffect } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Lead, Employee, LeadResponse, Statistics, Filters } from '@/types/lead';

interface PageProps {
  leads: LeadResponse;
  employees: Employee[];
  filters: Filters;
  statistics: Statistics;
  flash?: {
    success?: string;
    error?: string;
  };
}

const AllAssignedLeads: React.FC = () => {
  const { leads, employees, filters, statistics, flash } = usePage<PageProps>().props;
  
  const [search, setSearch] = useState(filters.search || '');
  const [employeeId, setEmployeeId] = useState(filters.employee_id || '');
  const [status, setStatus] = useState(filters.status || '');
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
    {
      title: 'All Assigned Leads',
      href: '/employee/all-assigned-leads',
    },
  ];

  // Apply filters with debounce for search
  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      router.get('/employee/all-assigned-leads', {
        search,
        employee_id: employeeId,
        status,
      }, {
        preserveState: true,
        replace: true,
      });
    }, 500);

    setSearchTimeout(timeout as NodeJS.Timeout);

    return () => {
      if (searchTimeout) clearTimeout(searchTimeout);
    };
  }, [search, employeeId, status]);

  const handleExport = () => {
    const params = new URLSearchParams({
      search,
      employee_id: employeeId,
      status,
    });
    window.open(`/employee/all-assigned-leads/export?${params}`, '_blank');
  };

  const getInitials = (name: string): string => {
    if (!name) return '';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getStatusClass = (status: string): string => {
    const classes: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      converted: 'bg-purple-100 text-purple-800',
    };
    return classes[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleConvertToCustomer = (lead: Lead) => {
    if (confirm(`Convert lead "${lead.name || lead.company_name}" to customer?`)) {
      router.post(`/leads/${lead.id}/convert`);
    }
  };

  const handleReassign = (lead: Lead) => {
    const newEmployeeId = prompt(`Reassign lead #${lead.id} to which employee? Enter employee ID:`);
    if (newEmployeeId) {
      router.put(`/leads/${lead.id}/reassign`, { employee_id: newEmployeeId });
    }
  };



  // Fix pagination link click handler
  const handlePageClick = (url: string | null) => {
    if (!url) return;
    
    router.get(url, {}, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  // Calculate page numbers for better pagination display
  const getPageNumbers = () => {
    const pages = [];
    const currentPage = leads.current_page;
    const lastPage = leads.last_page;
    const maxVisiblePages = 5;

    if (lastPage <= maxVisiblePages) {
      // Show all pages
      for (let i = 1; i <= lastPage; i++) {
        pages.push(i);
      }
    } else {
      // Calculate range
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(lastPage, currentPage + 2);

      // Adjust if at start
      if (currentPage <= 3) {
        end = Math.min(maxVisiblePages, lastPage);
      }

      // Adjust if at end
      if (currentPage >= lastPage - 2) {
        start = Math.max(lastPage - maxVisiblePages + 1, 1);
      }

      // Add first page and ellipsis if needed
      if (start > 1) {
        pages.push(1);
        if (start > 2) {
          pages.push('...');
        }
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add last page and ellipsis if needed
      if (end < lastPage) {
        if (end < lastPage - 1) {
          pages.push('...');
        }
        pages.push(lastPage);
      }
    }

    return pages;
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="All Assigned Leads" />
      
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

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">All Assigned Leads</h1>
          <p className="text-gray-600 mt-2">
            View all leads assigned to all employees in one place
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Total Employees */}
          <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold text-gray-900">{statistics.total_employees}</p>
              </div>
            </div>
          </div>
          
          {/* Total Assigned Leads */}
          <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Assigned Leads</p>
                <p className="text-2xl font-bold text-gray-900">{statistics.total_assigned}</p>
              </div>
            </div>
          </div>
          
          {/* Pending Leads */}
          {/* <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{statistics.pending_leads}</p>
              </div>
            </div>
          </div> */}
          
          {/* Converted to Customers */}
          {/* <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Converted to Customers</p>
                <p className="text-2xl font-bold text-gray-900">{statistics.converted_leads}</p>
              </div>
            </div>
          </div> */}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-end">
            {/* Search */}
            {/* <div className="flex-1 min-w-[250px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, email, phone, company..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute left-3 top-2.5">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div> */}
            
            {/* Employee Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Employee</label>
              <select
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 min-w-[200px]"
              >
                <option value="">All Employees</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} ({emp.email})
                  </option>
                ))}
              </select>
            </div>
            
            {/* Status Filter */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="rejected">Rejected</option>
                <option value="converted">Converted</option>
              </select>
            </div> */}
            
            {/* Export Button */}
            {/* <div>
              <button
                onClick={handleExport}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Export to Excel
              </button>
            </div> */}
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lead ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lead Name/Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned Employee
                  </th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th> */}
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Converted
                  </th> */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned Date
                  </th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th> */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leads.data && leads.data.length > 0 ? (
                  leads.data.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      {/* Lead ID */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{lead.id}
                      </td>
                      
                      {/* Lead Name/Company */}
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {lead.name || lead.company_name || 'N/A'}
                        </div>
                        {lead.company_name && lead.name && (
                          <div className="text-sm text-gray-500">
                            {lead.company_name}
                          </div>
                        )}
                      </td>
                      
                      {/* Contact Info */}
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{lead.email || 'N/A'}</div>
                        <div className="text-sm text-gray-500">{lead.phone_no || 'N/A'}</div>
                      </td>
                      
                      {/* Assigned Employee */}
                      <td className="px-6 py-4">
                        {lead.employee ? (
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-blue-600 text-xs font-medium">
                                {getInitials(lead.employee.name)}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {lead.employee.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {lead.employee.email}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-gray-400 text-sm">Not Assigned</div>
                        )}
                      </td>
                      
                      {/* Status */}
                      {/* <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusClass(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td> */}
                      
                      {/* Converted */}
                      {/* <td className="px-6 py-4 whitespace-nowrap">
                        {lead.is_converted ? (
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-green-700 text-sm">Yes</span>
                            {lead.customer_id && (
                              <div className="ml-2">
                                <Link
                                  href={`/customers/${lead.customer_id}/edit`}
                                  className="text-xs text-blue-600 hover:text-blue-900"
                                >
                                  View Customer
                                </Link>
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">No</span>
                        )}
                      </td> */}
                      
                      {/* Assigned Date */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(lead.updated_at)}
                      </td>
                      
                      {/* Actions */}
                      {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <Link
                          href={`/leads/${lead.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </Link>
                        {!lead.is_converted && lead.status === 'confirmed' && (
                          <button
                            onClick={() => handleConvertToCustomer(lead)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Convert
                          </button>
                        )}
                        <button
                          onClick={() => handleReassign(lead)}
                          className="text-purple-600 hover:text-purple-900"
                        >
                          Reassign
                        </button>
                      </td> */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No assigned leads found</h3>
                        <p className="text-gray-500 mb-4">
                          Start by assigning leads to employees from the employee management page.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
           {leads.data && leads.data.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="text-sm text-gray-700">
                  Showing {leads.from} to {leads.to} of {leads.total} leads
                </div>
                
                <nav className="flex items-center space-x-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => leads.current_page > 1 && handlePageClick(leads.links[0].url)}
                    disabled={leads.current_page === 1}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      leads.current_page === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Previous
                  </button>
                  
                  {/* Page Numbers */}
                  {getPageNumbers().map((page, index) => {
                    if (page === '...') {
                      return (
                        <span key={`ellipsis-${index}`} className="px-3 py-1 text-sm text-gray-700">
                          ...
                        </span>
                      );
                    }
                    
                    const isCurrent = page === leads.current_page;
                    const pageUrl = leads.links.find(link => 
                      link.label === page.toString() && link.url
                    )?.url || `?page=${page}`;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => !isCurrent && handlePageClick(pageUrl)}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          isCurrent
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  
                  {/* Next Button */}
                  <button
                    onClick={() => leads.current_page < leads.last_page && handlePageClick(leads.links[leads.links.length - 1].url)}
                    disabled={leads.current_page === leads.last_page}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      leads.current_page === leads.last_page
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Next
                  </button>
                </nav>
                
                
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default AllAssignedLeads;