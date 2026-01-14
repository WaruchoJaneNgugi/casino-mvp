import React, {useState, useRef, useMemo, useEffect} from 'react';
import {getGamesByCategory} from "@/utils/imageutils";

interface GameTabsProps {
    onGameSelect: (gameId: string, category: string, gameNumber?: number) => void;
    userLoggedIn: boolean;
}

export const GameTabs: React.FC<GameTabsProps> = ({onGameSelect, userLoggedIn}) => {
    const [activeTab, setActiveTab] = useState('originals');
    const [searchQuery, setSearchQuery] = useState('');
    const [isAutoSliding, setIsAutoSliding] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

    const categories = [
        {id: 'originals', name: 'Originals', icon: '⭐'},
        {id: 'spins', name: 'SpinsWheel', icon: '⭐'}, // Changed from 'spinswheel' to 'spins'
        {id: 'slots', name: 'Slots', icon: '🎰'},
        {id: 'jackpots', name: 'Jackpots', icon: '💰'},
        {id: 'racing', name: 'RACING', icon: '🏎️'},
        {id: 'lottery', name: 'LOTTERY', icon: '🎫'},
        {id: 'updown', name: 'UPDOWN', icon: '📈'},
        {id: 'bingo', name: 'BINGO', icon: '🔢'},
        {id: 'casino', name: 'CASINO', icon: '🎰'},
        {id: 'sports', name: 'SPORTS', icon: '⚽'},
        {id: 'poker', name: 'POKER', icon: '♠️'},
    ];

    // Auto-slide functionality
    useEffect(() => {
        if (!isAutoSliding || !scrollContainerRef.current) return;

        const scrollContainer = scrollContainerRef.current;

        const autoSlide = () => {
            if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 10) {
                scrollContainer.scrollTo({left: 0, behavior: 'smooth'});
            } else {
                scrollContainer.scrollBy({left: 150, behavior: 'smooth'});
            }
        };

        autoSlideRef.current = setInterval(autoSlide, 3000);

        return () => {
            if (autoSlideRef.current) {
                clearInterval(autoSlideRef.current);
            }
        };
    }, [isAutoSliding]);

    const handleCategoryMouseEnter = () => {
        setIsAutoSliding(false);
        if (autoSlideRef.current) {
            clearInterval(autoSlideRef.current);
        }
    };

    const handleCategoryMouseLeave = () => {
        setIsAutoSliding(true);
    };

    // Handle category click - use your existing game selection system
    const handleCategoryClick = (categoryId: string) => {
        // Map categories to appropriate game IDs or handle them as categories
        // For now, we'll set the active tab and let users browse games in that category
        setActiveTab(categoryId);
        setSearchQuery('');

        // Optional: If you want to automatically select a specific game when clicking a category
        // You can call onGameSelect here with a default game for that category
        // For example:
        // if (categoryId === 'casino') {
        //     onGameSelect('blackjack', categoryId);
        // } else if (categoryId === 'slots') {
        //     onGameSelect('slots', categoryId);
        // }
    };

    const originalsGames = [
        {id: 'dice', name: 'Dice', image: '/images/games/dice.png', players: '2,325'},
        {id: 'mines', name: 'Mines', image: '/images/games/mines.png', players: '2,839'},
        {id: 'crash', name: 'Crash', image: '/images/games/crash.png', players: '1,380'},
        {id: 'plinko', name: 'Plinko', image: '/images/games/plinko.png', players: '1,925'},
        {id: 'blackjack', name: 'Blackjack', image: '/images/games/blackjack.png', players: '1,542'},
        {id: 'roulette', name: 'Roulette', image: '/images/games/roulette.png', players: '2,118'},
        {id: 'spinsWheel', name: 'SpinWheel', image: '/images/games/Spins/spin-wheel.png', players: '2,118'},
    ];

    const filteredOriginalsGames = useMemo(() => {
        if (!searchQuery.trim()) return originalsGames;
        return originalsGames.filter(game =>
            game.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    const filteredCategoryGames = useMemo(() => {
        const games = getGamesByCategory(activeTab);
        if (!searchQuery.trim()) return games;
        return games.filter(game =>
            game.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [activeTab, searchQuery]);

    const handleGameClick = (gameId: string, category: string, gameNumber?: number) => {
        if (!userLoggedIn) {
            alert('Please login to play games!');
            return;
        }
        onGameSelect(gameId, category, gameNumber);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const clearSearch = () => {
        setSearchQuery('');
    };

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({left: -150, behavior: 'smooth'});
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({left: 150, behavior: 'smooth'});
        }
    };

    const renderGames = () => {
        if (activeTab === 'originals') {
            return (
                <>
                    {filteredOriginalsGames.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-6xl mb-4">🎮</div>
                            <h3 className="text-white text-xl font-bold mb-2">No games found</h3>
                            <p className="text-gray-400">
                                No games found matching &quot;{searchQuery}&quot;
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {filteredOriginalsGames.map((game) => (
                                <div
                                    key={game.id}
                                    onClick={() => handleGameClick(game.id, 'originals')}
                                    className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                                >
                                    <div
                                        className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-1 glow-orange group-hover:glow-gold transition-all duration-300">
                                        <div className="bg-stake-dark rounded-xl p-3 text-center">
                                            <div className="rounded-lg mb-2 flex items-center justify-center relative">
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
                                                <div
                                                    className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-500 hidden flex items-center justify-center">
                                                    <span className="text-2xl">🎮</span>
                                                </div>
                                            </div>
                                            <h3 className="text-white font-bold text-sm mb-1">{game.name}</h3>
                                            <div className="flex items-center justify-center space-x-1">
                                                <div
                                                    className="w-2 h-2 bg-stake-green rounded-full animate-pulse"></div>
                                                <span className="text-gray-400 text-xs">{game.players}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            );
        }

        return (
            <>
                {filteredCategoryGames.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">🎰</div>
                        <h3 className="text-white text-xl font-bold mb-2">No games found</h3>
                        <p className="text-gray-400">
                            No {activeTab} games found matching &quot;{searchQuery}&quot;
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {filteredCategoryGames.map((game) => (
                            <div
                                key={game.id}
                                onClick={() => handleGameClick(game.id, activeTab, game.number)}
                                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                            >
                                <div
                                    className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-1 glow-orange group-hover:glow-gold transition-all duration-300">
                                    <div className="bg-stake-dark rounded-xl p-3 text-center">
                                        <div
                                            className="aspect-video rounded-lg mb-2 flex items-center justify-center relative overflow-hidden">
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
                                            <div
                                                className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-500 hidden flex items-center justify-center">
                                                <span className="text-2xl">🎮</span>
                                            </div>
                                        </div>
                                        <h3 className="text-white font-bold text-sm mb-1">{game.name}</h3>
                                        <div className="text-center mt-1">
                                            <span className="text-stake-green text-xs font-bold">ksh10</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </>
        );
    };

    return (
        <>
            {/* Search Bar */}
            <div className="bg-stake-gray border border-stake-border rounded-xl p-4 mb-6">
                <div className="relative max-w-2xl mx-auto">
                    <input
                        type="text"
                        placeholder="Search games..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full bg-stake-dark border border-stake-border rounded-xl px-4 py-3 pl-12 pr-10 text-white placeholder-gray-400 focus:outline-none focus:border-stake-orange focus:glow-orange transition-all duration-300"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                    </div>
                    {searchQuery && (
                        <button
                            onClick={clearSearch}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* Auto-sliding Categories Row */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    {/*<h2 className="text-2xl font-bold text-white"></h2>*/}
                    {/*<div className="flex items-center space-x-2">*/}
                    {/*    <div className="w-2 h-2 bg-stake-green rounded-full animate-pulse"></div>*/}
                    {/*    <span className="text-stake-green text-sm font-bold">LIVE</span>*/}
                    {/*</div>*/}
                </div>

                <div className="relative">
                    <button
                        onClick={scrollLeft}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-stake-dark bg-opacity-80 hover:bg-opacity-100 text-white p-2 rounded-full ml-2 transition-all duration-200 hidden md:block"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                        </svg>
                    </button>

                    <button
                        onClick={scrollRight}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-stake-dark bg-opacity-80 hover:bg-opacity-100 text-white p-2 rounded-full mr-2 transition-all duration-200 hidden md:block"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                        </svg>
                    </button>

                    <div
                        ref={scrollContainerRef}
                        onMouseEnter={handleCategoryMouseEnter}
                        onMouseLeave={handleCategoryMouseLeave}
                        className="flex space-x-3 overflow-x-auto scrollbar-hide py-2 px-1"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                    >
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryClick(category.id)}
                                className="flex-shrink-0 flex flex-col items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl hover:from-orange-400 hover:to-amber-400 transform hover:scale-105 transition-all duration-300 group cursor-pointer glow-orange hover:glow-gold"
                            >
                        <span className="text-2xl mb-1 group-hover:scale-110 transition-transform duration-300">
                            {category.icon}
                        </span>
                                                <span className="text-white font-bold text-xs text-center px-1">
                            {category.name}
                        </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tabs Header */}
            {/*<div className="flex items-center justify-between mb-6">*/}
                {/*<div className="flex-1 relative min-w-0">*/}
                {/*    <div*/}
                {/*        className="flex space-x-1 bg-stake-dark rounded-xl p-1 overflow-x-auto scrollbar-hide md:overflow-visible md:flex-wrap"*/}
                {/*        style={{*/}
                {/*            scrollbarWidth: 'none',*/}
                {/*            msOverflowStyle: 'none'*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        {categories.filter(cat =>*/}
                {/*            ['originals', 'slots', 'jackpots', 'spins', 'roulettes'].includes(cat.id)*/}
                {/*        ).map((category) => (*/}
                {/*            <button*/}
                {/*                key={category.id}*/}
                {/*                onClick={() => {*/}
                {/*                    setActiveTab(category.id);*/}
                {/*                    setSearchQuery('');*/}
                {/*                }}*/}
                {/*                className={`flex-shrink-0 flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 min-w-max ${*/}
                {/*                    activeTab === category.id*/}
                {/*                        ? 'gradient-orange text-white shadow-lg glow-orange'*/}
                {/*                        : 'text-gray-300 hover:text-white hover:bg-stake-gray'*/}
                {/*                }`}*/}
                {/*            >*/}
                {/*                <span className="text-sm">{category.icon}</span>*/}
                {/*                <span className="font-medium whitespace-nowrap text-sm">{category.name}</span>*/}
                {/*            </button>*/}
                {/*        ))}*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<button*/}
                {/*    className="hidden md:flex gradient-orange text-white px-4 py-2 rounded-xl font-bold hover-glow transition-all text-sm whitespace-nowrap ml-3">*/}
                {/*    View All*/}
                {/*</button>*/}
            {/*</div>*/}

            {/* Active Tab Content */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-bold text-white capitalize truncate">
                            {activeTab === 'originals' ? 'JW Originals' : activeTab}
                            {searchQuery && (
                                <span className="text-gray-400 text-sm ml-2">
                                    ({activeTab === 'originals' ? filteredOriginalsGames.length : filteredCategoryGames.length} results)
                                </span>
                            )}
                        </h3>
                        <p className="text-stake-light-gray text-sm truncate">
                            {activeTab === 'slots' && 'Spin and win big jackpots'}
                            {activeTab === 'jackpots' && 'Massive progressive jackpots'}
                            {activeTab === 'spins' && 'Quick spin games'}
                            {activeTab === 'roulettes' && 'Classic roulette variations'}
                            {activeTab === 'originals' && 'Exclusive JW games'}
                            {searchQuery && ` • Searching for &quot;${searchQuery}&quot;`}
                        </p>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                        <div className="w-2 h-2 bg-stake-green rounded-full animate-pulse"></div>
                        <span className="text-stake-green text-sm font-bold">LIVE</span>
                    </div>
                </div>

                {renderGames()}
            </div>
        </>
    );
};