import { useToastStore } from '@/presentation/stores/toastStore';

const VARIANT_CLASSNAMES: Record<'success' | 'error', string> = {
  success: 'bg-success text-white',
  error: 'bg-danger text-white',
};

export function Toast() {
  const toasts = useToastStore((state) => state.toasts);
  const dismissToast = useToastStore((state) => state.dismissToast);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-xl right-xl z-50 flex flex-col gap-sm">
      {toasts.map((toast) => (
        <button
          key={toast.id}
          type="button"
          onClick={() => dismissToast(toast.id)}
          className={`rounded-lg px-lg py-md text-left text-body font-medium shadow-lg ${VARIANT_CLASSNAMES[toast.variant]}`}
        >
          {toast.message}
        </button>
      ))}
    </div>
  );
}
