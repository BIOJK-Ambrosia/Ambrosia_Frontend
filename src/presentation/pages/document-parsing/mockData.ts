import type { ConfidenceLevel } from '@/shared/types/recommendation';

export interface ExtractionField {
  id: string;
  label: string;
  value: string;
  confidence: ConfidenceLevel;
  percentage: number;
  fullWidth?: boolean;
  hint?: string;
}

export const EXTRACTION_FIELDS_BY_DOC: Record<string, ExtractionField[]> = {
  'doc-1': [
    { id: 'vendor-name', label: 'Nama Vendor', value: 'PT. Agro Industri Mandiri', confidence: 'high', percentage: 98 },
    {
      id: 'price',
      label: 'Harga IDR/kg',
      value: '12,450.00',
      confidence: 'low',
      percentage: 42,
      hint: 'Verify digit',
    },
    { id: 'lead-time', label: 'Lead Time', value: '14 Hari Kerja', confidence: 'medium', percentage: 76 },
    { id: 'validity', label: 'Masa Berlaku', value: '30 September 2024', confidence: 'high', percentage: 94 },
    {
      id: 'payment-terms',
      label: 'Syarat Pembayaran',
      value: 'Net 30 setelah barang diterima & inspeksi QC selesai',
      confidence: 'medium',
      percentage: 81,
      fullWidth: true,
    },
  ],
  'doc-2': [
    { id: 'vendor-name', label: 'Nama Vendor', value: 'PT. Sumatera Steel Jaya', confidence: 'high', percentage: 95 },
    { id: 'price', label: 'Harga IDR/kg', value: '9,800.00', confidence: 'medium', percentage: 70 },
    { id: 'lead-time', label: 'Lead Time', value: '21 Hari Kerja', confidence: 'high', percentage: 90 },
    { id: 'validity', label: 'Masa Berlaku', value: '15 Oktober 2024', confidence: 'medium', percentage: 68 },
    {
      id: 'payment-terms',
      label: 'Syarat Pembayaran',
      value: 'Net 45 setelah barang diterima',
      confidence: 'low',
      percentage: 55,
      hint: 'Verify terms',
      fullWidth: true,
    },
  ],
};

export interface QueueDocument {
  id: string;
  fileName: string;
  status: string;
}

export const QUEUE_DOCUMENTS: QueueDocument[] = [
  { id: 'doc-1', fileName: 'Inv-9982-Agro.pdf', status: 'Diproses PaddleOCR + LayoutLMv3' },
  { id: 'doc-2', fileName: 'Quotation_Sumatera_Steel.pdf', status: 'Menunggu review' },
];
