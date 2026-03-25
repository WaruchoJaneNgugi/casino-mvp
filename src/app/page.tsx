'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { PromotionBanner } from '@/components/layout/PromotionBanner';
import { Sidebar } from '@/components/layout/Sidebar';
import { AuthModal } from '@/components/auth/AuthModal';
import { GameTabs } from '@/components/layout/GameTabs';
import { useGameState } from '@/hooks/useGameState';
import { Footer } from '@/components/layout/Footer';
import { getGameComponent, gameConfigs } from '@/utils/gameComponents';

export default function Home() {
    const { user, player, login, register, logout, deposit } = useGameState();
    const [currentView, setCurrentView] = useState<'home' | 'game'>('home');
    const [selectedGame, setSelectedGame] = useState<{ gameId: string; category: string; gameNumber?: number } | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

    const handleGameSelect = (gameId: string, category: string, gameNumber?: number) => {
        if (gameId === 'home') {
            setCurrentView('home');
            setSelectedGame(null);
            setSidebarOpen(false);
            return;
        }
        if (gameId === '__auth__') {
            setAuthMode('login');
            setAuthModalOpen(true);
            return;
        }
        if (!user.isLoggedIn) {
            setAuthMode('login');
            setAuthModalOpen(true);
            return;
        }
        setSelectedGame({ gameId, category, gameNumber });
        setCurrentView('game');
        setSidebarOpen(false);
    };

    const handleGameSelectWithCategory = (gameId: string, category?: string, gameNumber?: number) => {
        handleGameSelect(gameId, category || 'originals', gameNumber);
    };

    const handleAuth = (phone: string, password: string, name?: string) => {
        if (authMode === 'login') login(phone, password);
        else register(phone, password, name || `User${phone.slice(-4)}`);
        setAuthModalOpen(false);
    };

    const renderGameComponent = () => {
        if (!selectedGame) return null;
        const GameComponent = getGameComponent(selectedGame.gameId);
        if (GameComponent) {
            const gameConfig = gameConfigs[selectedGame.gameId];
            return (
                <div className="w-full min-h-screen">
                    <GameComponent config={gameConfig} gameData={selectedGame} />
                </div>
            );
        }
        return (
            <div className="flex items-center justify-center min-h-screen p-8">
                <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8 max-w-sm w-full text-center">
                    <div className="text-5xl mb-4">🎮</div>
                    <h3 className="text-white text-lg font-bold mb-2">{selectedGame.gameId}</h3>
                    <p className="text-[var(--text-muted)] text-sm mb-4">Category: {selectedGame.category}</p>
                    <p className="text-[var(--accent)] text-sm">Coming soon!</p>
                    <button
                        onClick={() => { setCurrentView('home'); setSelectedGame(null); }}
                        className="mt-4 gradient-orange text-white px-4 py-2 rounded-lg text-sm font-semibold hover-glow transition-all"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    };

    const featuredGames = [
        { id: 'crash', name: 'Crash', desc: 'Cash out before it crashes!', stat: '5.25x', players: '1.2K', emoji: '🚀', gradient: 'from-purple-600 to-pink-600' },
        { id: 'dice', name: 'Dice', desc: 'Predict the roll and win big', stat: '98%', players: '2.3K', emoji: '🎲', gradient: 'from-blue-600 to-cyan-600' },
    ];

    return (
        <div className="main-entry-div">
            <div className="main-cont gradient-bg">
                <Header
                    user={user}
                    player={player}
                    onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
                    onAuthClick={(mode) => { setAuthMode(mode); setAuthModalOpen(true); }}
                    onLogout={logout}
                    onDeposit={deposit}
                    currentView={currentView}
                    onHomeClick={() => { setCurrentView('home'); setSelectedGame(null); }}
                />

                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    currentGame={selectedGame?.gameId || 'home'}
                    onGameSelect={handleGameSelectWithCategory}
                    user={user}
                    player={player}
                />

                <AuthModal
                    isOpen={authModalOpen}
                    onClose={() => setAuthModalOpen(false)}
                    mode={authMode}
                    onAuth={handleAuth}
                    onSwitchMode={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                />

                <main className={`transition-all duration-300 pt-14 ${sidebarOpen ? 'lg:ml-60' : 'lg:ml-[72px]'}`}>
                    {currentView === 'home' ? (
                        <div className="min-h-screen">
                            <PromotionBanner />

                            <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6 max-w-[1600px] mx-auto">
                                {/* Game Tabs */}
                                <section className="bg-[var(--bg-card)] rounded-2xl p-4 sm:p-6 border border-[var(--border)]">
                                    <GameTabs onGameSelect={handleGameSelect} userLoggedIn={user.isLoggedIn} />
                                </section>

                                {/* Featured Games */}
                                <section className="bg-[var(--bg-card)] rounded-2xl p-4 sm:p-6 border border-[var(--border)]">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h2 className="text-white font-bold text-lg">🔥 Featured Games</h2>
                                            <p className="text-[var(--text-muted)] text-xs mt-0.5">Most popular right now</p>
                                        </div>
                                        <button className="gradient-orange text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover-glow transition-all">
                                            View All
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {featuredGames.map((game) => (
                                            <div
                                                key={game.id}
                                                onClick={() => handleGameSelect(game.id, 'originals')}
                                                className="group cursor-pointer game-card-hover"
                                            >
                                                <div className={`bg-gradient-to-br ${game.gradient} rounded-xl p-px`}>
                                                    <div className="bg-[var(--bg-elevated)] rounded-xl p-4">
                                                        <div className="flex items-center gap-3 mb-3">
                                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${game.gradient} flex items-center justify-center flex-shrink-0`}>
                                                                <span className="text-xl">{game.emoji}</span>
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h3 className="text-white font-bold text-sm">{game.name}</h3>
                                                                <p className="text-[var(--text-muted)] text-xs truncate">{game.desc}</p>
                                                            </div>
                                                            <div className="bg-[var(--bg-card)] rounded-full px-2 py-0.5 flex-shrink-0">
                                                                <span className="text-[var(--green)] text-xs font-bold">{game.stat}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-1.5">
                                                                <div className="w-1.5 h-1.5 bg-[var(--green)] rounded-full pulse-dot"></div>
                                                                <span className="text-[var(--text-muted)] text-xs">{game.players} playing</span>
                                                            </div>
                                                            <button className="gradient-orange text-white px-3 py-1 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                                                PLAY NOW
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* New Releases */}
                                <section className="bg-[var(--bg-card)] rounded-2xl p-4 sm:p-6 border border-[var(--border)]">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h2 className="text-white font-bold text-lg">🆕 New Releases</h2>
                                            <p className="text-[var(--text-muted)] text-xs mt-0.5">Latest additions</p>
                                        </div>
                                        <button className="gradient-orange text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover-glow transition-all">
                                            Explore All
                                        </button>
                                    </div>
                                    <div className="text-center py-8 text-[var(--text-muted)] text-sm">
                                        More games coming soon...
                                    </div>
                                </section>
                            </div>
                        </div>
                    ) : (
                        renderGameComponent()
                    )}
                    <Footer />
                </main>
            </div>
        </div>
    );
}
