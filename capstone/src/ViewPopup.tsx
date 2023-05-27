import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import ViewPending from './ViewPending';
import { DialogTitle } from '@mui/material';




export interface formdetails {
    no: number;
    buildingPermitNo: string;
    applicantName: string;
    projectName: string;
    open: boolean;
    handleClose: () => void;
}

const Popup: React.FC<formdetails> = ({ no, buildingPermitNo, applicantName, projectName, open, handleClose }) => {

    return (
        <div>
            <Dialog open={open} maxWidth = "md" fullWidth PaperProps={{ style: { backgroundColor: 'lightgrey' } }} >
                <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ViewPending
                        no={no}
                        buildingPermitNo={buildingPermitNo}
                        applicantName={applicantName}
                        projectName={projectName}
                    />
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button variant='contained'onClick={handleClose} sx={{backgroundColor:'red'}}>Close</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};
export default Popup;