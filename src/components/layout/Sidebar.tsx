import React, {useState} from 'react';
import {User, Player} from '@/types';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    currentGame: string;
    onGameSelect: (gameId: string, category?: string, gameNumber?: number) => void; // Updated interface
    user: User;
    player: Player;
}

const menuItems = [
    {id: 'home', name: 'Home', icon: '🏠'},
    {id: 'slots', name: 'Slots', icon: '🎰'},
    {id: 'live', name: 'Live Casino', icon: '🎥'},
    {id: 'sports', name: 'Sports', icon: '⚽'},
    {id: 'originals', name: 'Originals', icon: '⭐'},
    {id: 'promotions', name: 'Promotions', icon: '🎁'},
    {id: 'vip', name: 'VIP', icon: '👑'},
];

const originalGames = [
    {id: 'dice', name: 'Dice', icon: '🎲'},
    {id: 'mines', name: 'Mines', icon: '💣'},
    {id: 'crash', name: 'Crash', icon: '🚀'},
    {id: 'plinko', name: 'Plinko', icon: '🔴'},
    {id: 'blackjack', name: 'Blackjack', icon: '🃏'},
    {id: 'roulette', name: 'Roulette', icon: '🎡'},
];

export const Sidebar: React.FC<SidebarProps> = ({
                                                    isOpen,
                                                    onClose,
                                                    currentGame,
                                                    onGameSelect,
                                                    user,
                                                    player
                                                }) => {
    // const [collapsed, setCollapsed] = useState(false);
    const [collapsed, setCollapsed] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth >= 1024; // collapsed on desktop by default
        }
        return false;
    });
    const handleMenuClick = (itemId: string) => {
        if (itemId === 'home') {
            onGameSelect('home');
        } else if (itemId === 'slots') {
            onGameSelect('slots', 'slots');
        } else if (itemId === 'originals') {
            // Do nothing, just switch to originals section
            onGameSelect('originals', 'originals');
        } else {
            onGameSelect(itemId, itemId);
        }
        onClose();
    };

    const handleGameClick = (gameId: string) => {
        onGameSelect(gameId, 'originals');
        onClose();
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-transparent bg-opacity-50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div className={`
    fixed top-0 left-0 h-full bg-stake-darker/95 backdrop-blur-md border-r border-stake-border z-50 transform transition-all duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
    ${collapsed ? 'w-20' : 'w-64'} 
    lg:fixed lg:translate-x-0 lg:z-50
`}>
                {/*Logo and Collapse Button*/}
                <div className="p-4 border-b border-stake-border">
                    <div
                        className={`flex items-center justify-between ${collapsed ? 'flex-col space-y-2' : 'space-x-3'}`}>
                        {!collapsed && (
                            <div className="flex items-center space-x-3">
                                <div
                                    className="w-10 h-10 gradient-orange rounded-lg flex items-center justify-center glow-orange">
                                    <span className="text-white font-bold text-lg">JW</span>
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold gradient-text">JW Gaming</h1>
                                    <p className="text-gray-400 text-xs">Premium Casino</p>
                                </div>
                            </div>
                        )}
                        {collapsed && (
                            <div
                                className="w-10 h-10 gradient-orange rounded-lg flex items-center justify-center glow-orange">
                                <span className="text-white font-bold text-lg">JW</span>
                            </div>
                        )}
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-stake-gray rounded-lg transition-colors"
                        >
                            {collapsed ? '→' : '←'}
                        </button>
                    </div>
                </div>

                {/* User Info */}
                {user.isLoggedIn && !collapsed && (
                    <div className="p-4 border-b border-stake-border">
                        <div className="bg-stake-gray rounded-lg p-3 text-center">
                            <div className="text-stake-green font-bold text-lg">${player.balance.toLocaleString()}</div>
                            <div className="text-gray-400 text-sm">{user.name}</div>
                        </div>
                    </div>
                )}

                {/* Main Menu */}
                <div className="p-4 border-b border-stake-border">
                    <nav className="space-y-1">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleMenuClick(item.id)}
                                className={`w-full flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} px-3 py-3 rounded-xl text-left transition-all duration-200 ${
                                    currentGame === item.id
                                        ? 'gradient-orange text-white shadow-lg glow-orange'
                                        : 'text-gray-300 hover:text-white hover:bg-stake-gray'
                                }`}
                            >
                                <span className="text-lg">{item.icon}</span>
                                {!collapsed && <span className="font-medium">{item.name}</span>}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Stake Originals */}
                {!collapsed && (
                    <div className="p-4">
                        <h3 className="text-gray-400 text-sm font-semibold mb-3 uppercase tracking-wider">Stake
                            Originals</h3>
                        <div className="space-y-1">
                            {originalGames.map((game) => (
                                <button
                                    key={game.id}
                                    onClick={() => handleGameClick(game.id)}
                                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                                        currentGame === game.id
                                            ? 'bg-stake-orange text-white'
                                            : 'text-gray-300 hover:text-white hover:bg-stake-gray'
                                    }`}
                                >
                                    <span className="text-lg">{game.icon}</span>
                                    <span className="font-medium">{game.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};