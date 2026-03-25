import React from 'react';
import { gameImages } from '@/utils/imageutils';

interface GameGridProps {
    onGameSelect: (gameId: string) => void;
    userLoggedIn: boolean;
}

const featuredGames = [
    {
        id: 'crash',
        name: 'Crash',
        description: 'Cash out before the rocket crashes!',
        multiplier: '5.25x',
        players: '1.2K',
        icon: '🚀',
        gradient: 'from-purple-500 to-pink-500',
        popularity: 98
    },
    {
        id: 'dice',
        name: 'Dice',
        description: 'Predict the roll and win big',
        multiplier: '98%',
        players: '2.3K',
        icon: '🎲',
        gradient: 'from-blue-500 to-cyan-500',
        popularity: 95
    },
    {
        id: 'mines',
        name: 'Mines',
        description: 'Find gems and avoid bombs',
        multiplier: '3.5x',
        players: '2.8K',
        icon: '💣',
        gradient: 'from-orange-500 to-red-500',
        popularity: 92
    },
    {
        id: 'plinko',
        name: 'Plinko',
        description: 'Drop the ball and watch it bounce',
        multiplier: '16x',
        players: '1.9K',
        icon: '🔴',
        gradient: 'from-green-500 to-emerald-500',
        popularity: 88
    }
];

export const GameGrid: React.FC<GameGridProps> = ({ onGameSelect, userLoggedIn }) => {
    const handleGameClick = (gameId: string) => {
        if (!userLoggedIn) {
            onGameSelect('__auth__');
            return;
        }
        onGameSelect(gameId);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredGames.map((game) => (
                <div
                    key={game.id}
                    onClick={() => handleGameClick(game.id)}
                    className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                >
                    <div className={`bg-gradient-to-br ${game.gradient} rounded-2xl p-1 glow-orange group-hover:glow-gold transition-all duration-300`}>
                        <div className="bg-stake-dark rounded-xl p-6 h-full">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    {/* Use getGameImage for the game image */}
                                    <div
                                        className="w-full h-32 rounded-lg bg-cover bg-center mb-3 flex items-center justify-center relative overflow-hidden"
                                        style={{ backgroundImage: `url('${gameImages[game.id as keyof typeof gameImages] as string}')` }}
                                    >
                                        <div className="absolute inset-0 bg-black/40"></div>
                                        <span className="text-2xl relative z-10">{game.icon}</span>
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
                                    <div className="flex items-center space-x-1">
                                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                        <span className="text-yellow-500 text-sm">{game.popularity}%</span>
                                    </div>
                                </div>
                                <button className="gradient-orange text-white px-4 py-2 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-2">
                                    PLAY NOW
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};