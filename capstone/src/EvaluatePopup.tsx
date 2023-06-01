
import React, { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import { Card, CardContent, DialogTitle, Grid, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack } from '@mui/material';
import axios from 'axios';


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
    address: string;
    typeofoccupancy: string;
    contactno: string;
    datereceived: string;
    receivedby: string;
    open: boolean;
    update: string;
    handleClose: () => void;
}


export interface formdetails {
    open: boolean;
    handleClose: () => void;
}


export default function EvaluatePopup(props: formdetails) {


    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedValue, setSelectedValue] = useState('Approved');
    const [selectedConsReno, setSelectedConsReno] = useState("Renovation");
    const [selectedCons, setSelectedCons] = useState<boolean>(false)
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    const EvaluatorRef = useRef<HTMLInputElement | null>(null);
    const NumberStoreyRef = useRef<HTMLInputElement | null>(null);
    const DefectsRef = useRef<HTMLInputElement | null>(null);


    const [inputValues, setInputValues] = useState({

        buildingPermitNo: props.buildingPermitNo,
        applicantName: props.applicantName,
        projectName: props.projectName,
        address: props.address,
        typeofoccupancy: props.typeofoccupancy,
        contactno: props.contactno,
        datereceived: props.datereceived,
        receivedby: props.receivedby,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [name]: value,
        }));
    };

    const handleConsReno = (event: SelectChangeEvent<string>) => {
        const value = event.target.value as string;
        setSelectedConsReno(value);
        console.log(selectedConsReno)
    };

    const handleCons = (event: SelectChangeEvent<boolean>) => {
        setSelectedCons(event.target.value as boolean);
        console.log(selectedCons)
    };

    const handleApproved = (event: SelectChangeEvent<string>) => {
        setSelectedValue(event.target.value);
        console.log(selectedValue)
    };

    const updatePermit = async () => {
        axios.put('http://localhost:8080/BFP/updatePermit?id=' + props.no,
            {
                buildingpermitno: props.buildingPermitNo,
                namepermitee: props.applicantName,
                businessname: props.projectName,
                address: props.address,
                typeofoccupancy: props.typeofoccupancy,
                contactno: props.contactno,
                datereceived: props.datereceived,
                receivedby: props.receivedby,
                status: selectedValue,
                evaluator: EvaluatorRef.current?.value,
                nostorey: NumberStoreyRef.current?.value,
                constructrenovate: selectedConsReno,
                structureconstructed: selectedCons,
                remarks: "Not Printed",
                defects: DefectsRef.current?.value
            }
        ).then(res => {
            console.log(res.data);
            alert("Update Successful!");
            props.handleClose()
        }).catch(err => console.log(err))
    }
    return (
        <div>
            <Dialog open={props.open}
                maxWidth="md"
                fullWidth
                PaperProps={{ style: { backgroundColor: 'lightgrey' } }}
                sx={{ '& .MuiDialog-paper': { overflowY: 'auto' } }}>
                <DialogTitle sx={{ height: '0px' }}>
                    <IconButton sx={{ marginTop: '-25px', marginLeft: '-25px' }} onClick={props.handleClose}>
                        <CancelIcon sx={{ color: 'red' }} />
                    </IconButton>
                </DialogTitle>
                <DialogContent >
                    <>
                        <Card style={cardStyle}>
                            <CardContent style={{ marginLeft: 35, textAlign: 'center' }} >
                                <Grid container marginTop={'1rem'} style={{ height: '100%' }}>
                                    <Grid item xs={10} sm={11}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>Building Permit Number</p>
                                            <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.buildingPermitNo} readOnly />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={11}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>Name of Owner/Permitee</p>
                                            <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.applicantName} readOnly />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={11}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>Business Name</p>
                                            <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.projectName} readOnly />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={11}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>Address</p>
                                            <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.address} readOnly />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={6}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>Type of Occupancy</p>
                                            <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.typeofoccupancy} readOnly />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={5}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>Contact Number</p>
                                            <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.contactno} readOnly />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={11}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>Date Received</p>
                                            <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.datereceived ? new Date(props.datereceived).toISOString().split('T')[0] : ''} readOnly />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={11}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>Received By</p>
                                            <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.receivedby} readOnly />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={11}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>------------------------------------------------------
                                                Evaluate Form-------------------------------------------------------</p>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={11}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>Evaluator</p>
                                            <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} inputRef={EvaluatorRef}/>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={11}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>Status</p>
                                            <Select
                                                value={selectedValue}
                                                onChange={handleApproved}
                                                sx={{ height: '30px', width: '200px', borderRadius: '14px', borderWidth: '20px' }}
                                            >
                                                <MenuItem value="Approved">Approved</MenuItem>
                                                <MenuItem value="Disapproved">Disapproved</MenuItem>
                                            </Select>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={5}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>Number of Storey</p>
                                            <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} inputRef={NumberStoreyRef}/>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={6}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>New Construction/Renovation</p>
                                            <Select value={selectedConsReno} onChange={handleConsReno}
                                                sx={{ height: '30px', width: '200px', borderRadius: '14px', borderWidth: '20px' }}
                                            >
                                                <MenuItem value="New Construction">New Construction</MenuItem>
                                                <MenuItem value="Renovation">Renovation</MenuItem>
                                            </Select>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={11}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>Building/Structure Already Constructed?</p>
                                            <Select
                                                value={selectedCons}
                                                onChange={handleCons}
                                                sx={{ height: '30px', width: '200px', borderRadius: '14px', borderWidth: '20px' }}
                                            >
                                                <MenuItem value="true">Yes</MenuItem>
                                                <MenuItem value="false">No</MenuItem>
                                            </Select>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={5}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>Remarks</p>
                                            <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={"Not Printed"} readOnly />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={11}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>Defects/Deficiencies</p>
                                            <OutlinedInput fullWidth className='custom-outlined-input-multiline'
                                                sx={{
                                                    borderRadius: '11px',
                                                    height: '100px',
                                                    paddingTop: '0',
                                                    '& textarea': {
                                                        paddingTop: '20px', // Adjust the value as needed
                                                    },
                                                }
                                                } multiline
                                                disabled={selectedValue !== "Disapproved"}
                                                inputRef={DefectsRef}
                                                rows={2}
                                            />
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button variant='contained' onClick={updatePermit} sx={{ backgroundColor: 'grey', borderRadius: '13px', height: '30px' }}>Add Evaluation</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};
