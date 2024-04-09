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
import { addBusinessPermits, addrenewalBusinessPermits, updateAbatementNewBusiness, updateAbatementRenewalBusiness, updateBusinessPermit, updateClosureNewBusiness, updateClosureRenewalBusiness, updateNTCNewBusiness, updateNTCRenewalBusiness, updateNTCVNewBusiness, updateNTCVRenewalBusiness, updaterenewalBusinessPermit } from '../../lib/controller';


const cardStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: 800,
  backgroundColor: 'lightgrey',
}; //Style Purposes



export interface formdetails {
  form: string;
  bpid: string;
  activity: string;
  business_no: string;
  permitee: string;
  business_name: string;
  address: string;
  natureofbusiness: string;
  typeofoccupancy: string;
  contactno: string;
  email: string;
  datereceived: string;
  open: boolean;
  handleClose: () => void;
}

export default function EvaluatePopup(props: formdetails) {

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCons, setSelectedCons] = useState<boolean>(false)
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const dateInspectionRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const inspectOrderRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const fsicRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const fsicDateRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const AmountRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const OrNoRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const dateRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const teamLeaderRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const [inputInspector, setInputInspector] = useState<string>(''); // State to store the input value as a single string
  const [inputInspectorArray, setinputInspectorArray] = useState<string[]>(["test", "test2"]); // State to store the input values as an array
  const [inputrecommendation, setinputrecommendation] = useState<string>(''); // State to store the input value as a single string
  const [inputrecommendationarray, setrecommendationarray] = useState<string[]>(["test", "test2"]); // State to store the input values as an array
  const [render, setRender] = useState<boolean>(true); // Triggers the UseEffect
  const handleCons = (event: SelectChangeEvent<boolean>) => {
    setSelectedCons(event.target.value as boolean);
    console.log(selectedCons)
  };

  // Function to handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputInspector(event.target.value);
  };
  // Function to handle input changes
  const RecommendationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setinputrecommendation(event.target.value);
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



  // uploads data to db
  const evaluateApproved = async () => {
    /*let NEW_URL ='';
    if(props.form ==='New'){
      NEW_URL ='http://localhost:8080/newbpapplication/insertBusinessPermit'
    }
    else if (props.form ==='Renewal'){
      NEW_URL ='http://localhost:8080/renewalbpapprovedapplication/insertRenewalBusinessPermit'
    }
    axios.post(NEW_URL,
      {
        address: props.address,
        bspermit_no: props.business_no,
        permittee: props.permitee,
        business_name: props.business_name,
        nature_business: props.natureofbusiness,
        type_occupancy: props.typeofoccupancy,
        contact_no: props.contactno,
        email: props.email,
        date_received: props.datereceived,
        date_inspection: dateInspectionRef.current?.value,
        inspection_no: inspectOrderRef.current?.value,
        fsic_no: fsicRef.current?.value,
        fsic_date: fsicDateRef.current?.value,
        amount: AmountRef.current?.value,
        or_no: OrNoRef.current?.value,
        date: dateRef.current?.value,
        remarks: "FSIC Not Printed",
        team_leader: teamLeaderRef.current?.value,
        fire_inspectors: inputInspectorArray,
        recommendation: inputrecommendationarray
      }
    ).then(res => {
      console.log(res.data);
      alert("Evaluation Successful!");
      props.handleClose()
    }).catch(err => console.log(err))*/
    if(props.activity === "Pending Records"){
      if (props.form === "New") {
        updateBusinessPermit(props.bpid, {
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
      else if (props.form === "Renewal") {
        updaterenewalBusinessPermit(props.bpid, {
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
    }else if (props.activity === "NTC Records"){
        if(props.form === "New"){
          addBusinessPermits({
            bspermit_no: props.business_no,
            address: props.address,
            permittee: props.permitee,
            business_name: props.business_name,
            nature_business: props.natureofbusiness,
            type_occupancy: props.typeofoccupancy,
            contact_no: props.contactno,
            email: props.email,
            date_received: props.datereceived,
            dateinspection: (dateInspectionRef.current?.value || ''),
            inspection_no:parseInt(inspectOrderRef.current?.value || '0', 10),
            fsicno: parseInt(fsicRef.current?.value || '0', 10),
            fsicdate: (fsicDateRef.current?.value || ''),
            amount: parseInt(AmountRef.current?.value || '0', 10),
            orno: parseInt(OrNoRef.current?.value || '0', 10),
            date: (dateRef.current?.value || ''),
            teamleader: (teamLeaderRef.current?.value || ''),
            fireinspectors: [inputInspector],
            recommendation: [inputrecommendation],
            remarks: "FSIC Not Printed"
          })
          updateNTCNewBusiness(props.bpid,{
            remarks: "Complied"
          })
        }else if (props.form === "Renewal"){
          addrenewalBusinessPermits({
            bspermit_no: props.business_no,
            address: props.address,
            permittee: props.permitee,
            business_name: props.business_name,
            nature_business: props.natureofbusiness,
            type_occupancy: props.typeofoccupancy,
            contact_no: props.contactno,
            email: props.email,
            date_received: props.datereceived,
            dateinspection: (dateInspectionRef.current?.value || ''),
            inspection_no:parseInt(inspectOrderRef.current?.value || '0', 10),
            fsicno: parseInt(fsicRef.current?.value || '0', 10),
            fsicdate: (fsicDateRef.current?.value || ''),
            amount: parseInt(AmountRef.current?.value || '0', 10),
            orno: parseInt(OrNoRef.current?.value || '0', 10),
            date: (dateRef.current?.value || ''),
            teamleader: (teamLeaderRef.current?.value || ''),
            fireinspectors: [inputInspector],
            recommendation: [inputrecommendation],
            remarks: "FSIC Not Printed"
          })
          updateNTCRenewalBusiness(props.bpid,{
            remarks: "Complied"
          })
        }
      
    }
    else if (props.activity === "NTCV Records"){
      if(props.form === "New"){
        addBusinessPermits({
          bspermit_no: props.business_no,
          address: props.address,
          permittee: props.permitee,
          business_name: props.business_name,
          nature_business: props.natureofbusiness,
          type_occupancy: props.typeofoccupancy,
          contact_no: props.contactno,
          email: props.email,
          date_received: props.datereceived,
          dateinspection: (dateInspectionRef.current?.value || ''),
          inspection_no:parseInt(inspectOrderRef.current?.value || '0', 10),
          fsicno: parseInt(fsicRef.current?.value || '0', 10),
          fsicdate: (fsicDateRef.current?.value || ''),
          amount: parseInt(AmountRef.current?.value || '0', 10),
          orno: parseInt(OrNoRef.current?.value || '0', 10),
          date: (dateRef.current?.value || ''),
          teamleader: (teamLeaderRef.current?.value || ''),
          fireinspectors: [inputInspector],
          recommendation: [inputrecommendation],
          remarks: "FSIC Not Printed"
        })
        updateNTCVNewBusiness(props.bpid,{
          remarks: "Complied"
        })
      }else if (props.form === "Renewal"){
        addrenewalBusinessPermits({
          bspermit_no: props.business_no,
          address: props.address,
          permittee: props.permitee,
          business_name: props.business_name,
          nature_business: props.natureofbusiness,
          type_occupancy: props.typeofoccupancy,
          contact_no: props.contactno,
          email: props.email,
          date_received: props.datereceived,
          dateinspection: (dateInspectionRef.current?.value || ''),
          inspection_no:parseInt(inspectOrderRef.current?.value || '0', 10),
          fsicno: parseInt(fsicRef.current?.value || '0', 10),
          fsicdate: (fsicDateRef.current?.value || ''),
          amount: parseInt(AmountRef.current?.value || '0', 10),
          orno: parseInt(OrNoRef.current?.value || '0', 10),
          date: (dateRef.current?.value || ''),
          teamleader: (teamLeaderRef.current?.value || ''),
          fireinspectors: [inputInspector],
          recommendation: [inputrecommendation],
          remarks: "FSIC Not Printed"
        })
        updateNTCVRenewalBusiness(props.bpid,{
          remarks: "Complied"
        })
      }
    }
    else if (props.activity === "Abatement Records"){
      if(props.form === "New"){
        addBusinessPermits({
          bspermit_no: props.business_no,
          address: props.address,
          permittee: props.permitee,
          business_name: props.business_name,
          nature_business: props.natureofbusiness,
          type_occupancy: props.typeofoccupancy,
          contact_no: props.contactno,
          email: props.email,
          date_received: props.datereceived,
          dateinspection: (dateInspectionRef.current?.value || ''),
          inspection_no:parseInt(inspectOrderRef.current?.value || '0', 10),
          fsicno: parseInt(fsicRef.current?.value || '0', 10),
          fsicdate: (fsicDateRef.current?.value || ''),
          amount: parseInt(AmountRef.current?.value || '0', 10),
          orno: parseInt(OrNoRef.current?.value || '0', 10),
          date: (dateRef.current?.value || ''),
          teamleader: (teamLeaderRef.current?.value || ''),
          fireinspectors: [inputInspector],
          recommendation: [inputrecommendation],
          remarks: "FSIC Not Printed"
        })
        updateAbatementNewBusiness(props.bpid,{
          remarks: "Complied"
        })
      }else if (props.form === "Renewal"){
        addrenewalBusinessPermits({
          bspermit_no: props.business_no,
          address: props.address,
          permittee: props.permitee,
          business_name: props.business_name,
          nature_business: props.natureofbusiness,
          type_occupancy: props.typeofoccupancy,
          contact_no: props.contactno,
          email: props.email,
          date_received: props.datereceived,
          dateinspection: (dateInspectionRef.current?.value || ''),
          inspection_no:parseInt(inspectOrderRef.current?.value || '0', 10),
          fsicno: parseInt(fsicRef.current?.value || '0', 10),
          fsicdate: (fsicDateRef.current?.value || ''),
          amount: parseInt(AmountRef.current?.value || '0', 10),
          orno: parseInt(OrNoRef.current?.value || '0', 10),
          date: (dateRef.current?.value || ''),
          teamleader: (teamLeaderRef.current?.value || ''),
          fireinspectors: [inputInspector],
          recommendation: [inputrecommendation],
          remarks: "FSIC Not Printed"
        })
        updateAbatementRenewalBusiness(props.bpid,{
          remarks: "Complied"
        })
      }
    }
    else if (props.activity === "Closure Records"){
      if(props.form === "New"){
        addBusinessPermits({
          bspermit_no: props.business_no,
          address: props.address,
          permittee: props.permitee,
          business_name: props.business_name,
          nature_business: props.natureofbusiness,
          type_occupancy: props.typeofoccupancy,
          contact_no: props.contactno,
          email: props.email,
          date_received: props.datereceived,
          dateinspection: (dateInspectionRef.current?.value || ''),
          inspection_no:parseInt(inspectOrderRef.current?.value || '0', 10),
          fsicno: parseInt(fsicRef.current?.value || '0', 10),
          fsicdate: (fsicDateRef.current?.value || ''),
          amount: parseInt(AmountRef.current?.value || '0', 10),
          orno: parseInt(OrNoRef.current?.value || '0', 10),
          date: (dateRef.current?.value || ''),
          teamleader: (teamLeaderRef.current?.value || ''),
          fireinspectors: [inputInspector],
          recommendation: [inputrecommendation],
          remarks: "FSIC Not Printed"
        })
        updateClosureNewBusiness(props.bpid,{
          remarks: "Complied"
        })
      }else if (props.form === "Renewal"){
        addrenewalBusinessPermits({
          bspermit_no: props.business_no,
          address: props.address,
          permittee: props.permitee,
          business_name: props.business_name,
          nature_business: props.natureofbusiness,
          type_occupancy: props.typeofoccupancy,
          contact_no: props.contactno,
          email: props.email,
          date_received: props.datereceived,
          dateinspection: (dateInspectionRef.current?.value || ''),
          inspection_no:parseInt(inspectOrderRef.current?.value || '0', 10),
          fsicno: parseInt(fsicRef.current?.value || '0', 10),
          fsicdate: (fsicDateRef.current?.value || ''),
          amount: parseInt(AmountRef.current?.value || '0', 10),
          orno: parseInt(OrNoRef.current?.value || '0', 10),
          date: (dateRef.current?.value || ''),
          teamleader: (teamLeaderRef.current?.value || ''),
          fireinspectors: [inputInspector],
          recommendation: [inputrecommendation],
          remarks: "FSIC Not Printed"
        })
        updateClosureRenewalBusiness(props.bpid,{
          remarks: "Complied"
        })
      }
    }
    props.handleClose();
  }

  // Sets the values of the array and uploads data to db
  const addEvaulation = () => {
    handleRender();
    evaluateApproved();

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
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.business_no} variant='standard' disabled />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ marginLeft: '-15px' }}>Name of Owner/Permitee</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.permitee} variant='standard' disabled />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ marginLeft: '-15px' }}>Business Name</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.business_name} variant='standard' disabled />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ marginLeft: '-15px' }}>Address</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.address} variant='standard' disabled />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ marginLeft: '-15px' }}>Nature of Business</p>
                      <TextField className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} defaultValue={props.natureofbusiness} variant='standard' disabled />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={5}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ marginLeft: '-15px' }}>Type of Occupancy</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.typeofoccupancy} variant='standard' disabled />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ marginLeft: '-15px' }}>Contact Number</p>
                      <TextField className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} defaultValue={props.contactno} variant='standard' disabled />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ marginLeft: '-15px' }}>Email</p>
                      <TextField className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} defaultValue={props.email} variant='standard' disabled />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ marginLeft: '-15px', paddingTop: '20px' }}>Date Received</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.datereceived} variant='standard' disabled />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ paddingTop: '20px' }} >Date of Inspection</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} inputRef={dateInspectionRef} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ paddingTop: '20px' }}>Inspection Order Number</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} inputRef={inspectOrderRef} />
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
                      <h2 className='custom-paragraph' >FSIC Payment</h2>
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Amount</p>
                      <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} inputRef={AmountRef} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >O.R Number</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} inputRef={OrNoRef} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Date</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} inputRef={dateRef} />
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
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "500px" }} inputRef={teamLeaderRef} />
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
                        onChange={RecommendationChange}
                        placeholder={`Test Recommendation\nType in the recommendation then press enter to move next line`}
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
          <Button variant='contained' sx={{ backgroundColor: 'grey', borderRadius: '13px', height: '30px' }} onClick={addEvaulation}>
            Add Evaluation
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};
