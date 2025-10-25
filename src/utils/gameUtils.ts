export const formatCurrency = (amount: number): string => {
    return `$${amount.toFixed(2)}`;
};

export const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const sleep = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const calculatePayout = (bet: number, multiplier: number): number => {
    return bet * multiplier;
};