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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl md:max-w-5xl lg:max-w-6xl animate-slideUp overflow-hidden flex flex-col max-h-[calc(100vh-4rem)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="px-4 pt-4 pb-2">
          <h3 id="modal-title" className="text-lg font-serif text-center text-gray-900">
            {title}
          </h3>
        </div>

        {/* Scrollable body */}
        <div className="px-4 py-2 flex-1 overflow-auto min-h-0">
          <div className="space-y-1">
            {items.map((item, index) => (
              <div
                key={index}
                className={`flex justify-between items-center py-1 ${
                  item.highlight ? 'text-[#8C7E6A] font-semibold' : 'text-gray-600'
                }`}
              >
                <span className="text-xs">{item.label}</span>
                <span className="text-xs font-medium">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="my-2 border-t border-gray-200" />

          {children}
        </div>

        {/* Footer sticky */}
        <div className="px-4 py-3 bg-gray-50 flex items-center justify-between gap-4 border-t border-gray-100">
          <div>
            <div className="text-xs text-gray-700 font-semibold">{totalLabel}</div>
            <div className="text-base font-bold text-[#8C7E6A]">{totalValue}</div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="py-2 px-3 rounded-full border border-gray-300 text-gray-700 font-semibold uppercase tracking-wider text-xs hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className="py-2 px-3 rounded-full bg-[#33302E] text-white font-semibold uppercase tracking-wider text-xs hover:bg-black transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
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
    </div>
  )
}
