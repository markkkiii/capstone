import '../App.css';
import {Card, CardContent, Grid, OutlinedInput, Stack } from '@mui/material';
const cardStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: 800,
  backgroundColor: 'lightgrey'
};

export interface formdetails{
  no?: string;
  buildingPermitNo: string;
  applicantName: string;
  projectName: string;
  address:string;
  typeofoccupancy:string;
  contactno:string;
  datereceived:string;
  receivedby:string;
}


export default function ViewPending(props: formdetails){


  return (
    <>
    <Card style= {cardStyle}>
      <CardContent style={{ marginLeft: 35, textAlign:'center' }} >
        <Grid container >
          <Grid item xs={10} sm={11}>
            <Stack spacing={-1} sx={{alignItems:'flex-start'}}>
              <p className='custom-paragraph'>Building Permit Number</p>
                <OutlinedInput fullWidth className='custom-outlined-input' sx={{borderRadius: '11px'}} defaultValue={props.buildingPermitNo} readOnly/>
           </Stack>
          </Grid>
          <Grid item xs={10} sm={11}>
            <Stack spacing={-1} sx={{alignItems:'flex-start'}}>
              <p className='custom-paragraph'>Name of Owner/Permitee</p>
              <OutlinedInput fullWidth className='custom-outlined-input' sx={{borderRadius: '11px'}}defaultValue={props.applicantName} readOnly/>
           </Stack>
          </Grid>
          <Grid item xs={10} sm={11}>
            <Stack spacing={-1} sx={{alignItems:'flex-start'}}>
               <p className='custom-paragraph'>Business Name</p>
               <OutlinedInput fullWidth className='custom-outlined-input' sx={{borderRadius: '11px'}}defaultValue={props.projectName} readOnly/>
            </Stack>
          </Grid>
          <Grid item xs={10} sm={11}>
            <Stack spacing={-1} sx={{alignItems:'flex-start'}}>
               <p className='custom-paragraph'>Address</p>
               <OutlinedInput fullWidth className='custom-outlined-input' sx={{borderRadius: '11px'}}defaultValue={props.address} readOnly/>
            </Stack>
          </Grid>
          <Grid item xs={10} sm={6}>
            <Stack spacing={-1} sx={{alignItems:'flex-start'}}>
               <p className='custom-paragraph'>Type of Occupancy</p>
               <OutlinedInput fullWidth className='custom-outlined-input' sx={{borderRadius: '11px'}}defaultValue={props.typeofoccupancy} readOnly/>
            </Stack>
          </Grid>
          <Grid item xs={10} sm={5}>
            <Stack spacing={-1} sx={{alignItems:'flex-start'}}>
               <p className='custom-paragraph'>Contact Number</p>
               <OutlinedInput fullWidth className='custom-outlined-input' sx={{borderRadius: '11px'}}defaultValue={props.contactno} readOnly/>
            </Stack>
          </Grid>
          <Grid item xs={10} sm={5}>
            <Stack spacing={-1} sx={{alignItems:'flex-start'}}>
               <p className='custom-paragraph'>Date Received</p>
               <OutlinedInput fullWidth className='custom-outlined-input' sx={{borderRadius: '11px'}}defaultValue={props.datereceived ? new Date(props.datereceived).toISOString().split('T')[0] : ''}readOnly/>
            </Stack>
          </Grid>
          <Grid item xs={10} sm={6}>
            <Stack spacing={-1} sx={{alignItems:'flex-start'}}>
               <p className='custom-paragraph'>Received By</p>
               <OutlinedInput fullWidth className='custom-outlined-input' sx={{borderRadius: '11px'}}defaultValue={props.receivedby} readOnly/>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>

  </>
  );
}


