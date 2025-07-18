import { AlertCircle, CheckCircle, Info, X } from 'lucide-react'

export function Alert({ type = 'error', message }: { type?: 'error' | 'success' | 'info', message: string }) {
  const iconMap = {
    error: <AlertCircle className="text-error w-5 h-5" />,
    success: <CheckCircle className="text-success w-5 h-5" />,
    info: <Info className="text-blue-500 w-5 h-5" />
  }

  const bgMap = {
    error: 'bg-red-100 dark:bg-red-900/20',
    success: 'bg-green-100 dark:bg-green-900/20',
    info: 'bg-blue-100 dark:bg-blue-900/20'
  }

  return (
    <div className={`flex items-center gap-2 p-2 rounded-md text-sm ${bgMap[type]}`}>
      {iconMap[type]}
      <span className="text-dark-2 dark:text-white">{message}</span>
    </div>
  )
}
