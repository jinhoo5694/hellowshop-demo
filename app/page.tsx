'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import HeroBanner from './components/HeroBanner';
import ProductTypeTabs from './components/ProductTypeTabs';
import AnimeFilterCards, { animeData } from './components/AnimeFilterCards';
import ActiveFilterIndicator from './components/ActiveFilterIndicator';
import ProductCard from './components/ProductCard';
import { products, categories } from './data/products';

export default function Home() {
  const [activeProductType, setActiveProductType] = useState('all');
  const [selectedAnime, setSelectedAnime] = useState<string[]>([]);

  // Create anime name lookup
  const animeNames = useMemo(() => {
    const names: Record<string, string> = {};
    animeData.forEach((a) => {
      names[a.id] = a.name;
    });
    return names;
  }, []);

  // Create anime tag lookup
  const animeTags = useMemo(() => {
    const tags: Record<string, string> = {};
    animeData.forEach((a) => {
      if (a.tag) tags[a.id] = a.tag;
    });
    return tags;
  }, []);

  // Filter products based on both filters
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Filter by product type
      const matchesType = activeProductType === 'all' || product.categoryId === activeProductType;

      // Filter by anime (if any selected)
      const matchesAnime =
        selectedAnime.length === 0 ||
        selectedAnime.some((animeId) => {
          const tag = animeTags[animeId];
          return tag && product.tags.some((t) => t.includes(tag));
        });

      return matchesType && matchesAnime;
    });
  }, [activeProductType, selectedAnime, animeTags]);

  // Toggle anime selection
  const handleAnimeToggle = (animeId: string) => {
    setSelectedAnime((prev) =>
      prev.includes(animeId) ? prev.filter((id) => id !== animeId) : [...prev, animeId]
    );
  };

  // Clear all filters
  const handleClearAll = () => {
    setActiveProductType('all');
    setSelectedAnime([]);
  };

  // Remove single anime filter
  const handleRemoveAnime = (animeId: string) => {
    setSelectedAnime((prev) => prev.filter((id) => id !== animeId));
  };

  return (
    <div className="min-h-screen m-0 p-0">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Product Type Tabs - Sticky */}
      <ProductTypeTabs
        types={categories}
        activeType={activeProductType}
        onTypeChange={setActiveProductType}
      />

      {/* Anime Filter Cards */}
      <AnimeFilterCards selectedAnime={selectedAnime} onAnimeToggle={handleAnimeToggle} />

      {/* Active Filter Indicator */}
      <ActiveFilterIndicator
        productType={activeProductType}
        selectedAnime={selectedAnime}
        animeNames={animeNames}
        totalCount={filteredProducts.length}
        onClearAll={handleClearAll}
        onRemoveAnime={handleRemoveAnime}
      />

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
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
            <p className="text-gray-500 text-lg mb-2">해당 조건의 상품이 없습니다.</p>
            <p className="text-gray-400 text-sm mb-6">다른 필터 조합을 시도해보세요.</p>
            <button
              onClick={handleClearAll}
              className="px-6 py-2 bg-gradient-to-r from-[#ff6b9d] to-[#9c27b0] text-white rounded-full hover:shadow-lg transition-shadow"
            >
              필터 초기화
            </button>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-8">
            왜 <span className="text-[#ff6b9d]">HellowShop</span>인가요?
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl mb-3">🎯</div>
              <h3 className="font-bold mb-1">고품질 의상</h3>
              <p className="text-xs sm:text-sm text-gray-500">꼼꼼한 재단과 마감</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl mb-3">💰</div>
              <h3 className="font-bold mb-1">합리적 가격</h3>
              <p className="text-xs sm:text-sm text-gray-500">중간마진 없는 직거래</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl mb-3">🚚</div>
              <h3 className="font-bold mb-1">빠른 배송</h3>
              <p className="text-xs sm:text-sm text-gray-500">주문 후 2-3일 내 배송</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl mb-3">💬</div>
              <h3 className="font-bold mb-1">친절한 상담</h3>
              <p className="text-xs sm:text-sm text-gray-500">사이즈 및 맞춤 상담</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
