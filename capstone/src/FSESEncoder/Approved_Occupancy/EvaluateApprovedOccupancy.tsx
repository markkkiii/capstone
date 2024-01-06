import React, { useState, useRef, useEffect, useCallback } from 'react';
import Button from '@mui/material/Button';
import '../BusinessList.css';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import { Card, CardContent, DialogTitle, Grid, OutlinedInput, SelectChangeEvent, Stack, TextField } from '@mui/material';
import axios from 'axios';
import RecommendationPopup from '../../FSESClerk/RecommendationPopup';
import { addOccupancyPermits, updateDisapprovedoccupancyPermit, updateoccupancyPermit } from '../../lib/controller';


const cardStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: 800,
  backgroundColor: 'lightgrey',
  paddingLeft: 20,
}; //Style Purposes



export interface formdetails {
  id: string;
  inspectionno: number;
  buildingpermino: string;
  applicantname: string;
  projecname: string;
  address: string;
  contactnumber: string;
  datereceived: string;
  open: boolean;
  disapproved: boolean;
  controlno: number;
  handleClose: () => void;
}

interface RecommendationData {
  recommendation: string;
}

export default function EvaluateApprovedOccupancy(props: formdetails) {

  const [selectedCons, setSelectedCons] = useState<boolean>(false)
  const [data, setData] = useState<RecommendationData[]>([]);
  const [arrayList, setArrayList] = useState<string[][]>([]);
  const [openAddRecommendation, setOpenAddRecommendation] = useState(false);
  const dateInspectionRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const inspectOrderRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const fsicRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const fsicDateRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const AmountRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const OrNoRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const dateRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const additionaldateRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const additionalOrnoRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const additionalpaymentRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const teamLeaderRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const [inputInspector, setInputInspector] = useState<string>(''); // State to store the input value as a single string
  const [inputInspectorArray, setinputInspectorArray] = useState<string[]>(["test", "test2"]); // State to store the input values as an array
  const [render, setRender] = useState<boolean>(true); // Triggers the UseEffect

  //opens add recommendation pop up
  const openDialog = () => {
    setOpenAddRecommendation(true);
  };

  useEffect(() => {
    // Convert data to an array of arrays
    setArrayList(data.map(item => [item.recommendation]));
  }, [data]);

  //closes add recommendation pop up
  const closeDialog = () => {
    setOpenAddRecommendation(false);
  };

  const addRecommendation = (recommendation: string) => {
    const newData: RecommendationData = { recommendation: recommendation };
    setData([...data, newData]);
    console.log(data)
  };


  const handleCons = (event: SelectChangeEvent<boolean>) => {
    setSelectedCons(event.target.value as boolean);
    console.log(selectedCons)
  };

  // Function to handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputInspector(event.target.value);
  };

  // Function to split the input value into an array of strings based on newline characters
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

  const updateRemarksDisapprovedOccupancy = async () => {
    let new_url = 'http://localhost:8080/occupancyDisapprovedClerk/putOccupancyDisapprovedClerk?id=';

    axios.put(new_url + props.id,
      {
        remarks: "Complied",
      }
    )
  }


  // uploads data to db
  const evaluateApprovedOccupancy = async () => {
    /*axios.post('http://localhost:8080/approved/insertApprovedPermit',
      {
        control_no: props.contactnumber,
        applicants_name: props.applicantname,
        bldgpermit_no: props.buildingpermino,
        location: props.address,
        project_name: props.projecname,
        date_received: props.datereceived,
        fsic_date: fsicDateRef.current?.value,
        contact_no: props.contactnumber,
        inspection_no: props.inspectionno,
        fsic_no: fsicRef.current?.value,
        amount: AmountRef.current?.value,
        or_no: OrNoRef.current?.value,
        payment_date: dateRef.current?.value,
        amount_additional: additionalpaymentRef.current?.value,
        or_no_additional:additionalOrnoRef.current?.value,
        payment_date_additional:additionalpaymentRef.current?.value,
        recommendations: inputInspectorArray,
        remarks: 'FSIC Not Printed'
      }
    ).then(res => {
      console.log(res.data);
      alert("Evaluation Successful!");
      if(props.disapproved){
        updateRemarksDisapprovedOccupancy();
      }
      else{
        deletefunc();
      }
      props.handleClose();
      
    }).catch(err => console.log(err))*/
   
    if(props.disapproved){
      addOccupancyPermits({
        controlno: props.controlno,
        contactno: props.contactnumber,
        bldgpermitno: props.buildingpermino,
        applicantname: props.applicantname,
        projectname: props.projecname,
        location: props.address,
        datereceived: props.datereceived,
        fsicno:  parseInt(fsicRef.current?.value || '0', 10),
        fsicdate: fsicDateRef.current?.value || '',
        amountpaid:  parseInt(AmountRef.current?.value || '0', 10),
        orno:  parseInt(OrNoRef.current?.value || '0', 10),
        additionalamount:  parseInt(additionalpaymentRef.current?.value || '0', 10),
        ornoadditional: additionalOrnoRef.current?.value || '',
        paymentdateadditional: additionaldateRef.current?.value || '',
        recommendation: inputInspectorArray,
        remarks: "I.O Printed",
        assessorname: '',
        dateinspection: '',
        fireinspector: [''],
        inspectionno: 0,
        opsdate: '',
        opsno: 0,
        paymentdate: '',
        receivedby: '',
        receiveddocu: '',
        teamleader: '',
        totalamount: 0,
      })
      updateDisapprovedoccupancyPermit(props.id,{
        remarks: "Complied"
      })
      props.handleClose();
    }
    else{
      updateoccupancyPermit(props.id,{
        fsicno: fsicRef.current?.value,
        fsicdate: fsicDateRef.current?.value,
        amount: AmountRef.current?.value,
        paymentdate:dateRef.current?.value,
        orno: OrNoRef.current?.value,
        additionalamount: additionalpaymentRef.current?.value,
        ornoadditional: additionalOrnoRef.current?.value,
        paymentdateadditional: additionaldateRef.current?.value,
        recommendation: inputInspector,
        remarks: "FSIC Not Printed"
      })
    }
    props.handleClose();
  }

  // Sets the values of the array and uploads data to db
  const addEvaluation = () => {
    handleRender();
    evaluateApprovedOccupancy();
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
        <DialogContent style={{
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <>
            <Card style={cardStyle}>
              <CardContent style={{ marginLeft: 35, textAlign: 'center' }} >
                <Grid container marginTop={'1rem'} style={{ height: '100%' }}>
                 
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'>Building Permit No.</p>
                      <TextField className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} defaultValue={props.buildingpermino} variant='standard' disabled />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'>Applicant's Name</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.applicantname} variant='standard' disabled />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Project Name</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.projecname} variant='standard' disabled />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Location</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.address} variant='standard' disabled />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'>Date Received</p>
                      <TextField className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} defaultValue={props.datereceived} variant='standard' disabled />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >FSIC Number</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} inputRef={fsicRef} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'  >FSIC Date</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} inputRef={fsicDateRef} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'center', paddingTop: '20px' }}>
                      <h2 className='custom-paragraph' style={{ paddingTop: '20px' }}>FSIC Payment</h2>
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'  >Amount</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} inputRef={AmountRef} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'  >O.R. No.</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} inputRef={OrNoRef} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'  >Date</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "670px" }} inputRef={dateRef} />
                    </Stack>
                  </Grid>

                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'center', paddingTop: '20px' }}>
                      <h2 className='custom-paragraph' style={{ paddingTop: '20px' }}>Additional Fees (If Any)</h2>
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'  >Date</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} inputRef={additionaldateRef} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'  >O.R. No.</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} inputRef={additionalOrnoRef} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'  >Amount</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} inputRef={additionalpaymentRef} />
                    </Stack>
                  </Grid>{/*
                  {/*<Grid item xs={10} sm={11}>
                    <table>
                      <thead style={{ textAlign: "center" }}>
                        <tr>
                          <th style={{ textAlign: "center" }}>Recommendations</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item, index) => (
                          <tr key={index}>
                            <td>{item.recommendation}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <RecommendationPopup open={openAddRecommendation} onClose={closeDialog} onAdd={addRecommendation} />
                    <Button variant='contained' sx={{ marginTop: '10px', backgroundColor: 'blue', borderRadius: '13px', height: '30px' }} onClick={openDialog}>
                      Add Recommendation
                    </Button>
                  </Grid>*/}
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ paddingTop: '20px' }} >Recommendations</p>
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
