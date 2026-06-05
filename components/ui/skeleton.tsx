export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`shimmer-loading rounded-lg ${className}`} />
}

export function CardSkeleton() {
  return (
    <div className="bg-card rounded-lg p-4 space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="space-y-2 pt-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>
    </div>
  )
}

export function UserProfileSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-48" />
        </div>
      </div>
      <div className="space-y-3 pt-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}

export function LoanCardSkeleton() {
  return (
    <div className="bg-card rounded-xl p-4 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-3 w-56" />
        </div>
        <Skeleton className="h-10 w-10 rounded-lg" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  )
}

export function StatsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="bg-card rounded-lg p-6">
        <Skeleton className="h-4 w-24 mb-3" />
        <Skeleton className="h-8 w-32" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card rounded-lg p-4">
          <Skeleton className="h-3 w-16 mb-2" />
          <Skeleton className="h-6 w-20" />
        </div>
        <div className="bg-card rounded-lg p-4">
          <Skeleton className="h-3 w-20 mb-2" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
    </div>
  )
}
