import React, { useState } from 'react';
import './AddApplicationForm.css'

import { Button, Card, CardContent, Grid, OutlinedInput, Stack, TextField, Typography } from '@mui/material';
import { cp } from 'fs';
const cardStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: 750,
  
};

export interface formdetails{
  no?: number;
  buildingPermitNo?: string;
  applicantName?: string;
  projectName?: string;

}


export default function AddApplication(props: formdetails){


  return (
    <>
   
      <Card style= {cardStyle}>
        <CardContent style={{ marginLeft: 35, textAlign:'center' }} >
            <Stack spacing={-2} sx={{alignItems:'flex-start'}}>
                <p className='custom-paragraph'>Contact No</p>
                <OutlinedInput/>
            </Stack>
            <Stack spacing={-2} sx={{alignItems:'flex-start'}}>
                <p className='custom-paragraph'>Contact No</p>
                <OutlinedInput/>
            </Stack>
            <Stack spacing={-2} sx={{alignItems:'flex-start'}}>
                <p className='custom-paragraph'>Contact No</p>
                <OutlinedInput/>
            </Stack>
        </CardContent>
      </Card>

    </>
  );
}


