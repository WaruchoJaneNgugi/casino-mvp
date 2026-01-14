import {useState, useCallback, FC} from 'react';
import { SlotMachineState, SlotResult } from '@/types';
import { useGameState } from '@/hooks/useGameState';
import { Button } from '../common/Button';
import { BetControls } from '../common/BetControls';
import { getRandomInt, sleep } from '@/utils/gameUtils';

// const SYMBOLS = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎', '7️⃣'];
const STAKE_SYMBOLS = ['⭐', '🔥', '💎', '🎯', '🚀', '👑', '💰'];

export const SlotMachine: FC = () => {
    const { gameState, updateBalance, placeBet } = useGameState();
    const [slotState, setSlotState] = useState<SlotMachineState>({
        reels: Array(5).fill(null).map(() => Array(3).fill(STAKE_SYMBOLS[0])),
        spinning: false,
        result: null,
    });

    const spinReels = useCallback(async () => {
        if (slotState.spinning || gameState.balance < gameState.betAmount) return;

        setSlotState(prev => ({ ...prev, spinning: true, result: null }));
        updateBalance(-gameState.betAmount);

        const spinDuration = 2000;
        const startTime = Date.now();

        const spinInterval = setInterval(() => {
            const newReels = slotState.reels.map(reel =>
                reel.map(() => STAKE_SYMBOLS[getRandomInt(0, STAKE_SYMBOLS.length - 1)])
            );
            setSlotState(prev => ({ ...prev, reels: newReels }));
        }, 100);

        await sleep(spinDuration);
        clearInterval(spinInterval);

        const finalReels = Array(5).fill(null).map(() =>
            Array(3).fill(null).map(() => STAKE_SYMBOLS[getRandomInt(0, STAKE_SYMBOLS.length - 1)])
        );

        const result = calculateWin(finalReels, gameState.betAmount);

        setSlotState({
            reels: finalReels,
            spinning: false,
            result,
        });

        if (result.winAmount > 0) {
            updateBalance(result.winAmount);
        }
    }, [slotState, gameState.betAmount, gameState.balance, updateBalance]);

    const calculateWin = (reels: string[][], bet: number): SlotResult => {
        let totalWin = 0;
        const winLines: number[] = [];

        // Check middle row
        const middleRow = reels.map(reel => reel[1]);
        const firstSymbol = middleRow[0];
        const count = middleRow.filter(symbol => symbol === firstSymbol).length;

        if (count >= 3) {
            winLines.push(1);
            const multiplier = count === 3 ? 3 : count === 4 ? 5 : 10;
            totalWin += bet * multiplier;
        }

        return {
            symbols: reels,
            winAmount: totalWin,
            isWin: totalWin > 0,
            winLines,
        };
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-stake-dark to-stake-darker pt-6">
            <div className="max-w-6xl mx-auto px-4">
                {/* Game Title */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">SLOTS</h1>
                    <p className="text-stake-light-gray">Spin to win big multipliers</p>
                </div>

                {/* Slot Machine */}
                <div className="bg-stake-gray rounded-2xl p-8 mb-8 border border-stake-light-gray glow-purple">
                    {/* Slot Display */}
                    <div className="bg-stake-darker rounded-xl p-6 mb-6 border-2 border-stake-light-gray">
                        <div className="grid grid-cols-5 gap-3 mb-6">
                            {slotState.reels.map((reel, reelIndex) => (
                                <div key={reelIndex} className="bg-black rounded-lg p-4 border border-stake-purple">
                                    {reel.map((symbol, symbolIndex) => (
                                        <div
                                            key={symbolIndex}
                                            className={`text-4xl text-center py-3 my-1 rounded transition-all duration-300 ${
                                                symbolIndex === 1 && slotState.result?.winLines.includes(1)
                                                    ? 'bg-stake-purple bg-opacity-30 glow-purple'
                                                    : 'bg-stake-dark'
                                            } ${slotState.spinning ? 'animate-pulse' : ''}`}
                                        >
                                            {symbol}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        {slotState.result && (
                            <div className={`text-center text-2xl font-bold ${
                                slotState.result.isWin ? 'text-stake-green glow-green' : 'text-stake-red'
                            }`}>
                                {slotState.result.isWin
                                    ? `🎉 YOU WON $${slotState.result.winAmount}!`
                                    : '❌ TRY AGAIN'
                                }
                            </div>
                        )}
                    </div>

                    {/* Controls */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <BetControls
                                betAmount={gameState.betAmount}
                                onBetChange={placeBet}
                                balance={gameState.balance}
                                disabled={slotState.spinning}
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <Button
                                onClick={spinReels}
                                disabled={slotState.spinning || gameState.balance < gameState.betAmount}
                                size="lg"
                                variant="primary"
                            >
                                {slotState.spinning ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>SPINNING...</span>
                                    </div>
                                ) : (
                                    '🎰 SPIN'
                                )}
                            </Button>

                            <div className="bg-stake-darker rounded-lg p-4 text-center border border-stake-light-gray">
                                <div className="text-stake-light-gray text-sm">BALANCE</div>
                                <div className="text-stake-green text-2xl font-bold">${gameState.balance}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Wins */}
                <div className="bg-stake-gray rounded-2xl p-6 border border-stake-light-gray">
                    <h3 className="text-white text-lg font-bold mb-4">🎯 RECENT WINS</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[125, 80, 250, 45].map((amount, index) => (
                            <div key={index} className="bg-stake-darker rounded-lg p-3 text-center border border-stake-purple">
                                <div className="text-stake-green font-bold">${amount}</div>
                                <div className="text-stake-light-gray text-sm">Player{index + 1}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};