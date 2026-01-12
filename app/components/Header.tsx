'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';

const categories = [
  { id: 'costume', name: '코스튬', icon: '👗' },
  { id: 'wig', name: '위그', icon: '💇' },
  { id: 'accessories', name: '소품/악세서리', icon: '✨' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { totalItems } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-[#ff6b9d] to-[#9c27b0] text-white text-center py-2 text-sm">
        🎉 신규 회원 10% 할인 | 5만원 이상 무료배송
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="메뉴 열기"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/images/logo/logo.png"
              alt="HellowShop"
              width={180}
              height={40}
              className="h-8 sm:h-10 w-auto group-hover:hidden image-smooth"
              priority
            />
            <Image
              src="/images/logo/logo_on.png"
              alt="HellowShop"
              width={180}
              height={40}
              className="h-8 sm:h-10 w-auto hidden group-hover:block image-smooth"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/products"
              className="text-gray-700 hover:text-[#ff6b9d] transition-colors font-medium"
            >
              전체상품
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className="text-gray-700 hover:text-[#ff6b9d] transition-colors font-medium"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
              aria-label="검색"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Cart */}
            <Link href="/cart" className="p-2 rounded-lg hover:bg-gray-100 relative" aria-label="장바구니">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ff6b9d] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-bounce-once">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            {/* User */}
            <button className="hidden sm:block p-2 rounded-lg hover:bg-gray-100" aria-label="마이페이지">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar (expandable) */}
        {isSearchOpen && (
          <div className="pb-4 animate-fade-in">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="작품명, 캐릭터, 상품명으로 검색..."
                  className="w-full px-4 py-3 pl-12 pr-24 rounded-full border border-gray-200 bg-gray-50 focus:outline-none focus:border-[#ff6b9d] focus:bg-white transition-colors"
                  autoFocus
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-[#ff6b9d] to-[#9c27b0] text-white text-sm font-medium rounded-full hover:shadow-md transition-shadow"
                >
                  검색
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 animate-fade-in">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-2">
            <Link
              href="/products"
              className="block px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="font-medium">전체상품</span>
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className="block px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="font-medium">{cat.name}</span>
              </Link>
            ))}
            <div className="border-t border-gray-200 pt-4 mt-4">
              <Link
                href="/cart"
                className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="font-medium">장바구니</span>
                {mounted && totalItems > 0 && (
                  <span className="bg-[#ff6b9d] text-white text-xs px-2 py-1 rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
