export interface User {
    id: string;
    phone: string;
    name: string;
    isLoggedIn: boolean;
    balance: number; // Add this line
}

// ... rest of your interfaces remain the same

export interface GameState {
    balance: number;
    betAmount: number;
    isPlaying: boolean;
    gameResult: string;
}

export interface Player {
    id: string;
    name: string;
    balance: number;
    totalWins: number;
    totalLosses: number;
}

export interface SlotMachineState {
    reels: string[][];
    spinning: boolean;
    result: SlotResult | null;
}

export interface SlotResult {
    symbols: string[][];
    winAmount: number;
    isWin: boolean;
    winLines: number[];
}

export interface BlackjackState {
    playerHand: Card[];
    dealerHand: Card[];
    playerScore: number;
    dealerScore: number;
    gameStatus: 'waiting' | 'player-turn' | 'dealer-turn' | 'ended';
    result: string;
}

export interface Card {
    suit: string;
    value: string;
    hidden?: boolean;
}

export interface RouletteState {
    spinning: boolean;
    result: number | null;
    bets: RouletteBet[];
    recentNumbers: number[];
}

export interface RouletteBet {
    type: 'number' | 'color' | 'even-odd' | 'dozen';
    value: number | string;
    amount: number;
}

export interface Game {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    image: string;
    popularity: number;
    minBet: number;
    category: 'original' | 'slots' | 'table' | 'live';
}