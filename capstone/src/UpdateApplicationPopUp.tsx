import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CancelIcon from '@mui/icons-material/Cancel';
import AddApplicationForm from './AddApplicationForm';
import IconButton from '@mui/material/IconButton';
import { DialogTitle } from '@mui/material';



export interface formdetails {
    no: number;
    buildingPermitNo: string;
    applicantName: string;
    projectName: string;
    open: boolean;
    handleClose: () => void;
}


export interface formdetails {
    open: boolean;
    handleClose: () => void;
}

const UpdateApplicationPopup: React.FC<formdetails> = ({no, buildingPermitNo, applicantName, projectName,open, handleClose }) => {

    return (
        <div>
            <Dialog open={open} maxWidth = "md" fullWidth PaperProps={{ style: { backgroundColor: 'lightgrey' } }}>
                <DialogTitle sx={{height: '10px'}}>
                    <IconButton  sx={{ marginTop: '-25px', marginLeft: '-25px' }} onClick={handleClose}>
                        <CancelIcon sx={{color:'red'}}/>
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} style={{ paddingTop: '5rem' }} >
                    <AddApplicationForm
                    no={no}
                    buildingPermitNo={buildingPermitNo}
                    applicantName={applicantName}
                    projectName={projectName}
                    />
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button variant='contained' onClick={handleClose} sx={{backgroundColor:'grey', borderRadius:'13px', height:'30px'}}>Update Application</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};
export default UpdateApplicationPopup;