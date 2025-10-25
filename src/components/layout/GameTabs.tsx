import React, { useState, useRef } from 'react';
import {getGamesByCategory} from "@/utils/imageutils";

interface GameTabsProps {
    onGameSelect: (gameId: string, category: string, gameNumber?: number) => void;
    userLoggedIn: boolean;
}

export const GameTabs: React.FC<GameTabsProps> = ({ onGameSelect, userLoggedIn }) => {
    const [activeTab, setActiveTab] = useState('slots');
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const categories = [
        { id: 'slots', name: 'Slots', icon: '🎰' },
        { id: 'jackpots', name: 'Jackpots', icon: '💰' },
        { id: 'spins', name: 'Spins', icon: '🎯' },
        { id: 'roulettes', name: 'Roulettes', icon: '🎡' },
        { id: 'originals', name: 'Originals', icon: '⭐' },
    ];

    const originalsGames = [
        { id: 'dice', name: 'Dice', image: '/images/games/dice.png', players: '2,325' },
        { id: 'mines', name: 'Mines', image: '/images/games/mines.png', players: '2,839' },
        { id: 'crash', name: 'Crash', image: '/images/games/crash.png', players: '1,380' },
        { id: 'plinko', name: 'Plinko', image: '/images/games/plinko.png', players: '1,925' },
        { id: 'blackjack', name: 'Blackjack', image: '/images/games/blackjack.png', players: '1,542' },
        { id: 'roulette', name: 'Roulette', image: '/images/games/roulette.png', players: '2,118' },
    ];

    const handleGameClick = (gameId: string, category: string, gameNumber?: number) => {
        if (!userLoggedIn) {
            alert('Please login to play games!');
            return;
        }
        onGameSelect(gameId, category, gameNumber);
    };

    // Scroll functions for mobile
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -150, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 150, behavior: 'smooth' });
        }
    };

    const renderGames = () => {
        if (activeTab === 'originals') {
            return (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {originalsGames.map((game) => (
                        <div
                            key={game.id}
                            onClick={() => handleGameClick(game.id, 'originals')}
                            className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                        >
                            <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-1 glow-orange group-hover:glow-gold transition-all duration-300">
                                <div className="bg-stake-dark rounded-xl p-3 text-center">
                                    <div className="aspect-video rounded-lg mb-2 flex items-center justify-center relative overflow-hidden">
                                        <img
                                            src={game.image}
                                            alt={game.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.style.display = 'none';
                                                target.nextElementSibling?.classList.remove('hidden');
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-500 hidden flex items-center justify-center">
                                            <span className="text-2xl">🎮</span>
                                        </div>
                                    </div>
                                    <h3 className="text-white font-bold text-sm mb-1">{game.name}</h3>
                                    <div className="flex items-center justify-center space-x-1">
                                        <div className="w-2 h-2 bg-stake-green rounded-full animate-pulse"></div>
                                        <span className="text-gray-400 text-xs">{game.players}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        const games = getGamesByCategory(activeTab);

        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {games.map((game) => (
                    <div
                        key={game.id}
                        onClick={() => handleGameClick(game.id, activeTab, game.number)}
                        className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                    >
                        <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-1 glow-orange group-hover:glow-gold transition-all duration-300">
                            <div className="bg-stake-dark rounded-xl p-3 text-center">
                                <div className="aspect-video rounded-lg mb-2 flex items-center justify-center relative overflow-hidden">
                                    <img
                                        src={game.image}
                                        alt={game.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                            target.nextElementSibling?.classList.remove('hidden');
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-500 hidden flex items-center justify-center">
                                        <span className="text-2xl">🎮</span>
                                    </div>
                                </div>
                                <h3 className="text-white font-bold text-sm mb-1">{game.name}</h3>
                                <div className="text-center mt-1">
                                    <span className="text-stake-green text-xs font-bold">$1+</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            {/* Tabs Header */}
            <div className="flex items-center justify-between mb-6">
                {/* Tabs Container with Scroll */}
                <div className="flex-1 relative min-w-0"> {/* Added min-w-0 to prevent flex overflow */}
                    {/* Scroll Buttons - Only show on mobile */}
                    {/*<button*/}
                    {/*    onClick={scrollLeft}*/}
                    {/*    className="md:hidden absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-stake-dark bg-opacity-90 rounded-full flex items-center justify-center text-white hover:bg-opacity-100 transition-all duration-200 shadow-lg border border-stake-border"*/}
                    {/*>*/}
                    {/*    ‹*/}
                    {/*</button>*/}

                    {/*<button*/}
                    {/*    onClick={scrollRight}*/}
                    {/*    className="md:hidden absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-stake-dark bg-opacity-90 rounded-full flex items-center justify-center text-white hover:bg-opacity-100 transition-all duration-200 shadow-lg border border-stake-border"*/}
                    {/*>*/}
                    {/*    ›*/}
                    {/*</button>*/}

                    {/* Scrollable Tabs Container */}
                    <div
                        ref={scrollContainerRef}
                        className="flex space-x-1 bg-stake-dark rounded-xl p-1 overflow-x-auto scrollbar-hide md:overflow-visible md:flex-wrap"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                    >
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveTab(category.id)}
                                className={`flex-shrink-0 flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 min-w-max ${
                                    activeTab === category.id
                                        ? 'gradient-orange text-white shadow-lg glow-orange'
                                        : 'text-gray-300 hover:text-white hover:bg-stake-gray'
                                }`}
                            >
                                <span className="text-sm">{category.icon}</span>
                                <span className="font-medium whitespace-nowrap text-sm">{category.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* View All Button - Hidden on mobile, shown on tablet+ */}
                <button className="hidden md:flex gradient-orange text-white px-4 py-2 rounded-xl font-bold hover-glow transition-all text-sm whitespace-nowrap ml-3">
                    View All
                </button>
            </div>

            {/* Active Tab Content */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <div className="min-w-0 flex-1"> {/* Added to prevent text overflow */}
                        <h3 className="text-xl font-bold text-white capitalize truncate">
                            {activeTab === 'originals' ? 'Stake Originals' : activeTab}
                        </h3>
                        <p className="text-stake-light-gray text-sm truncate">
                            {activeTab === 'slots' && 'Spin and win big jackpots'}
                            {activeTab === 'jackpots' && 'Massive progressive jackpots'}
                            {activeTab === 'spins' && 'Quick spin games'}
                            {activeTab === 'roulettes' && 'Classic roulette variations'}
                            {activeTab === 'originals' && 'Exclusive Stake games'}
                        </p>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                        <div className="w-2 h-2 bg-stake-green rounded-full animate-pulse"></div>
                        <span className="text-stake-green text-sm font-bold">LIVE</span>
                    </div>
                </div>

                {/* Games Grid */}
                {renderGames()}
            </div>
        </>
    );
};