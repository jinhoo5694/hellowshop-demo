'use client';

import { useState } from 'react';
import HeroBanner from './components/HeroBanner';
import ProductCard from './components/ProductCard';
import CategoryFilter from './components/CategoryFilter';
import { products, categories, animeFilters } from './data/products';

export default function Home() {
  const [activeAnimeFilter, setActiveAnimeFilter] = useState('all');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');

  // 필터링된 상품
  const filteredProducts = products.filter((product) => {
    const matchesAnime =
      activeAnimeFilter === 'all' ||
      product.tags.some((tag) => {
        const filter = animeFilters.find((f) => f.id === activeAnimeFilter);
        return filter?.tag && tag.includes(filter.tag);
      });

    const matchesCategory =
      activeCategoryFilter === 'all' ||
      product.categoryId === activeCategoryFilter;

    return matchesAnime && matchesCategory;
  });

  // BEST 상품
  const bestProducts = products.filter((p) => p.isBest);

  // NEW 상품
  const newProducts = products.filter((p) => p.isNew);

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Category Quick Links */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryFilter(cat.id === activeCategoryFilter ? 'all' : cat.id)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                activeCategoryFilter === cat.id
                  ? 'bg-gradient-to-r from-[#ff6b9d] to-[#9c27b0] text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <span className="text-2xl sm:text-3xl">{cat.icon}</span>
              <span className="text-xs sm:text-sm font-medium">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* BEST 상품 */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <span className="text-[#ff6b9d]">🔥</span>
            BEST 인기상품
          </h2>
          <a href="#" className="text-sm text-gray-500 hover:text-[#ff6b9d]">
            더보기 →
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      {/* NEW 신상품 */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <span className="text-[#9c27b0]">✨</span>
            NEW 신상품
          </h2>
          <a href="#" className="text-sm text-gray-500 hover:text-[#ff6b9d]">
            더보기 →
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {newProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      {/* 전체 상품 (필터 적용) */}
      <section className="max-w-7xl mx-auto px-4 py-8" id="all-products">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold">전체 상품</h2>
          <span className="text-sm text-gray-500">{filteredProducts.length}개 상품</span>
        </div>

        {/* 작품별 필터 */}
        <div className="mb-6">
          <CategoryFilter onFilterChange={setActiveAnimeFilter} />
        </div>

        {/* 상품 그리드 */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">해당 조건의 상품이 없습니다.</p>
            <button
              onClick={() => {
                setActiveAnimeFilter('all');
                setActiveCategoryFilter('all');
              }}
              className="mt-4 px-6 py-2 bg-[#ff6b9d] text-white rounded-full hover:bg-[#e91e63] transition-colors"
            >
              필터 초기화
            </button>
          </div>
        )}
      </section>

      {/* 이벤트 배너 */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-[#ff6b9d] to-[#ff8a80] rounded-xl p-6 sm:p-8 text-white">
            <h3 className="text-lg sm:text-xl font-bold mb-2">신규 회원 혜택</h3>
            <p className="text-sm opacity-90 mb-4">가입 즉시 10% 할인 쿠폰 증정</p>
            <button className="px-4 py-2 bg-white text-[#ff6b9d] rounded-full text-sm font-bold hover:shadow-lg transition-shadow">
              회원가입 하기
            </button>
          </div>
          <div className="bg-gradient-to-r from-[#9c27b0] to-[#7b1fa2] rounded-xl p-6 sm:p-8 text-white">
            <h3 className="text-lg sm:text-xl font-bold mb-2">리뷰 이벤트</h3>
            <p className="text-sm opacity-90 mb-4">구매 후기 작성시 포인트 적립</p>
            <button className="px-4 py-2 bg-white text-[#9c27b0] rounded-full text-sm font-bold hover:shadow-lg transition-shadow">
              이벤트 참여
            </button>
          </div>
        </div>
      </section>

      {/* 왜 HellowShop인가? */}
      <section className="bg-gray-50 dark:bg-gray-900 py-12 sm:py-16">
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
