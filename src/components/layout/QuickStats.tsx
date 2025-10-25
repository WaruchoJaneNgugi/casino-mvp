import React from 'react';
import { Player } from '@/types';

interface QuickStatsProps {
    player: Player;
    onDeposit: (amount: number) => void; // Add this prop
}

export const QuickStats: React.FC<QuickStatsProps> = ({ player, onDeposit }) => {
    const stats = [
        { label: 'Total Wagered', value: '$12.4K', change: '+2.4%' },
        { label: 'Games Played', value: '1,247', change: '+15%' },
        { label: 'Win Rate', value: '48.2%', change: '+3.1%' },
        { label: 'Biggest Win', value: '$2,450', change: 'Crash' },
    ];

    const depositOptions = [10, 50, 100, 500, 1000];

    return (
        <div className="bg-stake-gray rounded-lg border border-stake-border p-6">
            <h3 className="text-lg font-bold text-white mb-4">📊 Your Stats</h3>

            {/* Balance Card */}
            <div className="bg-stake-dark rounded-lg p-4 border border-stake-orange mb-4">
                <div className="text-center">
                    <div className="text-gray-400 text-sm mb-1">Current Balance</div>
                    <div className="text-2xl font-bold text-stake-green">${player.balance.toLocaleString()}</div>
                    <div className="flex justify-center space-x-4 mt-2 text-xs">
                        <div className="text-center">
                            <div className="text-gray-400">Wins</div>
                            <div className="text-stake-green font-bold">{player.totalWins}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-gray-400">Losses</div>
                            <div className="text-stake-red font-bold">{player.totalLosses}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistics */}
            <div className="space-y-3">
                {stats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">{stat.label}</span>
                        <div className="text-right">
                            <div className="text-white font-medium">{stat.value}</div>
                            <div className="text-stake-green text-xs">{stat.change}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-4 border-t border-stake-border">
                <h4 className="text-white font-semibold mb-3">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-2">
                    <button
                        onClick={() => onDeposit(100)}
                        className="gradient-orange text-white py-2 px-3 rounded-lg text-sm font-bold hover-glow transition-all"
                    >
                        Deposit $100
                    </button>
                    <button className="bg-stake-dark border border-stake-border text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-stake-light-gray transition-colors">
                        Withdraw
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                    {[10, 50, 500].map(amount => (
                        <button
                            key={amount}
                            onClick={() => onDeposit(amount)}
                            className="bg-stake-gray border border-stake-border text-white py-2 rounded text-xs font-medium hover:bg-stake-light-gray transition-colors"
                        >
                            ${amount}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};