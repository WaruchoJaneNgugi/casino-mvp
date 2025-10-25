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
                                                  user,
                                                  player,
                                                  onMenuToggle,
                                                  onAuthClick,
                                                  onLogout,
                                                  onDeposit,
                                                  currentView,
                                                  onHomeClick,
                                              }) => {
    const [showDepositMenu, setShowDepositMenu] = useState(false);
    const depositOptions = [10, 50, 100, 500, 1000];

    return (
        <header className="fixed top-0 left-0 right-0 bg-stake-darker/95 backdrop-blur-md border-b border-stake-border z-50 lg:left-20 transition-all duration-300">
            <div className="flex items-center justify-between h-16 px-4">
                {/* Left Section - Menu Button and Logo */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={onMenuToggle}
                        className="w-10 h-10 flex items-center justify-center text-white hover:bg-stake-gray rounded-xl transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Logo */}
                    <div
                        onClick={onHomeClick}
                        className="flex items-center space-x-3 cursor-pointer transform hover:scale-105 transition-transform"
                    >
                        <div className="w-10 h-10 gradient-orange rounded-xl flex items-center justify-center glow-orange">
                            <span className="text-white font-bold text-lg">JW</span>
                        </div>
                        <h1 className="text-xl font-bold gradient-text hidden sm:block">JW Gaming</h1>
                    </div>
                </div>

                {/* Center Section - Balance (Mobile) */}
                {user.isLoggedIn && (
                    <div className="flex-1 flex justify-center lg:hidden max-w-xs">
                        <div className="bg-stake-gray rounded-xl px-4 py-2 border border-stake-border glow-orange">
                            <div className="text-xs text-gray-400 text-center">BALANCE</div>
                            <div className="text-stake-green font-bold">${player.balance.toLocaleString()}</div>
                        </div>
                    </div>
                )}

                {/* Right Section - Auth/Profile */}
                <div className="flex items-center space-x-3">
                    {/* Balance and Deposit (Desktop) */}
                    {user.isLoggedIn ? (
                        <>
                            <div className="hidden lg:flex items-center space-x-4">
                                {/* Balance */}
                                <div className="bg-stake-gray rounded-xl px-4 py-2 border border-stake-border glow-orange">
                                    <div className="text-xs text-gray-400">BALANCE</div>
                                    <div className="text-stake-green font-bold">${player.balance.toLocaleString()}</div>
                                </div>

                                {/* Deposit Button */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowDepositMenu(!showDepositMenu)}
                                        className="gradient-orange text-white px-4 py-2 rounded-xl font-bold hover-glow transition-all"
                                    >
                                        Deposit
                                    </button>

                                    {/* Deposit Dropdown */}
                                    {showDepositMenu && (
                                        <div className="absolute top-full right-0 mt-2 w-48 bg-stake-dark border border-stake-border rounded-xl shadow-2xl z-50">
                                            <div className="p-3 border-b border-stake-border">
                                                <div className="text-white font-bold text-sm">Quick Deposit</div>
                                            </div>
                                            <div className="p-2 space-y-2">
                                                {depositOptions.map(amount => (
                                                    <button
                                                        key={amount}
                                                        onClick={() => {
                                                            onDeposit(amount);
                                                            setShowDepositMenu(false);
                                                        }}
                                                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-stake-gray transition-colors text-white text-sm"
                                                    >
                                                        Deposit ${amount}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Profile */}
                            <div className="flex items-center space-x-3">
                                <div className="text-right hidden sm:block">
                                    <div className="text-white font-medium text-sm">{user.name}</div>
                                    <div className="text-stake-green text-xs">ID: {user.id}</div>
                                </div>
                                <div className="relative group">
                                    <div className="w-10 h-10 gradient-orange rounded-full flex items-center justify-center border-2 border-stake-orange-dark cursor-pointer">
                                        <span className="text-white font-bold text-sm">{user.name.charAt(0).toUpperCase()}</span>
                                    </div>
                                    {/* Profile Dropdown */}
                                    <div className="absolute top-full right-0 mt-2 w-48 bg-stake-dark border border-stake-border rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                        <div className="p-4 border-b border-stake-border">
                                            <div className="text-white font-bold">{user.name}</div>
                                            <div className="text-stake-green text-sm">${player.balance.toLocaleString()}</div>
                                        </div>
                                        <div className="p-2">
                                            <button
                                                onClick={onLogout}
                                                className="w-full text-left px-3 py-2 rounded-lg hover:bg-stake-red hover:text-white transition-colors text-gray-300 text-sm"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        /* Auth Buttons */
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => onAuthClick('login')}
                                className="text-white hover:text-stake-orange transition-colors font-medium"
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => onAuthClick('register')}
                                className="gradient-orange text-white px-4 py-2 rounded-xl font-bold hover-glow transition-all"
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