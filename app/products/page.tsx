'use client';

import { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import { animeData } from '../components/AnimeFilterCards';

type SortOption = 'latest' | 'price-low' | 'price-high' | 'discount';

function ProductListContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [activeCategory, setActiveCategory] = useState(categoryParam || 'all');
  const [selectedAnime, setSelectedAnime] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'latest', label: '최신순' },
    { value: 'price-low', label: '낮은 가격순' },
    { value: 'price-high', label: '높은 가격순' },
    { value: 'discount', label: '할인율순' },
  ];

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory = activeCategory === 'all' || product.categoryId === activeCategory;
      const matchesAnime =
        selectedAnime.length === 0 ||
        selectedAnime.some((animeId) => {
          const anime = animeData.find((a) => a.id === animeId);
          return anime?.tag && product.tags.some((t) => t.includes(anime.tag!));
        });
      return matchesCategory && matchesAnime;
    });

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice));
        break;
      case 'price-high':
        result.sort((a, b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice));
        break;
      case 'discount':
        result.sort((a, b) => {
          const discountA = a.salePrice ? ((a.originalPrice - a.salePrice) / a.originalPrice) * 100 : 0;
          const discountB = b.salePrice ? ((b.originalPrice - b.salePrice) / b.originalPrice) * 100 : 0;
          return discountB - discountA;
        });
        break;
      default:
        // latest - keep original order or sort by isNew
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [activeCategory, selectedAnime, sortBy]);

  const handleAnimeToggle = (animeId: string) => {
    setSelectedAnime((prev) =>
      prev.includes(animeId) ? prev.filter((id) => id !== animeId) : [...prev, animeId]
    );
  };

  const clearFilters = () => {
    setActiveCategory('all');
    setSelectedAnime([]);
  };

  const categoryName = categories.find((c) => c.id === activeCategory)?.name || '전체';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-[104px] z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-[#ff6b9d] to-[#9c27b0] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              전체 ({products.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-[#ff6b9d] to-[#9c27b0] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Anime Filter */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span>🎬</span> 작품별 필터
          </h3>
          <div className="flex flex-wrap gap-2">
            {animeData.map((anime) => (
              <button
                key={anime.id}
                onClick={() => handleAnimeToggle(anime.id)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  selectedAnime.includes(anime.id)
                    ? 'bg-gradient-to-r from-[#ff6b9d] to-[#9c27b0] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {anime.name}
              </button>
            ))}
          </div>
          {selectedAnime.length > 0 && (
            <button
              onClick={() => setSelectedAnime([])}
              className="mt-3 text-sm text-[#ff6b9d] hover:underline"
            >
              작품 필터 초기화
            </button>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold">{categoryName}</h1>
            <span className="text-gray-500 text-sm">({filteredProducts.length}개)</span>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:border-gray-300 transition-colors"
            >
              {sortOptions.find((o) => o.value === sortBy)?.label}
              <svg className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isSortOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-10 min-w-[140px]">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setIsSortOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                      sortBy === option.value ? 'text-[#ff6b9d] font-medium bg-pink-50' : ''
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Active Filters */}
        {(activeCategory !== 'all' || selectedAnime.length > 0) && (
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="text-sm text-gray-500">적용된 필터:</span>
            {activeCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#ff6b9d]/10 text-[#ff6b9d] text-sm rounded-full">
                {categoryName}
                <button onClick={() => setActiveCategory('all')} className="hover:text-[#e91e63]">×</button>
              </span>
            )}
            {selectedAnime.map((animeId) => {
              const anime = animeData.find((a) => a.id === animeId);
              return (
                <span key={animeId} className="inline-flex items-center gap-1 px-3 py-1 bg-[#9c27b0]/10 text-[#9c27b0] text-sm rounded-full">
                  {anime?.name}
                  <button onClick={() => handleAnimeToggle(animeId)} className="hover:text-[#7b1fa2]">×</button>
                </span>
              );
            })}
            <button
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-gray-700 underline ml-2"
            >
              전체 초기화
            </button>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <ProductCard {...product} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-bold mb-2">상품이 없습니다</h2>
            <p className="text-gray-500 mb-6">다른 필터 조합을 시도해보세요.</p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-gradient-to-r from-[#ff6b9d] to-[#9c27b0] text-white font-bold rounded-full hover:shadow-lg transition-all"
            >
              필터 초기화
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductListPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#ff6b9d] border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <ProductListContent />
    </Suspense>
  );
}
