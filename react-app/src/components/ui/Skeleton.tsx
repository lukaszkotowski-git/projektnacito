interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  width?: string | number
  height?: string | number
  lines?: number
}

export function Skeleton({
  className = '',
  variant = 'text',
  width,
  height,
  lines = 1,
}: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-gray-200 dark:bg-gray-700'
  
  const variantClasses = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-2xl',
  }

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  }

  if (lines > 1 && variant === 'text') {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`${baseClasses} ${variantClasses[variant]}`}
            style={{
              ...style,
              width: i === lines - 1 ? '75%' : style.width,
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="card-choice p-10 rounded-[2.5rem] space-y-4">
      <Skeleton variant="text" width="40%" height={12} />
      <Skeleton variant="text" width="60%" height={24} />
      <Skeleton variant="text" lines={3} />
      <Skeleton variant="text" width="30%" height={12} />
    </div>
  )
}

export function FormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton variant="text" width={100} height={10} />
        <Skeleton variant="rounded" height={56} />
      </div>
      <div className="space-y-2">
        <Skeleton variant="text" width={120} height={10} />
        <Skeleton variant="rounded" height={56} />
      </div>
      <div className="space-y-2">
        <Skeleton variant="text" width={80} height={10} />
        <Skeleton variant="rounded" height={56} />
      </div>
      <Skeleton variant="rounded" height={56} />
    </div>
  )
}

export function PageSkeleton() {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Skeleton variant="text" width={200} height={40} className="mx-auto mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    </div>
  )
}
