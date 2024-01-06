import React, { useState, useRef, useCallback, useEffect } from 'react';
import Button from '@mui/material/Button';
import '../ClerkCSS.css';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import { Card, CardContent, DialogTitle, Grid, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { addDisapprovedOccupancyPermits, deleteOccupancyPayment, deleteOccupancyPermit } from '../../lib/controller';


const cardStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: 800,
  backgroundColor: 'lightgrey',
}; //Style Purposes



export interface formdetails {
  id: string;
  inspectionno: number;
  controlno: number;
  buildingpermino: string;
  applicantname: string;
  projecname: string;
  address: string;
  contactnumber: string;
  datereceived: string;
  open: boolean;
  handleClose: () => void;
}


export interface formdetails {
  open: boolean;
  handleClose: () => void;
}


export default function EvaluateDisapprovedOccupancy(props: formdetails) {


  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCons, setSelectedCons] = useState<boolean>(false)
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const NodRef = useRef<HTMLInputElement | null>(null);
  const NodDateRef = useRef<HTMLInputElement | null>(null);
  const ReceivedNameRef = useRef<HTMLInputElement | null>(null);
  const ReceivedDateRef = useRef<HTMLInputElement | null>(null);
  const [inputInspector, setInputInspector] = useState<string>(''); // State to store the input value as a single string
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

  const deletefunc = () => {
    //function here

    let NEW_URL = 'http://localhost:8080/occupancyPendingclerk/deletePermit/'
    axios.delete(NEW_URL + props.id).then(res => {
      console.log(res.data);
    }).catch(err => console.log(err))
  }



  const addEvaluation = async () => {
    /*axios.post('http://localhost:8080/occupancyDisapprovedClerk/insertNODPermit',
      {
        control_no: props.controlno,
        applicants_name: props.applicantname,
        bldgpermit_no: props.buildingpermino,
        location: props.address,
        project_name: props.projecname,
        date_received: props.datereceived,
        nod_date: NodDateRef.current?.value,
        inspection_no: props.inspectionno,
        nod_no:NodRef.current?.value,
        defects: inputInspectorArray,
        name: ReceivedNameRef.current?.value,
        date: ReceivedDateRef.current?.value,
        remarks: 'Disapproved'
      }
    ).then(res => {
      console.log(res.data);
      alert("Evaluation Successful!");
      props.handleClose()
      deletefunc()
    }).catch(err => console.log(err))*/

    addDisapprovedOccupancyPermits({
      controlno: props.controlno,
      bldgpermitno: props.buildingpermino,
      applicantname: props.applicantname,
      projectname: props.projecname,
      location: props.address,
      contactno: props.contactnumber,
      datereceived: props.datereceived,
      nodno: parseInt(NodRef.current?.value || '0', 10),
      noddate: NodDateRef.current?.value || '',
      deficiencies: inputInspectorArray,
      receivednod: ReceivedNameRef.current?.value || '',
      receivednoddate: ReceivedDateRef.current?.value || '',
      remarks: "Disapproved",
    })
    deleteOccupancyPermit(props.id);
    props.handleClose();


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
        <DialogContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '1150px' }} >
          <>
            <Card style={cardStyle} elevation={0}>
              <CardContent style={{ marginLeft: 35, textAlign: 'center' }} >
                <Grid container marginTop={'1rem'} style={{ height: '100%' }}>
                  <Grid item xs={10} sm={8}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'>Inspection Order Number</p>
                      <TextField className='custom-outlined-input' defaultValue={props.inspectionno} sx={{ borderRadius: '11px', paddingBottom: '20px', paddingLeft: '10px', width: '300px' }} disabled variant="standard" />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'>Control Number</p>
                      <TextField className='custom-outlined-input' defaultValue={props.controlno} sx={{ borderRadius: '11px', paddingBottom: '20px', paddingLeft: '10px', width: '300px' }} disabled variant="standard" />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={5}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'>Building Permit Number</p>
                      <TextField className='custom-outlined-input' defaultValue={props.buildingpermino} sx={{ borderRadius: '11px', paddingBottom: '20px', paddingLeft: '10px', width: '300px' }} disabled variant="standard" />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'>Applicant Name</p>
                      <TextField className='custom-outlined-input' defaultValue={props.applicantname} fullWidth sx={{ borderRadius: '11px', paddingBottom: '20px', paddingLeft: '10px' }} disabled variant="standard" />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'>Project Name</p>
                      <TextField className='custom-outlined-input' fullWidth defaultValue={props.projecname} sx={{ borderRadius: '11px', paddingBottom: '20px', paddingLeft: '10px' }} disabled variant="standard" />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'>Address</p>
                      <TextField className='custom-outlined-input' fullWidth defaultValue={props.address} sx={{ borderRadius: '11px', paddingBottom: '20px', paddingLeft: '10px' }} disabled variant="standard" />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'>Contact Number</p>
                      <TextField className='custom-outlined-input' fullWidth defaultValue={props.contactnumber} sx={{ borderRadius: '11px', paddingBottom: '20px', paddingLeft: '10px' }} disabled variant="standard" />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ paddingTop: '20px' }} >Date Received</p>
                      <TextField className='custom-outlined-input' defaultValue={props.datereceived} fullWidth sx={{ borderRadius: '11px', paddingBottom: '20px', paddingLeft: '10px' }} disabled variant="standard" />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'>NOD Date</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} inputRef={NodDateRef} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'>NOD Number</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} inputRef={NodRef} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ paddingTop: '20px' }} >Deficiencies</p>
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
                        rows={2}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'center', paddingTop: '20px' }}>
                      <h2 className='custom-paragraph'>Received Notice of Disapproval</h2>
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'>Name</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} inputRef={ReceivedNameRef} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'>Date</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} inputRef={ReceivedDateRef} />
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <Button variant='contained' sx={{ backgroundColor: 'grey', borderRadius: '13px', height: '30px' }} onClick={addEvaluation}>
            Add Evaluation
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};
