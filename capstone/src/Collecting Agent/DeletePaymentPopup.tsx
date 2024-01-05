import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import axios from 'axios';
import { deleteBuildingPayment, deleteBusinessPermit, deleteNewBusinessPayment, deleteOccupancyPayment, deleteRenewalBusinessPayment } from '../lib/controller';

interface DeleteProps {
    value: string;
    open: boolean;
    form: string;
    agency?: string;
    handleClose: () => void;
}

const DeletePaymentPopup: React.FC<DeleteProps> = ({ form, value, open, handleClose }) => {

    const deletefunc = (value: string) => {
        //function here
        if (form === 'Building') {
            deleteBuildingPayment(value);
            alert("Deleted Successfully");
        }
        else if (form === 'New') {
            deleteNewBusinessPayment(value);
            alert("Deleted Successfully");
        }
        else if (form === 'Renewal') {
            deleteRenewalBusinessPayment(value);
            alert("Deleted Successfully");
        }
        else if (form === 'Occupancy') {
            deleteOccupancyPayment(value);
            alert("Deleted Successfully");
        }
    }

    return (
        <div>
            <Dialog open={open} maxWidth="xs" fullWidth PaperProps={{ style: { backgroundColor: 'lightgrey' } }} >
                <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p style={{ fontFamily: 'Oswald', fontWeight: 'bold' }}>Do you want to delete this form?</p>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button variant='contained' onClick={() => deletefunc(value)} sx={{ backgroundColor: '#BEBEBE', fontFamily: 'Oswald', color: 'black' }}>Delete</Button>
                    <Button variant='contained' onClick={handleClose} sx={{ backgroundColor: '#BEBEBE', fontFamily: 'Oswald', color: 'black' }}>Cancel</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default DeletePaymentPopup;
