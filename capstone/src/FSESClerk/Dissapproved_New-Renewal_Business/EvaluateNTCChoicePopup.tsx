import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import { DialogTitle, IconButton } from '@mui/material';
import { useRef, useState } from 'react';
import EvaluatePopup from '../../FSESEncoder/Approved_Business-Renewal_Permits/EvaluateApprovedApplication';
import EvaluateNTC from './EvaluateNTC';

interface ChoiceProps {
    bpid: number;
    open: boolean;
    business_no: string;
    permitee: string;
    business_name: string;
    address: string;
    natureofbusiness: string;
    typeofoccupancy: string;
    contactno: string;
    email: string;
    datereceived: string;
    handleOpenUpdate: () => void;
    handleClose: () => void;
}

const EvaluateNTCChoicePopup: React.FC<ChoiceProps> = (props: ChoiceProps) => {

    return (
        <div>
            <Dialog open={props.open} maxWidth="xs" fullWidth PaperProps={{ style: { backgroundColor: 'lightgrey' } }} >
                <DialogTitle sx={{ height: '0px' }}>
                    <IconButton sx={{ marginTop: '-25px', marginLeft: '-25px' }} onClick={props.handleClose}>
                        <CancelIcon sx={{ color: 'red' }} />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p style={{ fontFamily: 'Oswald', fontWeight: 'bold' }}>How do you want to evaluate this form?</p>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button variant='contained' sx={{ backgroundColor: '#BEBEBE', fontFamily: 'Oswald', color: 'green' }}>Complied</Button>
                    <Button variant='contained' sx={{ backgroundColor: '#BEBEBE', fontFamily: 'Oswald', color: 'red' }}>NTCV</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default EvaluateNTCChoicePopup;
