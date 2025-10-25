import React from 'react';

export const LiveActivity: React.FC = () => {
    const liveWins = [
        { player: 'CryptoWhale', game: 'Crash', amount: '$12,450', multiplier: '47.8x' },
        { player: 'LuckyStrike', game: 'Dice', amount: '$8,230', multiplier: '98.2%' },
        { player: 'BitcoinKing', game: 'Slots', amount: '$5,670', multiplier: '250x' },
        { player: 'OrangeHustler', game: 'Mines', amount: '$3,890', multiplier: '12.5x' },
    ];

    return (
        <div className="bg-stake-gray rounded-lg border border-stake-border p-6">
            <h3 className="text-lg font-bold text-white mb-4">🎯 Live Wins</h3>
            <div className="space-y-3">
                {liveWins.map((win, index) => (
                    <div key={index} className="bg-stake-dark rounded-lg p-3 border border-stake-border">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-white font-medium text-sm">{win.player}</span>
                            <span className="text-stake-green font-bold text-sm">{win.amount}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-400">{win.game}</span>
                            <span className="text-stake-orange">{win.multiplier}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-stake-border">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Total Online</span>
                    <span className="text-stake-green font-bold">24,589 players</span>
                </div>
            </div>
        </div>
    );
};