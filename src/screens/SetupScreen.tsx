import React from 'react';
import {
    Box,
    Typography,
    Button,
    Switch,
    IconButton,
    Paper,
    Container,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { useGame } from '../context/GameContext';
import { categories } from '../types/GameState';
import { EditPlayerNamesModal } from '../components/EditPlayerNamesModal';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
}));

export const SetupScreen = () => {
    const {
        state,
        addPlayer,
        removePlayer,
        toggleCategory,
        setUseRandomImpostors,
        setShowPlayerNameDialog,
        startGame,
        decrementImpostorCount,
        incrementImpostorCount,
    } = useGame();

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Typography variant="h2" gutterBottom align="center" sx={{ color: 'white' }}>
                Impostor
            </Typography>

            {/* Players Section */}
            <StyledPaper>
                <Typography variant="h5" gutterBottom>Players</Typography>
                <List>
                    {state.playerNames.map((name, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={name} sx={{ color: 'white' }} />
                            {state.playerNames.length > 3 && (
                                <ListItemSecondaryAction>
                                    <Button
                                        onClick={() => removePlayer(index)}
                                        color="error"
                                        variant="contained"
                                        size="small"
                                    >
                                        Delete
                                    </Button>
                                </ListItemSecondaryAction>
                            )}
                        </ListItem>
                    ))}
                </List>
                {state.playerNames.length < 8 && (
                    <Button
                        onClick={addPlayer}
                        variant="contained"
                        fullWidth
                        startIcon={<AddIcon />}
                        sx={{ mt: 1 }}
                    >
                        Add Player
                    </Button>
                )}
                <Button
                    onClick={() => setShowPlayerNameDialog(true)}
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 1 }}
                >
                    Edit Player Names
                </Button>
            </StyledPaper>

            {/* Impostor Section */}
            <StyledPaper>
                <Typography variant="h5" gutterBottom>Impostor</Typography>
                {state.playerNames.length >= 5 && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography>Random Impostors</Typography>
                        <Switch
                            checked={state.useRandomImpostors}
                            onChange={(e) => setUseRandomImpostors(e.target.checked)}
                        />
                    </Box>
                )}
                {!state.useRandomImpostors && (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography>Impostor Count: {state.impostorCount}</Typography>
                        <Box>
                            <IconButton
                                onClick={decrementImpostorCount}
                                disabled={state.impostorCount <= 1}
                            >
                                <RemoveIcon />
                            </IconButton>
                            <IconButton
                                onClick={incrementImpostorCount}
                                disabled={
                                    (state.playerNames.length < 5 && state.impostorCount >= 1) ||
                                    (state.playerNames.length < 7 && state.impostorCount >= 2) ||
                                    state.impostorCount >= 3
                                }
                            >
                                <AddIcon />
                            </IconButton>
                        </Box>
                    </Box>
                )}
            </StyledPaper>

            {/* Categories Section */}
            <StyledPaper>
                <Typography variant="h5" gutterBottom>Categories</Typography>
                <List>
                    {categories.map(category => (
                        <ListItem key={category}>
                            <ListItemText primary={category} sx={{ color: 'white' }} />
                            <ListItemSecondaryAction>
                                <Switch
                                    checked={state.selectedCategories.has(category)}
                                    onChange={() => toggleCategory(category)}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </StyledPaper>

            <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={startGame}
                disabled={state.selectedCategories.size === 0 || state.playerNames.length < 3}
                sx={{ mt: 2 }}
            >
                Start Game
            </Button>

            <EditPlayerNamesModal
                open={state.showPlayerNameDialog}
                onClose={() => setShowPlayerNameDialog(false)}
            />
        </Container>
    );
};