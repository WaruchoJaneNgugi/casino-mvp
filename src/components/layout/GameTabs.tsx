'use client';
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { getGamesByCategory } from '@/utils/imageutils';

interface GameTabsProps {
    onGameSelect: (gameId: string, category: string, gameNumber?: number) => void;
    userLoggedIn: boolean;
}

const categories = [
    { id: 'originals', name: 'Originals', icon: '⭐' },
    { id: 'spins', name: 'Spins', icon: '🎡' },
    { id: 'slots', name: 'Slots', icon: '🎰' },
    { id: 'jackpots', name: 'Jackpots', icon: '💰' },
    { id: 'racing', name: 'Racing', icon: '🏎️' },
    { id: 'lottery', name: 'Lottery', icon: '🎫' },
    { id: 'updown', name: 'Up/Down', icon: '📈' },
    { id: 'bingo', name: 'Bingo', icon: '🔢' },
    { id: 'casino', name: 'Casino', icon: '🎲' },
    { id: 'sports', name: 'Sports', icon: '⚽' },
    { id: 'poker', name: 'Poker', icon: '♠️' },
];

const originalsGames = [
    { id: 'dice', name: 'Dice', image: '/images/games/dice.png', players: '2,325' },
    { id: 'mines', name: 'Mines', image: '/images/games/mines.png', players: '2,839' },
    { id: 'crash', name: 'Crash', image: '/images/games/crash.png', players: '1,380' },
    { id: 'plinko', name: 'Plinko', image: '/images/games/plinko.png', players: '1,925' },
    { id: 'blackjack', name: 'Blackjack', image: '/images/games/blackjack.png', players: '1,542' },
    { id: 'roulette', name: 'Roulette', image: '/images/games/roulette.png', players: '2,118' },
    { id: 'spins1', name: 'Spin Wheel', image: '/images/games/Spins/spin-wheel.png', players: '2,118' },
];

export const GameTabs: React.FC<GameTabsProps> = ({ onGameSelect, userLoggedIn }) => {
    const [activeTab, setActiveTab] = useState('originals');
    const [searchQuery, setSearchQuery] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);
    const autoSlideRef = useRef<NodeJS.Timeout | null>(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        if (isHovering || !scrollRef.current) return;
        autoSlideRef.current = setInterval(() => {
            const el = scrollRef.current;
            if (!el) return;
            if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
                el.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                el.scrollBy({ left: 140, behavior: 'smooth' });
            }
        }, 3000);
        return () => { if (autoSlideRef.current) clearInterval(autoSlideRef.current); };
    }, [isHovering]);

    const filteredOriginals = useMemo(() =>
        searchQuery.trim()
            ? originalsGames.filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase()))
            : originalsGames,
        [searchQuery]
    );

    const filteredCategory = useMemo(() => {
        const games = getGamesByCategory(activeTab);
        return searchQuery.trim()
            ? games.filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase()))
            : games;
    }, [activeTab, searchQuery]);

    const handleGameClick = (gameId: string, category: string, gameNumber?: number) => {
        if (!userLoggedIn) {
            onGameSelect('__auth__', category);
            return;
        }
        onGameSelect(gameId, category, gameNumber);
    };

    const games = activeTab === 'originals' ? filteredOriginals : filteredCategory;

    return (
        <div className="space-y-5">
            {/* Search */}
            <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    type="text"
                    placeholder="Search games..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl pl-9 pr-9 py-2.5 text-white text-sm placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
                {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Category scroll */}
            <div className="relative">
                <button
                    onClick={() => scrollRef.current?.scrollBy({ left: -140, behavior: 'smooth' })}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-[var(--bg-card)] border border-[var(--border)] rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-white transition-colors hidden md:flex"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={() => scrollRef.current?.scrollBy({ left: 140, behavior: 'smooth' })}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-[var(--bg-card)] border border-[var(--border)] rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-white transition-colors hidden md:flex"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                <div
                    ref={scrollRef}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className="flex gap-2 overflow-x-auto scrollbar-hide py-1 md:px-10"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => { setActiveTab(cat.id); setSearchQuery(''); }}
                            className={`flex-shrink-0 flex flex-col items-center justify-center w-20 h-20 rounded-xl transition-all duration-200 border ${
                                activeTab === cat.id
                                    ? 'gradient-orange border-[var(--accent)] glow-orange text-white'
                                    : 'bg-[var(--bg-elevated)] border-[var(--border)] text-[var(--text-secondary)] hover:text-white hover:border-[var(--border-light)] hover:bg-[var(--bg-card)]'
                            }`}
                        >
                            <span className="text-xl mb-1">{cat.icon}</span>
                            <span className="text-[10px] font-semibold text-center leading-tight px-1">{cat.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Games grid */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <h3 className="text-white font-bold capitalize">
                            {activeTab === 'originals' ? 'JW Originals' : categories.find(c => c.id === activeTab)?.name}
                            {searchQuery && <span className="text-[var(--text-muted)] text-sm font-normal ml-2">({games.length} results)</span>}
                        </h3>
                        <p className="text-[var(--text-muted)] text-xs mt-0.5">
                            {activeTab === 'originals' && 'Exclusive JW games'}
                            {activeTab === 'slots' && 'Spin and win big'}
                            {activeTab === 'jackpots' && 'Massive progressive jackpots'}
                            {activeTab === 'spins' && 'Quick spin games'}
                        </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-[var(--green)] rounded-full pulse-dot"></div>
                        <span className="text-[var(--green)] text-xs font-semibold">LIVE</span>
                    </div>
                </div>

                {games.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-4xl mb-3">🎮</div>
                        <p className="text-[var(--text-muted)] text-sm">No games found{searchQuery ? ` for "${searchQuery}"` : ''}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
                        {games.map((game) => (
                            <div
                                key={game.id}
                                onClick={() => handleGameClick(game.id, activeTab, (game as { number?: number }).number)}
                                className="group cursor-pointer game-card-hover"
                            >
                                <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl overflow-hidden group-hover:border-[var(--accent)]/50 transition-colors">
                                    <div className="aspect-square relative overflow-hidden bg-[var(--bg-card)]">
                                        <img
                                            src={game.image}
                                            alt={game.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            onError={(e) => {
                                                const t = e.target as HTMLImageElement;
                                                t.style.display = 'none';
                                                (t.nextElementSibling as HTMLElement)?.classList.remove('hidden');
                                            }}
                                        />
                                        <div className="hidden absolute inset-0 gradient-orange flex items-center justify-center">
                                            <span className="text-2xl">🎮</span>
                                        </div>
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                            <span className="text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--accent)] px-2 py-1 rounded-md">PLAY</span>
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <p className="text-white text-xs font-semibold truncate">{game.name}</p>
                                        {activeTab === 'originals' && (game as { players?: string }).players && (
                                            <div className="flex items-center gap-1 mt-0.5">
                                                <div className="w-1 h-1 bg-[var(--green)] rounded-full pulse-dot"></div>
                                                <span className="text-[var(--text-muted)] text-[10px]">{(game as { players?: string }).players}</span>
                                            </div>
                                        )}
                                        {activeTab !== 'originals' && (
                                            <span className="text-[var(--green)] text-[10px] font-bold">KSh 10</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
