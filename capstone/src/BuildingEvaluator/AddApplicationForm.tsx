import React, { useState } from 'react';
import './Form.css'
import axios from 'axios';
import { Card, CardContent, DialogActions, DialogContent, Grid, OutlinedInput, Stack} from '@mui/material';


const cardStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: 800,
  backgroundColor: 'lightgrey'
}; //Style Purposes

//DATA VARIABLES required to add to database
export interface formdetails{
  no: number;
  buildingPermitNo: string;
  applicantName: string;
  projectName: string;
  address:string;
  typeofoccupancy:string;
  contactno:string;
  datereceived:string;
  receivedby:string;
  open: boolean;
  handleClose: () => void;
}

export default function AddApplication(props: formdetails){

  const NEW_URL = 'http://localhost:8080/BFP/insertPermit';

  const AddForm = async (buildingPermitNo:any, namePermitee:string, businessName:string, address:string, typeofOccupancy:string, contactNo:string, dateReceived:Date, receivedBy:string) => {

    axios
        .post(NEW_URL,{
          buildingPermitNo,
          namePermitee,
          businessName,
          address,
          typeofOccupancy,
          contactNo,
          dateReceived,
          receivedBy,
        })
        .then(res => {

          if(res.data){

            console.log("Successfully Added!"+JSON.stringify(res.data));

          }

        })
        .catch(err =>{
            console.log(err)
        })
    }

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
                  <OutlinedInput fullWidth className='custom-outlined-input' sx={{borderRadius: '11px'}} defaultValue={props.buildingPermitNo}/>
             </Stack>
            </Grid>
            <Grid item xs={10} sm={11}>
              <Stack spacing={-1} sx={{alignItems:'flex-start'}}>
                <p className='custom-paragraph'>Name of Owner/Permitee</p>
                <OutlinedInput fullWidth className='custom-outlined-input' sx={{borderRadius: '11px'}} defaultValue={props.applicantName}/>
             </Stack>
            </Grid>
            <Grid item xs={10} sm={11}>
              <Stack spacing={-1} sx={{alignItems:'flex-start'}}>
                 <p className='custom-paragraph'>Business Name</p>
                 <OutlinedInput fullWidth className='custom-outlined-input' sx={{borderRadius: '11px'}} defaultValue={props.projectName}/>
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
            <Grid item xs={10} sm={5}>
              <Stack spacing={-1} sx={{alignItems:'flex-start'}}>
                 <p className='custom-paragraph'>Date Received</p>
                 <OutlinedInput fullWidth className='custom-outlined-input' sx={{borderRadius: '11px'}} defaultValue={selectedDate} onChange={handleDateChange}/>
              </Stack>
            </Grid>
            <Grid item xs={10} sm={6}>
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
};


