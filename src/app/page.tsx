'use client';

import React, {useState} from 'react';
import {Header} from '@/components/layout/Header';
import {PromotionBanner} from '@/components/layout/PromotionBanner';
import {Sidebar} from '@/components/layout/Sidebar';
import {AuthModal} from '@/components/auth/AuthModal';
import {GameTabs} from '@/components/layout/GameTabs';
import {useGameState} from '@/hooks/useGameState';
import {Footer} from "@/components/layout/Footer";
import {getGameComponent, gameConfigs} from '@/utils/gameComponents'; // Import the new system

export default function Home() {
    const {user, player, login, register, logout, deposit} = useGameState();
    const [currentView, setCurrentView] = useState<'home' | 'game'>('home');
    const [selectedGame, setSelectedGame] = useState<{
        gameId: string;
        category: string;
        gameNumber?: number;
    } | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

    const handleMenuToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Updated handleGameSelect to use the new system
    const handleGameSelect = (gameId: string, category: string, gameNumber?: number) => {
        if (gameId === 'home') {
            setCurrentView('home');
            setSelectedGame(null);
            setSidebarOpen(false);
            return;
        }

        if (!user.isLoggedIn) {
            setAuthModalOpen(true);
            return;
        }

        // Set the selected game with all details
        setSelectedGame({ gameId, category, gameNumber });
        setCurrentView('game');
        setSidebarOpen(false);
    };

    // Create wrapper functions for components that don't provide category
    const handleGameSelectWithCategory = (gameId: string, category?: string, gameNumber?: number) => {
        const actualCategory = category || 'originals';
        handleGameSelect(gameId, actualCategory, gameNumber);
    };

    const handleHomeClick = () => {
        setCurrentView('home');
        setSelectedGame(null);
    };

    const handleAuth = (phone: string, password: string, name?: string) => {
        if (authMode === 'login') {
            login(phone, password);
        } else {
            register(phone, password, name || `User${phone.slice(-4)}`);
        }
        setAuthModalOpen(false);
    };

    const handleDeposit = (amount: number) => {
        if (user.isLoggedIn) {
            deposit(amount);
        }
    };

    // New renderGame function using the component registry
    const renderGameComponent = () => {
        if (!selectedGame) return null;

        const GameComponent = getGameComponent(selectedGame.gameId);
        if (GameComponent) {
            // Pass configuration to the game component if it exists
            const gameConfig = gameConfigs[selectedGame.gameId];
            return (
                <div className="w-full">
                    <GameComponent
                        config={gameConfig}
                        gameData={selectedGame}
                    />
                </div>
            );
        }

        // Fallback for games without specific components
        return (
            <div className="text-white p-8 text-center">
                <div className="bg-stake-dark rounded-2xl p-8 max-w-md mx-auto">
                    <div className="text-6xl mb-4">🎮</div>
                    <h3 className="text-xl font-bold mb-2">Game: {selectedGame.gameId}</h3>
                    <p className="text-gray-400 mb-4">Category: {selectedGame.category}</p>
                    {selectedGame.gameNumber && (
                        <p className="text-gray-400 mb-4">Game Number: {selectedGame.gameNumber}</p>
                    )}
                    <p className="text-stake-orange">Game component coming soon!</p>
                </div>
            </div>
        );
    };

    return (
        <div className="main-entry-div">
            <div className="main-cont min-h-screen gradient-bg">
                {/* Header */}
                <Header
                    user={user}
                    player={player}
                    onMenuToggle={handleMenuToggle}
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
                    currentGame={selectedGame?.gameId || 'home'}
                    onGameSelect={handleGameSelectWithCategory}
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
                <main className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'} w-full`}>
                    {currentView === 'home' ? (
                        <div className="min-h-screen w-full">
                            {/* Promotion Banner - Full Width but contained */}
                            <PromotionBanner/>

                            {/* Main Content - Full width but with proper padding that considers sidebar */}
                            <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
                                <div className="w-full space-y-8 max-w-full">
                                    {/* Game Tabs Section - Full width within container */}
                                    <section
                                        className="bg-stake-gray/50 rounded-2xl p-4 sm:p-6 border border-stake-border backdrop-blur-sm w-full">
                                        <GameTabs onGameSelect={handleGameSelect} userLoggedIn={user.isLoggedIn}/>
                                    </section>

                                    {/* Featured Games Section - Full width within container */}
                                    <section
                                        className="bg-stake-gray/50 rounded-2xl p-6 sm:p-8 border border-stake-border backdrop-blur-sm w-full">
                                        <div
                                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
                                            <div className="min-w-0">
                                                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">🔥 Featured
                                                    Games</h2>
                                                <p className="text-stake-light-gray text-sm sm:text-base">Most popular
                                                    games right now</p>
                                            </div>
                                            <button
                                                className="gradient-orange text-white px-4 sm:px-6 py-2 rounded-xl font-bold hover-glow transition-all w-full sm:w-auto text-sm sm:text-base">
                                                View All
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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
                                                    <div
                                                        className={`bg-gradient-to-br ${game.gradient} rounded-2xl p-1 glow-orange group-hover:glow-gold transition-all duration-300 h-full`}>
                                                        <div className="bg-stake-dark rounded-xl p-4 sm:p-6 h-full">
                                                            <div
                                                                className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3 sm:gap-4">
                                                                <div
                                                                    className="flex items-center space-x-3 sm:space-x-4 min-w-0">
                                                                    <div
                                                                        className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-r ${game.gradient} flex items-center justify-center flex-shrink-0`}>
                                                        <span className="text-xl sm:text-2xl">
                                                            {game.id === 'crash' ? '🚀' : '🎲'}
                                                        </span>
                                                                    </div>
                                                                    <div className="min-w-0 flex-1">
                                                                        <h3 className="text-white font-bold text-base sm:text-lg truncate">{game.name}</h3>
                                                                        <p className="text-gray-400 text-xs sm:text-sm line-clamp-2">{game.description}</p>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="bg-stake-gray rounded-full px-3 py-1 flex-shrink-0 self-start sm:self-auto">
                                                                    <span
                                                                        className="text-stake-green text-xs sm:text-sm font-bold">{game.multiplier}</span>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                                                <div className="flex items-center space-x-4">
                                                                    <div className="flex items-center space-x-1">
                                                                        <div
                                                                            className="w-2 h-2 bg-stake-green rounded-full animate-pulse"></div>
                                                                        <span
                                                                            className="text-gray-400 text-xs sm:text-sm">{game.players} playing</span>
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    className="gradient-orange text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 w-full sm:w-auto">
                                                                    PLAY NOW
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    {/* Additional responsive sections can be added here */}

                                    {/* Example: New Games Section */}
                                    <section
                                        className="bg-stake-gray/50 rounded-2xl p-6 sm:p-8 border border-stake-border backdrop-blur-sm w-full">
                                        <div
                                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
                                            <div className="min-w-0">
                                                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">🆕 New
                                                    Releases</h2>
                                                <p className="text-stake-light-gray text-sm sm:text-base">Check out our
                                                    latest games</p>
                                            </div>
                                            <button
                                                className="gradient-orange text-white px-4 sm:px-6 py-2 rounded-xl font-bold hover-glow transition-all w-full sm:w-auto text-sm sm:text-base">
                                                Explore All
                                            </button>
                                        </div>
                                        <div className="text-center py-8">
                                            <p className="text-gray-400 text-sm sm:text-base">More games coming
                                                soon...</p>
                                        </div>
                                    </section>
                                </div>
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