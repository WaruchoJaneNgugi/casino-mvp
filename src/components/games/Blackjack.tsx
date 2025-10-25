import React, { useState, useCallback } from 'react';
import { BlackjackState, Card } from '@/types';
import { useGameState } from '@/hooks/useGameState';
import { Button } from '../common/Button';
import { BetControls } from '../common/BetControls';
import { getRandomInt } from '@/utils/gameUtils';

const SUITS = ['♠', '♥', '♦', '♣'];
const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export const Blackjack: React.FC = () => {
    const { gameState, updateBalance, placeBet } = useGameState();
    const [blackjackState, setBlackjackState] = useState<BlackjackState>({
        playerHand: [],
        dealerHand: [],
        playerScore: 0,
        dealerScore: 0,
        gameStatus: 'waiting',
        result: '',
    });

    const createDeck = (): Card[] => {
        const deck: Card[] = [];
        for (const suit of SUITS) {
            for (const value of VALUES) {
                deck.push({ suit, value });
            }
        }
        return deck.sort(() => Math.random() - 0.5);
    };

    const calculateScore = (hand: Card[]): number => {
        let score = 0;
        let aces = 0;

        for (const card of hand) {
            if (card.value === 'A') {
                aces += 1;
                score += 11;
            } else if (['K', 'Q', 'J'].includes(card.value)) {
                score += 10;
            } else {
                score += parseInt(card.value);
            }
        }

        while (score > 21 && aces > 0) {
            score -= 10;
            aces -= 1;
        }

        return score;
    };

    const startGame = useCallback(() => {
        if (gameState.balance < gameState.betAmount) return;

        const deck = createDeck();
        const playerHand = [deck.pop()!, deck.pop()!];
        const dealerHand = [deck.pop()!, { ...deck.pop()!, hidden: true }];

        const playerScore = calculateScore(playerHand);
        const dealerScore = calculateScore([dealerHand[0]]);

        setBlackjackState({
            playerHand,
            dealerHand,
            playerScore,
            dealerScore,
            gameStatus: 'player-turn',
            result: '',
        });

        updateBalance(-gameState.betAmount);
    }, [gameState.betAmount, gameState.balance, updateBalance]);

    const hit = useCallback(() => {
        const deck = createDeck();
        const newPlayerHand = [...blackjackState.playerHand, deck.pop()!];
        const newPlayerScore = calculateScore(newPlayerHand);

        setBlackjackState(prev => ({
            ...prev,
            playerHand: newPlayerHand,
            playerScore: newPlayerScore,
        }));

        if (newPlayerScore > 21) {
            endGame('BUST! You lose.');
        }
    }, [blackjackState.playerHand]);

    const stand = useCallback(async () => {
        setBlackjackState(prev => ({ ...prev, gameStatus: 'dealer-turn' }));

        // Dealer's turn
        let dealerHand = [...blackjackState.dealerHand];
        dealerHand[1] = { ...dealerHand[1], hidden: false };

        let dealerScore = calculateScore(dealerHand);

        // Dealer hits until 17 or higher
        const deck = createDeck();
        while (dealerScore < 17) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            dealerHand = [...dealerHand, deck.pop()!];
            dealerScore = calculateScore(dealerHand);

            setBlackjackState(prev => ({
                ...prev,
                dealerHand,
                dealerScore,
            }));
        }

        endGame(determineResult(dealerScore));
    }, [blackjackState.dealerHand, blackjackState.playerScore]);

    const determineResult = (dealerScore: number): string => {
        const playerScore = blackjackState.playerScore;

        if (playerScore > 21) return 'BUST! You lose.';
        if (dealerScore > 21) return 'Dealer busts! You win!';
        if (playerScore > dealerScore) return 'You win!';
        if (playerScore < dealerScore) return 'You lose.';
        return 'Push! It\'s a tie.';
    };

    const endGame = (result: string) => {
        setBlackjackState(prev => ({
            ...prev,
            gameStatus: 'ended',
            result,
            dealerHand: prev.dealerHand.map(card => ({ ...card, hidden: false })),
        }));

        if (result.includes('win')) {
            updateBalance(gameState.betAmount * 2);
        } else if (result.includes('Push')) {
            updateBalance(gameState.betAmount);
        }
    };

    const renderCard = (card: Card, index: number) => (
        <div
            key={index}
            className={`w-16 h-24 rounded-lg flex items-center justify-center text-xl font-bold ${
                card.hidden ? 'bg-red-600 text-red-600' : 'bg-white text-black'
            } border-2 border-gray-300 shadow-md`}
        >
            {card.hidden ? '?' : `${card.value}${card.suit}`}
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-gradient-to-b from-green-900 to-gray-900 rounded-2xl p-8 shadow-2xl">
                {/* Dealer's Hand */}
                <div className="mb-8">
                    <h3 className="text-white text-xl mb-4">Dealer's Hand ({blackjackState.dealerScore})</h3>
                    <div className="flex gap-2">
                        {blackjackState.dealerHand.map(renderCard)}
                    </div>
                </div>

                {/* Player's Hand */}
                <div className="mb-8">
                    <h3 className="text-white text-xl mb-4">Your Hand ({blackjackState.playerScore})</h3>
                    <div className="flex gap-2">
                        {blackjackState.playerHand.map(renderCard)}
                    </div>
                </div>

                {/* Game Result */}
                {blackjackState.result && (
                    <div className="text-center text-2xl font-bold text-yellow-400 mb-4">
                        {blackjackState.result}
                    </div>
                )}

                {/* Controls */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <BetControls
                            betAmount={gameState.betAmount}
                            onBetChange={placeBet}
                            balance={gameState.balance}
                            disabled={blackjackState.gameStatus !== 'waiting'}
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        {blackjackState.gameStatus === 'waiting' && (
                            <Button
                                onClick={startGame}
                                disabled={gameState.balance < gameState.betAmount}
                                size="lg"
                            >
                                DEAL
                            </Button>
                        )}

                        {blackjackState.gameStatus === 'player-turn' && (
                            <div className="flex gap-2">
                                <Button onClick={hit} size="lg">HIT</Button>
                                <Button onClick={stand} size="lg">STAND</Button>
                            </div>
                        )}

                        {blackjackState.gameStatus === 'ended' && (
                            <Button onClick={startGame} size="lg">
                                PLAY AGAIN
                            </Button>
                        )}

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