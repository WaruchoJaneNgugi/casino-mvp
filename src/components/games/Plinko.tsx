import React, { useState, useCallback } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { Button } from '../common/Button';
import { BetControls } from '../common/BetControls';

export const Plinko: React.FC = () => {
    const { gameState: globalGameState, updateBalance, placeBet } = useGameState();
    const [plinkoGame, setPlinkoGame] = useState({
        dropping: false,
        ballPosition: 0,
        result: null as number | null,
        multipliers: [16, 9, 2, 1.4, 1.4, 2, 9, 16],
    });

    const dropBall = useCallback(() => {
        if (globalGameState.balance < globalGameState.betAmount) return;

        setPlinkoGame(prev => ({ ...prev, dropping: true, result: null }));
        updateBalance(-globalGameState.betAmount);

        // Simulate plinko drop
        setTimeout(() => {
            const randomResult = Math.floor(Math.random() * plinkoGame.multipliers.length);
            const winAmount = globalGameState.betAmount * plinkoGame.multipliers[randomResult];

            setPlinkoGame(prev => ({
                ...prev,
                dropping: false,
                result: randomResult
            }));

            if (winAmount > 0) {
                updateBalance(winAmount);
            }
        }, 2000);
    }, [globalGameState.betAmount, globalGameState.balance, updateBalance, plinkoGame.multipliers]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-stake-dark to-stake-darker pt-6">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">PLINKO</h1>
                    <p className="text-stake-light-gray">Drop the ball and win multipliers</p>
                </div>

                <div className="bg-stake-gray rounded-2xl p-8 border border-stake-light-gray">
                    {/* Plinko Board */}
                    <div className="bg-stake-darker rounded-xl p-6 mb-6 border-2 border-stake-purple">
                        <div className="h-64 bg-blue-900 rounded-lg relative">
                            {/* Plinko pins would go here */}
                            <div className="text-center py-8">
                                <div className="text-stake-light-gray text-lg">
                                    {plinkoGame.dropping ? '🎯 Ball dropping...' : 'Ready to drop!'}
                                </div>
                            </div>

                            {plinkoGame.result !== null && (
                                <div className="text-center mt-4">
                                    <div className="text-2xl font-bold text-stake-green">
                                        {plinkoGame.multipliers[plinkoGame.result]}x Multiplier!
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Multipliers */}
                    <div className="grid grid-cols-8 gap-2 mb-6">
                        {plinkoGame.multipliers.map((multiplier, index) => (
                            <div
                                key={index}
                                className={`p-2 rounded text-center text-sm font-bold ${
                                    plinkoGame.result === index
                                        ? 'bg-stake-green text-white glow-green'
                                        : multiplier >= 9
                                            ? 'bg-stake-purple'
                                            : multiplier >= 2
                                                ? 'bg-stake-green'
                                                : 'bg-stake-light-gray'
                                }`}
                            >
                                {multiplier}x
                            </div>
                        ))}
                    </div>

                    {/* Controls */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <BetControls
                                betAmount={globalGameState.betAmount}
                                onBetChange={placeBet}
                                balance={globalGameState.balance}
                                disabled={plinkoGame.dropping}
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <Button
                                onClick={dropBall}
                                disabled={plinkoGame.dropping || globalGameState.balance < globalGameState.betAmount}
                                size="lg"
                                variant="primary"
                            >
                                {plinkoGame.dropping ? '🎯 DROPPING...' : '🎯 DROP BALL'}
                            </Button>

                            <div className="bg-stake-darker rounded-lg p-4 text-center border border-stake-light-gray">
                                <div className="text-stake-light-gray text-sm">BALANCE</div>
                                <div className="text-stake-green text-2xl font-bold">${globalGameState.balance}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};