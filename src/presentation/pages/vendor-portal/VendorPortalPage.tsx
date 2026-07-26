import { useState } from 'react';
import type { FormEvent } from 'react';
import { PAYMENT_TERMS_OPTIONS } from './mockData';
import { useVendorSessionStore } from '@/presentation/stores/vendorSessionStore';
import { useToastStore } from '@/presentation/stores/toastStore';

export function VendorPortalPage() {
  const notifications = useVendorSessionStore((state) => state.notifications);
  const dismissNotification = useVendorSessionStore((state) => state.dismissNotification);
  const moveNotificationToHistory = useVendorSessionStore((state) => state.moveNotificationToHistory);
  const [price, setPrice] = useState('');
  const [leadTime, setLeadTime] = useState('');
  const [paymentTerms, setPaymentTerms] = useState(PAYMENT_TERMS_OPTIONS[0]);
  const [errors, setErrors] = useState<{ price?: string; leadTime?: string }>({});
  const showToast = useToastStore((state) => state.showToast);

  const activeNotification = notifications[0];

  function handleSubmitBid(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const priceValue = Number(price);
    const leadTimeValue = Number(leadTime);
    const nextErrors: { price?: string; leadTime?: string } = {};
    if (!price || Number.isNaN(priceValue) || priceValue <= 0) {
      nextErrors.price = 'Harga wajib diisi dan lebih dari 0';
    }
    if (!leadTime || Number.isNaN(leadTimeValue) || leadTimeValue <= 0) {
      nextErrors.leadTime = 'Lead time wajib diisi dan lebih dari 0';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (activeNotification) {
      moveNotificationToHistory(activeNotification.id);
    }
    setPrice('');
    setLeadTime('');
    setPaymentTerms(PAYMENT_TERMS_OPTIONS[0]);
    showToast('Penawaran terkirim');
  }

  return (
    <main className="space-y-gutter p-gutter">
      <section className="space-y-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-h2 text-primary">Notifikasi RFQ Baru</h3>
          <span className="rounded-full bg-secondary-container px-md py-xs text-caption font-bold text-on-secondary-container">
            {notifications.length} RFQ Pending
          </span>
        </div>

        <div className="space-y-md">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex flex-col justify-between gap-xl rounded-xl bg-white p-xl shadow-md shadow-primary/[0.06] transition-shadow md:flex-row md:items-center"
            >
              <div className="flex gap-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface-container-high text-primary">
                  <span className="material-symbols-outlined">{notification.icon}</span>
                </div>
                <div>
                  <h4 className="text-h3 text-primary">{notification.title}</h4>
                  <p className="text-body text-on-surface-variant">
                    Quantity: {notification.quantity} • Due: {notification.due}
                  </p>
                  <div className="mt-xs flex items-center gap-sm">
                    <span className="flex items-center gap-1 rounded bg-surface-container px-sm py-1 text-[10px] font-bold text-on-surface-variant">
                      <span className="material-symbols-outlined text-[14px]">location_on</span>
                      {notification.location}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-md">
                <button
                  className="rounded-lg px-lg py-md text-caption font-bold text-primary transition-all hover:bg-surface-container"
                  type="button"
                  onClick={() => {
                    dismissNotification(notification.id);
                    showToast('Notifikasi diabaikan');
                  }}
                >
                  Abaikan
                </button>
                <button
                  className="rounded-lg bg-primary px-lg py-md text-caption font-bold text-on-primary shadow-sm transition-all hover:opacity-90"
                  type="button"
                  onClick={() => {
                    moveNotificationToHistory(notification.id);
                    showToast('Penawaran terkirim');
                  }}
                >
                  Kirim Penawaran
                </button>
              </div>
            </div>
          ))}
          {notifications.length === 0 && (
            <p className="text-body text-on-surface-variant">Tidak ada notifikasi RFQ baru.</p>
          )}
        </div>

        <form
          className="mt-huge grid grid-cols-1 gap-xl rounded-xl bg-white p-huge shadow-md shadow-primary/[0.06] md:grid-cols-2"
          onSubmit={handleSubmitBid}
        >
          <div className="col-span-full flex items-center gap-md border-b border-surface-variant pb-xl">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ocean/20 text-ocean">
              <span className="material-symbols-outlined">edit_document</span>
            </span>
            <div>
              <h3 className="text-h2 text-primary">Submit Penawaran Baru</h3>
              <p className="text-caption text-on-surface-variant">
                Lengkapi detail penawaran untuk memenangkan kontrak ini.
              </p>
            </div>
          </div>

          <div className="space-y-sm">
            <label className="block text-label-medium text-primary" htmlFor="price-per-kg">
              Harga per kg (IDR)
            </label>
            <input
              id="price-per-kg"
              className="w-full rounded-lg border border-outline-variant p-md text-on-surface outline-none transition-colors duration-200 hover:border-outline focus:border-primary focus:ring-2 focus:ring-primary/30"
              placeholder="Contoh: 45000"
              type="number"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
            {errors.price && <p className="text-caption text-danger">{errors.price}</p>}
          </div>
          <div className="space-y-sm">
            <label className="block text-label-medium text-primary" htmlFor="lead-time">
              Lead Time (Hari)
            </label>
            <input
              id="lead-time"
              className="w-full rounded-lg border border-outline-variant p-md text-on-surface outline-none transition-colors duration-200 hover:border-outline focus:border-primary focus:ring-2 focus:ring-primary/30"
              placeholder="Contoh: 7"
              type="number"
              value={leadTime}
              onChange={(event) => setLeadTime(event.target.value)}
            />
            {errors.leadTime && <p className="text-caption text-danger">{errors.leadTime}</p>}
          </div>
          <div className="col-span-full space-y-sm">
            <label className="block text-label-medium text-primary" htmlFor="payment-terms">
              Termin Pembayaran
            </label>
            <select
              id="payment-terms"
              className="w-full rounded-lg border border-outline-variant p-md text-on-surface outline-none transition-colors duration-200 hover:border-outline focus:border-primary focus:ring-2 focus:ring-primary/30"
              value={paymentTerms}
              onChange={(event) => setPaymentTerms(event.target.value)}
            >
              {PAYMENT_TERMS_OPTIONS.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="col-span-full">
            <label className="mb-sm block text-label-medium text-primary">Lampiran Pendukung (PDF/Foto)</label>
            <div className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-outline-variant bg-surface-container-low p-huge transition-colors hover:bg-surface-container-high">
              <span className="material-symbols-outlined text-[48px] text-outline-variant">cloud_upload</span>
              <p className="mt-md text-center text-on-surface-variant">
                Tarik dan lepas file di sini atau <span className="font-bold text-primary">Cari File</span>
              </p>
              <p className="mt-xs text-[10px] text-outline-variant">Maksimal 10MB (PDF, JPG, PNG)</p>
            </div>
          </div>

          <div className="col-span-full flex justify-end gap-md border-t border-surface-variant pt-xl">
            <button
              className="rounded-lg px-xl py-md font-bold text-primary"
              type="button"
              onClick={() => showToast('Draft disimpan')}
            >
              Simpan Draft
            </button>
            <button
              className="scale-100 rounded-lg bg-primary px-huge py-md font-bold text-on-primary shadow-lg transition-all hover:shadow-xl active:scale-95"
              type="submit"
            >
              Kirim Penawaran Sekarang
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
