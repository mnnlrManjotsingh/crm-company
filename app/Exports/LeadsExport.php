<?php

namespace App\Exports;

use App\Models\Lead;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class LeadsExport implements FromCollection, WithHeadings, WithMapping, WithStyles
{
    public function collection()
    {
        return Lead::all();
    }

    public function headings(): array
    {
        return [
            'ID',
            'Company Name',
            'City',
            'Address',
            'Phone Number',
            'Email',
            'Remark',
            'Quotation',
            'Lead Type',
            'Documentation',
            'Status',
            'Created At',
            'Updated At'
        ];
    }

    public function map($lead): array
    {
        return [
            $lead->id,
            $lead->company_name,
            $lead->city,
            $lead->address,
            $lead->phone_no,
            $lead->email,
            $lead->remark,
            $lead->quotation,
            ucfirst($lead->lead_type),
            ucfirst($lead->documentation),
            ucfirst($lead->status),
            $lead->created_at->format('Y-m-d H:i:s'),
            $lead->updated_at->format('Y-m-d H:i:s'),
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            // Style the first row as bold text
            1 => ['font' => ['bold' => true]],
            
            // Set auto-size for columns
            'A' => ['width' => 10],
            'B' => ['width' => 25],
            'C' => ['width' => 15],
            'D' => ['width' => 30],
            'E' => ['width' => 15],
            'F' => ['width' => 25],
            'G' => ['width' => 20],
            'H' => ['width' => 15],
            'I' => ['width' => 12],
            'J' => ['width' => 15],
            'K' => ['width' => 12],
            'L' => ['width' => 20],
            'M' => ['width' => 20],
        ];
    }
}