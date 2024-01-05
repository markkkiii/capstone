import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import { Card, CardContent, DialogActions, DialogContent, DialogTitle, Grid, Stack, TextField } from '@mui/material';
import { useRef, useState } from 'react';

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
    bspermit_no: string;
    permitee: string;
    businessname:string;
    address:string;
    natureofbusiness:string;
    typeofoccupancy:string;
    contactno:string;
    email:string;
    datereceived:string;
}



const ViewRenewalApplication: React.FC<formdetails> = (props: formdetails) => {

    // const buildingpermRef = useRef<HTMLInputElement | null>(null);
    // const permiteeRef = useRef<HTMLInputElement | null>(null);
    // const businessnameRef = useRef<HTMLInputElement | null>(null);
    // const addressRef = useRef<HTMLInputElement | null>(null);
    // const typeofoccupancyRef = useRef<HTMLInputElement | null>(null);
    // const contactnoRef = useRef<HTMLInputElement | null>(null);
    // const dateReceivedRef = useRef<HTMLInputElement | null>(null);
    // const receivedbyRef = useRef<HTMLInputElement | null>(null);

    return (
        <div>
            <Dialog open={props.open} maxWidth="md" fullWidth PaperProps={{ style: { backgroundColor: 'lightgrey' } }}>
                <DialogTitle sx={{ height: '0px' }}>
                    <IconButton sx={{ marginTop: '-25px', marginLeft: '-25px' }} onClick={props.handleClose}>
                        <CancelIcon sx={{ color: 'red' }} />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                    <Card style={cardStyle} elevation={0}>
                        <CardContent style={{ marginLeft: 35, textAlign: 'center', marginTop: '-110px' }} >
                            <Grid container marginTop={'5rem'} style={{ height: '100%' }}>
                                <Grid item xs={10} sm={11}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' style={{ marginLeft: '-15px' }}>Building Permit Number</p>
                                        <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} variant='standard' disabled defaultValue={props.bspermit_no} />
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={11}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' style={{ marginLeft: '-15px' }} >Name of Owner/Permitee</p>
                                        <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }}variant='standard' disabled defaultValue={props.permitee} />
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={11}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' style={{ marginLeft: '-15px' }}>Business Name</p>
                                        <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} variant='standard' disabled defaultValue={props.businessname}/>
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={11}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' style={{ marginLeft: '-15px' }}>Address</p>
                                        <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} variant='standard' disabled defaultValue={props.address}/>
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' style={{ marginLeft: '-15px' }}>Nature of Business</p>
                                        <TextField  className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} variant='standard' disabled defaultValue={props.natureofbusiness}/>
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={5}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' style={{ marginLeft: '-15px' }}>Type of Occupancy</p>
                                        <TextField  fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} variant='standard' disabled defaultValue={props.typeofoccupancy}/>
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' style={{ marginLeft: '-15px' }}>Contact Number</p>
                                        <TextField className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }}variant='standard' disabled defaultValue={props.contactno}/>
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' style={{ marginLeft: '-15px' }}>Email</p>
                                        <TextField  className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} variant='standard' disabled defaultValue={props.email}/>
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' style={{ marginLeft: '-15px' }}>Date Received</p>
                                        <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} variant='standard' disabled defaultValue={props.datereceived}/>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>

                    <Button variant='contained' onClick={props.handleClose} sx={{ backgroundColor: 'Red', borderRadius: '13px', height: '30px' }}>Close</Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default ViewRenewalApplication