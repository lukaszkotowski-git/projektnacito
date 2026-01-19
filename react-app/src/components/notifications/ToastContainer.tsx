import { useNotification } from './NotificationProvider'
import { Toast } from './Toast'

export function ToastContainer() {
  const { toasts, removeToast } = useNotification()

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  )
}
