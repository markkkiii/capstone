import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import { DialogTitle, IconButton } from '@mui/material';
import { useRef, useState } from 'react';


interface ChoiceProps {
  
    open: boolean;
    handleOpenAddRenewal: () => void;
    handleOpenFindRenewal: () => void;
    handleClose: () => void;
}

const RenewalChoicePopup: React.FC<ChoiceProps> = (props: ChoiceProps) => {


     const handleOpenApproved = () => {
        props.handleOpenAddRenewal();
        props.handleClose();
    }

    const handleOpenFindRenewal = () => {
        props.handleOpenFindRenewal();
        props.handleClose();
    }

   /*const handleOpenForms = () =>{
        if(props.remarks === 'NTC Records'){
            props.handleOpenNTCV();
        }
        else if (props.remarks === 'NTCV Records'){
            props.handleOpenAbatement();
        }
        else if (props.remarks === 'Abatement Records'){
            props.handleOpenClosure();
        }
        props.handleClose();
    }*/


    return (
        <div>
            <Dialog open={props.open} maxWidth="xs" fullWidth PaperProps={{ style: { backgroundColor: 'lightgrey' } }} >
                <DialogTitle sx={{ height: '0px' }}>
                    <IconButton sx={{ marginTop: '-25px', marginLeft: '-25px' }} onClick={props.handleClose}>
                        <CancelIcon sx={{ color: 'red' }} />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p style={{ fontFamily: 'Oswald', fontWeight: 'bold' }}>How would you want to add a record?</p>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button variant='contained' onClick={handleOpenApproved} sx={{ backgroundColor: '#BEBEBE', fontFamily: 'Oswald', color: 'green', width: "140px" }}>Add New Record</Button>
                    <Button variant='contained'  onClick={handleOpenFindRenewal} sx={{ backgroundColor: '#BEBEBE', fontFamily: 'Oswald', color: 'red', width: "140px" }}>Renew Record</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default RenewalChoicePopup;
