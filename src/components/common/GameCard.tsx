import React from 'react';

interface Game {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    image: string;
    popularity: number;
    minBet: number;
}

interface GameCardProps {
    game: Game;
    onPlay: () => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onPlay }) => {
    return (
        <div
            className="bg-stake-gray rounded-2xl overflow-hidden border border-stake-light-gray transition-all duration-300 hover:transform hover:scale-105 hover:glow-purple cursor-pointer group"
            onClick={onPlay}
        >
            {/* Game Image */}
            <div className={`h-32 bg-gradient-to-r ${game.color} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                <div className="absolute top-4 left-4 text-4xl">
                    {game.icon}
                </div>
                {/* Popularity Badge */}
                <div className="absolute top-4 right-4 bg-stake-dark bg-opacity-80 rounded-full px-3 py-1">
                    <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-stake-green rounded-full animate-pulse"></div>
                        <span className="text-white text-sm font-bold">{game.popularity}%</span>
                    </div>
                </div>
            </div>

            {/* Game Info */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-white">{game.name}</h3>
                    <div className="bg-stake-dark rounded-lg px-2 py-1">
                        <span className="text-stake-light-gray text-sm">${game.minBet}+</span>
                    </div>
                </div>

                <p className="text-stake-light-gray text-sm mb-4 leading-relaxed">
                    {game.description}
                </p>

                {/* Play Button */}
                <button
                    className="w-full bg-gradient-to-r from-stake-purple to-stake-purple-dark text-white py-3 rounded-lg font-bold transition-all duration-200 hover:from-stake-purple-dark hover:to-stake-purple-dark transform hover:scale-105 active:scale-95"
                    onClick={(e) => {
                        e.stopPropagation();
                        onPlay();
                    }}
                >
                    PLAY NOW
                </button>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-stake-purple rounded-2xl transition-all duration-300 pointer-events-none"></div>
        </div>
    );
};