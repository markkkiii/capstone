import React, { useState } from 'react';
import './App.css';

import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
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


export default function ViewPending(props: formdetails){


  return (
    <>
   
      <Card style= {cardStyle}>
        <CardContent style={{ marginLeft: 35, textAlign:'center' }} >
          <Grid container spacing={1}>
            <Grid item xs={10} sm={11}>
              <TextField label="Building Permit Number" variant='outlined' fullWidth disabled defaultValue={props.buildingPermitNo}/>
            </Grid>
            <Grid item xs={10} sm={11}>
              <TextField label="Name of Owner/Permitee" variant='outlined' fullWidth disabled defaultValue={props.applicantName} />
            </Grid>
            <Grid item xs={10} sm={11}>
              <TextField label="Business Name" variant='outlined' fullWidth disabled defaultValue={props.projectName}/>
            </Grid>
            <Grid item xs={10} sm={11}>
              <TextField label="Address" variant='outlined' fullWidth disabled/>
            </Grid>
            <Grid item xs={10} sm={6}>
              <TextField label="Type of Occupancy" variant='outlined' fullWidth disabled/>
            </Grid>
            <Grid item xs={10} sm={5}>
              <TextField label="Contact Number" variant='outlined' fullWidth disabled/>
            </Grid>
            <Grid item xs={10} sm={11}>
              <TextField label="Date Received" variant='outlined' fullWidth disabled/>
            </Grid>
            <Grid item xs={10} sm={11}>
              <TextField label="Received By" variant='outlined' fullWidth disabled/>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

    </>
  );
}


