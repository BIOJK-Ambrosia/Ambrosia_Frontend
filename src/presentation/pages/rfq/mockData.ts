import type { RecommendationVerdict } from '@/shared/types/recommendation';

export interface RfqComparison {
  vendorBidLabel: string;
  vendorBidClassName: string;
  deltaLabel: string;
  deltaClassName: string;
  barPercent: number;
  markerPercent: number;
  barColorClassName: string;
}

export interface RfqCard {
  id: string;
  title: string;
  category: string;
  vendorName: string;
  submitted: boolean;
  statusMeta: string;
  comparison: RfqComparison | null;
  verdict: RecommendationVerdict;
  recommendationNarrative: string;
  primaryActionLabel: string;
  primaryActionVariant: 'filled' | 'outlined';
  hasMoreMenu?: boolean;
}

export const RFQ_CARDS: RfqCard[] = [
  {
    id: 'rfq-1',
    title: 'Steel Coil #4429',
    category: 'MRO',
    vendorName: 'IndoSteel Manufacturing Corp',
    submitted: true,
    statusMeta: 'Submited: 2h ago',
    comparison: {
      vendorBidLabel: '$892.50',
      vendorBidClassName: 'text-primary',
      deltaLabel: '-$42.00 (Savings)',
      deltaClassName: 'text-primary',
      barPercent: 85,
      markerPercent: 85,
      barColorClassName: 'bg-primary-container',
    },
    verdict: 'accept',
    recommendationNarrative: 'Bid is 4.5% below market average.',
    primaryActionLabel: 'Details',
    primaryActionVariant: 'filled',
  },
  {
    id: 'rfq-2',
    title: 'Industrial Lubricants (Batch B)',
    category: 'Raw Material',
    vendorName: 'ChemEx Global Solutions',
    submitted: false,
    statusMeta: 'Deadline: 4h left',
    comparison: null,
    verdict: 'pending',
    recommendationNarrative: 'Waiting for quote to analyze.',
    primaryActionLabel: 'Send Reminder',
    primaryActionVariant: 'outlined',
  },
  {
    id: 'rfq-3',
    title: 'Hydraulic Pumps x40',
    category: 'Equipment',
    vendorName: 'Apex Precision Parts',
    submitted: true,
    statusMeta: 'Submited: Yesterday',
    comparison: {
      vendorBidLabel: '$1,450.00',
      vendorBidClassName: 'text-danger',
      deltaLabel: '+$112.00 (Over budget)',
      deltaClassName: 'text-danger',
      barPercent: 100,
      markerPercent: 70,
      barColorClassName: 'bg-danger/60',
    },
    verdict: 'negotiate',
    recommendationNarrative: 'Bid is 12% above seasonal average.',
    primaryActionLabel: 'Counter Offer',
    primaryActionVariant: 'filled',
  },
  {
    id: 'rfq-4',
    title: 'Custom Gaskets (10k units)',
    category: 'Components',
    vendorName: 'Global Sealants Ltd.',
    submitted: true,
    statusMeta: 'Submited: 1h ago',
    comparison: {
      vendorBidLabel: '$0.45 / unit',
      vendorBidClassName: 'text-on-surface',
      deltaLabel: '+$25.00',
      deltaClassName: 'text-danger',
      barPercent: 92,
      markerPercent: 85,
      barColorClassName: 'bg-danger/40',
    },
    verdict: 'reject',
    recommendationNarrative: 'Price surge detected without justification.',
    primaryActionLabel: 'Review',
    primaryActionVariant: 'filled',
    hasMoreMenu: true,
  },
];
