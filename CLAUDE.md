# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## Project Overview

HellowShop 리뉴얼 데모 - 애니메이션 및 코스프레 전문 쇼핑몰. 기존 hellowshop.com의 모바일 반응형 리뉴얼 프로젝트.

## Architecture

Next.js 16 application with App Router, React 19, TypeScript, Tailwind CSS v4.

**Project Structure:**
```
app/
├── components/          # React 컴포넌트
│   ├── Header.tsx       # 반응형 헤더/네비게이션 (모바일 메뉴 포함)
│   ├── Footer.tsx       # 푸터
│   ├── HeroBanner.tsx   # 자동 슬라이드 히어로 배너
│   ├── ProductCard.tsx  # 상품 카드 (할인율, 배지 등)
│   ├── ProductTypeTabs.tsx    # 상품 타입별 sticky 탭 필터
│   ├── AnimeFilterCards.tsx   # 작품별 이미지 카드 필터 (다중 선택)
│   ├── ActiveFilterIndicator.tsx # 선택된 필터 표시
│   └── Providers.tsx    # Context providers wrapper
├── context/
│   └── CartContext.tsx  # 장바구니 상태 관리 (localStorage 연동)
├── data/
│   └── products.ts      # 상품 데이터 및 카테고리 정의
├── products/
│   ├── page.tsx         # 상품 목록 페이지 (필터링, 정렬)
│   └── [id]/page.tsx    # 상품 상세 페이지 (동적 라우팅)
├── cart/
│   └── page.tsx         # 장바구니 페이지
├── search/
│   └── page.tsx         # 검색 결과 페이지
├── layout.tsx           # 루트 레이아웃
├── page.tsx             # 메인 페이지 (상품 필터링 로직)
└── globals.css          # CSS 변수 및 Tailwind 설정
```

## Category Structure (재설계)

기존 중복 카테고리 문제 해결:
- **메인 카테고리** (상품 타입별): 코스튬, 위그, 소품/악세서리, 부츠/신발, 피규어/굿즈
- **필터** (작품별): 원신, 귀멸의 칼날, 블루아카이브, 주술회전 등

## Styling

- Tailwind CSS v4 with CSS variables
- 브랜드 컬러: `#ff6b9d` (primary), `#9c27b0` (secondary)
- 반응형 breakpoints: mobile-first (sm:640px, lg:1024px)
- Dark mode: `prefers-color-scheme` 지원

## External Images

`next.config.ts`에서 `hellowshop.com` 및 `via.placeholder.com` 이미지 허용됨.
