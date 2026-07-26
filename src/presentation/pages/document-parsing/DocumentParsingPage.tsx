import { useState } from 'react';
import { ConfidenceBadge } from '@/presentation/components/common/ConfidenceBadge';
import { MethodologyNotice } from '@/presentation/components/common/MethodologyNotice';
import { EXTRACTION_FIELDS_BY_DOC, QUEUE_DOCUMENTS } from './mockData';
import { useToastStore } from '@/presentation/stores/toastStore';

export function DocumentParsingPage() {
  const [documents, setDocuments] = useState(QUEUE_DOCUMENTS);
  const [activeDocId, setActiveDocId] = useState<string | null>(QUEUE_DOCUMENTS[0]?.id ?? null);
  const [isEditing, setIsEditing] = useState(false);
  const showToast = useToastStore((state) => state.showToast);

  const activeFields = activeDocId ? EXTRACTION_FIELDS_BY_DOC[activeDocId] : undefined;

  function handleSelectDocument(docId: string) {
    setActiveDocId(docId);
    setIsEditing(false);
  }

  function resolveActiveDocument(action: 'disetujui' | 'ditolak') {
    const remaining = documents.filter((doc) => doc.id !== activeDocId);
    setDocuments(remaining);
    setActiveDocId(remaining[0]?.id ?? null);
    setIsEditing(false);
    showToast(`Dokumen ${action}`);
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      <section className="flex w-[40%] flex-col border-r border-outline-variant/30 bg-surface-container-lowest">
        <div className="flex flex-1 flex-col overflow-hidden p-xl">
          <h3 className="mb-lg text-h3 text-primary">Pusat Input Dokumen</h3>
          <div className="mb-xl flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-outline-variant bg-surface-container-low p-huge text-center transition-colors hover:bg-powder">
            <div className="mb-md flex h-16 w-16 items-center justify-center rounded-full bg-primary-container">
              <span className="material-symbols-outlined text-[32px] text-on-primary-container">upload_file</span>
            </div>
            <p className="text-body font-semibold text-primary">Tarik & Lepas Dokumen</p>
            <p className="text-caption text-on-surface-variant">PDF, JPG, PNG (Maks 10MB)</p>
          </div>

          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="mb-sm flex items-center justify-between">
              <span className="text-label-medium uppercase tracking-wider text-on-surface-variant">
                Antrian Dokumen
              </span>
              <span className="text-label-medium font-bold text-primary">{documents.length} File</span>
            </div>
            <div className="flex-1 space-y-md overflow-y-auto pr-2">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => handleSelectDocument(doc.id)}
                  className={`flex cursor-pointer gap-4 rounded-lg p-md ${
                    doc.id === activeDocId
                      ? 'border border-primary/20 bg-powder'
                      : 'border border-outline-variant/30 bg-surface hover:bg-surface-container'
                  }`}
                >
                  <div className="flex h-16 w-12 items-center justify-center rounded border border-outline-variant/50 bg-surface-variant">
                    <span className="material-symbols-outlined text-outline-variant">description</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-body font-bold text-primary">{doc.fileName}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="rounded bg-primary-container px-2 py-0.5 text-[10px] font-bold uppercase text-on-primary-container">
                        {doc.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {documents.length === 0 && (
                <p className="p-md text-center text-caption text-on-surface-variant">Antrian kosong.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="w-[60%] flex-1 overflow-y-auto bg-surface-container-low">
        {activeFields ? (
          <>
            <div className="space-y-xl p-xl">
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-h3 text-primary">Hasil Ekstraksi</h3>
                  <p className="text-body text-on-surface-variant">Review dan validasi data yang ditemukan oleh AI</p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-success/10 px-3 py-1">
                  <span className="h-2 w-2 rounded-full bg-success" />
                  <span className="text-label-medium font-bold uppercase text-success">Model Status: Optimal</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-lg">
                {activeFields.map((field) => (
                  <div
                    key={`${activeDocId}-${field.id}`}
                    className={`rounded-xl bg-white p-lg shadow-sm ${
                      field.fullWidth ? 'col-span-2' : ''
                    } ${field.confidence === 'low' ? 'border-2 border-danger' : 'border border-outline-variant/30'}`}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <label className="text-label-medium text-on-surface-variant">{field.label}</label>
                      <ConfidenceBadge level={field.confidence} percentage={field.percentage} />
                    </div>
                    <div className="relative">
                      <input
                        className="w-full rounded-lg border-none bg-surface-container-low text-body font-bold text-primary focus:ring-2 focus:ring-primary"
                        type="text"
                        defaultValue={field.value}
                        readOnly={!isEditing}
                      />
                      {field.hint && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-caption text-on-surface-variant">
                          {field.hint}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-primary-container/20 bg-powder p-xl">
                <div className="relative z-10">
                  <div className="mb-lg flex items-center gap-3">
                    <div className="rounded-lg bg-primary p-2">
                      <span className="material-symbols-outlined text-white">auto_awesome</span>
                    </div>
                    <h4 className="text-h3 font-bold text-primary">Rekomendasi Gemini AI</h4>
                  </div>
                  <div className="flex flex-col items-start gap-xl md:flex-row">
                    <div className="flex min-w-[140px] flex-shrink-0 flex-col items-center justify-center rounded-xl bg-warning px-xl py-4 text-white shadow-lg shadow-warning/20">
                      <span className="mb-1 text-label-medium font-bold uppercase tracking-widest opacity-80">
                        Verdict
                      </span>
                      <span className="text-h3 font-black uppercase">Negotiate</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-body leading-relaxed text-primary">
                        Harga yang diajukan (<span className="font-bold italic">IDR 12,450/kg</span>) berada{' '}
                        <span className="font-bold text-danger">12% di atas median pasar</span> untuk wilayah Sumatera
                        Utara. Namun, <span className="font-semibold italic">Lead Time</span> yang ditawarkan lebih
                        cepat 4 hari dari kompetitor utama. AI merekomendasikan negosiasi untuk mencapai harga{' '}
                        <span className="font-bold underline decoration-secondary">IDR 11,800/kg</span> berdasarkan
                        histori volume pembelian tahunan Anda.
                      </p>
                      <button
                        className="mt-lg flex items-center gap-2 font-bold text-body text-primary transition-all hover:underline"
                        type="button"
                      >
                        Lihat detail perhitungan
                        <span className="material-symbols-outlined text-sm">expand_more</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <MethodologyNotice title="Catatan Kejujuran Metodologi">
                Prediksi harga Gemini dipengaruhi oleh data pasar publik terbatas untuk komoditas ini. Tingkat
                ketidakpastian model saat ini adalah +/- 4.5%.
              </MethodologyNotice>
            </div>

            <div className="sticky bottom-0 flex items-center justify-end gap-lg border-t border-outline-variant/30 bg-surface/80 p-xl backdrop-blur-md">
              <button
                className="rounded-lg border border-danger px-xl py-3 font-bold text-body text-danger transition-all hover:bg-danger/5"
                type="button"
                onClick={() => resolveActiveDocument('ditolak')}
              >
                Tolak Dokumen
              </button>
              <button
                className="rounded-lg border border-primary px-xl py-3 font-bold text-body text-primary transition-all hover:bg-surface-container-high"
                type="button"
                onClick={() => setIsEditing((prev) => !prev)}
              >
                Edit Manual
              </button>
              <button
                className="flex items-center gap-2 rounded-lg bg-secondary px-huge py-3 font-bold text-body text-white shadow-lg shadow-secondary/20 transition-all hover:bg-primary"
                type="button"
                onClick={() => resolveActiveDocument('disetujui')}
              >
                <span className="material-symbols-outlined">check_circle</span>
                Setujui Data
              </button>
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center p-huge text-center text-on-surface-variant">
            <p>Semua dokumen telah diproses.</p>
          </div>
        )}
      </section>
    </div>
  );
}
