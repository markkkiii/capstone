import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useState } from 'react';
import { TextField } from '@mui/material';

interface AddRecommendationDialogProps {
    open: boolean;
    onClose: () => void;
    onAdd: (recommendation: string) => void;
}

const RecommendationPopup: React.FC<AddRecommendationDialogProps> = ({ onClose, open, onAdd }) => {

    const [newRecommendation, setNewRecommendation] = useState('');

    const addRecommendation = () => {
        if (newRecommendation) {
            onAdd(newRecommendation);
            setNewRecommendation('');
            onClose();
        }
    };

    return (
        <div>
            <Dialog open={open} maxWidth="xs" fullWidth PaperProps={{ style: { backgroundColor: 'lightgrey' } }} >
                <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TextField
                        label="Recommendation"
                        fullWidth
                        value={newRecommendation}
                        onChange={(e) => setNewRecommendation(e.target.value)}
                        style={{margin: '5px'}}
                    />
                    
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button variant='contained' onClick={addRecommendation}sx={{ backgroundColor: 'green', fontFamily: 'Oswald', color: 'black' }}>Add Recommendation</Button>
                    <Button variant='contained' onClick={onClose}sx={{ backgroundColor: 'red', fontFamily: 'Oswald', color: 'black' }}>Cancel</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default RecommendationPopup;
