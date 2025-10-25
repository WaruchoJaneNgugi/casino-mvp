import React from 'react';

interface FeaturedGamesProps {
    onGameSelect: (gameId: string, category?: string, gameNumber?: number) => void; // Make category and gameNumber optional
    userLoggedIn: boolean;
}

export const FeaturedGames: React.FC<FeaturedGamesProps> = ({ onGameSelect, userLoggedIn }) => {
    const featuredGames = [
        {
            id: 'crash',
            name: 'Crash',
            description: 'Cash out before it crashes!',
            multiplier: '5.25x',
            players: '1.2K',
            icon: '🚀',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            id: 'dice',
            name: 'Dice',
            description: 'Predict the roll and win big',
            multiplier: '98%',
            players: '2.3K',
            icon: '🎲',
            color: 'from-green-500 to-emerald-500'
        },
        {
            id: 'mines',
            name: 'Mines',
            description: 'Find gems, avoid bombs',
            multiplier: '3.5x',
            players: '2.8K',
            icon: '💣',
            color: 'from-orange-500 to-red-500'
        }
    ];

    const handleGameClick = (gameId: string) => {
        if (!userLoggedIn) {
            alert('Please login to play games!');
            return;
        }
        // For featured games, we assume they are originals
        onGameSelect(gameId, 'originals');
    };

    return (
        <div className="bg-stake-gray rounded-lg border border-stake-border p-6">
            <h3 className="text-lg font-bold text-white mb-4">🔥 Featured Games</h3>
            <div className="space-y-4">
                {featuredGames.map((game) => (
                    <div
                        key={game.id}
                        onClick={() => handleGameClick(game.id)}
                        className="bg-stake-dark rounded-lg border border-stake-border p-4 hover:border-stake-orange transition-colors cursor-pointer group"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${game.color} flex items-center justify-center`}>
                                    <span className="text-xl">{game.icon}</span>
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold">{game.name}</h4>
                                    <p className="text-gray-400 text-sm">{game.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-stake-green font-bold">{game.multiplier}</span>
                            <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-stake-green rounded-full animate-pulse"></div>
                                <span className="text-gray-400">{game.players} playing</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};