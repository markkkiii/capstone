import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import axios from 'axios';

interface DeleteProps {
    value: number;
    open: boolean;
    form: string;
    agency: string;
    handleClose: () => void;
}

const DeletePaymentPopup: React.FC<DeleteProps> = ({ agency, form, value, open, handleClose }) => {

    let records =''
    if(form === 'New'){
        if(agency === 'NEW'){
            records = 'newBusinessPayment' 
        }
        else if (agency === 'BFP'){
            records = 'newRenewalBusinessPayment'
        }
        else if (agency === 'OCU'){
            records = 'OccupancyPayment'
        }
        else if (agency === 'BRL'){
            records = 'BuildingPermitPayment'
        }
    }

    const deletefunc = (value: number) => {
        //function here
        axios.delete('http://localhost:8080/'+records+'/deletePermit/' + value).then(res => {
            console.log(res.data);
            alert("Deleted Successfully!");
            handleClose()
        }).catch(err => console.log(err))
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
