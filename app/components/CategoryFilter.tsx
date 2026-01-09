'use client';

import { useState } from 'react';

const animeFilters = [
  { id: 'all', name: '전체' },
  { id: 'genshin', name: '원신' },
  { id: 'demon-slayer', name: '귀멸의 칼날' },
  { id: 'blue-archive', name: '블루아카이브' },
  { id: 'jujutsu', name: '주술회전' },
  { id: 'spy-family', name: '스파이패밀리' },
  { id: 'oshi-no-ko', name: '최애의 아이' },
  { id: 'honkai', name: '붕괴: 스타레일' },
  { id: 'vocaloid', name: '보컬로이드' },
];

interface CategoryFilterProps {
  onFilterChange?: (filter: string) => void;
}

export default function CategoryFilter({ onFilterChange }: CategoryFilterProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId);
    onFilterChange?.(filterId);
  };

  return (
    <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
      <div className="flex gap-2 pb-2 min-w-max">
        {animeFilters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => handleFilterClick(filter.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeFilter === filter.id
                ? 'bg-gradient-to-r from-[#ff6b9d] to-[#9c27b0] text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {filter.name}
          </button>
        ))}
      </div>
    </div>
  );
}
