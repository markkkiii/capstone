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
import { updateoccupancyPermit } from '../../lib/controller';


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
  fsic_date: string;
  fsic_no: number;
  amount: number;
  or_no: number;
  payment_date: string;
  additional_amount:number;
  additional_or_no:string;
  addtional_paymentdate:string;
  recommendations: string[];
  open: boolean;
  activity: string;
  remarks:string;
  handleClose: () => void;
}

interface RecommendationData {
  recommendation: string;
}

export default function ViewUpdateApprovedOccupancy(props: formdetails) {

  const [selectedCons, setSelectedCons] = useState<boolean>(false)
  const [data, setData] = useState<RecommendationData[]>([]);
  const [arrayList, setArrayList] = useState<string[][]>([]);
  const [openAddRecommendation, setOpenAddRecommendation] = useState(false);
  const dateInspectionRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const inspectOrderRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const controlnoRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const buildingpermnoRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const applicantnameRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const projectRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const addressRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const contactRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const dateReceivedRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const fsicRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const fsicDateRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const AmountRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const OrNoRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const dateRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const additionaldateRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const additionalOrnoRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const additionalpaymentRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const teamLeaderRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const [inputRecommendation, setinputRecommendation] = useState<string>(props.recommendations?.join('\n') || ''); // State to store the input value as a single string
  const [inputRecommendationArray, setinputRecommendationArray] = useState<string[]>(["test", "test2"]); // State to store the input values as an array
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
    setinputRecommendation(event.target.value);
  };

  // Function to split the input value into an array of strings based on newline characters
  const updateInputArray = useCallback(() => {
    const newArray = inputRecommendation.split('\n').filter((line) => line.trim() !== '');
    setinputRecommendationArray(newArray);
  }, [inputRecommendation]);

  useEffect(() => {
    updateInputArray();
  }, [render, updateInputArray]);

  const handleRender = () => {
    setRender(prevRender => !prevRender);
  };



  // uploads data to db
  const UpdateOccupancy = async () => {
    /*axios.put('http://localhost:8080/approved/putApprovedApplication?id=' + props.id,
      {
        control_no: controlnoRef.current?.value,
        applicants_name: applicantnameRef.current?.value,
        bldgpermit_no: buildingpermnoRef.current?.value,
        location: addressRef.current?.value,
        project_name: projectRef.current?.value,
        date_received: dateReceivedRef.current?.value,
        fsic_date: fsicDateRef.current?.value,
        contact_no: contactRef.current?.value,
        inspection_no: inspectOrderRef.current?.value,
        fsic_no: fsicRef.current?.value,
        amount: AmountRef.current?.value,
        or_no: OrNoRef.current?.value,
        payment_date: dateRef.current?.value,
        amount_additional: additionalpaymentRef.current?.value,
        or_no_additional:additionalOrnoRef.current?.value,
        payment_date_additional:additionaldateRef.current?.value,
        recommendations: inputRecommendationArray,
        remarks: props.remarks
      }
    ).then(res => {
      console.log(res.data);
      alert("Update Successful!");
      props.handleClose();
    }).catch(err => {
      console.log(err)})*/
      updateoccupancyPermit(props.id,{
        bldgpermitno: (buildingpermnoRef.current?.value || ''),
        applicantname:( applicantnameRef.current?.value || ''),
        projectname: (projectRef.current?.value || ''),
        location: (addressRef.current?.value || ''),
        contactno: (contactRef.current?.value || ''),
        datereceived: (dateReceivedRef.current?.value|| ''),
        fsicno: fsicRef.current?.value,
        fsicdate: fsicDateRef.current?.value,
        amount: AmountRef.current?.value,
        paymentdate:dateRef.current?.value,
        orno: OrNoRef.current?.value,
        additionalamount: additionalpaymentRef.current?.value,
        ornoadditional: additionalOrnoRef.current?.value,
        paymentdateadditional: additionaldateRef.current?.value,
        recommendation: inputRecommendation,
        remarks: "FSIC Not Printed"
      })
      props.handleClose();
  }

  // Sets the values of the array and uploads data to db
  const addEvaluation = () => {
    if (props.activity !== 'Update') {
      props.handleClose();
    }
    else {
      handleRender();
      UpdateOccupancy();
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
                      <p className='custom-paragraph' style={{ marginLeft: '-15px' }}>Building Permit No.</p>
                      <TextField className='custom-outlined-input' inputRef={buildingpermnoRef} sx={{ borderRadius: '11px', width: "305px" }} defaultValue={props.buildingpermino} variant='standard' disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ marginLeft: '-15px' }}>Applicant's Name</p>
                      <TextField fullWidth className='custom-outlined-input' inputRef={applicantnameRef} sx={{ borderRadius: '11px' }} defaultValue={props.applicantname} variant='standard' disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Project Name</p>
                      <TextField fullWidth className='custom-outlined-input' inputRef={projectRef} sx={{ borderRadius: '11px' }} defaultValue={props.projecname} variant='standard' disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Location</p>
                      <TextField fullWidth className='custom-outlined-input' inputRef={addressRef} sx={{ borderRadius: '11px' }} defaultValue={props.address} variant='standard' disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'>Date Received</p>
                      <TextField className='custom-outlined-input' inputRef={dateReceivedRef} sx={{ borderRadius: '11px', width: "305px" }} defaultValue={props.datereceived } variant='standard' disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >FSIC Number</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} inputRef={fsicRef} defaultValue={props.fsic_no}  disabled={props.activity !== 'Update'}/>
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'  >FSIC Date</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} inputRef={fsicDateRef} defaultValue={props.fsic_date } disabled={props.activity !== 'Update'} />
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
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} inputRef={AmountRef} defaultValue={props.amount} disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'  >O.R. No.</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} inputRef={OrNoRef} defaultValue={props.or_no} disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'  >Date</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "670px" }} inputRef={dateRef} defaultValue={props.payment_date} disabled={props.activity !== 'Update'} />
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
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} inputRef={additionaldateRef} disabled={props.activity !== 'Update'} defaultValue={props.addtional_paymentdate ? new Date(props.addtional_paymentdate).toISOString().split('T')[0] : ''}/>
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'  >O.R. No.</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} inputRef={additionalOrnoRef} disabled={props.activity !== 'Update'} defaultValue={props.additional_or_no}/>
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'  >Amount</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} inputRef={additionalpaymentRef} disabled={props.activity !== 'Update'}defaultValue={props.amount}/>
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
                        value={inputRecommendation}
                        onChange={handleInputChange}
                        disabled={props.activity !== 'Update'}
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
            {props.activity !== 'Update' ? 'Close Form' : 'Update Form'}
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};
