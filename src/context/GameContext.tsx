import React, { createContext, useContext, useState } from 'react';
import { GameState, categories, categoryWords } from '../types/GameState';

interface GameContextType {
    state: GameState;
    adjustImpostorCount: (playerCount: number) => void;
    startGame: () => void;
    showNextPlayer: () => void;
    resetGame: () => void;
    updatePlayerNames: (names: string[]) => void;
    toggleCategory: (category: string) => void;
    setUseRandomImpostors: (value: boolean) => void;
    setShowPlayerNameDialog: (value: boolean) => void;
    setRoleRevealed: (value: boolean) => void;
    addPlayer: () => void;
    removePlayer: (index: number) => void;
    incrementImpostorCount: () => void;
    decrementImpostorCount: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<GameState>({
        playerNames: Array.from({ length: 3 }, (_, i) => `Player ${i + 1}`),
        selectedCategories: new Set(),
        impostorCount: 1,
        useRandomImpostors: false,
        showPlayerNameDialog: false,
        gameStarted: false,
        currentPlayerIndex: -1,
        roleRevealed: false,
        allPlayersRevealed: false,
        impostors: [],
        word: "",
        selectedStartingPlayer: "",
        revealedPlayers: new Set(),
    });

    const adjustImpostorCount = (playerCount: number) => {
        setState(prev => {
            let newCount = prev.impostorCount;
            if (playerCount < 7 && newCount > 2) {
                newCount = 2;
            } else if (playerCount < 5 && newCount > 1) {
                newCount = 1;
            }
            return { ...prev, impostorCount: newCount };
        });
    };

    const getRandomImpostorCount = (playerCount: number): number => {
        if (playerCount >= 7) return Math.floor(Math.random() * 3) + 1;
        if (playerCount >= 5) return Math.floor(Math.random() * 2) + 1;
        return 1;
    };

    const startGame = () => {
        setState(prev => {
            const finalImpostorCount = prev.useRandomImpostors
                ? getRandomImpostorCount(prev.playerNames.length)
                : prev.impostorCount;

            const shuffledPlayers = [...prev.playerNames].sort(() => Math.random() - 0.5);
            const selectedImpostors = shuffledPlayers.slice(0, finalImpostorCount);

            const availableWords = Array.from(prev.selectedCategories)
                .flatMap(category => categoryWords[category as keyof typeof categoryWords] || []);
            const selectedWord = availableWords[Math.floor(Math.random() * availableWords.length)];

            return {
                ...prev,
                impostors: selectedImpostors,
                word: selectedWord,
                currentPlayerIndex: 0,
                gameStarted: true,
                roleRevealed: false,
                allPlayersRevealed: false,
                revealedPlayers: new Set(),
            };
        });
    };

    const showNextPlayer = () => {
        setState(prev => {
            if (prev.currentPlayerIndex < prev.playerNames.length - 2) {
                return {
                    ...prev,
                    currentPlayerIndex: prev.currentPlayerIndex + 1,
                    roleRevealed: false,
                };
            } else if (prev.currentPlayerIndex === prev.playerNames.length - 2) {
                return {
                    ...prev,
                    currentPlayerIndex: prev.currentPlayerIndex + 1,
                    roleRevealed: false,
                };
            } else {
                return {
                    ...prev,
                    allPlayersRevealed: true,
                    selectedStartingPlayer: prev.playerNames[Math.floor(Math.random() * prev.playerNames.length)],
                    roleRevealed: false,
                };
            }
        });
    };

    const resetGame = () => {
        setState(prev => ({
            ...prev,
            gameStarted: false,
            currentPlayerIndex: -1,
            roleRevealed: false,
            allPlayersRevealed: false,
            impostors: [],
            word: "",
            selectedStartingPlayer: "",
            revealedPlayers: new Set(),
            impostorCount: prev.useRandomImpostors ? prev.impostorCount : 1,
        }));
    };

    const updatePlayerNames = (names: string[]) => {
        setState(prev => ({ ...prev, playerNames: names }));
    };

    const toggleCategory = (category: string) => {
        setState(prev => {
            const newCategories = new Set(prev.selectedCategories);
            if (newCategories.has(category)) {
                newCategories.delete(category);
            } else {
                newCategories.add(category);
            }
            return { ...prev, selectedCategories: newCategories };
        });
    };

    const setUseRandomImpostors = (value: boolean) => {
        setState(prev => ({ ...prev, useRandomImpostors: value }));
    };

    const setShowPlayerNameDialog = (value: boolean) => {
        setState(prev => ({ ...prev, showPlayerNameDialog: value }));
    };

    const setRoleRevealed = (value: boolean) => {
        setState(prev => ({ ...prev, roleRevealed: value }));
    };

    const addPlayer = () => {
        setState(prev => ({
            ...prev,
            playerNames: [...prev.playerNames, `Player ${prev.playerNames.length + 1}`],
        }));
    };

    const removePlayer = (index: number) => {
        setState(prev => {
            const newNames = [...prev.playerNames];
            newNames.splice(index, 1);
            return { ...prev, playerNames: newNames };
        });
    };

    const incrementImpostorCount = () => {
        setState(prev => {
            if ((prev.playerNames.length >= 5 && prev.impostorCount < 2) ||
                (prev.playerNames.length >= 7 && prev.impostorCount < 3)) {
                return { ...prev, impostorCount: prev.impostorCount + 1 };
            }
            return prev;
        });
    };

    const decrementImpostorCount = () => {
        setState(prev => {
            if (prev.impostorCount > 1) {
                return { ...prev, impostorCount: prev.impostorCount - 1 };
            }
            return prev;
        });
    };

    return (
        <GameContext.Provider value={{
            state,
            adjustImpostorCount,
            startGame,
            showNextPlayer,
            resetGame,
            updatePlayerNames,
            toggleCategory,
            setUseRandomImpostors,
            setShowPlayerNameDialog,
            setRoleRevealed,
            addPlayer,
            removePlayer,
            incrementImpostorCount,
            decrementImpostorCount,
        }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};