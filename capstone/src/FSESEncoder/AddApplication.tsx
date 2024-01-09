import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import { Card, CardContent, DialogActions, DialogContent, DialogTitle, Grid, OutlinedInput, Stack } from '@mui/material';
import { useRef, useState } from 'react';
import axios from 'axios';
import { addBusinessPermits, addrenewalBusinessPermits } from '../lib/controller';

const cardStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 800,
    backgroundColor: 'lightgrey',
}; //Style Purposes

export interface formdetails {
    open: boolean;
    add: string;
    handleClose: () => void;
    buildingpermit?: string;
    name?: string;
    businessname?: string;
    address?: string;
    natureofbusiness?: string;
    typeofoccupancy?: string;
    contactno?: string;
    email?: string;
}


const AddApplication: React.FC<formdetails> = ({ open, handleClose, add, name, buildingpermit, businessname, address, natureofbusiness, typeofoccupancy, contactno, email }) => {

    const buildingpermRef = useRef<HTMLInputElement | null>(null);
    const permiteeRef = useRef<HTMLInputElement | null>(null);
    const businessnameRef = useRef<HTMLInputElement | null>(null);
    const addressRef = useRef<HTMLInputElement | null>(null);
    const typeofoccupancyRef = useRef<HTMLInputElement | null>(null);
    const contactnoRef = useRef<HTMLInputElement | null>(null);
    const dateReceivedRef = useRef<HTMLInputElement | null>(null);
    const naturebusinessRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);

    const AddForm = async () => {
        /*let NEW_URL = '';
        if(add === 'New'){
            NEW_URL = 'http://localhost:8080/BPPending/insertBPPermit';
        }
        else if (add === 'Renewal'){
            NEW_URL = 'http://localhost:8080/Renewal/insertRenewalPermit';
        }
        axios
            .post(NEW_URL, {
                bspermit_no: buildingpermRef.current?.value,
                permittee: permiteeRef.current?.value,
                business_name: businessnameRef.current?.value,
                address:addressRef.current?.value,
                nature_business: naturebusinessRef.current?.value,
                type_occupancy: typeofoccupancyRef.current?.value,
                contact_no: contactnoRef.current?.value,
                email: emailRef.current?.value,
                date_received: dateReceivedRef.current?.value,
                remarks: "Pending"  
            })
            .then(res => {

                if (res.data) {
                    console.log(buildingpermRef.current?.value)
                    console.log("Successfully Added!" + JSON.stringify(res.data));
                    handleClose()
                   
                }

            })
            .catch(err => {
                console.log(err)
            })*/
        if (add === "New") {
            addBusinessPermits({
                bspermit_no: (buildingpermRef.current?.value || ''),
                address: (addressRef.current?.value || ''),
                permittee: (permiteeRef.current?.value || ''),
                business_name: (businessnameRef.current?.value || ''),
                nature_business: (naturebusinessRef.current?.value || ''),
                type_occupancy: (typeofoccupancyRef.current?.value || ''),
                contact_no: (contactnoRef.current?.value || ''),
                email: (emailRef.current?.value || ''),
                date_received: (dateReceivedRef.current?.value || ''),
                amount: 0,
                date: "2023-02-01",
                dateinspection: "2023-02-01",
                fireinspectors: [""],
                fsicdate: "2023-02-01",
                fsicno: 0,
                inspection_no: 0,
                orno: 0,
                recommendation: [""],
                remarks: "Pending",
                teamleader: ""
            })
            handleClose();
        }
        else if (add === "Renewal") {
            addrenewalBusinessPermits({
                bspermit_no: (buildingpermRef.current?.value || ''),
                address: (addressRef.current?.value || ''),
                permittee: (permiteeRef.current?.value || ''),
                business_name: (businessnameRef.current?.value || ''),
                nature_business: (naturebusinessRef.current?.value || ''),
                type_occupancy: (typeofoccupancyRef.current?.value || ''),
                contact_no: (contactnoRef.current?.value || ''),
                email: (emailRef.current?.value || ''),
                date_received: (dateReceivedRef.current?.value || ''),
                amount: 0,
                date: "2023-02-01",
                dateinspection: "2023-02-01",
                fireinspectors: [""],
                fsicdate: "2023-02-01",
                fsicno: 0,
                inspection_no: 0,
                orno: 0,
                recommendation: [""],
                remarks: "Pending",
                teamleader: ""
            })
            handleClose();
        }

    }

    return (
        <div>
            <Dialog open={open} maxWidth="md" fullWidth PaperProps={{ style: { backgroundColor: 'lightgrey' } }}>
                <DialogTitle sx={{ height: '0px' }}>
                    <IconButton sx={{ marginTop: '-25px', marginLeft: '-25px' }} onClick={handleClose}>
                        <CancelIcon sx={{ color: 'red' }} />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ justifyContent: 'center', alignItems: 'center' }} >
                    <Card style={cardStyle} elevation={0}>
                        <CardContent style={{ marginLeft: 35, textAlign: 'center', marginTop: '-110px' }} >
                            <Grid container marginTop={'5rem'} style={{ height: '100%' }}>
                                <Grid item xs={10} sm={11}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Building Permit Number</p>
                                        <OutlinedInput defaultValue={buildingpermit || ""} inputRef={buildingpermRef} fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} />
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={11}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Name of Owner/Permitee</p>
                                        <OutlinedInput defaultValue={name || ""} inputRef={permiteeRef} fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} />
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={11}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Business Name</p>
                                        <OutlinedInput defaultValue={businessname || ""} inputRef={businessnameRef} fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} />
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={11}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Address</p>
                                        <OutlinedInput defaultValue={address || ""} inputRef={addressRef} fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} />
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Nature of Business</p>
                                        <OutlinedInput defaultValue={natureofbusiness || ""} inputRef={naturebusinessRef} className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} />
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={5}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Type of Occupancy</p>
                                        <OutlinedInput defaultValue={typeofoccupancy || ""} inputRef={typeofoccupancyRef} fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} />
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Contact Number</p>
                                        <OutlinedInput defaultValue={contactno || ""} inputRef={contactnoRef} className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} />
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Email</p>
                                        <OutlinedInput defaultValue={email || ""} inputRef={emailRef} className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} />
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Date Received</p>
                                        <OutlinedInput inputRef={dateReceivedRef} fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} placeholder='EX: YEAR-MONTH-DAY' />
                                    </Stack>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>

                    <Button variant='contained' onClick={AddForm} sx={{ backgroundColor: 'grey', borderRadius: '10px', height: '30px' }}>Add Application</Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default AddApplication