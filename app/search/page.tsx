'use client';

import { useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const searchTerms = query.toLowerCase().split(' ').filter(Boolean);

    return products.filter((product) => {
      const searchableText = [
        product.name,
        product.category,
        ...product.tags,
      ].join(' ').toLowerCase();

      return searchTerms.every((term) => searchableText.includes(term));
    });
  }, [query]);

  if (!query.trim()) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h1 className="text-2xl font-bold mb-2">검색어를 입력해주세요</h1>
            <p className="text-gray-500 mb-8">작품명, 캐릭터, 상품명으로 검색할 수 있습니다.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff6b9d] to-[#9c27b0] text-white font-bold rounded-full hover:shadow-lg transition-all"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-xl sm:text-2xl font-bold">
            <span className="text-[#ff6b9d]">&quot;{query}&quot;</span> 검색 결과
          </h1>
          <p className="text-gray-500 mt-1">
            {searchResults.length}개의 상품을 찾았습니다
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {searchResults.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <ProductCard {...product} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😢</div>
            <h2 className="text-xl font-bold mb-2">검색 결과가 없습니다</h2>
            <p className="text-gray-500 mb-6">다른 검색어로 시도해보세요.</p>

            <div className="max-w-md mx-auto">
              <h3 className="text-sm font-medium text-gray-600 mb-3">추천 검색어</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {['원신', '블루아카이브', '미쿠', '코스튬', '위그'].map((term) => (
                  <Link
                    key={term}
                    href={`/search?q=${encodeURIComponent(term)}`}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm hover:border-[#ff6b9d] hover:text-[#ff6b9d] transition-colors"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-gradient-to-r from-[#ff6b9d] to-[#9c27b0] text-white font-bold rounded-full hover:shadow-lg transition-all"
            >
              전체 상품 보기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#ff6b9d] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">검색 중...</p>
        </div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}
