'use client';

import { useState, useEffect } from 'react';

const banners = [
  {
    id: 1,
    title: '2024 신상 코스튬',
    subtitle: '인기 애니메이션 코스프레 의상 대거 입고',
    cta: '지금 보러가기',
    bgGradient: 'from-[#ff6b9d] via-[#ff8a80] to-[#9c27b0]',
  },
  {
    id: 2,
    title: 'WINTER SALE',
    subtitle: '전 상품 최대 50% 할인',
    cta: '할인 상품 보기',
    bgGradient: 'from-[#9c27b0] via-[#7b1fa2] to-[#ff6b9d]',
  },
  {
    id: 3,
    title: '원신 코스튬 특가',
    subtitle: '풀세트 구매시 위그 무료 증정',
    cta: '이벤트 참여하기',
    bgGradient: 'from-[#00bcd4] via-[#26c6da] to-[#9c27b0]',
  },
];

export default function HeroBanner() {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const banner = banners[currentBanner];

  return (
    <section className="relative overflow-hidden">
      <div
        className={`bg-gradient-to-r ${banner.bgGradient} transition-all duration-500`}
      >
        <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 md:py-20">
          <div className="text-center text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              {banner.title}
            </h1>
            <p className="text-lg sm:text-xl opacity-90 mb-6">
              {banner.subtitle}
            </p>
            <button className="px-8 py-3 bg-white text-[#9c27b0] font-bold rounded-full hover:shadow-xl transition-shadow">
              {banner.cta}
            </button>
          </div>
        </div>
      </div>

      {/* Banner Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentBanner(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentBanner === idx
                ? 'w-6 bg-white'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`배너 ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
