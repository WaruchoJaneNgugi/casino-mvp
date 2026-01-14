export const gameImages = {
    // Individual games (each has unique component)
    dice: '/images/games/dice.png',
    mines: '/images/games/mines.png',
    crash: '/images/games/crash.png',
    plinko: '/images/games/plinko.png',
    blackjack: '/images/games/blackjack.png',
    roulette: '/images/games/roulette.png',

    // Category games (can share components but have different configs)
    jackpots: {
        jackpot1: '/images/games/jackpots/jackpots.png',
        // jackpot2: '/images/games/jackpots/jackpots.png',
        // jackpot3: '/images/games/jackpots/jackpots.png',
        // jackpot4: '/images/games/jackpots/jackpots.png',
        // jackpot5: '/images/games/jackpots/jackpots.png',
        // jackpot6: '/images/games/jackpots/jackpots.png',
    },
    spins: {
        spins1: '/images/games/spins/spin-wheel.png', // Uses unique SpinWheel component
        // spins2: '/images/games/spins/spin-wheel.png', // Could use generic spin component
        // spins3: '/images/games/spins/spin-wheel.png',
        // spins4: '/images/games/spins/spin-wheel.png',
        // spins5: '/images/games/spins/spin-wheel.png',
        // spins6: '/images/games/spins/spin-wheel.png',
    },
    slots: {
        slot1: '/images/games/slots/slots.png', // All use slot component but different configs
        // slot2: '/images/games/slots/slots.png',
        // slot3: '/images/games/slots/slots.png',
        // slot4: '/images/games/slots/slots.png',
        // slot5: '/images/games/slots/slots.png',
        // slot6: '/images/games/slots/slots.png',
    },
    roulettes: {
        roulette1: '/images/games/roulettes/roulette1.png',
        // roulette2: '/images/games/roulettes/roulette1.png',
        // roulette3: '/images/games/roulettes/roulette1.png',
        // roulette4: '/images/games/roulettes/roulette1.png',
        // roulette5: '/images/games/roulettes/roulette1.png',
        // roulette6: '/images/games/roulettes/roulette1.png',
    }
};

export const getGamesByCategory = (category: string) => {
    const categoryData = gameImages[category as keyof typeof gameImages];

    if (!categoryData || typeof categoryData === 'string') {
        return [];
    }

    return Object.entries(categoryData).map(([key, image], index) => {
        let name = `${category.slice(0, -1)} ${index + 1}`;

        // Custom names for specific games
        if (category === 'spins' && index === 0) {
            name = 'Spin Wheel';
        }
        // Add more custom names as needed
        if (category === 'slots' && index === 0) {
            name = 'Fruit Slots';
        }
        if (category === 'slots' && index === 1) {
            name = 'Adventure Slots';
        }

        return {
            id: key, // This is the unique ID that maps to gameComponents
            name: name,
            image: image as string,
            number: index + 1
        };
    });
};
// export const getGamesByCategory = (category: string) => {
//     const categoryData = gameImages[category as keyof typeof gameImages];
//
//     if (!categoryData || typeof categoryData === 'string') {
//         return [];
//     }
//
//     return Object.entries(categoryData).map(([key, image], index) => {
//         // Customize the first spin game
//         let name = `${category.slice(0, -1)} ${index + 1}`;
//
//         // Special case for the first spin game
//         if (category === 'spins' && index === 0) {
//             name = 'Spin Wheel'; // Custom name for the first spin game
//         }
//
//         return {
//             id: key,
//             name: name,
//             image: image as string,
//             number: index + 1
//         };
//     });
// };