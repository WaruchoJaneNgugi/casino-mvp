'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { PromotionBanner } from '@/components/layout/PromotionBanner';
import { Sidebar } from '@/components/layout/Sidebar';
// import { FeaturedGames } from '@/components/layout/FeaturedGames';
// import { QuickStats } from '@/components/layout/QuickStats';
import { AuthModal } from '@/components/auth/AuthModal';
import { GameTabs } from '@/components/layout/GameTabs'; // Import the new GameTabs
import { SlotMachine } from '@/components/games/SlotMachine';
import { Blackjack } from '@/components/games/Blackjack';
import { Roulette } from '@/components/games/Roulette';
import { Crash } from '@/components/games/Crash';
import { Plinko } from '@/components/games/Plinko';
import { Dice } from '@/components/games/Dice';
import { Mines } from '@/components/games/Mines';
import { useGameState } from '@/hooks/useGameState';
// import {getGameImage} from "@/utils/imageutils";

export default function Home() {
    const { user, player, login, register, logout, deposit } = useGameState();
    const [currentView, setCurrentView] = useState<'home' | 'game'>('home');
    const [currentGame, setCurrentGame] = useState('home');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

    // In your main page, update the handleGameSelect function:
    // Keep your original handleGameSelect function
    const handleGameSelect = (gameId: string, category: string, gameNumber?: number) => {
        if (!user.isLoggedIn) {
            setAuthModalOpen(true);
            return;
        }

        // Handle different game categories
        let actualGameId = gameId;

        if (category === 'slots') {
            actualGameId = 'slots';
        } else if (category === 'jackpots') {
            actualGameId = 'slots';
        } else if (category === 'spins') {
            actualGameId = 'slots';
        } else if (category === 'roulettes') {
            actualGameId = 'roulette';
        }

        setCurrentGame(actualGameId);
        setCurrentView('game');
        setSidebarOpen(false);
    };

// Create wrapper functions for components that don't provide category
    const handleGameSelectWithCategory = (gameId: string, category?: string, gameNumber?: number) => {
        // Provide default category if not specified
        const actualCategory = category || 'originals';
        handleGameSelect(gameId, actualCategory, gameNumber);
    };

    // const handleSimpleGameSelect = (gameId: string) => {
    //     // For components that only provide gameId, default to 'originals' category
    //     handleGameSelect(gameId, 'originals');
    // };

    const handleHomeClick = () => {
        setCurrentView('home');
        setCurrentGame('home');
    };

    // In your main page, update the handleAuth function:
    const handleAuth = (phone: string, password: string, name?: string) => { // Changed from email to phone
        if (authMode === 'login') {
            login(phone, password); // Pass phone instead of email
        } else {
            register(phone, password, name || `User${phone.slice(-4)}`); // Pass phone instead of email
        }
        setAuthModalOpen(false);
    };
    const handleDeposit = (amount: number) => {
        if (user.isLoggedIn) {
            deposit(amount);
        }
    };

    const renderGame = () => {
        switch (currentGame) {
            case 'slots':
                return <SlotMachine />;
            case 'blackjack':
                return <Blackjack />;
            case 'roulette':
                return <Roulette />;
            case 'crash':
                return <Crash />;
            case 'plinko':
                return <Plinko />;
            case 'dice':
                return <Dice />;
            case 'mines':
                return <Mines />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen gradient-bg">
            {/* Header */}
            <Header
                user={user}
                player={player}
                onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
                onAuthClick={(mode) => {
                    setAuthMode(mode);
                    setAuthModalOpen(true);
                }}
                onLogout={logout}
                onDeposit={handleDeposit}
                currentView={currentView}
                onHomeClick={handleHomeClick}
            />

            {/* Sidebar */}
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                currentGame={currentGame}
                onGameSelect={handleGameSelectWithCategory} // Use the wrapper
                user={user}
                player={player}
            />

            {/* Auth Modal */}
            <AuthModal
                isOpen={authModalOpen}
                onClose={() => setAuthModalOpen(false)}
                mode={authMode}
                onAuth={handleAuth}
                onSwitchMode={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
            />

            {/* Main Content */}
            <main className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
                {currentView === 'home' ? (
                    <div className="min-h-screen">
                        {/* Promotion Banner */}
                        <PromotionBanner />

                        {/* Search Bar */}
                        <div className="bg-stake-gray border-b border-stake-border">
                            <div className="max-w-7xl mx-auto px-4 py-3">
                                <div className="relative max-w-2xl mx-auto">
                                    <input
                                        type="text"
                                        placeholder="Search games, events, or promotions..."
                                        className="w-full bg-stake-dark border border-stake-border rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:border-stake-orange focus:glow-orange transition-all duration-300"
                                    />
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content Grid */}
                        <div className="max-w-7xl mx-auto px-4 py-8">
                            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                                {/* Left Column - Games List */}
                                <div className="xl:col-span-3 space-y-8">
                                    {/* Welcome Section for Guests */}
                                    {/*{!user.isLoggedIn && (*/}
                                    {/*    <section className="gradient-orange rounded-2xl p-8 text-center glow-orange">*/}
                                    {/*        <h2 className="text-3xl font-bold text-white mb-4">🎲 Welcome to JW Gaming</h2>*/}
                                    {/*        /!*<p className="text-white/90 text-lg mb-6">Join now and get $1,000 bonus to start playing!</p>*!/*/}
                                    {/*        <div className="flex gap-4 justify-center">*/}
                                    {/*            <button*/}
                                    {/*                onClick={() => {*/}
                                    {/*                    setAuthMode('login');*/}
                                    {/*                    setAuthModalOpen(true);*/}
                                    {/*                }}*/}
                                    {/*                className="bg-white text-orange-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"*/}
                                    {/*            >*/}
                                    {/*                Sign In*/}
                                    {/*            </button>*/}
                                    {/*            <button*/}
                                    {/*                onClick={() => {*/}
                                    {/*                    setAuthMode('register');*/}
                                    {/*                    setAuthModalOpen(true);*/}
                                    {/*                }}*/}
                                    {/*                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white hover:text-orange-600 transition-colors"*/}
                                    {/*            >*/}
                                    {/*                Register*/}
                                    {/*            </button>*/}
                                    {/*        </div>*/}
                                    {/*    </section>*/}
                                    {/*)}*/}

                                    {/* Game Tabs Section - Replaces individual game sections */}
                                    <section className="bg-stake-gray/50 rounded-2xl p-6 border border-stake-border backdrop-blur-sm">
                                        <GameTabs onGameSelect={handleGameSelect} userLoggedIn={user.isLoggedIn} />
                                    </section>

                                    {/* Featured Games Section */}
                                    <section className="bg-stake-gray/50 rounded-2xl p-8 border border-stake-border backdrop-blur-sm">
                                        <div className="flex items-center justify-between mb-8">
                                            <div>
                                                <h2 className="text-2xl font-bold text-white mb-2">🔥 Featured Games</h2>
                                                <p className="text-stake-light-gray">Most popular games right now</p>
                                            </div>
                                            <button className="gradient-orange text-white px-6 py-2 rounded-xl font-bold hover-glow transition-all">
                                                View All
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {[
                                                {
                                                    id: 'crash',
                                                    name: 'Crash',
                                                    description: 'Cash out before the rocket crashes!',
                                                    multiplier: '5.25x',
                                                    players: '1.2K',
                                                    gradient: 'from-purple-500 to-pink-500'
                                                },
                                                {
                                                    id: 'dice',
                                                    name: 'Dice',
                                                    description: 'Predict the roll and win big',
                                                    multiplier: '98%',
                                                    players: '2.3K',
                                                    gradient: 'from-blue-500 to-cyan-500'
                                                },
                                            ].map((game) => (
                                                <div
                                                    key={game.id}
                                                    onClick={() => handleGameSelect(game.id, 'originals')}
                                                    className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                                                >
                                                    <div className={`bg-gradient-to-br ${game.gradient} rounded-2xl p-1 glow-orange group-hover:glow-gold transition-all duration-300`}>
                                                        <div className="bg-stake-dark rounded-xl p-6 h-full">
                                                            <div className="flex items-start justify-between mb-4">
                                                                <div className="flex items-center space-x-4">
                                                                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${game.gradient} flex items-center justify-center`}>
                                                                        <span className="text-2xl">
                                                                            {game.id === 'crash' ? '🚀' : '🎲'}
                                                                        </span>
                                                                    </div>
                                                                    <div>
                                                                        <h3 className="text-white font-bold text-lg">{game.name}</h3>
                                                                        <p className="text-gray-400 text-sm">{game.description}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="bg-stake-gray rounded-full px-3 py-1">
                                                                    <span className="text-stake-green text-sm font-bold">{game.multiplier}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center space-x-4">
                                                                    <div className="flex items-center space-x-1">
                                                                        <div className="w-2 h-2 bg-stake-green rounded-full animate-pulse"></div>
                                                                        <span className="text-gray-400 text-sm">{game.players} playing</span>
                                                                    </div>
                                                                </div>
                                                                <button className="gradient-orange text-white px-4 py-2 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                                    PLAY NOW
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    {/* Stake Originals Section */}
                                    {/*<section className="bg-stake-gray/50 rounded-2xl p-8 border border-stake-border backdrop-blur-sm">*/}
                                    {/*    <div className="flex items-center justify-between mb-8">*/}
                                    {/*        <div>*/}
                                    {/*            <h2 className="text-2xl font-bold text-white mb-2">⭐ Stake Originals</h2>*/}
                                    {/*            <p className="text-stake-light-gray">Exclusive games you won't find anywhere else</p>*/}
                                    {/*        </div>*/}
                                    {/*        <div className="flex items-center space-x-2">*/}
                                    {/*            <div className="w-2 h-2 bg-stake-green rounded-full animate-pulse"></div>*/}
                                    {/*            <span className="text-stake-green text-sm font-bold">LIVE</span>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">*/}
                                    {/*        {[*/}
                                    {/*            { id: 'dice', name: 'Dice', players: '2,325', gradient: 'from-blue-500 to-cyan-500' },*/}
                                    {/*            { id: 'mines', name: 'Mines', players: '2,839', gradient: 'from-orange-500 to-red-500' },*/}
                                    {/*            { id: 'crash', name: 'Crash', players: '1,380', gradient: 'from-purple-500 to-pink-500' },*/}
                                    {/*            { id: 'plinko', name: 'Plinko', players: '1,925', gradient: 'from-green-500 to-emerald-500' },*/}
                                    {/*            { id: 'blackjack', name: 'Blackjack', players: '1,542', gradient: 'from-yellow-500 to-amber-500' },*/}
                                    {/*            { id: 'roulette', name: 'Roulette', players: '2,118', gradient: 'from-red-500 to-rose-500' },*/}
                                    {/*        ].map((game) => (*/}
                                    {/*            <div*/}
                                    {/*                key={game.id}*/}
                                    {/*                onClick={() => handleGameSelect(game.id, 'originals')}*/}
                                    {/*                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"*/}
                                    {/*            >*/}
                                    {/*                <div className={`bg-gradient-to-br ${game.gradient} rounded-2xl p-1 glow-orange group-hover:glow-gold transition-all duration-300`}>*/}
                                    {/*                    <div className="bg-stake-dark rounded-xl p-4 text-center h-full">*/}
                                    {/*                        /!* Game Image using getGameImage *!/*/}
                                    {/*                        <div*/}
                                    {/*                            className="w-full h-20 rounded-lg bg-cover bg-center mb-3 relative overflow-hidden"*/}
                                    {/*                            style={{ backgroundImage: `url('${getGameImage(game.id)}')` }}*/}
                                    {/*                        >*/}
                                    {/*                            <div className="absolute inset-0 bg-black/30"></div>*/}
                                    {/*                        </div>*/}
                                    {/*                        <h3 className="text-white font-bold mb-1">{game.name}</h3>*/}
                                    {/*                        <div className="flex items-center justify-center space-x-1">*/}
                                    {/*                            <div className="w-2 h-2 bg-stake-green rounded-full animate-pulse"></div>*/}
                                    {/*                            <span className="text-gray-400 text-sm">{game.players}</span>*/}
                                    {/*                        </div>*/}
                                    {/*                    </div>*/}
                                    {/*                </div>*/}
                                    {/*            </div>*/}
                                    {/*        ))}*/}
                                    {/*    </div>*/}
                                    {/*</section>*/}
                                </div>

                                {/* Right Column - Featured Content */}
                                {/*<div className="xl:col-span-1 space-y-8">*/}
                                {/*    /!* Featured Games Sidebar *!/*/}
                                {/*    <FeaturedGames     onGameSelect={handleSimpleGameSelect} // Temporary fix*/}
                                {/*                       userLoggedIn={user.isLoggedIn} />*/}

                                {/*    /!* Quick Stats - Only show if logged in *!/*/}
                                {/*    {user.isLoggedIn && <QuickStats player={player} onDeposit={handleDeposit} />}*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                ) : (
                    renderGame()
                )}
            </main>
        </div>
    );
}