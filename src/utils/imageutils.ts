export const gameImages = {
    dice: '/images/games/dice.png',
    mines: '/images/games/mines.png',
    crash: '/images/games/crash.png',
    plinko: '/images/games/plinko.png',
    blackjack: '/images/games/blackjack.png',
    roulette: '/images/games/roulette.png',
    jackpots: {
        jackpot1: '/images/games/jackpots/jackpots.png',
        jackpot2: '/images/games/jackpots/jackpots.png',
        jackpot3: '/images/games/jackpots/jackpots.png',
        jackpot4: '/images/games/jackpots/jackpots.png',
        jackpot5: '/images/games/jackpots/jackpots.png',
        jackpot6: '/images/games/jackpots/jackpots.png',
    },
    spins: {
        spins1: '/images/games/spins/spins.png',
        spins2: '/images/games/spins/spins.png',
        spins3: '/images/games/spins/spins.png',
        spins4: '/images/games/spins/spins.png',
        spins5: '/images/games/spins/spins.png',
        spins6: '/images/games/spins/spins.png',
    },
    slots: {
        slot1: '/images/games/slots/slots.png',
        slot2: '/images/games/slots/slots.png',
        slot3: '/images/games/slots/slots.png',
        slot4: '/images/games/slots/slots.png',
        slot5: '/images/games/slots/slots.png',
        slot6: '/images/games/slots/slots.png',
    },
    roulettes: {
        roulette1: '/images/games/roulettes/roulette1.png',
        roulette2: '/images/games/roulettes/roulette1.png',
        roulette3: '/images/games/roulettes/roulette1.png',
        roulette4: '/images/games/roulettes/roulette1.png',
        roulette5: '/images/games/roulettes/roulette1.png',
        roulette6: '/images/games/roulettes/roulette1.png',
    }
};

export const getGameImage = (category: string, gameNumber?: number): string => {
    const categoryData = gameImages[category as keyof typeof gameImages];

    if (!categoryData) {
        return '/images/games/default.jpg';
    }

    // If it's a single game (string)
    if (typeof categoryData === 'string') {
        return categoryData;
    }

    // If it's a category with multiple games (object)
    if (gameNumber) {
        const gameKey = `${category.slice(0, -1)}${gameNumber}` as keyof typeof categoryData;
        return categoryData[gameKey] || '/images/games/default.jpg';
    }

    // Return first game in category if no number specified
    const firstKey = Object.keys(categoryData)[0] as keyof typeof categoryData;
    return categoryData[firstKey] || '/images/games/default.jpg';
};

export const getGamesByCategory = (category: string) => {
    const categoryData = gameImages[category as keyof typeof gameImages];

    if (!categoryData || typeof categoryData === 'string') {
        return [];
    }

    return Object.entries(categoryData).map(([key, image], index) => ({
        id: key,
        name: `${category.slice(0, -1)} ${index + 1}`, // "jackpot 1", "spin 1", etc.
        image: image as string,
        number: index + 1
    }));
};