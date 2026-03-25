import { TrendingUp, TrendingDown } from 'lucide-react';
import type { FC } from "react";

interface BetHistoryItem {
    id: number;
    amount: number;
    multiplier: number;
    result: 'win' | 'loss';
    timestamp: string;
    color: string;
}

export const BetHistory: FC = () => {
    // Mock data - replace with actual bet history from your state
    const betHistory: BetHistoryItem[] = [
        { id: 1, amount: 20, multiplier: 8, result: 'win', color: 'darkblue', timestamp: '2024-01-15 14:30' },
        { id: 2, amount: 50, multiplier: 0, result: 'loss', color: 'skyblue', timestamp: '2024-01-15 14:25' },
        { id: 3, amount: 100, multiplier: 6, result: 'win', color: 'skyblue', timestamp: '2024-01-15 14:20' },
        { id: 4, amount: 150, multiplier: 5, result: 'win', color: 'orange', timestamp: '2024-01-15 14:15' },
        { id: 5, amount: 20, multiplier: 0, result: 'loss', color: 'darkblue', timestamp: '2024-01-15 14:10' },
        { id: 6, amount: 250, multiplier: 8, result: 'win', color: 'darkblue', timestamp: '2024-01-15 14:05' },
    ];

    const getColorClass = (color: string) => {
        switch (color) {
            case 'darkblue': return 'color-darkblue';
            case 'skyblue': return 'color-skyblue';
            case 'orange': return 'color-orange';
            default: return '';
        }
    };

    return (
        <div className="bet-history">
            <h3 className="content-title">Bet History</h3>

            {betHistory.length === 0 ? (
                <div className="empty-state">
                    <p>No bet history yet</p>
                    <p className="empty-subtitle">Your betting history will appear here</p>
                </div>
            ) : (
                <div className="history-list">
                    {betHistory.map((bet) => (
                        <div key={bet.id} className={`history-item ${bet.result}`}>
                            <div className={`history-color ${getColorClass(bet.color)}`}>
                                {bet.result === 'win' ? (
                                    <TrendingUp size={16} />
                                ) : (
                                    <TrendingDown size={16} />
                                )}
                            </div>
                            <div className="history-details">
                                <div className="bet-info">
                                    <span className="bet-amount">ksh{bet.amount}</span>
                                    <span className="bet-multiplier">{bet.multiplier}x</span>
                                </div>
                                <div className="bet-time">{bet.timestamp}</div>
                            </div>
                            <div className="history-result">
                                {bet.result === 'win' ? (
                                    <span className="win-amount">+ksh{(bet.amount * bet.multiplier).toFixed(2)}</span>
                                ) : (
                                    <span className="loss-amount">-ksh{bet.amount}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};