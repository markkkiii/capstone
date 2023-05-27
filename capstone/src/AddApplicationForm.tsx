import React, { useState } from 'react';
import './AddApplicationForm.css'

import { Button, Card, CardContent, Grid, OutlinedInput, Stack, TextField, Typography } from '@mui/material';
import { cp } from 'fs';
const cardStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: 800,
  backgroundColor: 'lightgrey'
};

export interface formdetails{
  no?: number;
  buildingPermitNo?: string;
  applicantName?: string;
  projectName?: string;

}


export default function AddApplication(props: formdetails){

const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  return (
    <>
      <Card style= {cardStyle}>
        <CardContent style={{ marginLeft: 35, textAlign:'center' }} >
          <Grid container >
            <Grid item xs={10} sm={11}>
              <Stack spacing={-1} sx={{alignItems:'flex-start'}}>
                <p className='custom-paragraph'>Building Permit Number</p>
                  <OutlinedInput fullWidth className='custom-outlined-input' sx={{borderRadius: '11px'}}/>
             </Stack>
            </Grid>
            <Grid item xs={10} sm={11}>
              <Stack spacing={-1} sx={{alignItems:'flex-start'}}>
                <p className='custom-paragraph'>Name of Owner/Permitee</p>
                <OutlinedInput fullWidth className='custom-outlined-input' sx={{borderRadius: '11px'}}/>
             </Stack>
            </Grid>
            <Grid item xs={10} sm={11}>
              <Stack spacing={-1} sx={{alignItems:'flex-start'}}>
                 <p className='custom-paragraph'>Business Name</p>
                 <OutlinedInput fullWidth className='custom-outlined-input' sx={{borderRadius: '11px'}}/>
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
            <Grid item xs={10} sm={11}>
              <Stack spacing={-1} sx={{alignItems:'flex-start'}}>
                 <p className='custom-paragraph'>Date Received</p>
                 <OutlinedInput fullWidth className='custom-outlined-input' sx={{borderRadius: '11px'}} defaultValue={selectedDate} onChange={handleDateChange}/>
              </Stack>
            </Grid>
            <Grid item xs={10} sm={11}>
              <Stack spacing={-1} sx={{alignItems:'flex-start'}}>
                 <p className='custom-paragraph'>Received By</p>
                 <OutlinedInput fullWidth className='custom-outlined-input' sx={{borderRadius: '11px'}}/>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

    </>
  );
}


