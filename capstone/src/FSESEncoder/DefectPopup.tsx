import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import axios from 'axios';
import { useState } from 'react';
import { TextField } from '@mui/material';

interface AddDefectDialogProps {
    open: boolean;
    onClose: () => void;
    onAdd: (defect: string, period: string) => void;
}

const DefectPopup: React.FC<AddDefectDialogProps> = ({ onClose, open, onAdd }) => {

    const [newDefect, setNewDefect] = useState('');
    const [newPeriod, setNewPeriod] = useState('');

    const addDefect = () => {
        if (newDefect && newPeriod) {
            onAdd(newDefect, newPeriod);
            setNewDefect('');
            setNewPeriod('');
            onClose();
        }
    };

    return (
        <div>
            <Dialog open={open} maxWidth="xs" fullWidth PaperProps={{ style: { backgroundColor: 'lightgrey' } }} >
                <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TextField
                        label="Defects"
                        fullWidth
                        value={newDefect}
                        onChange={(e) => setNewDefect(e.target.value)}
                        style={{margin: '5px'}}
                    />
                    <TextField
                        label="Period"
                        fullWidth
                        value={newPeriod}
                        style={{margin: '5px'}}
                        onChange={(e) => setNewPeriod(e.target.value)}
                    />
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button variant='contained' onClick={addDefect}sx={{ backgroundColor: 'green', fontFamily: 'Oswald', color: 'black' }}>Add Defect</Button>
                    <Button variant='contained' onClick={onClose}sx={{ backgroundColor: 'red', fontFamily: 'Oswald', color: 'black' }}>Cancel</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default DefectPopup;
