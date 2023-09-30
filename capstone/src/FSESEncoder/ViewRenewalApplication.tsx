import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import { Card, CardContent, DialogActions, DialogContent, DialogTitle, Grid, OutlinedInput, Stack, TextField } from '@mui/material';
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
}


const ViewRenewalApplication: React.FC<formdetails> = ({ open, handleClose }) => {

    const buildingpermRef = useRef<HTMLInputElement | null>(null);
    const permiteeRef = useRef<HTMLInputElement | null>(null);
    const businessnameRef = useRef<HTMLInputElement | null>(null);
    const addressRef = useRef<HTMLInputElement | null>(null);
    const typeofoccupancyRef = useRef<HTMLInputElement | null>(null);
    const contactnoRef = useRef<HTMLInputElement | null>(null);
    const dateReceivedRef = useRef<HTMLInputElement | null>(null);
    const receivedbyRef = useRef<HTMLInputElement | null>(null);

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
                                <Grid item xs={10} sm={11}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Building Permit Number</p>
                                        <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} variant='standard' disabled />
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={11}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Name of Owner/Permitee</p>
                                        <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }}variant='standard' disabled />
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={11}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Business Name</p>
                                        <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} variant='standard' disabled/>
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={11}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Address</p>
                                        <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} variant='standard' disabled/>
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Nature of Business</p>
                                        <TextField  className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} variant='standard' disabled/>
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={5}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Type of Occupancy</p>
                                        <TextField  fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} variant='standard' disabled/>
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Contact Number</p>
                                        <TextField className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }}variant='standard' disabled/>
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Email</p>
                                        <TextField  className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} variant='standard' disabled/>
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Date Received</p>
                                        <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} variant='standard' disabled/>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>

                    <Button variant='contained' onClick={handleClose} sx={{ backgroundColor: 'Red', borderRadius: '13px', height: '30px' }}>Close</Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default ViewRenewalApplication