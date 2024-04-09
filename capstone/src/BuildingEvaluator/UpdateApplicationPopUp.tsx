
import React, { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import { Card, CardContent, DialogTitle, Grid, OutlinedInput, Stack } from '@mui/material';
import axios from 'axios';
import { updateBuildingPermit } from '../lib/controller';


const cardStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 800,
    backgroundColor: 'lightgrey'
}; //Style Purposes



export interface formdetails {
    no: string;
    buildingPermitNo: string;
    applicantName: string;
    projectName: string;
    address: string;
    typeofoccupancy: string;
    contactno: string;
    datereceived: string;
    receivedby: string;
    open: boolean;
    handleClose: () => void;
}

export default function UpdateApplicationPopup(props: formdetails) {

    const buildingpermRef = useRef<HTMLInputElement | null>(null);
    const permiteeRef = useRef<HTMLInputElement | null>(null);
    const businessnameRef = useRef<HTMLInputElement | null>(null);
    const addressRef = useRef<HTMLInputElement | null>(null);
    const typeofoccupancyRef = useRef<HTMLInputElement | null>(null);
    const contactnoRef = useRef<HTMLInputElement | null>(null);
    const dateReceivedRef = useRef<HTMLInputElement | null>(null);
    const receivedbyRef = useRef<HTMLInputElement | null>(null);

    const updatePermit = async () => {
        /*axios.put('http://localhost:8080/BFP/updatePermit?id='+props.no,
            {
                buildingpermitno: buildingpermRef.current?.value,
                namepermitee: permiteeRef.current?.value,
                businessname: businessnameRef.current?.value,
                address: addressRef.current?.value,
                typeofoccupancy: typeofoccupancyRef.current?.value,
                contactno: contactnoRef.current?.value,
                datereceived: dateReceivedRef.current?.value,
                receivedby: receivedbyRef.current?.value,
                status: "Pending",
                evaluator: "Default",
                nostorey: 2,
                constructrenovate:"Default",
                structureconstructed: false,
                remarks: "Not Printed",
                defects: "N/A"
            }
            ).then(res => {
                console.log(res.data);
                alert("Update Successful!");
                props.handleClose()
            }).catch(err => console.log(err))*/
        updateBuildingPermit(props.no,
            {
                applicantName: (permiteeRef.current?.value || ''),
                buildingNo: (buildingpermRef.current?.value || ''),
                dateReceived: (dateReceivedRef.current?.value || ''),
                projectName: (businessnameRef.current?.value || ''),
                remarks: "Not Printed",
                status: "Pending",
                address: (addressRef.current?.value || ''),
                receivedby: (receivedbyRef.current?.value || ''),
                typeofoccupancy: (typeofoccupancyRef.current?.value || ''),
                contactno: (contactnoRef.current?.value || ''),
                evaluator: "",
                nostorey: 2,
                constructrenovate: "construction",
                structureconstructed: false,
                defects: [""]
            })
            props.handleClose();

    }
    return (
        <div>
            <Dialog open={props.open} maxWidth="md" fullWidth PaperProps={{ style: { backgroundColor: 'lightgrey' } }}>
                <DialogTitle sx={{ height: '0px' }}>
                    <IconButton sx={{ marginTop: '-25px', marginLeft: '-25px' }} onClick={props.handleClose}>
                        <CancelIcon sx={{ color: 'red' }} />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} style={{ paddingTop: '2rem' }} >
                    <>
                        <Card style={cardStyle}>
                            <CardContent style={{ marginLeft: 35, textAlign: 'center' }} >
                                <Grid container >
                                    <Grid item xs={10} sm={11}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>Building Permit Number</p>
                                            <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.buildingPermitNo} inputRef={buildingpermRef} />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={11}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>Name of Owner/Permitee</p>
                                            <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.applicantName} inputRef={permiteeRef} />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={11}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>Business Name</p>
                                            <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.projectName} inputRef={businessnameRef} />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={11}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>Address</p>
                                            <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.address} inputRef={addressRef} />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={6}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>Type of Occupancy</p>
                                            <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.typeofoccupancy} inputRef={typeofoccupancyRef} />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={5}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>Contact Number</p>
                                            <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.contactno} inputRef={contactnoRef} />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={5}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>Date Received</p>
                                            <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.datereceived} inputRef={dateReceivedRef} />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={6}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>Received By</p>
                                            <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.receivedby} inputRef={receivedbyRef} />
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                    </>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button variant='contained' onClick={updatePermit} sx={{ backgroundColor: 'grey', borderRadius: '13px', height: '30px' }}>Update Application</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};
