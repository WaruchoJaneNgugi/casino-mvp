import React, { useState } from 'react';
import { User, Player } from '@/types';

interface HeaderProps {
    user: User;
    player: Player;
    onMenuToggle: () => void;
    onAuthClick: (mode: 'login' | 'register') => void;
    onLogout: () => void;
    onDeposit: (amount: number) => void;
    currentView: string;
    onHomeClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
    user, player, onMenuToggle, onAuthClick, onLogout, onDeposit, onHomeClick,
}) => {
    const [showDeposit, setShowDeposit] = useState(false);
    const depositOptions = [10, 50, 100, 500, 1000];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--bg-secondary)]/95 backdrop-blur-md lg:left-20 transition-all duration-300">
            <div className="flex items-center justify-between h-14 px-4 gap-3">
                {/* Left */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={onMenuToggle}
                        className="w-9 h-9 flex items-center justify-center text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-card)] rounded-lg transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <button onClick={onHomeClick} className="flex items-center gap-2 group">
                        <div className="w-8 h-8 gradient-orange rounded-lg flex items-center justify-center glow-orange">
                            <span className="text-white font-bold text-sm">JW</span>
                        </div>
                        <span className="text-white font-bold text-base hidden sm:block gradient-text">JW Gaming</span>
                    </button>
                </div>

                {/* Right */}
                <div className="flex items-center gap-2">
                    {user.isLoggedIn ? (
                        <>
                            {/* Balance */}
                            <div className="hidden sm:flex flex-col items-end bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-3 py-1.5">
                                <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Balance</span>
                                <span className="text-[var(--green)] font-bold text-sm leading-none">KSh {player.balance.toLocaleString()}</span>
                            </div>

                            {/* Mobile balance */}
                            <div className="sm:hidden bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-2 py-1">
                                <span className="text-[var(--green)] font-bold text-xs">KSh {player.balance.toLocaleString()}</span>
                            </div>

                            {/* Deposit */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowDeposit(!showDeposit)}
                                    className="gradient-orange text-white px-3 py-2 rounded-lg font-semibold text-sm hover-glow transition-all"
                                >
                                    + Deposit
                                </button>
                                {showDeposit && (
                                    <div className="absolute top-full right-0 mt-2 w-44 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-2xl z-50 overflow-hidden">
                                        <div className="px-3 py-2 border-b border-[var(--border)]">
                                            <span className="text-white font-semibold text-xs uppercase tracking-wider">Quick Deposit</span>
                                        </div>
                                        {depositOptions.map(amount => (
                                            <button
                                                key={amount}
                                                onClick={() => { onDeposit(amount); setShowDeposit(false); }}
                                                className="w-full text-left px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-elevated)] transition-colors"
                                            >
                                                KSh {amount.toLocaleString()}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Avatar */}
                            <div className="relative group">
                                <div className="w-8 h-8 gradient-orange rounded-full flex items-center justify-center cursor-pointer border border-[var(--accent-dark)]">
                                    <span className="text-white font-bold text-xs">{user.name.charAt(0).toUpperCase()}</span>
                                </div>
                                <div className="absolute top-full right-0 mt-2 w-44 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                                    <div className="px-3 py-3 border-b border-[var(--border)]">
                                        <div className="text-white font-semibold text-sm">{user.name}</div>
                                        <div className="text-[var(--green)] text-xs">KSh {player.balance.toLocaleString()}</div>
                                    </div>
                                    <button
                                        onClick={onLogout}
                                        className="w-full text-left px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--red)] hover:bg-[var(--bg-elevated)] transition-colors"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => onAuthClick('login')}
                                className="text-[var(--text-secondary)] hover:text-white transition-colors font-medium text-sm px-3 py-2"
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => onAuthClick('register')}
                                className="gradient-orange text-white px-4 py-2 rounded-lg font-semibold text-sm hover-glow transition-all"
                            >
                                Register
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
