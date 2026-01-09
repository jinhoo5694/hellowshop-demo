import Image from 'next/image';

interface ProductCardProps {
  id: string;
  name: string;
  originalPrice: number;
  salePrice?: number;
  imageUrl: string;
  category: string;
  tags?: string[];
  isNew?: boolean;
  isBest?: boolean;
}

export default function ProductCard({
  name,
  originalPrice,
  salePrice,
  imageUrl,
  category,
  tags = [],
  isNew = false,
  isBest = false,
}: ProductCardProps) {
  const discountPercent = salePrice
    ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
    : 0;

  return (
    <div className="group cursor-pointer">
      {/* Image Container */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-3">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isNew && (
            <span className="px-2 py-1 bg-[#9c27b0] text-white text-xs font-bold rounded">
              NEW
            </span>
          )}
          {isBest && (
            <span className="px-2 py-1 bg-[#ff6b9d] text-white text-xs font-bold rounded">
              BEST
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
              {discountPercent}%
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className="p-2 bg-white dark:bg-gray-900 rounded-full shadow-lg hover:bg-[#ff6b9d] hover:text-white transition-colors"
            aria-label="찜하기"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button
            className="p-2 bg-white dark:bg-gray-900 rounded-full shadow-lg hover:bg-[#ff6b9d] hover:text-white transition-colors"
            aria-label="장바구니에 담기"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-1">
        <p className="text-xs text-gray-500 dark:text-gray-400">{category}</p>
        <h3 className="font-medium text-sm line-clamp-2 group-hover:text-[#ff6b9d] transition-colors">
          {name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          {salePrice ? (
            <>
              <span className="text-lg font-bold text-[#ff6b9d]">
                {salePrice.toLocaleString()}원
              </span>
              <span className="text-sm text-gray-400 line-through">
                {originalPrice.toLocaleString()}원
              </span>
            </>
          ) : (
            <span className="text-lg font-bold">
              {originalPrice.toLocaleString()}원
            </span>
          )}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
