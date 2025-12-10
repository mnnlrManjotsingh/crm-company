import React from 'react';
import { Link, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reports Listing',
        href: '/reports',
    },
];

export default function ReportList() {
  
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reports" />
            <div className="p-6">
                {/* Header Section */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
                        {/* <Link 
                            href="/reports/create"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
                        >
                            Generate Report
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

                {/* Reports Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden border">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                                    ID
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                                    Company Name
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
                                    Remark
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                                    Quotation
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                                    Lead Type
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {/* {sampleReports.length > 0 ? (
                                sampleReports.map((report) => (
                                    <tr key={report.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 border">
                                            {report.id}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border">
                                            {report.company_name}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border">
                                            {report.city}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border">
                                            {report.address}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border">
                                            {report.phone_no}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border">
                                            {report.email}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border">
                                            {report.remark}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border">
                                            {report.quotation}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border">
                                            <span className={`px-2 py-1 rounded text-xs ${
                                                report.lead_type === 'Hot Lead' ? 'bg-red-100 text-red-800' :
                                                report.lead_type === 'Warm Lead' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-green-100 text-green-800'
                                            }`}>
                                                {report.lead_type}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : ( */}
                                <tr>
                                    <td colSpan={9} className="px-6 py-8 text-center text-gray-500 border">
                                        <div className="flex flex-col items-center justify-center">
                                            <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <p className="text-lg font-medium text-gray-600 mb-2">No reports available</p>
                                            <p className="text-gray-500 mb-4">There are no reports to display at the moment.</p>
                                        </div>
                                    </td>
                                </tr>
                            {/* )} */}
                        </tbody>
                    </table>
                </div>

                {/* Pagination and Summary */}
                <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                        {/* Showing {sampleReports.length} to {sampleReports.length} of {sampleReports.length} entries */}
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