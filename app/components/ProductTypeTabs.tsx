'use client';

interface ProductType {
  id: string;
  name: string;
  icon: string;
  count: number;
}

interface ProductTypeTabsProps {
  types: ProductType[];
  activeType: string;
  onTypeChange: (typeId: string) => void;
}

export default function ProductTypeTabs({ types, activeType, onTypeChange }: ProductTypeTabsProps) {
  const allCount = types.reduce((sum, t) => sum + t.count, 0);

  return (
    <div className="sticky top-[104px] z-40 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-1 overflow-x-auto scrollbar-hide py-2 touch-pan-x" style={{ WebkitOverflowScrolling: 'touch' }}>
          {/* All tab */}
          <button
            onClick={() => onTypeChange('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              activeType === 'all'
                ? 'bg-gradient-to-r from-[#ff6b9d] to-[#9c27b0] text-white font-semibold shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>전체</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              activeType === 'all' ? 'bg-white/20' : 'bg-gray-200'
            }`}>
              {allCount}
            </span>
          </button>

          {/* Product type tabs */}
          {types.map((type) => (
            <button
              key={type.id}
              onClick={() => onTypeChange(type.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                activeType === type.id
                  ? 'bg-gradient-to-r from-[#ff6b9d] to-[#9c27b0] text-white font-semibold shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{type.name}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeType === type.id ? 'bg-white/20' : 'bg-gray-200'
              }`}>
                {type.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
