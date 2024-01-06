import React, { useState, useRef, useCallback, useEffect } from 'react';
import Button from '@mui/material/Button';
import '../ClerkCSS.css';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import { Card, CardContent, DialogTitle, Grid, OutlinedInput, SelectChangeEvent, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { updateoccupancyPermit } from '../../lib/controller';


const cardStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: 800,
  backgroundColor: 'lightgrey',
}; //Style Purposes

export interface formdetails {
  activity: string,
  id: string,
  buildingno: string;
  applicantname: string;
  projectname: string;
  location: string;
  contact_no: string;
  date_received: string;
  team_leader: string;
  fire_inspectors: string[];
  inspection_no: number;
  date_inspection: string;
  received_name: string;
  receivedoccu_date: string;
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


  const applicantionnoRef = useRef<HTMLInputElement | null>(null);
  const applicantnameRef = useRef<HTMLInputElement | null>(null);
  const buildingnoRef = useRef<HTMLInputElement | null>(null);
  const projectnameRef = useRef<HTMLInputElement | null>(null);
  const dateReceivedRef = useRef<HTMLInputElement | null>(null);
  const locationRef = useRef<HTMLInputElement | null>(null);
  const contactnoRef = useRef<HTMLInputElement | null>(null);
  const inspectionRef = useRef<HTMLInputElement | null>(null);
  const dateReceivedbyRef = useRef<HTMLInputElement | null>(null);
  const inspectionNoRef = useRef<HTMLInputElement | null>(null);
  const ReceivedbyRef = useRef<HTMLInputElement | null>(null);
  const teamleaderRef = useRef<HTMLInputElement | null>(null);
  const [inputInspector, setInputInspector] = useState<string>(props.fire_inspectors?.join('\n') || ''); // State to store the input value as a single string
  const [inputInspectorArray, setinputInspectorArray] = useState<string[]>(["test", "test2"]); // State to store the input values as an array
  const [render, setRender] = useState<boolean>(true); // Triggers the UseEffect

  const handleCons = (event: SelectChangeEvent<boolean>) => {
    setSelectedCons(event.target.value as boolean);
    console.log(selectedCons)
  };

  // Function to handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputInspector(event.target.value);
  };

  const updateInputArray = useCallback(() => {
    const newArray = inputInspector.split('\n').filter((line) => line.trim() !== '');
    setinputInspectorArray(newArray);
  }, [inputInspector]);

  useEffect(() => {
    updateInputArray();
  }, [render, updateInputArray]);

  const handleRender = () => {
    setRender(prevRender => !prevRender);
  };

  const updatePermit = async () => {
    /*axios.put('http://localhost:8080/occupancyPendingclerk/updateOccupancyPendingClerk?id=' + props.id,
      {
        control_no: applicantionnoRef.current?.value,
        bldgpermit_no: buildingnoRef.current?.value,
        applicants_name: applicantnameRef.current?.value,
        project_name: projectnameRef.current?.value,
        location: locationRef.current?.value,
        contact_no: contactnoRef.current?.value,
        date_received: dateReceivedRef.current?.value,
        team_leader: teamleaderRef.current?.value,
        fire_inspectors: inputInspectorArray,
        inspection_no: inspectionNoRef.current?.value,
        date_inspection: inspectionRef.current?.value,
        received_name: ReceivedbyRef.current?.value,
        receivedoccu_date: dateReceivedbyRef.current?.value,
        remarks: "Pending"
      }
    ).then(res => {
      console.log(res.data);
      alert("Update Successful!");
      props.handleClose()
    }).catch(err => console.log(err))*/
    updateoccupancyPermit(props.id,{
      bldgpermitno: (buildingnoRef.current?.value || ''),
      applicantname:( applicantnameRef.current?.value || ''),
      projectname: (projectnameRef.current?.value || ''),
      location: (locationRef.current?.value || ''),
      contactno: (contactnoRef.current?.value || ''),
      datereceived: (dateReceivedRef.current?.value|| ''),
      teamleader: (teamleaderRef.current?.value || ''),
      inspectionno: (inspectionNoRef.current?.value || ''),
      dateinspection: (inspectionRef.current?.value || ''),
      receivedby: (ReceivedbyRef.current?.value || ''),
      receiveddocu: (dateReceivedRef.current?.value || ''),
    });
    props.handleClose();
  }

  const addEvaluation = () => {
    if (props.activity !=='Update'){
      props.handleClose();
    }
    else{
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
        <DialogContent
        >
          <>
            <Card style={cardStyle} elevation={0}>
              <CardContent style={{ marginLeft: 35, textAlign: 'center' }} >
                <Grid container  style={{ height: '100%' }}>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Building Permit No.</p>
                      <OutlinedInput inputRef={buildingnoRef} defaultValue={props.buildingno} className='custom-outlined-input' sx={{ borderRadius: '11px', width: "306px" }} disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Applicant Name</p>
                      <OutlinedInput inputRef={applicantnameRef} defaultValue={props.applicantname} fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Project Name</p>
                      <OutlinedInput inputRef={projectnameRef} fullWidth defaultValue={props.projectname} className='custom-outlined-input' sx={{ borderRadius: '11px' }} disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Location</p>
                      <OutlinedInput inputRef={locationRef} fullWidth defaultValue={props.location} className='custom-outlined-input' sx={{ borderRadius: '11px' }} disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Contact No.</p>
                      <OutlinedInput inputRef={contactnoRef} defaultValue={props.contact_no} className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} disabled={props.activity !== 'Update'} />
                    </Stack>  
                  </Grid>
                  <Grid item xs={10} sm={5}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Date Received</p>
                      <OutlinedInput inputRef={dateReceivedRef} defaultValue={props.date_received} fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={3} direction={'row'} sx={{ alignItems: 'flex-start' }}>
                      <h3 className='custom-paragraph' style={{ marginTop: 25 }}>Team Leader</h3>
                      <OutlinedInput className='custom-outlined-input' defaultValue={props.team_leader} inputRef={teamleaderRef} sx={{ borderRadius: '11px', width: "549px" }} style={{ marginTop: 25 }} disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >FIRE INSPECTORS</p>
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
                        multiline
                        disabled={props.activity !== 'Update'}
                        placeholder={`F03 John Doe\nType in the name then press enter to move next line`}
                        rows={2}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Inspection Order No.</p>
                      <OutlinedInput inputRef={inspectionNoRef} defaultValue={props.inspection_no} className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={5}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Inspection Date</p>
                      <OutlinedInput inputRef={inspectionRef} defaultValue={props.date_inspection} fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Receiver Name</p>
                      <OutlinedInput inputRef={ReceivedbyRef} defaultValue={props.received_name} className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={5}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Received Date</p>
                      <OutlinedInput inputRef={dateReceivedbyRef} defaultValue={props.receivedoccu_date} fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>

          <Button variant='contained' sx={{ backgroundColor: 'grey', borderRadius: '13px', height: '30px' }} onClick={addEvaluation}>
            {props.activity !== 'Update' ? 'Close Form' : 'Update Form'}
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};
