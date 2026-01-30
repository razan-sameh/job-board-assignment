export default function StatCardSkeleton() {
  return (
    <div className="bg-background rounded-xl border border-lightGray/50 p-4 animate-pulse">
      <div className="flex items-center justify-between">
        {/* Title placeholder */}
        <div className="h-4 w-20 bg-gray-300 rounded"></div>

        {/* Icon placeholder */}
        <div className="h-4 w-4 bg-gray-300 rounded"></div>
      </div>

      {/* Value placeholder */}
      <div className="h-8 w-16 bg-gray-300 rounded mt-2"></div>

      {/* Subtitle placeholder */}
      <div className="h-3 w-12 bg-gray-300 rounded mt-1"></div>
    </div>
  );
}
