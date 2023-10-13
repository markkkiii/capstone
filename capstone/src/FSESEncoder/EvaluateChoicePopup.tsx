import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import { DialogTitle, IconButton } from '@mui/material';
import { useRef, useState } from 'react';
import EvaluatePopup from './EvaluateApprovedApplication';
import EvaluateNTC from '../FSESClerk/EvaluateNTC';

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

const EvaluateChoicePopup: React.FC<ChoiceProps> = (props: ChoiceProps) => {
    const [openEvaluateBusiness, setopenEvaluateBusiness] = useState<Record<number, boolean>>({});
    const [openNTCBusiness, setopenNTCBusiness] = useState<Record<number, boolean>>({});


    //Evaluate Popup
    const handleOpenEvaluate = (no: number) => {
        setopenEvaluateBusiness((prevOpenEvaluate) => ({
            ...prevOpenEvaluate,
            [no]: true,
        }));
    };

    //Evaluate Popup
    const handleCloseEvaluate = (no: number) => {
        setopenEvaluateBusiness((prevOpenEvaluate) => ({
            ...prevOpenEvaluate,
            [no]: false,
        }));
    };

    
    //NTC Popup
    const handleOpenNTC = (no: number) => {
        setopenNTCBusiness((prevOpenNTC) => ({
            ...prevOpenNTC,
            [no]: true,
        }));
    };

    //NTC Popup
    const handleCloseNTC = (no: number) => {
        setopenNTCBusiness((prevOpenNTC) => ({
            ...prevOpenNTC,
            [no]: false,
        }));
    };

    const openApprovedEval = (id: number) => {
        handleOpenEvaluate(id);
        props.handleClose();
    }

    const openNTC = (id: number) => {
        handleOpenNTC(id);
        props.handleClose();
    }

    return (
        <div>
            <Dialog open={props.open} maxWidth="xs" fullWidth PaperProps={{ style: { backgroundColor: 'lightgrey' } }} >
                <DialogTitle sx={{ height: '0px' }}>
                    <IconButton sx={{ marginTop: '-25px', marginLeft: '-25px' }} onClick={props.handleClose}>
                        <CancelIcon sx={{ color: 'red' }} />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p style={{ fontFamily: 'Oswald', fontWeight: 'bold' }}>How do you want to Evaluate this Form?</p>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button variant='contained' onClick={() => openApprovedEval(props.bpid)} sx={{ backgroundColor: '#BEBEBE', fontFamily: 'Oswald', color: 'green' }}>Approve</Button>
                    <Button variant='contained' onClick={() => openNTC(props.bpid)} sx={{ backgroundColor: '#BEBEBE', fontFamily: 'Oswald', color: 'red' }}>NTC</Button>
                </DialogActions>
            </Dialog>
            <EvaluateNTC
                bpid={props.bpid}
                business_no={props.business_no}
                permitee={props.permitee}
                business_name={props.business_name}
                address={props.address}
                natureofbusiness={props.natureofbusiness}
                typeofoccupancy={props.typeofoccupancy}
                contactno={props.contactno}
                email={props.email}
                datereceived={props.datereceived}
                open={openNTCBusiness[props.bpid]}
                handleClose={() => handleCloseNTC(props.bpid)}
            />
        </div>
    );
};

export default EvaluateChoicePopup;
