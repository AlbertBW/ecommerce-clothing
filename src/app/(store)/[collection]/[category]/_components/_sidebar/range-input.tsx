"use client";
import { useState } from "react";

export default function RangeInput() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(210);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - 10);
    setMinPrice(value);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + 10);
    setMaxPrice(value);
  };

  return (
    <div className="flex flex-col gap-2 font-light text-sm">
      <div>
        <div className="flex justify-between mb-4 text-xs">
          <label htmlFor="price-range">
            Price: £{minPrice} - £{maxPrice === 210 ? "200+" : maxPrice}
          </label>
        </div>
        <div className="relative h-2">
          <div className="h-1 bg-gray-200 rounded absolute w-full"></div>
          <input
            type="range"
            className="absolute w-full h-1 bg-transparent pointer-events-none appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-blue-500"
            min="0"
            max="210"
            value={maxPrice}
            step="10"
            onChange={handleMaxPriceChange}
          />
          <input
            type="range"
            className="absolute w-full h-1 bg-transparent pointer-events-none appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-blue-500 z-20"
            min="0"
            max="210"
            value={minPrice}
            step="10"
            onChange={handleMinPriceChange}
          />
        </div>
      </div>
      <div className="mx-auto mt-2">
        <button className="w-12 h-8 rounded bg-blue-600 hover:bg-blue-700 transition-colors text-white">
          Go
        </button>
      </div>
    </div>
  );
}
