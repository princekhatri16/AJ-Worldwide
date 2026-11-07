import React from "react";

export default function ProductDetailLoading() {
  return (
    <div className="min-h-[70vh] bg-white animate-pulse">
      {/* Deep-Green Header Skeleton */}
      <div className="bg-gradient-to-r from-[#163829] to-[#1F4A3A] py-14 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="h-4 bg-white/20 rounded w-32" />
          <div className="h-8 bg-white/30 rounded w-64" />
          <div className="w-16 h-[3px] bg-[#B4763A]/60 rounded-full" />
        </div>
      </div>

      {/* Overview Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 aspect-[4/3] bg-[#F6F3EC] rounded-2xl border border-[#E3DDCF]" />
          <div className="lg:col-span-7 space-y-4">
            <div className="h-4 bg-[#E3DDCF] rounded-full w-28" />
            <div className="h-8 bg-[#E3DDCF] rounded w-80" />
            <div className="h-4 bg-[#E3DDCF] rounded w-full" />
            <div className="h-4 bg-[#E3DDCF] rounded w-3/4" />
            <div className="h-10 bg-[#1F4A3A]/20 rounded-full w-40 mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
