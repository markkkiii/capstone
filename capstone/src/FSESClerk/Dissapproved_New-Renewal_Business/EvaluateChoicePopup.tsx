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
import EvaluateNTCVPopup from './EvaluateNTCV';

interface ChoiceProps {
  
    open: boolean;
    remarks: string;
    handleOpenNTCV: () => void;
    handleOpenAbatement: () => void;
    handleOpenClosure: () => void;
    handleClose: () => void;
    handleOpenApproved: () => void;
}

const EvaluateChoicePopup: React.FC<ChoiceProps> = (props: ChoiceProps) => {
    const [openEvaluateBusiness, setopenEvaluateBusiness] = useState<Record<number, boolean>>({});
    const [openNTCBusiness, setopenNTCBusiness] = useState<Record<number, boolean>>({});
    const [openprevEvaluateNTCV, setopenprevEvaluateNTCV] = useState<Record<number, boolean>>({}); //Opens NTCV Form

    const handleOpenApproved = () => {
        props.handleOpenApproved();
        props.handleClose();
    }

    const handleOpenForms = () =>{
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
                    <p style={{ fontFamily: 'Oswald', fontWeight: 'bold' }}>How do you want to evaluate this form?</p>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button variant='contained' onClick={handleOpenApproved} sx={{ backgroundColor: '#BEBEBE', fontFamily: 'Oswald', color: 'green' }}>Approve</Button>
                    <Button variant='contained' onClick={handleOpenForms} sx={{ backgroundColor: '#BEBEBE', fontFamily: 'Oswald', color: 'red' }} disabled = {props.remarks === 'Closure Records'}>
                        {props.remarks === 'NTC Records'?'NTCV':
                        props.remarks === 'NTCV Records'?'Abatement':
                        props.remarks === 'Abatement Records'?'Closure':
                        'N/A'}
                        </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EvaluateChoicePopup;
