interface StatusBadgeProps {
  status: string
  type?: 'project' | 'milestone' | 'changeRequest' | 'payment' | 'approval'
  variant?: 'light' | 'dark'
}

export default function StatusBadge({ status, type = 'project', variant = 'light' }: StatusBadgeProps) {
  const getStatusStyles = () => {
    const upperStatus = status.toUpperCase()

    // Project statuses
    if (type === 'project') {
      switch (upperStatus) {
        case 'PLANNING':
          return variant === 'dark'
            ? 'bg-blue-500/20 text-blue-200 border-blue-500/40'
            : 'bg-blue-100 text-blue-800 border-blue-200'
        case 'IN_PROGRESS':
          return variant === 'dark'
            ? 'bg-yellow-500/20 text-yellow-100 border-yellow-500/40'
            : 'bg-yellow-100 text-yellow-800 border-yellow-200'
        case 'ON_HOLD':
          return variant === 'dark'
            ? 'bg-orange-500/20 text-orange-100 border-orange-500/40'
            : 'bg-orange-100 text-orange-800 border-orange-200'
        case 'COMPLETED':
          return variant === 'dark'
            ? 'bg-green-500/20 text-green-200 border-green-500/40'
            : 'bg-green-100 text-green-800 border-green-200'
        case 'CANCELLED':
          return variant === 'dark'
            ? 'bg-red-500/20 text-red-200 border-red-500/40'
            : 'bg-red-100 text-red-800 border-red-200'
        default:
          return variant === 'dark'
            ? 'bg-slate-700/60 text-slate-100 border-slate-500/60'
            : 'bg-gray-100 text-gray-800 border-gray-200'
      }
    }

    // Milestone statuses
    if (type === 'milestone') {
      switch (upperStatus) {
        case 'PENDING':
          return variant === 'dark'
            ? 'bg-slate-700/60 text-slate-100 border-slate-500/60'
            : 'bg-gray-100 text-gray-800 border-gray-200'
        case 'IN_PROGRESS':
          return variant === 'dark'
            ? 'bg-yellow-500/20 text-yellow-100 border-yellow-500/40'
            : 'bg-yellow-100 text-yellow-800 border-yellow-200'
        case 'COMPLETED':
          return variant === 'dark'
            ? 'bg-green-500/20 text-green-200 border-green-500/40'
            : 'bg-green-100 text-green-800 border-green-200'
        case 'BLOCKED':
          return variant === 'dark'
            ? 'bg-red-500/20 text-red-200 border-red-500/40'
            : 'bg-red-100 text-red-800 border-red-200'
        case 'APPROVED':
          return variant === 'dark'
            ? 'bg-green-500/20 text-green-200 border-green-500/40'
            : 'bg-green-100 text-green-800 border-green-200'
        case 'CHANGES_REQUESTED':
          return variant === 'dark'
            ? 'bg-orange-500/20 text-orange-100 border-orange-500/40'
            : 'bg-orange-100 text-orange-800 border-orange-200'
        default:
          return variant === 'dark'
            ? 'bg-slate-700/60 text-slate-100 border-slate-500/60'
            : 'bg-gray-100 text-gray-800 border-gray-200'
      }
    }

    // Change request statuses
    if (type === 'changeRequest') {
      switch (upperStatus) {
        case 'PENDING':
          return variant === 'dark'
            ? 'bg-slate-700/60 text-slate-100 border-slate-500/60'
            : 'bg-gray-100 text-gray-800 border-gray-200'
        case 'IN_REVIEW':
          return variant === 'dark'
            ? 'bg-blue-500/20 text-blue-200 border-blue-500/40'
            : 'bg-blue-100 text-blue-800 border-blue-200'
        case 'APPROVED':
          return variant === 'dark'
            ? 'bg-green-500/20 text-green-200 border-green-500/40'
            : 'bg-green-100 text-green-800 border-green-200'
        case 'REJECTED':
          return variant === 'dark'
            ? 'bg-red-500/20 text-red-200 border-red-500/40'
            : 'bg-red-100 text-red-800 border-red-200'
        default:
          return variant === 'dark'
            ? 'bg-slate-700/60 text-slate-100 border-slate-500/60'
            : 'bg-gray-100 text-gray-800 border-gray-200'
      }
    }

    // Payment statuses
    if (type === 'payment') {
      switch (upperStatus) {
        case 'PENDING':
          return variant === 'dark'
            ? 'bg-slate-700/60 text-slate-100 border-slate-500/60'
            : 'bg-gray-100 text-gray-800 border-gray-200'
        case 'PAID':
          return variant === 'dark'
            ? 'bg-green-500/20 text-green-200 border-green-500/40'
            : 'bg-green-100 text-green-800 border-green-200'
        case 'OVERDUE':
          return variant === 'dark'
            ? 'bg-red-500/20 text-red-200 border-red-500/40'
            : 'bg-red-100 text-red-800 border-red-200'
        case 'CANCELLED':
          return variant === 'dark'
            ? 'bg-slate-700/60 text-slate-100 border-slate-500/60'
            : 'bg-gray-100 text-gray-800 border-gray-200'
        case 'LOCKED':
          return variant === 'dark'
            ? 'bg-yellow-500/20 text-yellow-100 border-yellow-500/40'
            : 'bg-yellow-100 text-yellow-800 border-yellow-200'
        default:
          return variant === 'dark'
            ? 'bg-slate-700/60 text-slate-100 border-slate-500/60'
            : 'bg-gray-100 text-gray-800 border-gray-200'
      }
    }

    if (type === 'approval') {
      switch (upperStatus) {
        case 'PENDING':
          return variant === 'dark'
            ? 'bg-slate-700/60 text-slate-100 border-slate-500/60'
            : 'bg-gray-100 text-gray-800 border-gray-200'
        case 'APPROVED':
          return variant === 'dark'
            ? 'bg-green-500/20 text-green-200 border-green-500/40'
            : 'bg-green-100 text-green-800 border-green-200'
        case 'CHANGES_REQUESTED':
          return variant === 'dark'
            ? 'bg-orange-500/20 text-orange-100 border-orange-500/40'
            : 'bg-orange-100 text-orange-800 border-orange-200'
        default:
          return variant === 'dark'
            ? 'bg-slate-700/60 text-slate-100 border-slate-500/60'
            : 'bg-gray-100 text-gray-800 border-gray-200'
      }
    }

    return variant === 'dark'
      ? 'bg-slate-700/60 text-slate-100 border-slate-500/60'
      : 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const formatStatus = (status: string) => {
    return status
      .split('_')
      .map(word => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ')
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyles()}`}
    >
      {formatStatus(status)}
    </span>
  )
}
