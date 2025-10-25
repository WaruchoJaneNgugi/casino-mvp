import { useState, useCallback } from 'react';
import { GameState, Player, User } from '@/types';

export const useGameState = (initialBalance: number = 1000) => {
    const [user, setUser] = useState<User>({
        id: '',
        email: '',
        name: '',
        isLoggedIn: false,
        balance: 0, // Add balance to user
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

    const login = useCallback((email: string, password: string) => {
        // Simulate login - in real app, this would be an API call
        setUser({
            id: '1',
            email,
            name: email.split('@')[0],
            isLoggedIn: true,
            balance: initialBalance, // Set balance for user
        });
        setPlayer(prev => ({
            ...prev,
            balance: initialBalance,
            name: email.split('@')[0],
        }));
        setGameState(prev => ({
            ...prev,
            balance: initialBalance,
        }));
    }, [initialBalance]);

    const register = useCallback((email: string, password: string, name: string) => {
        // Simulate registration
        setUser({
            id: '1',
            email,
            name,
            isLoggedIn: true,
            balance: initialBalance, // Set balance for user
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
            email: '',
            name: '',
            isLoggedIn: false,
            balance: 0, // Reset balance for user
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