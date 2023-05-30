import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CancelIcon from '@mui/icons-material/Cancel';
import AddApplicationForm from './AddApplicationForm';
import IconButton from '@mui/material/IconButton';
import { Card, CardContent, DialogTitle, Grid, OutlinedInput, Stack } from '@mui/material';


const cardStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: 800,
  backgroundColor: 'lightgrey'
}; //Style Purposes



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
                <DialogTitle sx={{height: '0px'}}>
                    <IconButton  sx={{ marginTop: '-25px', marginLeft: '-25px' }} onClick={handleClose}>
                        <CancelIcon sx={{color:'red'}}/>
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} style={{ paddingTop: '2rem' }} >
                <>
                    <Card style= {cardStyle}>
                        <CardContent style={{ marginLeft: 35, textAlign:'center' }} >
                        <Grid container >
                            <Grid item xs={10} sm={11}>
                            <Stack spacing={-1} sx={{alignItems:'flex-start'}}>
                                <p className='custom-paragraph'>Building Permit Number</p>
                                <OutlinedInput fullWidth className='custom-outlined-input' sx={{borderRadius: '11px'}} defaultValue={props.buildingPermitNo}/>
                            </Stack>
                            </Grid>
                            <Grid item xs={10} sm={11}>
                            <Stack spacing={-1} sx={{alignItems:'flex-start'}}>
                                <p className='custom-paragraph'>Name of Owner/Permitee</p>
                                <OutlinedInput fullWidth className='custom-outlined-input' sx={{borderRadius: '11px'}} defaultValue={props.applicantName}/>
                            </Stack>
                            </Grid>
                            <Grid item xs={10} sm={11}>
                            <Stack spacing={-1} sx={{alignItems:'flex-start'}}>
                                <p className='custom-paragraph'>Business Name</p>
                                <OutlinedInput fullWidth className='custom-outlined-input' sx={{borderRadius: '11px'}} defaultValue={props.projectName}/>
                            </Stack>
                            </Grid>
                            <Grid item xs={10} sm={11}>
                            <Stack spacing={-1} sx={{alignItems:'flex-start'}}>
                                <p className='custom-paragraph'>Address</p>
                                <OutlinedInput fullWidth className='custom-outlined-input' sx={{borderRadius: '11px'}}/>
                            </Stack>
                            </Grid>
                            <Grid item xs={10} sm={6}>
                            <Stack spacing={-1} sx={{alignItems:'flex-start'}}>
                                <p className='custom-paragraph'>Type of Occupancy</p>
                                <OutlinedInput fullWidth className='custom-outlined-input' sx={{borderRadius: '11px'}}/>
                            </Stack>
                            </Grid>
                            <Grid item xs={10} sm={5}>
                            <Stack spacing={-1} sx={{alignItems:'flex-start'}}>
                                <p className='custom-paragraph'>Contact Number</p>
                                <OutlinedInput fullWidth className='custom-outlined-input' sx={{borderRadius: '11px'}}/>
                            </Stack>
                            </Grid>
                            <Grid item xs={10} sm={5}>
                            <Stack spacing={-1} sx={{alignItems:'flex-start'}}>
                                <p className='custom-paragraph'>Date Received</p>
                                <OutlinedInput fullWidth className='custom-outlined-input' sx={{borderRadius: '11px'}} defaultValue={selectedDate} onChange={handleDateChange}/>
                            </Stack>
                            </Grid>
                            <Grid item xs={10} sm={6}>
                            <Stack spacing={-1} sx={{alignItems:'flex-start'}}>
                                <p className='custom-paragraph'>Received By</p>
                                <OutlinedInput fullWidth className='custom-outlined-input' sx={{borderRadius: '11px'}}/>
                            </Stack>
                            </Grid>
                        </Grid>
                        </CardContent>
                    </Card>

    </>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button variant='contained' onClick={handleClose} sx={{backgroundColor:'grey', borderRadius:'13px', height:'30px'}}>Update Application</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};
export default UpdateApplicationPopup;