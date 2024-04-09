    import React from 'react'
    import Button from '@mui/material/Button';
    import Dialog from '@mui/material/Dialog';
    import CancelIcon from '@mui/icons-material/Cancel';
    import IconButton from '@mui/material/IconButton';
    import { Card, CardContent, DialogActions, DialogContent, DialogTitle, Grid, OutlinedInput, Stack } from '@mui/material';
    import { useRef, useState } from 'react';
    import axios from 'axios';
    import { updateBusinessPermit, updaterenewalBusinessPermit } from '../../lib/controller';

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
        id: string;
        bspermit_no: string;
        permitee: string;
        businessname: string;
        address: string;
        natureofbusiness: string;
        typeofoccupancy: string;
        contactno: string;
        email: string;
        datereceived: string;
        form: string;
    }


    const UpdateRenewalApplication: React.FC<formdetails> = (props: formdetails) => {

        const buildingpermRef = useRef<HTMLInputElement | null>(null);
        const permiteeRef = useRef<HTMLInputElement | null>(null);
        const businessnameRef = useRef<HTMLInputElement | null>(null);
        const addressRef = useRef<HTMLInputElement | null>(null);
        const typeofoccupancyRef = useRef<HTMLInputElement | null>(null);
        const contactnoRef = useRef<HTMLInputElement | null>(null);
        const dateReceivedRef = useRef<HTMLInputElement | null>(null);
        const emailRef = useRef<HTMLInputElement | null>(null);
        const naturebusinessRef = useRef<HTMLInputElement | null>(null);

        const updatePermit = async () => {
            /*let new_url=''
            if(props.form === 'New'){
                new_url='http://localhost:8080/BPPending/putBPPermit?id='
            }
            else if(props.form ==='Renewal'){
                new_url='http://localhost:8080/Renewal/putRenewalPermit?id='
            }
            axios.put(new_url+props.id,
                {
                    bspermit_no:buildingpermRef.current?.value,
                    permittee: permiteeRef.current?.value,
                    business_name: businessnameRef.current?.value,
                    address: addressRef.current?.value,
                    nature_business: naturebusinessRef.current?.value,
                    type_occupancy: typeofoccupancyRef.current?.value,
                    contact_no: contactnoRef.current?.value,
                    email: emailRef.current?.value,
                    date_received: dateReceivedRef.current?.value

                }
                ).then(res => {
                    console.log(res.data);
                    alert("Update Successful!");
                    props.handleClose()
                }).catch(err => console.log(err))
            */
            if (props.form === "New") {
                updateBusinessPermit(props.id,{
                    bspermit_no: (buildingpermRef.current?.value || ''),
                    address: (addressRef.current?.value || ''),
                    permittee: (permiteeRef.current?.value || ''),
                    business_name: (businessnameRef.current?.value || ''),
                    nature_business: (naturebusinessRef.current?.value || ''),
                    type_occupancy: (typeofoccupancyRef.current?.value || ''),
                    contact_no: (contactnoRef.current?.value || ''),
                    email: (emailRef.current?.value || ''),
                    date_received: (dateReceivedRef.current?.value || ''),
                })
                props.handleClose();
            }
            else if (props.form === "Renewal") {
                updaterenewalBusinessPermit(props.id,{
                    bspermit_no: (buildingpermRef.current?.value || ''),
                    address: (addressRef.current?.value || ''),
                    permittee: (permiteeRef.current?.value || ''),
                    business_name: (businessnameRef.current?.value || ''),
                    nature_business: (naturebusinessRef.current?.value || ''),
                    type_occupancy: (typeofoccupancyRef.current?.value || ''),
                    contact_no: (contactnoRef.current?.value || ''),
                    email: (emailRef.current?.value || ''),
                    date_received: (dateReceivedRef.current?.value || ''),
                })
                props.handleClose();
            }

        }



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
                            <CardContent style={{ marginLeft: 35, textAlign: 'center' }} >
                                <Grid container marginTop={'5rem'} style={{ height: '100%' }}>
                                    <Grid item xs={10} sm={11}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph' >Building Permit Number</p>
                                            <OutlinedInput inputRef={buildingpermRef} fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.bspermit_no} />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={11}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph' >Name of Owner/Permitee</p>
                                            <OutlinedInput inputRef={permiteeRef} fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.permitee} />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={11}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>Business Name</p>
                                            <OutlinedInput inputRef={businessnameRef} fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.businessname} />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={11}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>Address</p>
                                            <OutlinedInput inputRef={addressRef} fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.address} />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={6}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph' >Nature of Business</p>
                                            <OutlinedInput inputRef={naturebusinessRef} className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} defaultValue={props.natureofbusiness} />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={5}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph' >Type of Occupancy</p>
                                            <OutlinedInput inputRef={typeofoccupancyRef} fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.typeofoccupancy} />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={6}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph' >Contact Number</p>
                                            <OutlinedInput inputRef={contactnoRef} className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} defaultValue={props.contactno} />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={6}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph' >Email</p>
                                            <OutlinedInput inputRef={emailRef} className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} defaultValue={props.email} />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={6}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph' >Date Received</p>
                                            <OutlinedInput inputRef={dateReceivedRef} fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.datereceived} />
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </DialogContent>
                    <DialogActions style={{ justifyContent: 'center' }}>
                        <Button variant='contained' sx={{ backgroundColor: 'grey', borderRadius: '13px', height: '30px' }} onClick={updatePermit}>Update Application</Button>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }

    export default UpdateRenewalApplication