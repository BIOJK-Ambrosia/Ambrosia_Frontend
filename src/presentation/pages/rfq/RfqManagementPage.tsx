import { useState } from 'react';
import type { FormEvent } from 'react';
import { RecommendationCard } from '@/presentation/components/common/RecommendationCard';
import { useToastStore } from '@/presentation/stores/toastStore';
import type { RfqCard } from './mockData';
import { RFQ_CARDS } from './mockData';

export function RfqManagementPage() {
  const [cards, setCards] = useState(RFQ_CARDS);
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newVendorName, setNewVendorName] = useState('');
  const showToast = useToastStore((state) => state.showToast);

  const categoryOptions = ['All Categories', ...Array.from(new Set(RFQ_CARDS.map((card) => card.category)))];

  const filteredCards = cards.filter((card) => {
    const statusMatches =
      statusFilter === 'All Status' || (statusFilter === 'Menunggu' ? !card.submitted : card.submitted);
    const categoryMatches = categoryFilter === 'All Categories' || card.category === categoryFilter;
    return statusMatches && categoryMatches;
  });

  function handleCreateSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newCard: RfqCard = {
      id: `rfq-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      vendorName: newVendorName,
      submitted: false,
      statusMeta: 'Baru dibuat',
      comparison: null,
      verdict: 'pending',
      recommendationNarrative: 'Menunggu penawaran vendor.',
      primaryActionLabel: 'Send Reminder',
      primaryActionVariant: 'outlined',
    };
    setCards((prev) => [newCard, ...prev]);
    setNewTitle('');
    setNewCategory('');
    setNewVendorName('');
    setIsCreating(false);
    showToast('RFQ baru dibuat');
  }

  function handlePrimaryAction(card: RfqCard) {
    setCards((prev) =>
      prev.map((item) =>
        item.id === card.id ? { ...item, submitted: true, statusMeta: 'Submited: baru saja' } : item
      )
    );
    showToast(`${card.primaryActionLabel} untuk ${card.title}`);
  }

  return (
    <div className="mx-auto max-w-7xl p-gutter">
      <section className="mb-xl flex flex-wrap items-center justify-between gap-lg rounded-xl border border-surface-variant/50 bg-surface-container-low p-lg">
        <div className="flex flex-wrap items-center gap-md">
          <FilterSelect
            label="Status"
            options={['All Status', 'Menunggu', 'Sudah Menawar']}
            value={statusFilter}
            onChange={setStatusFilter}
          />
          <FilterSelect label="Deadline" options={['Any Date', 'Today', 'Next 7 Days', 'Expired']} />
          <FilterSelect
            label="Category"
            options={categoryOptions}
            value={categoryFilter}
            onChange={setCategoryFilter}
          />
        </div>
        <button
          className="flex items-center gap-sm self-end rounded-lg bg-primary px-xl py-3 font-bold text-on-primary shadow-sm transition-all hover:opacity-90"
          type="button"
          onClick={() => setIsCreating((prev) => !prev)}
        >
          <span className="material-symbols-outlined">add</span>
          Create New RFQ
        </button>
      </section>

      {isCreating && (
        <form
          className="mb-xl grid grid-cols-1 gap-md rounded-xl border border-primary/30 bg-surface-container-lowest p-lg md:grid-cols-4"
          onSubmit={handleCreateSubmit}
        >
          <input
            className="rounded-lg border border-outline-variant px-3 py-2 text-body"
            placeholder="Judul RFQ"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            required
          />
          <input
            className="rounded-lg border border-outline-variant px-3 py-2 text-body"
            placeholder="Kategori"
            value={newCategory}
            onChange={(event) => setNewCategory(event.target.value)}
            required
          />
          <input
            className="rounded-lg border border-outline-variant px-3 py-2 text-body"
            placeholder="Nama Vendor"
            value={newVendorName}
            onChange={(event) => setNewVendorName(event.target.value)}
            required
          />
          <div className="flex gap-sm">
            <button type="submit" className="flex-1 rounded-lg bg-primary px-lg py-2 font-bold text-on-primary">
              Simpan
            </button>
            <button
              type="button"
              className="rounded-lg border border-outline-variant px-lg py-2"
              onClick={() => setIsCreating(false)}
            >
              Batal
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 gap-xl xl:grid-cols-2">
        {filteredCards.map((card) => (
          <div
            key={card.id}
            className="rounded-xl border border-surface-variant bg-surface-container-lowest p-lg shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-lg flex items-start justify-between">
              <div>
                <div className="mb-xs flex items-center gap-sm">
                  <h3 className="text-h3 font-bold text-primary">{card.title}</h3>
                  <span className="rounded bg-powder px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                    {card.category}
                  </span>
                </div>
                <p className="text-body text-on-surface-variant">{card.vendorName}</p>
              </div>
              <div className="flex flex-col items-end gap-xs">
                <span
                  className={`flex items-center gap-xs text-body font-semibold ${card.submitted ? 'text-success' : 'text-warning'}`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {card.submitted ? 'check_circle' : 'pending'}
                  </span>
                  {card.submitted ? 'Sudah Menawar' : 'Menunggu'}
                </span>
                <span className={`text-caption ${card.submitted ? 'text-on-surface-variant' : 'font-bold text-danger'}`}>
                  {card.statusMeta}
                </span>
              </div>
            </div>

            <div
              className={`mb-lg rounded-lg border border-outline-variant/30 bg-cloud p-md ${card.comparison ? '' : 'opacity-60'}`}
            >
              <div className="mb-sm flex items-center justify-between">
                <span className="text-label-medium text-on-surface-variant">Price vs. P50 Prediction</span>
                <span className={`text-label-medium font-bold ${card.comparison ? card.comparison.deltaClassName : ''}`}>
                  {card.comparison ? card.comparison.deltaLabel : 'Awaiting Vendor Data'}
                </span>
              </div>
              {card.comparison ? (
                <div className="flex h-12 items-center gap-md">
                  <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-surface-container-high">
                    <div
                      className={`absolute left-0 top-0 h-full rounded-full ${card.comparison.barColorClassName}`}
                      style={{ width: `${card.comparison.barPercent}%` }}
                    />
                    <div
                      className="absolute top-[-4px] z-10 h-4 w-1 rounded-full bg-primary"
                      style={{ left: `${card.comparison.markerPercent}%` }}
                      title="P50 Prediction"
                    />
                  </div>
                  <div className="min-w-[80px] text-right">
                    <p className={`text-body font-bold ${card.comparison.vendorBidClassName}`}>
                      {card.comparison.vendorBidLabel}
                    </p>
                    <p className="text-caption text-on-surface-variant">Vendor Bid</p>
                  </div>
                </div>
              ) : (
                <div className="flex h-12 items-center justify-center rounded-lg border-2 border-dashed border-outline-variant/40">
                  <p className="text-caption italic text-on-surface-variant">Response not yet received</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-surface-variant pt-md">
              <RecommendationCard verdict={card.verdict} narrative={card.recommendationNarrative} variant="compact" />
              <div className="flex gap-sm">
                {card.hasMoreMenu && (
                  <button
                    className="rounded-lg border border-outline-variant p-2 transition-all hover:bg-surface-container-high"
                    type="button"
                    aria-label="Menu lainnya"
                  >
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                )}
                <button
                  className={
                    card.primaryActionVariant === 'filled'
                      ? 'rounded-lg bg-primary px-xl py-2 font-bold text-body text-on-primary transition-colors hover:bg-primary/90'
                      : 'rounded-lg border border-primary px-xl py-2 font-bold text-body text-primary transition-colors hover:bg-primary/5'
                  }
                  type="button"
                  onClick={() => handlePrimaryAction(card)}
                >
                  {card.primaryActionLabel}
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredCards.length === 0 && (
          <p className="col-span-full text-center text-body text-on-surface-variant">
            Tidak ada RFQ yang cocok dengan filter.
          </p>
        )}
      </div>

      <section className="mt-huge flex items-start gap-lg rounded-xl border-2 border-primary bg-powder p-xl">
        <span className="material-symbols-outlined text-[32px] text-primary">info</span>
        <div>
          <h4 className="mb-xs text-h3 font-bold text-primary">Model Methodology & Prediction Integrity</h4>
          <p className="max-w-4xl text-body text-primary/80">
            Recommendations and comparison bands are generated using Ambrosia&apos;s P10-P90 market volatility
            models. Price predictions are advisory, and specific regional logistics costs may influence vendor bids
            beyond forecasted commodity prices. Human review is recommended for all high-value contracts.
          </p>
        </div>
      </section>
    </div>
  );
}

function FilterSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
}) {
  const id = `rfq-filter-${label.toLowerCase()}`;
  return (
    <div className="flex flex-col gap-xs">
      <label htmlFor={id} className="text-label-medium text-on-surface-variant">
        {label}
      </label>
      <select
        id={id}
        className="min-w-[160px] rounded-lg border-outline-variant px-4 py-2 text-body focus:ring-primary"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
