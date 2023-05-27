import React, { useState } from 'react';
import './AddApplicationForm.css'

import { Button, Card, CardContent, Grid, OutlinedInput, Stack, TextField, Typography } from '@mui/material';

const cardStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 800,
    backgroundColor: 'lightgrey',
    flexGrow: 1,
}; //Style Purposes

export interface formdetails {
    no?: number;
    buildingPermitNo?: string;
    applicantName?: string;
    projectName?: string;
    //Add remaining Values here later 

}


export default function EvaluateApplicationForm(props: formdetails) {

    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150vh' }}>
                <Card style={cardStyle}>
                    <CardContent style={{ marginLeft: 35, textAlign: 'center' }} >
                        <Grid container marginTop={'1rem'} style={{ height: '100%' }}>
                            <Grid item xs={10} sm={11}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph'>Building Permit Number</p>
                                    <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.buildingPermitNo} />
                                </Stack>
                            </Grid>
                            <Grid item xs={10} sm={11}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph'>Name of Owner/Permitee</p>
                                    <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.applicantName} />
                                </Stack>
                            </Grid>
                            <Grid item xs={10} sm={11}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph'>Business Name</p>
                                    <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.projectName} />
                                </Stack>
                            </Grid>
                            <Grid item xs={10} sm={11}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph'>Address</p>
                                    <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} />
                                </Stack>
                            </Grid>
                            <Grid item xs={10} sm={6}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph'>Type of Occupancy</p>
                                    <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} />
                                </Stack>
                            </Grid>
                            <Grid item xs={10} sm={5}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph'>Contact Number</p>
                                    <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} />
                                </Stack>
                            </Grid>
                            <Grid item xs={10} sm={11}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph'>Date Received</p>
                                    <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={selectedDate} onChange={handleDateChange} />
                                </Stack>
                            </Grid>
                            <Grid item xs={10} sm={11}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph'>Received By</p>
                                    <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} />
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
                                    <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} />
                                </Stack>
                            </Grid>
                            <Grid item xs={10} sm={11}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph'>Status</p>
                                    <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px' }} />
                                </Stack>
                            </Grid>
                            <Grid item xs={10} sm={5}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph'>Number of Storey</p>
                                    <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} />
                                </Stack>
                            </Grid>
                            <Grid item xs={10} sm={6}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph'>New Construction/Renovation</p>
                                    <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} />
                                </Stack>
                            </Grid>
                            <Grid item xs={10} sm={11}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph'>Building/Structure Already Constructed?</p>
                                    <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} />
                                </Stack>
                            </Grid>
                            <Grid item xs={10} sm={5}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph'>Remarks</p>
                                    <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }}  defaultValue={"Not Printed"} readOnly/>
                                </Stack>
                            </Grid>
                            <Grid item xs={10} sm={11}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph'>Defects/Deficiencies</p>
                                    <OutlinedInput fullWidth className='custom-outlined-input-multiline' 
                                    sx={{ borderRadius: '11px', 
                                    height:'100px',
                                    paddingTop: '0',
                                    '& textarea': {
                                        paddingTop: '20px', // Adjust the value as needed
                                      },
                                    }
                                    } multiline 
                                    rows={4}
                                    />
                                </Stack>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}


