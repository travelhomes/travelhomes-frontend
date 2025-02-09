"use client"

export function StickyPrice() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 lg:hidden">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold">$440</span>
            <span className="text-gray-600">/night</span>
          </div>
          <div className="text-sm text-gray-500">19-20 Jan • Guest: 02</div>
        </div>
        <button className="bg-black text-white rounded-full px-8 py-3 text-base font-medium">
          Reserve
        </button>
      </div>
    </div>
  );
} 