'use client';
import React, { useState } from 'react';
import { User, Player } from '@/types';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    currentGame: string;
    onGameSelect: (gameId: string, category?: string, gameNumber?: number) => void;
    user: User;
    player: Player;
}

const menuItems = [
    { id: 'home', name: 'Home', icon: '🏠' },
    { id: 'slots', name: 'Slots', icon: '🎰' },
    { id: 'live', name: 'Live Casino', icon: '🎥' },
    { id: 'sports', name: 'Sports', icon: '⚽' },
    { id: 'originals', name: 'Originals', icon: '⭐' },
    { id: 'promotions', name: 'Promotions', icon: '🎁' },
    { id: 'vip', name: 'VIP Club', icon: '👑' },
];

const originalGames = [
    { id: 'dice', name: 'Dice', icon: '🎲' },
    { id: 'mines', name: 'Mines', icon: '💣' },
    { id: 'crash', name: 'Crash', icon: '🚀' },
    { id: 'plinko', name: 'Plinko', icon: '🔴' },
    { id: 'blackjack', name: 'Blackjack', icon: '🃏' },
    { id: 'roulette', name: 'Roulette', icon: '🎡' },
];

export const Sidebar: React.FC<SidebarProps> = ({
    isOpen, onClose, currentGame, onGameSelect, user, player
}) => {
    const [collapsed, setCollapsed] = useState(() =>
        typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
    );

    const handleMenuClick = (itemId: string) => {
        onGameSelect(itemId === 'home' ? 'home' : itemId, itemId);
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={onClose} />
            )}

            <div className={`
                fixed top-0 left-0 h-full bg-[var(--bg-secondary)] border-r border-[var(--border)] z-50
                transform transition-all duration-300 ease-in-out flex flex-col
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                ${collapsed ? 'w-[72px]' : 'w-60'}
                lg:translate-x-0
            `}>
                {/* Logo */}
                <div className="flex items-center justify-between p-4 border-b border-[var(--border)] h-14 flex-shrink-0">
                    {!collapsed && (
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 gradient-orange rounded-lg flex items-center justify-center glow-orange flex-shrink-0">
                                <span className="text-white font-bold text-sm">JW</span>
                            </div>
                            <div>
                                <div className="text-white font-bold text-sm gradient-text">JW Gaming</div>
                                <div className="text-[var(--text-muted)] text-[10px]">Premium Casino</div>
                            </div>
                        </div>
                    )}
                    {collapsed && (
                        <div className="w-8 h-8 gradient-orange rounded-lg flex items-center justify-center glow-orange mx-auto">
                            <span className="text-white font-bold text-sm">JW</span>
                        </div>
                    )}
                    {!collapsed && (
                        <button
                            onClick={() => setCollapsed(true)}
                            className="w-7 h-7 flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:bg-[var(--bg-card)] rounded-lg transition-colors text-xs"
                        >
                            ←
                        </button>
                    )}
                </div>

                {/* Expand button when collapsed */}
                {collapsed && (
                    <button
                        onClick={() => setCollapsed(false)}
                        className="flex items-center justify-center py-2 text-[var(--text-muted)] hover:text-white hover:bg-[var(--bg-card)] transition-colors text-xs border-b border-[var(--border)]"
                    >
                        →
                    </button>
                )}

                {/* User balance */}
                {user.isLoggedIn && !collapsed && (
                    <div className="px-3 py-3 border-b border-[var(--border)]">
                        <div className="bg-[var(--bg-card)] rounded-lg p-2.5 text-center">
                            <div className="text-[var(--green)] font-bold text-sm">KSh {player.balance.toLocaleString()}</div>
                            <div className="text-[var(--text-muted)] text-xs mt-0.5">{user.name}</div>
                        </div>
                    </div>
                )}

                {/* Nav */}
                <nav className="p-2 border-b border-[var(--border)] space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleMenuClick(item.id)}
                            title={collapsed ? item.name : undefined}
                            className={`w-full flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-left transition-all duration-150 ${
                                collapsed ? 'justify-center' : ''
                            } ${
                                currentGame === item.id
                                    ? 'gradient-orange text-white glow-orange'
                                    : 'text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-card)]'
                            }`}
                        >
                            <span className="text-base flex-shrink-0">{item.icon}</span>
                            {!collapsed && <span className="font-medium text-sm">{item.name}</span>}
                        </button>
                    ))}
                </nav>

                {/* Originals */}
                {!collapsed && (
                    <div className="p-3 flex-1 overflow-y-auto">
                        <div className="text-[var(--text-muted)] text-[10px] font-semibold uppercase tracking-widest px-2 mb-2 mt-1">
                            Originals
                        </div>
                        <div className="space-y-1">
                            {originalGames.map((game) => (
                                <button
                                    key={game.id}
                                    onClick={() => { onGameSelect(game.id, 'originals'); onClose(); }}
                                    className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-left transition-colors ${
                                        currentGame === game.id
                                            ? 'bg-[var(--accent)]/20 text-[var(--accent)]'
                                            : 'text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-card)]'
                                    }`}
                                >
                                    <span className="text-sm">{game.icon}</span>
                                    <span className="text-sm font-medium">{game.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
