'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const shippingFee = totalPrice >= 50000 ? 0 : 3000;
  const finalTotal = totalPrice + shippingFee;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="text-8xl mb-6">🛒</div>
            <h1 className="text-2xl font-bold mb-2">장바구니가 비어있습니다</h1>
            <p className="text-gray-500 mb-8">원하는 상품을 담아보세요!</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#ff6b9d] to-[#9c27b0] text-white font-bold rounded-full hover:shadow-lg transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              쇼핑 계속하기
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
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <span className="text-3xl">🛒</span>
            장바구니
            <span className="text-lg font-normal text-gray-500">({items.length}개 상품)</span>
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Select All / Clear */}
            <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm">
              <span className="font-medium">전체 {items.length}개</span>
              <button
                onClick={clearCart}
                className="text-sm text-gray-500 hover:text-red-500 transition-colors"
              >
                전체 삭제
              </button>
            </div>

            {/* Items */}
            {items.map((item) => {
              const price = item.salePrice || item.originalPrice;
              const itemTotal = price * item.quantity;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    {/* Image */}
                    <Link href={`/products/${item.id}`} className="flex-shrink-0">
                      <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover hover:scale-105 transition-transform"
                          sizes="128px"
                        />
                      </div>
                    </Link>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/products/${item.id}`}>
                        <h3 className="font-medium text-gray-900 hover:text-[#ff6b9d] transition-colors line-clamp-2 mb-2">
                          {item.name}
                        </h3>
                      </Link>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-4">
                        {item.salePrice ? (
                          <>
                            <span className="font-bold text-[#ff6b9d]">
                              {item.salePrice.toLocaleString()}원
                            </span>
                            <span className="text-sm text-gray-400 line-through">
                              {item.originalPrice.toLocaleString()}원
                            </span>
                          </>
                        ) : (
                          <span className="font-bold">
                            {item.originalPrice.toLocaleString()}원
                          </span>
                        )}
                      </div>

                      {/* Quantity & Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </button>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="font-bold text-lg hidden sm:block">
                            {itemTotal.toLocaleString()}원
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="삭제"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-32">
              <h2 className="text-lg font-bold mb-6">주문 요약</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>상품 금액</span>
                  <span>{totalPrice.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>배송비</span>
                  <span className={shippingFee === 0 ? 'text-[#ff6b9d] font-medium' : ''}>
                    {shippingFee === 0 ? '무료' : `${shippingFee.toLocaleString()}원`}
                  </span>
                </div>
                {shippingFee > 0 && (
                  <p className="text-xs text-gray-400">
                    {(50000 - totalPrice).toLocaleString()}원 추가 주문 시 무료배송
                  </p>
                )}
                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="font-bold text-lg">총 결제금액</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-[#ff6b9d] to-[#9c27b0] bg-clip-text text-transparent">
                    {finalTotal.toLocaleString()}원
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCheckingOut(true);
                  setTimeout(() => {
                    alert('데모 페이지입니다. 실제 결제는 진행되지 않습니다.');
                    setIsCheckingOut(false);
                  }, 500);
                }}
                disabled={isCheckingOut}
                className="w-full py-4 bg-gradient-to-r from-[#ff6b9d] to-[#9c27b0] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#ff6b9d]/30 transition-all disabled:opacity-50"
              >
                {isCheckingOut ? '처리중...' : `${finalTotal.toLocaleString()}원 결제하기`}
              </button>

              <Link
                href="/"
                className="block text-center mt-4 text-gray-500 hover:text-[#ff6b9d] transition-colors text-sm"
              >
                쇼핑 계속하기
              </Link>

              {/* Benefits */}
              <div className="mt-6 pt-6 border-t space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="w-5 h-5 text-[#ff6b9d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  안전한 결제 시스템
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="w-5 h-5 text-[#ff6b9d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  2-4일 이내 배송
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="w-5 h-5 text-[#ff6b9d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  7일 이내 교환/환불
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 lg:hidden z-50">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-600">총 결제금액</span>
          <span className="text-xl font-bold text-[#ff6b9d]">{finalTotal.toLocaleString()}원</span>
        </div>
        <button
          onClick={() => {
            setIsCheckingOut(true);
            setTimeout(() => {
              alert('데모 페이지입니다. 실제 결제는 진행되지 않습니다.');
              setIsCheckingOut(false);
            }, 500);
          }}
          disabled={isCheckingOut}
          className="w-full py-4 bg-gradient-to-r from-[#ff6b9d] to-[#9c27b0] text-white font-bold rounded-xl"
        >
          {isCheckingOut ? '처리중...' : '결제하기'}
        </button>
      </div>
      <div className="h-32 lg:hidden" />
    </div>
  );
}
