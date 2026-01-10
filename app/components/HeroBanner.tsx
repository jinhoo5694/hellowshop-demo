'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const banners = [
  {
    id: 1,
    image: '/images/banners/main01.jpg',
    alt: 'HellowShop 메인 배너 1',
  },
  {
    id: 2,
    image: '/images/banners/main03.jpg',
    alt: 'HellowShop 메인 배너 2',
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

  return (
    <section className="relative overflow-hidden">
      {/* Aspect ratio matches banner dimensions: ~1290x600 */}
      <div className="relative w-full" style={{ aspectRatio: '1290/600' }}>
        {banners.map((banner, idx) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              currentBanner === idx ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={banner.image}
              alt={banner.alt}
              fill
              className="object-cover"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>

      {/* Banner Indicators with white background */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-white/80 px-3 py-2 rounded-full">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentBanner(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentBanner === idx
                ? 'w-6 bg-black'
                : 'bg-black/40 hover:bg-black/60'
            }`}
            aria-label={`배너 ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
