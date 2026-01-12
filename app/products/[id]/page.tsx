'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { products } from '@/app/data/products';
import ProductCard from '@/app/components/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;

  const product = useMemo(() =>
    products.find((p) => p.id === productId),
    [productId]
  );

  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Generate mock additional images (in real app, product would have multiple images)
  const productImages = useMemo(() => {
    if (!product) return [];
    return [product.imageUrl, product.imageUrl, product.imageUrl];
  }, [product]);

  // Related products (same category or same tags)
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) =>
        p.id !== product.id &&
        (p.categoryId === product.categoryId ||
         p.tags.some((tag) => product.tags.includes(tag)))
      )
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">404</div>
          <h1 className="text-2xl font-bold mb-2">상품을 찾을 수 없습니다</h1>
          <Link
            href="/"
            className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-[#ff6b9d] to-[#9c27b0] text-white rounded-full font-medium hover:shadow-lg transition-shadow"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const discountPercent = product.salePrice
    ? Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100)
    : 0;

  const currentPrice = product.salePrice || product.originalPrice;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#ff6b9d] transition-colors">홈</Link>
          <span>/</span>
          <Link href={`/?category=${product.categoryId}`} className="hover:text-[#ff6b9d] transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div
              className={`relative aspect-square rounded-2xl overflow-hidden bg-gray-50 cursor-zoom-in group ${isZoomed ? 'cursor-zoom-out' : ''}`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <Image
                src={productImages[activeImageIndex]}
                alt={product.name}
                fill
                className={`object-cover transition-transform duration-500 ${isZoomed ? 'scale-150' : 'group-hover:scale-105'}`}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="px-3 py-1.5 bg-[#9c27b0] text-white text-sm font-bold rounded-lg shadow-lg animate-fade-in">
                    NEW
                  </span>
                )}
                {product.isBest && (
                  <span className="px-3 py-1.5 bg-[#ff6b9d] text-white text-sm font-bold rounded-lg shadow-lg animate-fade-in">
                    BEST
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="px-3 py-1.5 bg-red-500 text-white text-sm font-bold rounded-lg shadow-lg animate-fade-in">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Zoom Hint */}
              <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/50 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                클릭하여 {isZoomed ? '축소' : '확대'}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300 ${
                    activeImageIndex === index
                      ? 'ring-2 ring-[#ff6b9d] ring-offset-2 scale-105'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6 lg:sticky lg:top-32 lg:self-start">
            {/* Category & Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                {product.category}
              </span>
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gradient-to-r from-[#ff6b9d]/10 to-[#9c27b0]/10 text-[#9c27b0] text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Product Name */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Price Section */}
            <div className="flex items-end gap-3 pb-6 border-b border-gray-100">
              {product.salePrice ? (
                <>
                  <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#ff6b9d] to-[#9c27b0] bg-clip-text text-transparent">
                    {product.salePrice.toLocaleString()}원
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    {product.originalPrice.toLocaleString()}원
                  </span>
                  <span className="px-2 py-1 bg-red-500 text-white text-sm font-bold rounded">
                    {discountPercent}%
                  </span>
                </>
              ) : (
                <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                  {product.originalPrice.toLocaleString()}원
                </span>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-4 py-4 border-b border-gray-100">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">배송비</span>
                <span className="font-medium">3,000원 (50,000원 이상 무료)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">예상 도착일</span>
                <span className="font-medium text-[#ff6b9d]">2-4일 이내</span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 py-4">
              <span className="text-gray-700 font-medium">수량</span>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                  disabled={quantity <= 1}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="w-16 text-center font-bold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
              <span className="text-gray-500 text-sm">
                총 <span className="font-bold text-[#ff6b9d]">{(currentPrice * quantity).toLocaleString()}원</span>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`w-14 h-14 flex items-center justify-center rounded-xl border-2 transition-all duration-300 ${
                  isWishlisted
                    ? 'border-[#ff6b9d] bg-[#ff6b9d]/10 text-[#ff6b9d]'
                    : 'border-gray-200 text-gray-400 hover:border-[#ff6b9d] hover:text-[#ff6b9d]'
                }`}
                aria-label="찜하기"
              >
                <svg
                  className={`w-6 h-6 transition-transform duration-300 ${isWishlisted ? 'scale-110' : ''}`}
                  fill={isWishlisted ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>

              <button className="flex-1 h-14 flex items-center justify-center gap-2 border-2 border-[#ff6b9d] text-[#ff6b9d] font-bold rounded-xl hover:bg-[#ff6b9d]/5 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                장바구니
              </button>

              <button className="flex-1 h-14 flex items-center justify-center gap-2 bg-gradient-to-r from-[#ff6b9d] to-[#9c27b0] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#ff6b9d]/30 transition-all duration-300 hover:-translate-y-0.5">
                바로구매
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-6 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <svg className="w-5 h-5 text-[#ff6b9d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                안전결제
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <svg className="w-5 h-5 text-[#ff6b9d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                교환/환불
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <svg className="w-5 h-5 text-[#ff6b9d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                빠른배송
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-gradient-to-b from-[#ff6b9d] to-[#9c27b0] rounded-full"></span>
            상품 상세정보
          </h2>

          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="prose max-w-none">
              <div className="flex flex-col items-center gap-6">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="rounded-xl"
                />
                <div className="text-center text-gray-600 space-y-4">
                  <p className="text-lg">
                    {product.name}
                  </p>
                  <p>
                    고퀄리티 코스프레 의상으로 완벽한 캐릭터 재현이 가능합니다.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 pt-4">
                    <span className="px-4 py-2 bg-gray-100 rounded-full text-sm">프리미엄 원단</span>
                    <span className="px-4 py-2 bg-gray-100 rounded-full text-sm">섬세한 디테일</span>
                    <span className="px-4 py-2 bg-gray-100 rounded-full text-sm">편안한 착용감</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-[#ff6b9d] to-[#9c27b0] rounded-full"></span>
              함께 보면 좋은 상품
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`}>
                  <ProductCard {...relatedProduct} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sticky Bottom Bar (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 lg:hidden z-50">
        <div className="flex items-center gap-3 max-w-7xl mx-auto">
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`w-12 h-12 flex items-center justify-center rounded-xl border transition-all ${
              isWishlisted
                ? 'border-[#ff6b9d] bg-[#ff6b9d]/10 text-[#ff6b9d]'
                : 'border-gray-200 text-gray-400'
            }`}
          >
            <svg
              className="w-5 h-5"
              fill={isWishlisted ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          <button className="flex-1 h-12 flex items-center justify-center gap-2 bg-gradient-to-r from-[#ff6b9d] to-[#9c27b0] text-white font-bold rounded-xl">
            {(currentPrice * quantity).toLocaleString()}원 구매하기
          </button>
        </div>
      </div>

      {/* Bottom padding for mobile sticky bar */}
      <div className="h-20 lg:hidden" />
    </div>
  );
}
