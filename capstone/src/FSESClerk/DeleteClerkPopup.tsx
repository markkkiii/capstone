import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import axios from 'axios';

interface DeleteProps {
    value: number;
    open: boolean;
    remarks: string;
    form: string;
    handleClose: () => void;
}

const DeleteClerkPopup: React.FC<DeleteProps> = ({ form, remarks, value, open, handleClose }) => {

    let pending =''
    if(form === 'New'){
        if(remarks === 'Pending'){
            pending = 'occupancyPendingclerk'
        }
        else if (remarks === 'Disapproved'){
            pending = 'occupancydisapprovedclerk'
        }
    }

    const deletefunc = (value: number) => {
        //function here
        axios.delete('http://localhost:8080/'+pending+'/deletePermit/' + value).then(res => {
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

export default DeleteClerkPopup;
