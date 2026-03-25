'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { MainSpinGameArea } from "@/components/games/Spin1/Components/MainSpinGameArea";

export default function SpinsPage() {
    const [isOverlayOpen, setIsOverlayOpen] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleCloseOverlay = useCallback(() => {
        setIsAnimating(true);
        setTimeout(() => {
            setIsOverlayOpen(false);
            setIsAnimating(false);
        }, 300);
    }, []);

    // Handle escape key press
    useEffect(() => {
        const handleEscapeKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleCloseOverlay();
            }
        };

        if (isOverlayOpen) {
            document.addEventListener('keydown', handleEscapeKey);
            // Prevent body scroll when overlay is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'auto';
        };
    }, [isOverlayOpen, handleCloseOverlay]);

    // Close overlay on outside click
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleCloseOverlay();
        }
    };

    if (!isOverlayOpen) {
        return null;
    }

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
                isAnimating ? 'bg-opacity-0' : 'bg-opacity-70'
            } bg-black`}
            onClick={handleBackdropClick}
        >
            <div
                className={`relative bg-gray-800 rounded-lg shadow-2xl overflow-hidden w-full max-w-4xl mx-4 transform transition-all duration-300 ${
                    isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
                }`}
            >
                {/* Close button */}
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                    <button
                        onClick={handleCloseOverlay}
                        className="p-2 rounded-full bg-gray-900 bg-opacity-70 hover:bg-red-600 hover:bg-opacity-90 transition-all duration-200 group"
                        aria-label="Close game overlay"
                    >
                        <svg
                            className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    {/* Optional: Add a minimize button if needed */}
                    <button
                        onClick={handleCloseOverlay}
                        className="p-2 rounded-full bg-gray-900 bg-opacity-70 hover:bg-yellow-600 hover:bg-opacity-90 transition-all duration-200 group"
                        aria-label="Minimize"
                    >
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 12H4"
                            />
                        </svg>
                    </button>
                </div>

                {/* Optional title bar */}
                <div className="px-6 py-4 border-b border-gray-700 bg-gray-900">
                    <h2 className="text-xl font-bold text-white">Spin Game</h2>
                    <p className="text-sm text-gray-400">Try your luck and spin to win!</p>
                </div>

                {/* Game content */}
                <div className="spins-game-container">
                    <MainSpinGameArea />
                </div>
            </div>
        </div>
    );
}