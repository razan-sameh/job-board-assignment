// components/skeleton/RecentJobsSkeleton.tsx
export default function RecentJobsSkeleton({ count = 4 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex justify-between items-center text-sm">
          {/* Left side: job title and location */}
          <div className="space-y-1">
            <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-3 w-24 bg-gray-300 rounded animate-pulse"></div>
          </div>

          {/* Right side: status pill */}
          <div className="h-5 w-12 bg-gray-300 rounded-full animate-pulse"></div>
        </div>
      ))}
    </div>
  );
}
