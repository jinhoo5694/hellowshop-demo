'use client';

import { useState } from 'react';
import Image from 'next/image';

interface AnimeFilter {
  id: string;
  name: string;
  nameEn: string;
  tag?: string;
  gradient: string;
  hoverGradient: string;
  image: string;
}

const animeData: AnimeFilter[] = [
  {
    id: 'genshin',
    name: '원신',
    nameEn: 'Genshin Impact',
    tag: '원신',
    gradient: 'from-amber-400 via-orange-400 to-yellow-500',
    hoverGradient: 'from-amber-500 via-orange-500 to-yellow-600',
    image: '/images/anime/genshin.webp',
  },
  {
    id: 'demon-slayer',
    name: '귀멸의 칼날',
    nameEn: 'Demon Slayer',
    tag: '귀멸의 칼날',
    gradient: 'from-red-500 via-rose-500 to-pink-500',
    hoverGradient: 'from-red-600 via-rose-600 to-pink-600',
    image: '/images/anime/demon-slayer.svg',
  },
  {
    id: 'blue-archive',
    name: '블루아카이브',
    nameEn: 'Blue Archive',
    tag: '블루아카이브',
    gradient: 'from-sky-400 via-blue-400 to-indigo-500',
    hoverGradient: 'from-sky-500 via-blue-500 to-indigo-600',
    image: '/images/anime/blue-archive.webp',
  },
  {
    id: 'jujutsu',
    name: '주술회전',
    nameEn: 'Jujutsu Kaisen',
    tag: '주술회전',
    gradient: 'from-purple-600 via-violet-600 to-indigo-700',
    hoverGradient: 'from-purple-700 via-violet-700 to-indigo-800',
    image: '/images/anime/jujutsu.webp',
  },
  {
    id: 'spy-family',
    name: '스파이패밀리',
    nameEn: 'SPY×FAMILY',
    tag: '스파이패밀리',
    gradient: 'from-emerald-400 via-teal-400 to-cyan-500',
    hoverGradient: 'from-emerald-500 via-teal-500 to-cyan-600',
    image: '/images/anime/spy-family.webp',
  },
  {
    id: 'oshi-no-ko',
    name: '최애의 아이',
    nameEn: 'Oshi no Ko',
    tag: '최애의 아이',
    gradient: 'from-pink-500 via-fuchsia-500 to-purple-500',
    hoverGradient: 'from-pink-600 via-fuchsia-600 to-purple-600',
    image: '/images/anime/oshi-no-ko.webp',
  },
  {
    id: 'honkai',
    name: '붕괴: 스타레일',
    nameEn: 'Honkai: Star Rail',
    tag: '붕괴스타레일',
    gradient: 'from-slate-600 via-gray-600 to-zinc-700',
    hoverGradient: 'from-slate-700 via-gray-700 to-zinc-800',
    image: '/images/anime/honkai.webp',
  },
  {
    id: 'vocaloid',
    name: '보컬로이드',
    nameEn: 'VOCALOID',
    tag: '보컬로이드',
    gradient: 'from-cyan-400 via-teal-400 to-emerald-400',
    hoverGradient: 'from-cyan-500 via-teal-500 to-emerald-500',
    image: '/images/anime/vocaloid.webp',
  },
];

interface AnimeFilterCardsProps {
  selectedAnime: string[];
  onAnimeToggle: (animeId: string) => void;
}

export default function AnimeFilterCards({ selectedAnime, onAnimeToggle }: AnimeFilterCardsProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span className="text-2xl">🎬</span>
        작품별 보기
      </h3>

      {/* Cards Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3">
        {animeData.map((anime) => {
          const isSelected = selectedAnime.includes(anime.id);
          const isHovered = hoveredCard === anime.id;

          return (
            <button
              key={anime.id}
              onClick={() => onAnimeToggle(anime.id)}
              onMouseEnter={() => setHoveredCard(anime.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`
                relative group overflow-hidden rounded-xl sm:rounded-2xl aspect-[3/4]
                transition-all duration-300 ease-out
                ${isSelected ? 'ring-2 sm:ring-4 ring-[#ff6b9d] ring-offset-1 sm:ring-offset-2 scale-[1.02]' : ''}
                ${isHovered && !isSelected ? 'scale-105 shadow-xl' : 'shadow-md'}
              `}
              style={{
                transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
              }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={anime.image}
                  alt={anime.name}
                  fill
                  className={`
                    object-cover transition-all duration-500
                    ${isHovered ? 'scale-110' : 'scale-100'}
                  `}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 12.5vw"
                />
              </div>

              {/* Gradient Overlay */}
              <div
                className={`
                  absolute inset-0 transition-opacity duration-300
                  ${isSelected
                    ? `bg-gradient-to-t ${anime.gradient} opacity-60`
                    : isHovered
                      ? 'bg-gradient-to-t from-black/80 via-black/40 to-transparent'
                      : 'bg-gradient-to-t from-black/70 via-black/30 to-transparent'
                  }
                `}
              />

              {/* Shine effect on hover */}
              <div
                className={`
                  absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
                  transition-transform duration-700 ease-out
                  ${isHovered ? 'translate-x-full' : '-translate-x-full'}
                `}
              />

              {/* Selection checkmark */}
              {isSelected && (
                <div className="absolute top-1 right-1 sm:top-2 sm:right-2 w-4 h-4 sm:w-6 sm:h-6 bg-white rounded-full flex items-center justify-center shadow-lg animate-bounce-once z-10">
                  <svg className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-[#ff6b9d]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}

              {/* Names at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-1.5 sm:p-3 z-10">
                <p className={`
                  text-[10px] sm:text-sm font-bold text-white leading-tight drop-shadow-lg
                  transition-transform duration-300
                  ${isHovered ? 'translate-y-0' : 'translate-y-0'}
                `}>
                  {anime.name}
                </p>
                <p className={`
                  text-[8px] sm:text-[10px] text-white/80 mt-0.5 drop-shadow
                  transition-all duration-300 hidden sm:block
                  ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-70'}
                `}>
                  {anime.nameEn}
                </p>
              </div>

              {/* Animated border when selected */}
              {isSelected && (
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-white/50 sm:border-2 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected count indicator */}
      {selectedAnime.length > 0 && (
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 animate-fade-in">
          <span className="inline-flex items-center justify-center w-6 h-6 bg-gradient-to-r from-[#ff6b9d] to-[#9c27b0] text-white text-xs font-bold rounded-full">
            {selectedAnime.length}
          </span>
          <span>개 작품 선택됨</span>
        </div>
      )}
    </section>
  );
}

export { animeData };
