import { ReactNode } from 'react'

interface SummaryItem {
  label: string
  value: string | number
  highlight?: boolean
}

interface OrderSummaryModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  items: SummaryItem[]
  totalLabel: string
  totalValue: string
  confirmLabel: string
  cancelLabel: string
  children?: ReactNode
  isLoading?: boolean
}

export function OrderSummaryModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  items,
  totalLabel,
  totalValue,
  confirmLabel,
  cancelLabel,
  children,
  isLoading = false,
}: OrderSummaryModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      <div 
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg animate-slideUp overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="px-8 pt-8 pb-4">
          <h3 id="modal-title" className="text-2xl font-serif text-center text-gray-900">
            {title}
          </h3>
        </div>

        <div className="px-8 py-4">
          <div className="space-y-3">
            {items.map((item, index) => (
              <div
                key={index}
                className={`flex justify-between items-center py-2 ${
                  item.highlight
                    ? 'text-[#8C7E6A] font-semibold'
                    : 'text-gray-600'
                }`}
              >
                <span className="text-sm">{item.label}</span>
                <span className="text-sm font-medium">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="my-4 border-t border-gray-200" />

          <div className="flex justify-between items-center py-2">
            <span className="text-lg font-semibold text-gray-900">
              {totalLabel}
            </span>
            <span className="text-xl font-bold text-[#8C7E6A]">{totalValue}</span>
          </div>

          {children}
        </div>

        <div className="px-8 py-6 bg-gray-50 flex gap-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 py-4 px-6 rounded-full border border-gray-300 text-gray-700 font-semibold uppercase tracking-wider text-xs hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 py-4 px-6 rounded-full bg-[#33302E] text-white font-semibold uppercase tracking-wider text-xs hover:bg-black transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading && (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
