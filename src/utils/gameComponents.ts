import React from 'react';
import {Dice} from "@/components/games/Dice";
import {SpinWheel} from "@/components/games/SpinWheel";
import {Mines} from "@/components/games/Mines";
import {SlotMachine} from "@/components/games/SlotMachine";
import {Crash} from "@/components/games/Crash";
import {Plinko} from "@/components/games/Plinko";
import {Blackjack} from "@/components/games/Blackjack";
import {Roulette} from "@/components/games/Roulette";


// const PlinkoComponent: React.FC<any> = () => <div>Plinko Game Component</div>;
// const BlackjackComponent: React.FC<any> = () => <div>Blackjack Game Component</div>;
// const RouletteComponent: React.FC<any> = () => <div>Roulette Game Component</div>;
//
// const GenericSpin2: React.FC<any> = () => <div>Generic Spin Game 2</div>;
// const GenericSpin3: React.FC<any> = () => <div>Generic Spin Game 3</div>;
// ... create similar functions for other games

export const gameComponents: { [key: string]: React.ComponentType<any> } = {
    'dice': Dice,
    'mines': Mines,
    'crash': Crash,
    'plinko': Plinko,
    'blackjack': Blackjack,
    'roulette': Roulette,
    'spins1': SpinWheel,
    // 'spins2': GenericSpin2,
    // 'spins3': GenericSpin3,
    'slot1': SlotMachine,
    // ... rest of your game mappings
};

// Helper function to get game component by ID
export const getGameComponent = (gameId: string): React.ComponentType<any> | null => {
    return gameComponents[gameId] || null;
};

// Game configurations for shared components
export const gameConfigs: { [key: string]: any } = {
    // Slot configurations
    'slot1': { theme: 'fruit', lines: 20, betMultipliers: [1, 2, 5, 10] },
    'slot2': { theme: 'adventure', lines: 25, betMultipliers: [1, 3, 7, 15] },
    'slot3': { theme: 'mythical', lines: 30, betMultipliers: [2, 5, 10, 20] },
    'slot4': { theme: 'classic', lines: 15, betMultipliers: [1, 2, 3, 5] },
    'slot5': { theme: 'diamond', lines: 40, betMultipliers: [5, 10, 20, 50] },
    'slot6': { theme: 'gold', lines: 25, betMultipliers: [2, 4, 8, 16] },
    'slot7': { theme: 'jungle', lines: 30, betMultipliers: [1, 5, 10, 25] },
    'slot8': { theme: 'ocean', lines: 20, betMultipliers: [2, 3, 6, 12] },
    'slot9': { theme: 'space', lines: 35, betMultipliers: [3, 7, 15, 30] },
    'slot10': { theme: 'wildwest', lines: 25, betMultipliers: [2, 5, 10, 20] },
    'slot11': { theme: 'fantasy', lines: 30, betMultipliers: [1, 4, 8, 16] },
    'slot12': { theme: 'egypt', lines: 20, betMultipliers: [3, 6, 12, 24] },

    // Jackpot configurations
    'jackpot1': { jackpotAmount: 5000, minBet: 10, theme: 'bronze' },
    'jackpot2': { jackpotAmount: 10000, minBet: 20, theme: 'silver' },
    'jackpot3': { jackpotAmount: 25000, minBet: 50, theme: 'gold' },
    'jackpot4': { jackpotAmount: 50000, minBet: 100, theme: 'platinum' },
    'jackpot5': { jackpotAmount: 100000, minBet: 200, theme: 'diamond' },
    'jackpot6': { jackpotAmount: 250000, minBet: 500, theme: 'mega' },

    // Roulette configurations
    'roulette1': { type: 'european', minBet: 5, maxBet: 1000 },
    'roulette2': { type: 'american', minBet: 10, maxBet: 2000 },
    'roulette3': { type: 'french', minBet: 5, maxBet: 1500 },
    'roulette4': { type: 'european', minBet: 25, maxBet: 5000 },
    'roulette5': { type: 'american', minBet: 50, maxBet: 10000 },
    'roulette6': { type: 'french', minBet: 100, maxBet: 20000 },

    // Spin configurations
    'spins1': { segments: 8, minBet: 5, maxBet: 500 },
    'spins2': { segments: 12, minBet: 10, maxBet: 1000 },
    'spins3': { segments: 6, minBet: 2, maxBet: 200 },
    'spins4': { segments: 10, minBet: 5, maxBet: 500 },
    'spins5': { segments: 16, minBet: 20, maxBet: 2000 },
    'spins6': { segments: 8, minBet: 1, maxBet: 100 },
};