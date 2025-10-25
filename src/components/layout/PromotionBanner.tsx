'use client';

import React, { useState, useEffect } from 'react';

interface Banner {
    id: number;
    image: string;
    icon: string;
}

export const PromotionBanner: React.FC = () => {
    const [currentBanner, setCurrentBanner] = useState(0);

    const banners: Banner[] = [
        {
            id: 1,
            image: "/images/banners/promotional-banner1.png",
            icon: "🎁"
        },
        {
            id: 2,
            image: "/images/banners/promotional-banner2.png",
            icon: "💰"
        },
    ];

    // Auto-rotate banners
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBanner((prev) => (prev + 1) % banners.length);
        }, 5000); // Change banner every 5 seconds

        return () => clearInterval(interval);
    }, [banners.length]);

    const nextBanner = () => {
        setCurrentBanner((prev) => (prev + 1) % banners.length);
    };

    const prevBanner = () => {
        setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
    };

    const goToBanner = (index: number) => {
        setCurrentBanner(index);
    };

    return (
        <div className="relative mt-16 lg:mt-0 overflow-hidden">
            {/* Banner Carousel - Increased height for images */}
            <div className="relative h-40 md:h-48 lg:h-56 xl:h-64"> {/* Increased heights */}
                {banners.map((banner, index) => (
                    <div
                        key={banner.id}
                        className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                            index === currentBanner
                                ? 'opacity-100 translate-x-0'
                                : index < currentBanner
                                    ? 'opacity-0 -translate-x-full'
                                    : 'opacity-0 translate-x-full'
                        }`}
                    >
                        {/* Full-size banner image */}
                        <div className="absolute inset-0">
                            <img
                                src={banner.image}
                                alt={`Promotional Banner ${banner.id}`}
                                className="w-full h-full object-cover object-center"
                                onError={(e) => {
                                    // Fallback if image fails to load
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                }}
                            />

                            {/* Fallback gradient background if image doesn't load */}
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 hidden"
                                 id={`fallback-${banner.id}`}>
                                <div className="flex items-center justify-center h-full">
                                    <span className="text-white text-4xl">{banner.icon}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows - Repositioned for larger banner */}
            <button
                onClick={prevBanner}
                className="hidden md:flex absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black bg-opacity-30 rounded-full items-center justify-center text-white hover:bg-opacity-50 transition-all duration-200 z-10"
            >
                ‹
            </button>
            <button
                onClick={nextBanner}
                className="hidden md:flex absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black bg-opacity-30 rounded-full items-center justify-center text-white hover:bg-opacity-50 transition-all duration-200 z-10"
            >
                ›
            </button>

            {/* Dots Indicator - Repositioned for larger banner */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToBanner(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentBanner
                                ? 'bg-white scale-125 shadow-lg'
                                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                        }`}
                    />
                ))}
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white bg-opacity-20">
                <div
                    className="h-full bg-white transition-all duration-5000 ease-linear"
                    style={{
                        width: '100%',
                        transform: `scaleX(${(currentBanner + 1) / banners.length})`,
                        transformOrigin: 'left'
                    }}
                    key={currentBanner}
                />
            </div>
        </div>
    );
};