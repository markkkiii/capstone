import React, { useState, useRef, useEffect, useCallback } from 'react';
import Button from '@mui/material/Button';
import '../BusinessList.css';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import { Card, CardContent, DialogTitle, Grid, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { updateBusinessPermit, updaterenewalBusinessPermit } from '../../lib/controller';


const cardStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: 800,
  backgroundColor: 'lightgrey',
}; //Style Purposes



export interface formdetails {
  form: string;
  permit: string;
  bpid: string;
  business_no: string;
  permitee: string;
  business_name: string;
  address: string;
  natureofbusiness: string;
  typeofoccupancy: string;
  contactno: string;
  email: string;
  date_received: string;
  date_inspection: string;
  inspection_no: number;
  fsic_no: number;
  fsic_date: string;
  amount: number;
  or_no: number;
  payment_date: string;
  remarks: string;
  team_leader: string;
  fire_inspectors?: string[];
  recommendation?: string[];
  open: boolean;
  handleClose: () => void;
}

export default function ViewEvaluate(props: formdetails) {

  const [selectedRemarks, setselectedRemarks] = useState(props?.remarks || '');//handles dropboxfield
  const business_noRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const permiteeRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const business_nameRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const addressRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const natureofbusinessRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const typeofoccupancyRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const contactnoRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const emailRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const date_receivedRef = useRef<HTMLInputElement | null>(null)
  const dateInspectionRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const inspectOrderRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const fsicRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const fsicDateRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const AmountRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const OrNoRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const dateRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const teamLeaderRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const [inputInspector, setInputInspector] = useState<string>(props.fire_inspectors?.join('\n') || ''); // State to store the input value as a single string
  const [inputInspectorArray, setinputInspectorArray] = useState<string[]>(["test", "test2"]); // State to store the input values as an array
  const [inputrecommendation, setinputrecommendation] = useState<string>(props.recommendation?.join('\n') || ' '); // State to store the input value as a single string
  const [inputrecommendationarray, setrecommendationarray] = useState<string[]>(["test", "test2"]); // State to store the input values as an array
  const [render, setRender] = useState<boolean>(true); // Triggers the UseEffect


  // Function to handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputInspector(event.target.value);
  };
  // Function to handle input changes
  const RecommendationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputrecommendation(event.target.value);
  };

  const handleRemarks = (event: SelectChangeEvent<string>) => {
    setselectedRemarks(event.target.value); // Update the state variable with the new selected value
  };

  // Function to split the input value into an array of strings based on newline characters
  const updateInputArray = useCallback(() => {
    const newArray = inputInspector.split('\n').filter((line) => line.trim() !== '');
    setinputInspectorArray(newArray);
  }, [inputInspector]);

  const updateRecommendArray = useCallback(() => {
    const newArray = inputrecommendation.split('\n').filter((line) => line.trim() !== '');
    setrecommendationarray(newArray);
  }, [inputrecommendation]);

  useEffect(() => {
    updateInputArray();
    updateRecommendArray();
  }, [render, updateInputArray, updateRecommendArray]);

  const handleRender = () => {
    setRender(prevRender => !prevRender);
  };

  const test = () => {
    console.log(props.remarks)
    console.log(props.fire_inspectors)
  };

  // uploads data to db
  const updatePermit = async () => {

    /*let NEW_URL = '';
    if (props.permit === 'New') {
      NEW_URL = 'http://localhost:8080/newbpapplication/putEvalauteApprovedApplication?id='
      console.log(props.bpid)
    }
    else if (props.permit === 'Renewal') {
      NEW_URL = 'http://localhost:8080/renewalbpapprovedapplication/putEvalauteApprovedApplication?id='
    }
    axios.put(NEW_URL+props.bpid,
      {
        bspermit_no: business_noRef.current?.value,
        permittee:permiteeRef.current?.value,
        business_name: business_nameRef.current?.value,
        address: addressRef.current?.value,
        nature_business: natureofbusinessRef.current?.value,
        type_occupancy: typeofoccupancyRef.current?.value,
        contact_no: contactnoRef.current?.value,
        email: emailRef.current?.value,
        date_received: date_receivedRef.current?.value,
        date_inspection: dateInspectionRef.current?.value,
        inspection_no: inspectOrderRef.current?.value,
        fsic_no: fsicRef.current?.value,
        fsic_date: fsicDateRef.current?.value,
        amount: AmountRef.current?.value,
        or_no: OrNoRef.current?.value,
        date: dateRef.current?.value,
        remarks: selectedRemarks,
        team_leader: teamLeaderRef.current?.value,
        fire_inspectors: inputInspectorArray,
        recommendation: inputrecommendationarray
      }
    ).then(res => {
      console.log(res.data);
      alert("Evaluation Successful!");
      props.handleClose()
    }).catch(err => 
      console.log(err)
      )*/
    if (props.permit === "New") {
      updateBusinessPermit(props.bpid, {
        bspermit_no: (business_noRef.current?.value || ''),
        address: (addressRef.current?.value || ''),
        permittee: (permiteeRef.current?.value || ''),
        business_name: (business_nameRef.current?.value || ''),
        nature_business: (natureofbusinessRef.current?.value || ''),
        type_occupancy: (typeofoccupancyRef.current?.value || ''),   
        contact_no: (contactnoRef.current?.value || ''),
        email: (emailRef.current?.value || ''),
        date_received: (date_receivedRef.current?.value || ''),
        dateinspection: (dateInspectionRef.current?.value || ''),
        inspection_no: (inspectOrderRef.current?.value || ''),
        fsicno: (fsicRef.current?.value || ''),
        fsicdate: (fsicDateRef.current?.value || ''),
        amount: (AmountRef.current?.value || 0),
        orno: (OrNoRef.current?.value || ''),
        date: (dateRef.current?.value || ''),
        teamleader: (teamLeaderRef.current?.value || ''),
        fireinspectors: [inputInspector],
        recommendation: [inputrecommendation],
        remarks: "FSIC Not Printed"
      })
      props.handleClose();
    }
    else if (props.permit === "Renewal") {
      updaterenewalBusinessPermit(props.bpid, {
        bspermit_no: (business_noRef.current?.value || ''),
        address: (addressRef.current?.value || ''),
        permittee: (permiteeRef.current?.value || ''),
        business_name: (business_nameRef.current?.value || ''),
        nature_business: (natureofbusinessRef.current?.value || ''),
        type_occupancy: (typeofoccupancyRef.current?.value || ''),   
        contact_no: (contactnoRef.current?.value || ''),
        email: (emailRef.current?.value || ''),
        date_received: (date_receivedRef.current?.value || ''),
        dateinspection: (dateInspectionRef.current?.value || ''),
        inspection_no: (inspectOrderRef.current?.value || ''),
        fsicno: (fsicRef.current?.value || ''),
        fsicdate: (fsicDateRef.current?.value || ''),
        amount: (AmountRef.current?.value || 0),
        orno: (OrNoRef.current?.value || ''),
        date: (dateRef.current?.value || ''),
        teamleader: (teamLeaderRef.current?.value || ''),
        fireinspectors: [inputInspector],
        recommendation: [inputrecommendation],
        remarks: "FSIC Not Printed"
      })
      props.handleClose();
    }
  }


  // Sets the values of the array and uploads data to db
  const addEvaulation = () => {
    handleRender();
    if (props.form !== 'Update') {
      props.handleClose()
    }
    else {
      updatePermit();
    }


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
        <DialogContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '1500px' }} >
          <>
            <Card style={cardStyle} elevation={0}>
              <CardContent style={{ marginLeft: 35, textAlign: 'center' }} >
                <Grid container marginTop={'1rem'} style={{ height: '100%' }}>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ marginLeft: '-15px' }}>Business Permit Number</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} inputRef={business_noRef} defaultValue={props.business_no} variant='standard' disabled={props.form !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ marginLeft: '-15px' }}>Name of Owner/Permitee</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} inputRef={permiteeRef} defaultValue={props.permitee} variant='standard' disabled={props.form !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ marginLeft: '-15px' }}>Business Name</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} inputRef={business_nameRef} defaultValue={props.business_name} variant='standard' disabled={props.form !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ marginLeft: '-15px' }}>Address</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} inputRef={addressRef} defaultValue={props.address} variant='standard' disabled={props.form !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ marginLeft: '-15px' }}>Nature of Business</p>
                      <TextField className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} inputRef={natureofbusinessRef} defaultValue={props.natureofbusiness} variant='standard' disabled={props.form !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={5}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ marginLeft: '-15px' }}>Type of Occupancy</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} inputRef={typeofoccupancyRef} defaultValue={props.typeofoccupancy} variant='standard' disabled={props.form !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ marginLeft: '-15px' }}>Contact Number</p>
                      <TextField className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} inputRef={contactnoRef} defaultValue={props.contactno} variant='standard' disabled={props.form !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ marginLeft: '-15px' }}>Email</p>
                      <TextField className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} inputRef={emailRef} defaultValue={props.email} variant='standard' disabled={props.form !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ paddingTop: '20px', marginLeft: '-15px' }}>Date Received</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} inputRef={date_receivedRef} defaultValue={props.date_received } variant='standard' disabled={props.form !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ paddingTop: '20px', marginLeft: '-15px' }} >Date of Inspection</p>
                      <TextField className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} defaultValue={props.date_inspection} inputRef={dateInspectionRef} variant='standard' disabled={props.form !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ paddingTop: '20px', marginLeft: '-15px' }}>Inspection Order Number</p>
                      <TextField className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} defaultValue={props.inspection_no} inputRef={inspectOrderRef} variant='standard' disabled={props.form !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ marginLeft: '-15px' }}>FSIC Number</p>
                      <TextField className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} defaultValue={props.fsic_no} inputRef={fsicRef} variant='standard' disabled={props.form !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ marginLeft: '-15px' }}>FSIC Date</p>
                      <TextField className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} defaultValue={props.fsic_date} inputRef={fsicDateRef} variant='standard' disabled={props.form !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'center', paddingTop: '20px' }} >
                      <h2 className='custom-paragraph' >FSIC Payment</h2>
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ marginLeft: '-15px' }}>Amount</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.amount} inputRef={AmountRef} disabled={props.form !== 'Update'} variant='standard' />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }} >
                      <p className='custom-paragraph' style={{ marginLeft: '-15px' }}>O.R Number</p>
                      <TextField className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} defaultValue={props.or_no} inputRef={OrNoRef} disabled={props.form !== 'Update'} variant='standard' />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ marginLeft: '-15px' }}>Date</p>
                      <TextField className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} defaultValue={props.payment_date} inputRef={dateRef} disabled={props.form !== 'Update'} variant='standard' />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'center', paddingTop: '20px' }}>
                      <h2 className='custom-paragraph' style={{ paddingTop: '20px' }}>Fire Safety Inspectors</h2>
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={3} direction={'row'} sx={{ alignItems: 'flex-start' }}>
                      <h3 className='custom-paragraph' style={{ marginTop: 0 }}>Team Leader</h3>
                      <TextField className='custom-outlined-input' sx={{ borderRadius: '11px', width: "500px" }} inputRef={teamLeaderRef} disabled={props.form !== 'Update'} variant='standard' defaultValue={props.team_leader} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >FSI</p>
                      <OutlinedInput fullWidth className='custom-outlined-input-multiline'
                        sx={{
                          borderRadius: '11px',
                          height: '100px',
                          paddingTop: '0',
                          '& textarea': {
                            paddingTop: '20px', // Adjust the value as needed
                          },
                        }//
                        }
                        value={inputInspector}
                        onChange={handleInputChange}
                        disabled={props.form !== 'Update'}
                        multiline
                        placeholder={`F03 John Doe\nType in the name then press enter to move next line`}
                        rows={2}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ paddingTop: '10px' }}>Recommendations</p>
                      <OutlinedInput fullWidth className='custom-outlined-input-multiline'
                        sx={{
                          borderRadius: '11px',
                          height: '100px',
                          paddingTop: '0',
                          '& textarea': {
                            paddingTop: '20px', // Adjust the value as needed
                          },
                        }//
                        }
                        multiline
                        value={inputrecommendation}
                        disabled={props.form !== 'Update'}
                        onChange={RecommendationChange}
                        placeholder={`Test Recommendation\nType in the recommendation then press enter to move next line`}
                        rows={2}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'>Remarks</p>
                      <Select
                        sx={{ height: '30px', width: '200px', borderRadius: '14px', borderWidth: '20px' }}
                        disabled={props.form !== 'Update'}
                        value={selectedRemarks}
                        onChange={handleRemarks}
                      >
                        <MenuItem value="FSIC Printed">FSIC Printed</MenuItem>
                        <MenuItem value="FSIC Not Printed">FSIC Not Printed</MenuItem>
                      </Select>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <Button variant='contained' sx={{ backgroundColor: 'grey', borderRadius: '13px', height: '30px' }} onClick={addEvaulation}>
            {props.form === 'Update' ? 'Update Permit' : 'Close Permit'}
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};
