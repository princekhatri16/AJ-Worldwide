import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#FAF7F2] pt-20 px-4">
      <div className="w-full max-w-4xl space-y-6 animate-pulse">
        {/* Hero Skeleton */}
        <div className="h-64 sm:h-80 bg-[#E3DCCF]/60 rounded-2xl w-full border border-[#E3DCCF]" />
        
        {/* Content Rows */}
        <div className="space-y-3">
          <div className="h-6 bg-[#B4763A]/20 rounded w-1/4" />
          <div className="h-4 bg-[#E3DCCF]/80 rounded w-2/3" />
          <div className="h-4 bg-[#E3DCCF]/60 rounded w-1/2" />
        </div>

        {/* Card Grid Skeleton */}
        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-40 bg-white border border-[#E3DCCF] rounded-xl p-4 flex flex-col justify-between"
            >
              <div className="w-8 h-8 bg-[#E3DCCF]/70 rounded-lg" />
              <div className="space-y-2">
                <div className="h-4 bg-[#E3DCCF]/70 rounded w-3/4" />
                <div className="h-3 bg-[#E3DCCF]/50 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
