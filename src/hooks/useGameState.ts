import { useState, useCallback } from 'react';
import { GameState, Player, User } from '@/types';

export const useGameState = (initialBalance: number = 1000) => {
    const [user, setUser] = useState<User>({
        id: '',
        phone: '', // Changed from email to phone
        name: '',
        isLoggedIn: false,
        balance: 0,
    });

    const [gameState, setGameState] = useState<GameState>({
        balance: 0,
        betAmount: 10,
        isPlaying: false,
        gameResult: '',
    });

    const [player, setPlayer] = useState<Player>({
        id: '1',
        name: 'Guest',
        balance: 0,
        totalWins: 0,
        totalLosses: 0,
    });

    const login = useCallback((phone: string, password: string) => { // Changed parameter from email to phone
        // Simulate login - in real app, this would be an API call
        setUser({
            id: '1',
            phone, // Use phone instead of email
            name: `User${phone.slice(-4)}`, // Generate name from phone last 4 digits
            isLoggedIn: true,
            balance: initialBalance,
        });
        setPlayer(prev => ({
            ...prev,
            balance: initialBalance,
            name: `User${phone.slice(-4)}`, // Generate name from phone last 4 digits
        }));
        setGameState(prev => ({
            ...prev,
            balance: initialBalance,
        }));
    }, [initialBalance]);

    const register = useCallback((phone: string, password: string, name: string) => { // Changed parameter from email to phone
        // Simulate registration
        setUser({
            id: '1',
            phone, // Use phone instead of email
            name,
            isLoggedIn: true,
            balance: initialBalance,
        });
        setPlayer(prev => ({
            ...prev,
            balance: initialBalance,
            name,
        }));
        setGameState(prev => ({
            ...prev,
            balance: initialBalance,
        }));
    }, [initialBalance]);

    const logout = useCallback(() => {
        setUser({
            id: '',
            phone: '', // Reset phone instead of email
            name: '',
            isLoggedIn: false,
            balance: 0,
        });
        setPlayer(prev => ({
            ...prev,
            balance: 0,
            name: 'Guest',
        }));
        setGameState(prev => ({
            ...prev,
            balance: 0,
        }));
    }, []);

    const deposit = useCallback((amount: number) => {
        setUser(prev => ({
            ...prev,
            balance: prev.balance + amount,
        }));
        setGameState(prev => ({
            ...prev,
            balance: prev.balance + amount,
        }));
        setPlayer(prev => ({
            ...prev,
            balance: prev.balance + amount,
        }));
    }, []);

    const placeBet = useCallback((amount: number) => {
        setGameState(prev => ({
            ...prev,
            betAmount: amount,
        }));
    }, []);

    const updateBalance = useCallback((amount: number) => {
        setUser(prev => ({
            ...prev,
            balance: prev.balance + amount,
        }));
        setGameState(prev => ({
            ...prev,
            balance: prev.balance + amount,
        }));
        setPlayer(prev => ({
            ...prev,
            balance: prev.balance + amount,
            totalWins: amount > 0 ? prev.totalWins + 1 : prev.totalWins,
            totalLosses: amount < 0 ? prev.totalLosses + 1 : prev.totalLosses,
        }));
    }, []);

    const resetGame = useCallback(() => {
        setGameState({
            balance: user.isLoggedIn ? initialBalance : 0,
            betAmount: 10,
            isPlaying: false,
            gameResult: '',
        });
    }, [initialBalance, user.isLoggedIn]);

    return {
        user,
        gameState,
        player,
        login,
        register,
        logout,
        deposit,
        placeBet,
        updateBalance,
        resetGame,
    };
};