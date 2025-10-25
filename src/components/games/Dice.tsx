import React, { useState, useCallback } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { Button } from '../common/Button';
import { BetControls } from '../common/BetControls';

export const Dice: React.FC = () => {
    const { gameState: globalGameState, updateBalance, placeBet } = useGameState();
    const [diceGame, setDiceGame] = useState({
        rolling: false,
        result: null as number | null,
        targetNumber: 50,
        rollAbove: true,
    });

    const rollDice = useCallback(() => {
        if (globalGameState.balance < globalGameState.betAmount) return;

        setDiceGame(prev => ({ ...prev, rolling: true, result: null }));
        updateBalance(-globalGameState.betAmount);

        setTimeout(() => {
            const result = Math.floor(Math.random() * 100) + 1;
            const win = diceGame.rollAbove ? result > diceGame.targetNumber : result < diceGame.targetNumber;
            const winAmount = win ? globalGameState.betAmount * (diceGame.rollAbove ? 0.98 : 0.98) : 0;

            setDiceGame(prev => ({ ...prev, rolling: false, result }));

            if (winAmount > 0) {
                updateBalance(winAmount);
            }
        }, 2000);
    }, [globalGameState.betAmount, globalGameState.balance, updateBalance, diceGame.targetNumber, diceGame.rollAbove]);

    return (
        <div className="min-h-screen bg-stake-dark pt-16 lg:pt-0">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-stake-gray rounded-2xl p-8 border border-stake-border">
                    <h1 className="text-3xl font-bold text-white text-center mb-2">DICE</h1>
                    <p className="text-stake-light-gray text-center mb-8">Predict the roll and win</p>

                    {/* Dice Display */}
                    <div className="bg-stake-dark rounded-xl p-8 mb-6 border-2 border-stake-purple text-center">
                        <div className="text-6xl mb-4">
                            {diceGame.rolling ? '🎲' : diceGame.result ? `🎲 ${diceGame.result}` : '🎲'}
                        </div>
                        {diceGame.rolling ? (
                            <div className="text-stake-purple text-xl font-bold">Rolling...</div>
                        ) : diceGame.result && (
                            <div className={`text-2xl font-bold ${
                                (diceGame.rollAbove && diceGame.result > diceGame.targetNumber) ||
                                (!diceGame.rollAbove && diceGame.result < diceGame.targetNumber)
                                    ? 'text-stake-green'
                                    : 'text-stake-red'
                            }`}>
                                {diceGame.result} {diceGame.rollAbove ? '>' : '<'} {diceGame.targetNumber} -
                                {(diceGame.rollAbove && diceGame.result > diceGame.targetNumber) ||
                                (!diceGame.rollAbove && diceGame.result < diceGame.targetNumber)
                                    ? ' WIN!'
                                    : ' LOSE'}
                            </div>
                        )}
                    </div>

                    {/* Controls */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <BetControls
                                betAmount={globalGameState.betAmount}
                                onBetChange={placeBet}
                                balance={globalGameState.balance}
                                disabled={diceGame.rolling}
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <Button
                                onClick={rollDice}
                                disabled={diceGame.rolling || globalGameState.balance < globalGameState.betAmount}
                                size="lg"
                                variant="primary"
                            >
                                {diceGame.rolling ? 'ROLLING...' : 'ROLL DICE'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};