import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { GameProvider } from './context/GameContext';
import { SetupScreen } from './screens/SetupScreen';
import { GameScreen } from './screens/GameScreen';
import { useGame } from './context/GameContext';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#007AFF',
        },
        secondary: {
            main: '#444444',
        },
        background: {
            default: '#8B0000',
            paper: '#8B0000',
        },
    },
});

function AppContent() {
    const { state } = useGame();
    return state.gameStarted ? <GameScreen /> : <SetupScreen />;
}

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GameProvider>
                <Box sx={{
                    minHeight: '100vh',
                    backgroundColor: '#8B0000',
                }}>
                    <AppContent />
                </Box>
            </GameProvider>
        </ThemeProvider>
    );
}

export default App;