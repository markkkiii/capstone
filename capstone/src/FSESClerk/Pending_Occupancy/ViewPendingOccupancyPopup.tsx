import React, { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import '../ClerkCSS.css';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import { Card, CardContent, DialogTitle, Grid, SelectChangeEvent, Stack, TextField } from '@mui/material';


const cardStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: 800,
  backgroundColor: 'lightgrey',
}; //Style Purposes



export interface formdetails {
  /*no: number;
  businessPermitNo: string;
  nameofpermitee: string;
  businessname: string;
  address: string;
  natureofbusines:string;
  typeofoccupancy: string;
  contactno: string;
  email:string;
  datereceived: string;*/
  open: boolean;
  handleClose: () => void;
}


export interface formdetails {
  open: boolean;
  handleClose: () => void;
}


export default function ViewPendingOccupancyList(props: formdetails) {


  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCons, setSelectedCons] = useState<boolean>(false)
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

//   const buildingpermRef = useRef<HTMLInputElement | null>(null);
//   const permiteeRef = useRef<HTMLInputElement | null>(null);
//   const businessnameRef = useRef<HTMLInputElement | null>(null);
//   const addressRef = useRef<HTMLInputElement | null>(null);
//   const typeofoccupancyRef = useRef<HTMLInputElement | null>(null);
//   const contactnoRef = useRef<HTMLInputElement | null>(null);
//   const dateReceivedRef = useRef<HTMLInputElement | null>(null);
//   const receivedbyRef = useRef<HTMLInputElement | null>(null);
//   const EvaluatorRef = useRef<HTMLInputElement | null>(null);
//   const NumberStoreyRef = useRef<HTMLInputElement | null>(null);
//   const DefectsRef = useRef<HTMLInputElement | null>(null);


  const handleCons = (event: SelectChangeEvent<boolean>) => {
    setSelectedCons(event.target.value as boolean);
    console.log(selectedCons)
  };


  /*const updatePermit = async () => {
    axios.put('http://localhost:8080/BFP/updatePermit?id=' + props.no,
      {
        buildingpermitno: buildingpermRef.current?.value,
        namepermitee: permiteeRef.current?.value,
        businessname: businessnameRef.current?.value,
        address: addressRef.current?.value,
        typeofoccupancy: typeofoccupancyRef.current?.value,
        contactno: contactnoRef.current?.value,
        datereceived: dateReceivedRef.current?.value,
        receivedby: receivedbyRef.current?.value,
        evaluator: EvaluatorRef.current?.value,
        nostorey: NumberStoreyRef.current?.value,
        structureconstructed: selectedCons,
        remarks: "Not Printed",
        defects: DefectsRef.current?.value
      }
    ).then(res => {
      console.log(res.data);
      alert("Evaluation Successful!");
      props.handleClose()
    }).catch(err => console.log(err))
  }*/
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
        <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
          <>
                    <Card style={cardStyle} elevation={0}>
                        <CardContent style={{ marginLeft: 35, textAlign: 'center' }} >
                            <Grid container marginTop={'5rem'} style={{ height: '100%' }}>
                                <Grid item xs={10} sm={11}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Building Permit Number</p>
                                        <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} variant='standard' disabled />
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={11}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Name of Owner/Permitee</p>
                                        <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }}variant='standard' disabled />
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={11}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Business Name</p>
                                        <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} variant='standard' disabled/>
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={11}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Address</p>
                                        <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} variant='standard' disabled/>
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Nature of Business</p>
                                        <TextField  className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} variant='standard' disabled/>
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={5}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Type of Occupancy</p>
                                        <TextField  fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} variant='standard' disabled/>
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Contact Number</p>
                                        <TextField className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }}variant='standard' disabled/>
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Email</p>
                                        <TextField  className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} variant='standard' disabled/>
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Date Received</p>
                                        <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} variant='standard' disabled/>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    </>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
          <Button variant='contained' sx={{ backgroundColor: 'Red', borderRadius: '15px', height: '35px' }} onClick={props.handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};
