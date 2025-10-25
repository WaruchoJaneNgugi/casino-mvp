import React, { useState, useCallback } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { Button } from '../common/Button';
import { BetControls } from '../common/BetControls';

export const Mines: React.FC = () => {
    const { gameState: globalGameState, updateBalance, placeBet } = useGameState();
    const [minesGame, setMinesGame] = useState({
        started: false,
        mines: 3,
        revealed: [] as number[],
        gameOver: false,
        winAmount: 0,
    });

    const startGame = useCallback(() => {
        if (globalGameState.balance < globalGameState.betAmount) return;

        setMinesGame({
            started: true,
            mines: 3,
            revealed: [],
            gameOver: false,
            winAmount: 0,
        });
        updateBalance(-globalGameState.betAmount);
    }, [globalGameState.betAmount, globalGameState.balance, updateBalance]);

    return (
        <div className="min-h-screen bg-stake-dark pt-16 lg:pt-0">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-stake-gray rounded-2xl p-8 border border-stake-border">
                    <h1 className="text-3xl font-bold text-white text-center mb-2">MINES</h1>
                    <p className="text-stake-light-gray text-center mb-8">Find gems and avoid mines</p>

                    {/* Mines Grid */}
                    <div className="bg-stake-dark rounded-xl p-6 mb-6 border-2 border-stake-purple">
                        <div className="grid grid-cols-5 gap-2">
                            {Array.from({ length: 25 }, (_, index) => (
                                <div
                                    key={index}
                                    className="aspect-square bg-stake-light-gray rounded flex items-center justify-center text-xl cursor-pointer hover:bg-stake-border transition-colors"
                                >
                                    {minesGame.revealed.includes(index) ? '💎' : '?'}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <BetControls
                                betAmount={globalGameState.betAmount}
                                onBetChange={placeBet}
                                balance={globalGameState.balance}
                                disabled={minesGame.started}
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            {!minesGame.started ? (
                                <Button
                                    onClick={startGame}
                                    disabled={globalGameState.balance < globalGameState.betAmount}
                                    size="lg"
                                    variant="primary"
                                >
                                    START GAME
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => setMinesGame(prev => ({ ...prev, started: false }))}
                                    size="lg"
                                    variant="success"
                                >
                                    CASH OUT
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};