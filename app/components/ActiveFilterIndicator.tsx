'use client';

interface ActiveFilterIndicatorProps {
  productType: string | null;
  selectedAnime: string[];
  animeNames: Record<string, string>;
  totalCount: number;
  onClearAll: () => void;
  onRemoveAnime: (animeId: string) => void;
}

export default function ActiveFilterIndicator({
  productType,
  selectedAnime,
  animeNames,
  totalCount,
  onClearAll,
  onRemoveAnime,
}: ActiveFilterIndicatorProps) {
  const hasFilters = productType !== 'all' || selectedAnime.length > 0;

  if (!hasFilters) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-3">
        <p className="text-sm text-gray-500">
          전체 상품 <span className="font-semibold text-gray-900">{totalCount}개</span>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-gray-500">필터:</span>

        {/* Selected anime tags */}
        {selectedAnime.map((animeId) => (
          <span
            key={animeId}
            className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-[#ff6b9d] to-[#9c27b0] text-white text-sm rounded-full"
          >
            {animeNames[animeId] || animeId}
            <button
              onClick={() => onRemoveAnime(animeId)}
              className="ml-1 hover:bg-white/20 rounded-full p-0.5"
              aria-label={`${animeNames[animeId]} 필터 제거`}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
        ))}

        {/* Result count */}
        <span className="text-sm text-gray-700 ml-2">
          <span className="font-semibold">{totalCount}개</span> 상품
        </span>

        {/* Clear all button */}
        <button
          onClick={onClearAll}
          className="ml-auto text-sm text-gray-500 hover:text-[#ff6b9d] underline"
        >
          필터 초기화
        </button>
      </div>
    </div>
  );
}
