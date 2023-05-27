import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import ViewPending from './ViewPending';



export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

export interface formdetails {
    open: boolean;
    handleClose: () => void;
}

const Popup: React.FC<formdetails> = ({open, handleClose }) => {

    return (
        <div>
            <Dialog open={open} maxWidth = "sm" fullWidth>
                <DialogContent>
                    <ViewPending/>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='error' onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};
export default Popup;