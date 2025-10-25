import React from 'react';
import { Button } from './Button';

interface BetControlsProps {
    betAmount: number;
    onBetChange: (amount: number) => void;
    balance: number;
    disabled?: boolean;
}

const betOptions = [1, 5, 10, 25, 50, 100];

export const BetControls: React.FC<BetControlsProps> = ({
                                                            betAmount,
                                                            onBetChange,
                                                            balance,
                                                            disabled = false,
                                                        }) => {
    return (
        <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
                <span className="text-white font-semibold">Current Bet:</span>
                <span className="text-yellow-400 font-bold text-xl">${betAmount}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
                {betOptions.map(amount => (
                    <Button
                        key={amount}
                        onClick={() => onBetChange(amount)}
                        variant={betAmount === amount ? 'primary' : 'secondary'}
                        size="sm"
                        disabled={disabled || amount > balance}
                    >
                        ${amount}
                    </Button>
                ))}
            </div>

            <div className="flex gap-2">
                <Button
                    onClick={() => onBetChange(Math.max(1, betAmount - 1))}
                    variant="secondary"
                    size="sm"
                    disabled={disabled || betAmount <= 1}
                >
                    -
                </Button>
                <Button
                    onClick={() => onBetChange(betAmount + 1)}
                    variant="secondary"
                    size="sm"
                    disabled={disabled || betAmount >= balance}
                >
                    +
                </Button>
                <Button
                    onClick={() => onBetChange(Math.floor(balance / 2))}
                    variant="secondary"
                    size="sm"
                    disabled={disabled}
                >
                    1/2
                </Button>
                <Button
                    onClick={() => onBetChange(balance)}
                    variant="secondary"
                    size="sm"
                    disabled={disabled}
                >
                    MAX
                </Button>
            </div>
        </div>
    );
};