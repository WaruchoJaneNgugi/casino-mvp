import React, { useState, useCallback } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { Button } from '../common/Button';
import { BetControls } from '../common/BetControls';

export const Crash: React.FC = () => {
    const { gameState: globalGameState, updateBalance, placeBet } = useGameState();
    const [crashGame, setCrashGame] = useState({
        playing: false,
        multiplier: 1.0,
        crashed: false,
        history: [2.15, 1.85, 3.42, 1.23, 4.67],
    });

    const startGame = useCallback(() => {
        if (globalGameState.balance < globalGameState.betAmount) return;

        setCrashGame(prev => ({ ...prev, playing: true, multiplier: 1.0, crashed: false }));
        updateBalance(-globalGameState.betAmount);

        // Simulate crash game
        let multiplier = 1.0;
        const interval = setInterval(() => {
            multiplier += 0.01;
            setCrashGame(prev => ({ ...prev, multiplier }));

            // Random crash between 1.1x and 5x
            if (Math.random() < 0.02 && multiplier > 1.1) {
                clearInterval(interval);
                setCrashGame(prev => ({ ...prev, playing: false, crashed: true }));

                // Add to history
                setCrashGame(prev => ({
                    ...prev,
                    history: [multiplier, ...prev.history.slice(0, 4)]
                }));
            }
        }, 100);
    }, [globalGameState.betAmount, globalGameState.balance, updateBalance]);

    const cashOut = useCallback(() => {
        if (!crashGame.playing) return;

        const winAmount = globalGameState.betAmount * crashGame.multiplier;
        updateBalance(winAmount);
        setCrashGame(prev => ({
            ...prev,
            playing: false,
            history: [crashGame.multiplier, ...prev.history.slice(0, 4)]
        }));
    }, [crashGame.playing, crashGame.multiplier, globalGameState.betAmount, updateBalance]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-stake-dark to-stake-darker pt-6">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">CRASH</h1>
                    <p className="text-stake-light-gray">Cash out before the crash</p>
                </div>

                <div className="bg-stake-gray rounded-2xl p-8 border border-stake-light-gray">
                    {/* Multiplier Display */}
                    <div className="bg-stake-darker rounded-xl p-8 mb-6 text-center border-2 border-stake-purple">
                        <div className="text-stake-light-gray text-sm mb-2">MULTIPLIER</div>
                        <div className={`text-6xl font-bold ${
                            crashGame.playing
                                ? 'text-stake-green animate-pulse'
                                : crashGame.crashed
                                    ? 'text-stake-red'
                                    : 'text-white'
                        }`}>
                            {crashGame.multiplier.toFixed(2)}x
                        </div>
                        {crashGame.crashed && (
                            <div className="text-stake-red text-2xl font-bold mt-4">CRASHED!</div>
                        )}
                    </div>

                    {/* History */}
                    <div className="grid grid-cols-5 gap-2 mb-6">
                        {crashGame.history.map((multiplier, index) => (
                            <div
                                key={index}
                                className={`p-3 rounded-lg text-center ${
                                    multiplier > 2 ? 'bg-stake-green' : multiplier > 1.5 ? 'bg-stake-purple' : 'bg-stake-red'
                                }`}
                            >
                                <div className="text-white font-bold">{multiplier.toFixed(2)}x</div>
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
                                disabled={crashGame.playing}
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            {!crashGame.playing ? (
                                <Button
                                    onClick={startGame}
                                    disabled={globalGameState.balance < globalGameState.betAmount}
                                    size="lg"
                                    variant="primary"
                                >
                                    🚀 PLACE BET
                                </Button>
                            ) : (
                                <Button
                                    onClick={cashOut}
                                    size="lg"
                                    variant="success"
                                >
                                    💰 CASH OUT ${(globalGameState.betAmount * crashGame.multiplier).toFixed(2)}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};