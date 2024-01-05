import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import axios from 'axios';
import { deleteBusinessPermit, deleteOccupancyPermit, deleterenewalBusinessPermit } from '../lib/controller';

interface DeleteProps {
    value: string;
    open: boolean;
    remarks: string;
    form: string;
    handleClose: () => void;
}

const DeleteEncoderPopup: React.FC<DeleteProps> = ({ form, remarks,value, open, handleClose }) => {

    let records =''
    if(form === 'New'){
        if(remarks === 'Pending'){
            records = 'BPPending'
        }
        else if (remarks === 'FSIC Printed' || remarks === 'FSIC Not Printed'){
            records = 'newbpapplication'
        }
    }
    else if(form === "Renewal"){
        if (remarks ==='Pending'){
            records = 'Renewal'
        }
        else if (remarks === 'FSIC Printed' || remarks === 'FSIC Not Printed'){
            records = 'renewalbpapprovedapplication'
        }
    }
    else if(form === "Occupancy"){
        if (remarks ==='Pending'){
            records = 'occupancyPendingclerk'
        }
        else if (remarks === 'FSIC Not Printed' || remarks === 'FSIC Printed'){
            records = 'approved'
        }
    }
    


    const deletefunc = () => {
        /*axios.delete('http://localhost:8080/' + records + '/deletePermit/' + value)
            .then(res => {
                console.log(res.data);
                alert("Deleted Successfully!");
                handleClose()
            })
            .catch(err => console.log(err));*/

        if(form === "New"){
            deleteBusinessPermit(value);
            handleClose();
        }
        else if(form === "Renewal"){
            deleterenewalBusinessPermit(value);
            handleClose();
        }
        else if(form === "Occupancy"){
            deleteOccupancyPermit(value);
            handleClose();
        }
       
    }
    

    return (
        <div>
            <Dialog open={open} maxWidth="xs" fullWidth PaperProps={{ style: { backgroundColor: 'lightgrey' } }} >
                <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p style={{ fontFamily: 'Oswald', fontWeight: 'bold' }}>Do you want to delete this form?</p>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button variant='contained' onClick={() => deletefunc()} sx={{ backgroundColor: '#BEBEBE', fontFamily: 'Oswald', color: 'black' }}>Delete</Button>
                    <Button variant='contained' onClick={handleClose} sx={{ backgroundColor: '#BEBEBE', fontFamily: 'Oswald', color: 'black' }}>Cancel</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default DeleteEncoderPopup;
