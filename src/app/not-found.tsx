import React from "react";
import Link from "next/link";
import { Home, Package } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-[#F6F3EC] px-4 py-24 sm:py-32">
      <div className="max-w-xl w-full text-center space-y-5">
        <div className="font-serif text-7xl sm:text-8xl font-black text-[#1E2A24]/10 select-none tracking-widest">
          404
        </div>
        <div className="flex items-center justify-center gap-2.5">
          <span className="w-6 h-[1px] bg-[#B4763A]" />
          <span className="text-[#B4763A] font-sans text-xs uppercase tracking-widest font-bold">
            Page Not Found
          </span>
          <span className="w-6 h-[1px] bg-[#B4763A]" />
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide [font-variant-caps:all-small-caps] text-[#1E2A24]">
          The Requested Export Page Does Not Exist
        </h1>
        <p className="text-[#5F6B64] text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
          The page you are looking for may have been moved or updated. Please return to the homepage or browse our export products.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-[#1F4A3A] text-white hover:bg-[#163829] text-xs font-bold uppercase tracking-wider transition-all duration-200 rounded-full flex items-center justify-center gap-2 shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            href="/products"
            className="w-full sm:w-auto px-6 py-3 border border-[#E3DDCF] bg-white text-[#1E2A24] hover:bg-[#F6F3EC] hover:text-[#1F4A3A] text-xs font-bold uppercase tracking-wider transition-all duration-200 rounded-full flex items-center justify-center gap-2 shadow-2xs"
          >
            <Package className="w-4 h-4 text-[#B4763A]" />
            <span>View Products</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
