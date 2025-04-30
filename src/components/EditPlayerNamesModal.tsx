import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box
} from '@mui/material';
import { useGame } from '../context/GameContext';

interface EditPlayerNamesModalProps {
    open: boolean;
    onClose: () => void;
}

export const EditPlayerNamesModal: React.FC<EditPlayerNamesModalProps> = ({
    open,
    onClose,
}) => {
    const { state, updatePlayerNames } = useGame();
    const [names, setNames] = useState<string[]>([...state.playerNames]);

    useEffect(() => {
        setNames([...state.playerNames]);
    }, [state.playerNames]);

    const handleSave = () => {
        const validNames = names.filter(name => name.trim() !== '');
        updatePlayerNames(validNames);
        onClose();
    };

    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>Edit Player Names</DialogTitle>
            <DialogContent>
                <Box sx={{ pt: 2 }}>
                    {names.map((name, index) => (
                        <TextField
                            key={index}
                            fullWidth
                            value={name}
                            onChange={(e) => {
                                const newNames = [...names];
                                newNames[index] = e.target.value;
                                setNames(newNames);
                            }}
                            placeholder={`Player ${index + 1}`}
                            margin="dense"
                            variant="outlined"
                        />
                    ))}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary" variant="contained">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};