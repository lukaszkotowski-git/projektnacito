import { Toast as ToastType } from './NotificationProvider'
import { useEffect } from 'react'

interface ToastProps {
  toast: ToastType
  onClose: () => void
}

export function Toast({ toast, onClose }: ToastProps) {
  const { message, type } = toast

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-[#E8F5E9]',
          border: 'border-green-400',
          icon: (
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )
        }
      case 'error':
        return {
          bg: 'bg-[#FFEBEE]',
          border: 'border-red-400',
          icon: (
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )
        }
      case 'info':
        return {
          bg: 'bg-[#E3F2FD]',
          border: 'border-blue-400',
          icon: (
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        }
    }
  }

  const styles = getToastStyles()

  useEffect(() => {
    const timer = setTimeout(onClose, 4000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={`${styles.bg} ${styles.border} border-2 rounded-2xl p-4 shadow-lg flex items-center gap-3 min-w-[300px] max-w-md pointer-events-auto transform transition-all duration-300 ease-out animate-slideIn`}
      role="alert"
    >
      <div className="flex-shrink-0">
        {styles.icon}
      </div>
      <p className="flex-1 text-sm font-medium text-gray-800">{message}</p>
      <button
        onClick={onClose}
        className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-200/50"
        aria-label="Close notification"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
