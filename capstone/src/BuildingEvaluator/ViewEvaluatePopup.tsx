
import React, { useState, } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import { Card, CardContent, DialogTitle, Grid, MenuItem, OutlinedInput, Select, Stack } from '@mui/material';

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
    evaluator?: string;
    status?: string;
    numberstorey?: number;
    newconsreno?: string;
    buildcons?: boolean;
    defects?: string[];
    open: boolean;
    update: string;
    handleClose: () => void;
}


export interface formdetails {
    open: boolean;
    handleClose: () => void;
}


export default function ViewEvaluatePopup(props: formdetails) {

    const [selectedValue] = useState(props.status);
    const [selectedConsReno] = useState(props.newconsreno);
    const [selectedCons] = useState<boolean>(false)

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
                                            <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.buildingPermitNo}  readOnly={props.update !== 'Update'} />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={11}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>Name of Owner/Permitee</p>
                                            <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.applicantName}  readOnly={props.update !== 'Update'} />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={11}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>Business Name</p>
                                            <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.projectName}  readOnly={props.update !== 'Update'} />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={11}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>Address</p>
                                            <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.address}  readOnly={props.update !== 'Update'} />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={6}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>Type of Occupancy</p>
                                            <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.typeofoccupancy} readOnly={props.update !== 'Update'} />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={5}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>Contact Number</p>
                                            <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.contactno}  readOnly={props.update !== 'Update'} />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={11}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>Date Received</p>
                                            <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.datereceived}  readOnly={props.update !== 'Update'} />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={11}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>Received By</p>
                                            <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.receivedby}  readOnly={props.update !== 'Update'} />
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
                                            <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.evaluator}  readOnly={props.update !== 'Update'} />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={11}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>Status</p>
                                            <Select
                                                value={selectedValue}
                                            
                                                sx={{ height: '30px', width: '200px', borderRadius: '14px', borderWidth: '20px' }}
                                                disabled
                                            >
                                                <MenuItem value="Approved">Approved</MenuItem>
                                                <MenuItem value="Disapproved">Disapproved</MenuItem>
                                            </Select>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={5}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>Number of Storey</p>
                                            <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.numberstorey} readOnly={props.update !== 'Update'} />
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={10} sm={6}>
                                        <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                            <p className='custom-paragraph'>New Construction/Renovation</p>
                                            <Select value={selectedConsReno} 
                                                sx={{ height: '30px', width: '200px', borderRadius: '14px', borderWidth: '20px' }}
                                                disabled
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
                
                                                sx={{ height: '30px', width: '200px', borderRadius: '14px', borderWidth: '20px' }}
                                                disabled
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
                                                }//
                                                } multiline
                                                disabled={selectedValue !== "Disapproved"}
                                                readOnly
                                                defaultValue={props.defects}
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
                    <Button variant='contained' onClick={props.handleClose} sx={{ backgroundColor: 'red', borderRadius: '13px', height: '30px' }}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};
