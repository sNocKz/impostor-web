import React from 'react';
import {
    Container,
    Typography,
    Button,
    Box,
    Paper,
} from '@mui/material';
import { useGame } from '../context/GameContext';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

export const GameScreen = () => {
    const {
        state,
        setRoleRevealed,
        showNextPlayer,
        resetGame,
    } = useGame();

    if (!state.allPlayersRevealed) {
        const currentPlayer = state.playerNames[state.currentPlayerIndex];

        return (
            <Container maxWidth="sm">
                <StyledPaper>
                    <Typography variant="h3" gutterBottom align="center" sx={{ color: 'white' }}>
                        {currentPlayer}
                    </Typography>

                    {!state.roleRevealed ? (
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => {
                                setRoleRevealed(true);
                                state.revealedPlayers.add(currentPlayer);
                            }}
                            sx={{ mt: 4 }}
                        >
                            Show Role
                        </Button>
                    ) : (
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" gutterBottom sx={{ color: 'white', my: 4 }}>
                                {state.impostors.includes(currentPlayer)
                                    ? "You are an Impostor!"
                                    : `Word: ${state.word}`}
                            </Typography>

                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                onClick={showNextPlayer}
                            >
                                {state.currentPlayerIndex === state.playerNames.length - 1
                                    ? "Start Game"
                                    : "Next Player"}
                            </Button>
                        </Box>
                    )}
                </StyledPaper>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm">
            <StyledPaper>
                <Typography variant="h4" gutterBottom align="center" sx={{ color: 'white' }}>
                    {state.selectedStartingPlayer} starts the game!
                </Typography>

                {state.roleRevealed && (
                    <Typography variant="h5" sx={{ color: 'white', my: 4 }}>
                        Impostors: {state.impostors.join(", ")}
                    </Typography>
                )}

                <Box sx={{ mt: 4 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => setRoleRevealed(true)}
                        disabled={state.roleRevealed}
                        sx={{ mb: 2 }}
                        fullWidth
                    >
                        Show Impostors
                    </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={resetGame}
                        fullWidth
                    >
                        Reset Game
                    </Button>
                </Box>
            </StyledPaper>
        </Container>
    );
};