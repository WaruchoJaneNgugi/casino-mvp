import React, { useState, useCallback } from 'react';
import { RouletteState, RouletteBet } from '@/types';
import { useGameState } from '@/hooks/useGameState';
import { Button } from '../common/Button';
import { BetControls } from '../common/BetControls';
import { getRandomInt, sleep } from '@/utils/gameUtils';

const NUMBERS = [
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5,
    24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
];

export const Roulette: React.FC = () => {
    const { gameState, updateBalance, placeBet } = useGameState();
    const [rouletteState, setRouletteState] = useState<RouletteState>({
        spinning: false,
        result: null,
        bets: [],
        recentNumbers: [],
    });

    const placeRouletteBet = useCallback((type: 'number' | 'color' | 'even-odd' | 'dozen', value: number | string) => {
        if (gameState.balance < gameState.betAmount) return;

        const newBet: RouletteBet = {
            type,
            value,
            amount: gameState.betAmount,
        };

        setRouletteState(prev => ({
            ...prev,
            bets: [...prev.bets, newBet],
        }));

        updateBalance(-gameState.betAmount);
    }, [gameState.betAmount, gameState.balance, updateBalance]);

    const spin = useCallback(async () => {
        if (rouletteState.spinning || rouletteState.bets.length === 0) return;

        setRouletteState(prev => ({ ...prev, spinning: true }));

        // Simulate spinning animation
        const spinDuration = 3000;
        const startTime = Date.now();

        const spinInterval = setInterval(() => {
            const randomNumber = getRandomInt(0, 36);
            setRouletteState(prev => ({ ...prev, result: randomNumber }));
        }, 100);

        await sleep(spinDuration);
        clearInterval(spinInterval);

        // Final result
        const finalNumber = getRandomInt(0, 36);
        const isRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(finalNumber);

        setRouletteState(prev => ({
            ...prev,
            result: finalNumber,
            spinning: false,
            recentNumbers: [finalNumber, ...prev.recentNumbers.slice(0, 9)],
        }));

        // Calculate winnings
        let totalWin = 0;
        rouletteState.bets.forEach(bet => {
            let win = 0;

            switch (bet.type) {
                case 'number':
                    if (bet.value === finalNumber) win = bet.amount * 35;
                    break;
                case 'color':
                    if ((bet.value === 'red' && isRed) || (bet.value === 'black' && !isRed && finalNumber !== 0)) {
                        win = bet.amount * 2;
                    }
                    break;
                case 'even-odd':
                    if (finalNumber !== 0 && ((bet.value === 'even' && finalNumber % 2 === 0) ||
                        (bet.value === 'odd' && finalNumber % 2 === 1))) {
                        win = bet.amount * 2;
                    }
                    break;
                case 'dozen':
                    if (finalNumber !== 0) {
                        const dozen = Math.ceil(finalNumber / 12);
                        if (bet.value === dozen) win = bet.amount * 3;
                    }
                    break;
            }

            totalWin += win;
        });

        if (totalWin > 0) {
            updateBalance(totalWin);
        }

        // Clear bets
        setRouletteState(prev => ({ ...prev, bets: [] }));
    }, [rouletteState, updateBalance]);

    const getNumberColor = (number: number): string => {
        if (number === 0) return 'bg-green-600';
        return [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(number)
            ? 'bg-red-600'
            : 'bg-black';
    };

    const clearBets = useCallback(() => {
        rouletteState.bets.forEach(bet => {
            updateBalance(bet.amount);
        });
        setRouletteState(prev => ({ ...prev, bets: [] }));
    }, [rouletteState.bets, updateBalance]);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="bg-gradient-to-b from-red-900 to-gray-900 rounded-2xl p-8 shadow-2xl">
                {/* Roulette Wheel and Recent Numbers */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {/* Roulette Wheel */}
                    <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6">
                        <div className="text-center mb-4">
                            <div className="text-white text-2xl font-bold mb-2">Roulette Wheel</div>
                            <div className={`w-32 h-32 mx-auto rounded-full border-4 border-yellow-500 flex items-center justify-center text-white text-2xl font-bold ${
                                rouletteState.result !== null ? getNumberColor(rouletteState.result) : 'bg-gray-600'
                            }`}>
                                {rouletteState.result !== null ? rouletteState.result : '?'}
                            </div>
                        </div>
                    </div>

                    {/* Recent Numbers */}
                    <div className="bg-gray-800 rounded-xl p-6">
                        <div className="text-white text-xl font-bold mb-4">Recent Numbers</div>
                        <div className="flex flex-wrap gap-2">
                            {rouletteState.recentNumbers.map((number, index) => (
                                <div
                                    key={index}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${getNumberColor(number)}`}
                                >
                                    {number}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Betting Table */}
                <div className="bg-gray-800 rounded-xl p-6 mb-6">
                    <div className="grid grid-cols-13 gap-1 mb-4">
                        {/* Numbers */}
                        {NUMBERS.map(number => (
                            <button
                                key={number}
                                onClick={() => placeRouletteBet('number', number)}
                                disabled={rouletteState.spinning}
                                className={`w-12 h-12 rounded flex items-center justify-center text-white font-bold ${
                                    getNumberColor(number)
                                } hover:opacity-80 disabled:opacity-50`}
                            >
                                {number}
                            </button>
                        ))}
                    </div>

                    {/* Outside Bets */}
                    <div className="grid grid-cols-6 gap-2">
                        <button
                            onClick={() => placeRouletteBet('even-odd', 'even')}
                            disabled={rouletteState.spinning}
                            className="bg-green-600 text-white p-2 rounded font-bold hover:bg-green-700 disabled:opacity-50"
                        >
                            EVEN
                        </button>
                        <button
                            onClick={() => placeRouletteBet('color', 'red')}
                            disabled={rouletteState.spinning}
                            className="bg-red-600 text-white p-2 rounded font-bold hover:bg-red-700 disabled:opacity-50"
                        >
                            RED
                        </button>
                        <button
                            onClick={() => placeRouletteBet('color', 'black')}
                            disabled={rouletteState.spinning}
                            className="bg-black text-white p-2 rounded font-bold hover:bg-gray-800 disabled:opacity-50"
                        >
                            BLACK
                        </button>
                        <button
                            onClick={() => placeRouletteBet('even-odd', 'odd')}
                            disabled={rouletteState.spinning}
                            className="bg-green-600 text-white p-2 rounded font-bold hover:bg-green-700 disabled:opacity-50"
                        >
                            ODD
                        </button>
                        <button
                            onClick={() => placeRouletteBet('dozen', 1)}
                            disabled={rouletteState.spinning}
                            className="bg-yellow-600 text-white p-2 rounded font-bold hover:bg-yellow-700 disabled:opacity-50"
                        >
                            1-12
                        </button>
                        <button
                            onClick={() => placeRouletteBet('dozen', 2)}
                            disabled={rouletteState.spinning}
                            className="bg-yellow-600 text-white p-2 rounded font-bold hover:bg-yellow-700 disabled:opacity-50"
                        >
                            13-24
                        </button>
                    </div>
                </div>

                {/* Current Bets */}
                <div className="bg-gray-800 rounded-xl p-4 mb-6">
                    <div className="text-white font-bold mb-2">Current Bets:</div>
                    <div className="flex flex-wrap gap-2">
                        {rouletteState.bets.map((bet, index) => (
                            <div key={index} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                                {bet.type}: {bet.value} (${bet.amount})
                            </div>
                        ))}
                        {rouletteState.bets.length === 0 && (
                            <div className="text-gray-400">No bets placed</div>
                        )}
                    </div>
                </div>

                {/* Controls */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <BetControls
                            betAmount={gameState.betAmount}
                            onBetChange={placeBet}
                            balance={gameState.balance}
                            disabled={rouletteState.spinning}
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <Button
                            onClick={spin}
                            disabled={rouletteState.spinning || rouletteState.bets.length === 0}
                            size="lg"
                        >
                            {rouletteState.spinning ? 'SPINNING...' : 'SPIN'}
                        </Button>

                        <Button
                            onClick={clearBets}
                            variant="secondary"
                            disabled={rouletteState.spinning || rouletteState.bets.length === 0}
                        >
                            CLEAR BETS
                        </Button>

                        <div className="bg-gray-800 rounded-lg p-4 text-center">
                            <div className="text-white">Balance</div>
                            <div className="text-green-400 text-2xl font-bold">${gameState.balance}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};