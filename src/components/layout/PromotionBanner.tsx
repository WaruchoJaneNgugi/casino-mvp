'use client';

import React, { useState, useEffect } from 'react';
import '../../styles/promotional-banner.css';

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
        }, 5000);

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
        <div className="promotion-banner">
            {/* Banner Carousel */}
            <div className="banner-container">
                {banners.map((banner, index) => (
                    <div
                        key={banner.id}
                        className={`banner-slide ${
                            index === currentBanner
                                ? 'banner-active'
                                : index < currentBanner
                                    ? 'banner-prev'
                                    : 'banner-next'
                        }`}
                    >
                        {/* Full-size banner image */}
                        <div className="banner-image-container">
                            <img
                                src={banner.image}
                                alt={`Promotional Banner ${banner.id}`}
                                className="banner-image"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    const fallback = target.nextElementSibling as HTMLElement;
                                    if (fallback) fallback.style.display = 'flex';
                                }}
                            />
                            {/* Fallback gradient background if image doesn't load */}
                            <div className="banner-fallback">
                                <span className="fallback-icon">{banner.icon}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevBanner}
                className="banner-nav banner-nav-prev"
            >
                ‹
            </button>
            <button
                onClick={nextBanner}
                className="banner-nav banner-nav-next"
            >
                ›
            </button>

            {/* Dots Indicator */}
            <div className="banner-dots">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToBanner(index)}
                        className={`banner-dot ${
                            index === currentBanner ? 'banner-dot-active' : ''
                        }`}
                    />
                ))}
            </div>

            {/* Progress Bar */}
            <div className="banner-progress">
                <div
                    className="banner-progress-bar"
                    style={{
                        transform: `scaleX(${(currentBanner + 1) / banners.length})`
                    }}
                    key={currentBanner}
                />
            </div>
        </div>
    );
};