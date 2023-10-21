import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import { Card, CardContent, DialogActions, DialogContent, DialogTitle, Grid, OutlinedInput, Stack } from '@mui/material';
import { useRef, useState } from 'react';
import axios from 'axios';

const cardStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 800,
    backgroundColor: 'lightgrey',
}; //Style Purposes

export interface formdetails {
    open: boolean;
    handleClose: () => void;
    add: string;

}


const AddOccupancy: React.FC<formdetails> = ({ open, handleClose, add }) => {

    const applicantionnoRef = useRef<HTMLInputElement | null>(null);
    const applicantnameRef = useRef<HTMLInputElement | null>(null);
    const buildingnoRef = useRef<HTMLInputElement | null>(null);
    const projectnameRef = useRef<HTMLInputElement | null>(null);
    const dateReceivedRef = useRef<HTMLInputElement | null>(null);
    const locationRef = useRef<HTMLInputElement | null>(null);
    const contactnoRef = useRef<HTMLInputElement | null>(null);
    const assessmentfeesRef = useRef<HTMLInputElement | null>(null);


    const AddForm = async () => {
        let NEW_URL = '';
        if(add === 'New'){
            NEW_URL = 'http://localhost:8080/occupancyPendingclerk/insertNODPermit';
        }
        axios
            .post(NEW_URL, {
                application_no: applicantionnoRef.current?.value,
                applicant_name: applicantnameRef.current?.value,
                building_no: buildingnoRef.current?.value,
                project_name: projectnameRef.current?.value,
                date_received: dateReceivedRef.current?.value,
                location: locationRef.current?.value,
                contact_no: contactnoRef.current?.value,
                assessment_fees: assessmentfeesRef.current?.value,
                remarks: "Pending"  
            })
            .then(res => {

                if (res.data) {
                    console.log(applicantionnoRef.current?.value)
                    console.log("Successfully Added!" + JSON.stringify(res.data));
                    handleClose()
                }

            })
            .catch(err => {
                console.log(err)
            })
            
    }

    return (
        <div>
            <Dialog open={open} maxWidth="md" fullWidth PaperProps={{ style: { backgroundColor: 'lightgrey' } }}>
                <DialogTitle sx={{ height: '0px' }}>
                    <IconButton sx={{ marginTop: '-25px', marginLeft: '-25px' }} onClick={handleClose}>
                        <CancelIcon sx={{ color: 'red' }} />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                    <Card style={cardStyle} elevation={0}>
                        <CardContent style={{ marginLeft: 35, textAlign: 'center' }} >
                            <Grid container marginTop={'5rem'} style={{ height: '100%' }}>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Application No.</p>
                                        <OutlinedInput inputRef={applicantionnoRef} className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} />
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Building Permit No.</p>
                                        <OutlinedInput inputRef={buildingnoRef} className='custom-outlined-input' sx={{ borderRadius: '11px', width: "306px" }} />
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={11}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Applicant Name</p>
                                        <OutlinedInput inputRef={applicantnameRef} fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} />
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={11}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Project Name</p>
                                        <OutlinedInput inputRef={projectnameRef} fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} />
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={11}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Location</p>
                                        <OutlinedInput inputRef={locationRef} fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} />
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={11}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Assessment of Fees</p>
                                        <OutlinedInput inputRef={assessmentfeesRef} fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} />
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Contact No.</p>
                                        <OutlinedInput inputRef={contactnoRef} className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} />
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={5}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Date Received</p>
                                        <OutlinedInput inputRef={dateReceivedRef} fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} />
                                    </Stack>
                                </Grid>
                                
                                
                            </Grid>
                        </CardContent>
                    </Card>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                <Button variant='contained'  onClick={AddForm} sx={{ backgroundColor: 'grey', borderRadius: '13px', height: '30px' }}>Add Application</Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default AddOccupancy;