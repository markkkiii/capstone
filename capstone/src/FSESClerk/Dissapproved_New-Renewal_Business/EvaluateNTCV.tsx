import React, { useState, useRef, useEffect, useCallback } from 'react';
import Button from '@mui/material/Button';
import '../ClerkCSS.css';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import { Card, CardContent, DialogTitle, Grid, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';
import axios from 'axios';
import DefectPopup from './DefectPopup';
import { addNTCVNewBusiness, addNTCVRenewalBusiness, updateNTCNewBusiness, updateNTCRenewalBusiness } from '../../lib/controller';


const cardStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: 800,
  backgroundColor: 'lightgrey',
  paddingLeft: 20,
}; //Style Purposes



export interface formdetails {
  bpid: string;
  form: string;
  business_no: string;
  permitee: string;
  business_name: string;
  address: string;
  natureofbusiness: string;
  typeofoccupancy: string;
  contactno: string;
  email: string;
  datereceived: string;
  ntc_no: number;
  ntc_date: string;
  ntcv_no: number;
  ntcv_date: string;
  open: boolean;
  defects: {
    date: string;
    defects: string;
  }[];
  handleClose: () => void;
}

interface DefectData {
  defects: string;
  date: string;
}

export default function EvaluateNTCVPopup(props: formdetails) {

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCons, setSelectedCons] = useState<boolean>(false)
  const [data, setData] = useState<DefectData[]>([]);
  const [arrayList, setArrayList] = useState<string[][]>([]);
  const [openAddDefect, setOpenAddDefect] = useState(false);
  const dateInspectionRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const inspectOrderRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const NTCRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const NTCDateRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const emailRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const bspermitNoRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const businessNameRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const addressRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const dateRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const contactNoRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const natureBusinessRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const remarksRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const permitteeRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const ReceivedDateRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const idRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const ReceivedByRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const teamLeaderRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const NTCVDateRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const NTCVRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const [inputInspector, setInputInspector] = useState<string>(''); // State to store the input value as a single string
  const [inputInspectorArray, setinputInspectorArray] = useState<string[]>(["test", "test2"]); // State to store the input values as an array
  const [render, setRender] = useState<boolean>(true); // Triggers the UseEffect
  const [tableData, setTableData] = useState<Array<{ defects: string; date: string; }>>([
    { defects: '', date: '' },
  ]);


  //opens add defect pop up
  const openDialog = () => {
    setOpenAddDefect(true);
  };

  useEffect(() => {
    // Convert data to an array of arrays
    setArrayList(data.map(item => [item.defects, item.date]));
  }, [data]);

  //closes add defect pop up
  const closeDialog = () => {
    setOpenAddDefect(false);
  };

  const addDefect = (defect: string, period: string) => {
    const newData: DefectData = { defects: defect, date: period };
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

  const updateRemarks = () => {
    let new_url = '';
    if (props.form === 'New') {
      new_url = 'http://localhost:8080/newbpnoticetocomply/putNewComply?id=';
    }
    else if (props.form === 'Renewal') {
      new_url = 'http://localhost:8080/renewalbpnoticetocomply/updateRemarksRenewal?renewnc_id='
    }
    axios.put(new_url + props.bpid,
      {
        remarks: "Issued NTCV",
      }
    )
  }


  // uploads data to db
  const evaluateNTCV = async () => {
    // let new_url = '';
    // if (props.form === 'New') {
    //   new_url = 'http://localhost:8080/newbpnoticecorrectviolation/insertNTCVPermit';
    // }
    // else if (props.form === 'Renewal') {
    //   new_url = 'http://localhost:8080/renewalbpnoticetocorrectviolation/insertRenewalNTCVPermit'
    // }
    // axios.post(new_url,
    //   {
    //     bspermit_no: props.bpid,
    //     permittee: props.permitee,
    //     business_name: props.business_name,
    //     address: props.address,
    //     nature_business: props.natureofbusiness,
    //     type_occupancy: props.typeofoccupancy,
    //     contact_no: props.contactno,
    //     email: props.email,
    //     date_received: props.datereceived,
    //     date_inspected: dateInspectionRef.current?.value,
    //     inspection_no: inspectOrderRef.current?.value,
    //     ntc_no: props.ntc,
    //     ntc_date: props.ntc_date,
    //     ntcv_no: NTCVRef.current?.value,
    //     ntcv_date: NTCVDateRef.current?.value,
    //     remarks: "For Issuance Abatement",
    //     team_leader: teamLeaderRef.current?.value,
    //     fire_inspectors: inputInspectorArray,
    //     defects: arrayList,
    //     name: ReceivedByRef.current?.value,
    //     date: ReceivedDateRef.current?.value
    //   }
    // ).then(res => {
    //   console.log(res.data);
    //   alert("Evaluation Successful!");
    //   updateRemarks();
    //   props.handleClose();
    // }).catch(err => console.log(err))
    const convertedTableData = data.map(item => ({
      defects: item.defects,
      date: item.date
    }));

    if (props.form === 'New') {
      addNTCVNewBusiness({
        bspermit_no: props.business_no,
        permittee: props.permitee,
        business_name: props.business_name,
        address: props.address,
        contact_no: props.contactno,
        date: ReceivedDateRef.current?.value || '',
        date_received: props.datereceived,
        date_inspected: dateInspectionRef.current?.value || '',
        fire_inspectors: inputInspectorArray,
        inspection_no: parseInt(inspectOrderRef.current?.value || '0', 10),
        email: props.email,
        name: ReceivedByRef.current?.value || '',
        nature_business: props.natureofbusiness,
        ntc_no: props.ntc_no,
        ntc_date: props.ntc_date,
        ntcv_no: parseInt(NTCVRef.current?.value || '0', 10),
        ntcv_date: NTCVDateRef.current?.value || '',
        type_occupancy: props.typeofoccupancy,
        defects: convertedTableData,
        remarks: "For Issuance Abatement",
        team_leader: teamLeaderRef.current?.value || ''
      })
      updateNTCNewBusiness(props.bpid, {
        remarks: 'Issued NTCV'
      })
    }
    else if (props.form === 'Renewal') {
      addNTCVRenewalBusiness({
        bspermit_no: props.business_no,
        permittee: props.permitee,
        business_name: props.business_name,
        address: props.address,
        contact_no: props.contactno,
        date: ReceivedDateRef.current?.value || '',
        date_received: props.datereceived,
        date_inspected: dateInspectionRef.current?.value || '',
        fire_inspectors: inputInspectorArray,
        inspection_no: parseInt(inspectOrderRef.current?.value || '0', 10),
        email: props.email,
        name: ReceivedByRef.current?.value || '',
        nature_business: props.natureofbusiness,
        ntc_no: props.ntc_no,
        ntc_date: props.ntc_date,
        ntcv_no: parseInt(NTCVRef.current?.value || '0', 10),
        ntcv_date: NTCVDateRef.current?.value || '',
        type_occupancy: props.typeofoccupancy,
        defects: convertedTableData,
        remarks: "For Issuance Abatement",
        team_leader: teamLeaderRef.current?.value || ''
      })
      updateNTCRenewalBusiness(props.bpid, {
        remarks: 'Issued NTCV'
      })
    }
    props.handleClose();
  }

  // Sets the values of the array and uploads data to db
  const addEvaluation = () => {
    handleRender();
    evaluateNTCV();
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
                      <p className='custom-paragraph' >Business Permit Number</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.business_no} variant='standard' disabled />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'>Name of Owner/Permitee</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.permitee} variant='standard' disabled />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Business Name</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.business_name} variant='standard' disabled />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Address</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.address} variant='standard' disabled />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'>Nature of Business</p>
                      <TextField className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} defaultValue={props.natureofbusiness} variant='standard' disabled />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={5}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Type of Occupancy</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.typeofoccupancy} variant='standard' disabled />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Contact Number</p>
                      <TextField className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} defaultValue={props.contactno} variant='standard' disabled />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'>Email</p>
                      <TextField className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} defaultValue={props.email} variant='standard' disabled />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ paddingTop: '20px' }}>Date Received</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={props.datereceived} variant='standard' disabled />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ paddingTop: '20px' }} >Inspection Order Number</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} inputRef={inspectOrderRef} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ paddingTop: '20px' }}>Date of Inspection</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} inputRef={dateInspectionRef} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >NTC Number</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} defaultValue={props.ntc_no} inputRef={NTCRef} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'  >NTC Date</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} defaultValue={props.ntc_date} readOnly />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >NTCV Number</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} inputRef={NTCVRef} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'  >NTCV Date</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} inputRef={NTCVDateRef} />
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
                    <table>
                      <thead style={{ textAlign: "center" }}>
                        <tr>
                          <th style={{ textAlign: "center" }}>Defects</th>
                          <th style={{ textAlign: "center" }}>Grace Period</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item, index) => (
                          <tr key={index}>
                            <td>{item.defects}</td>
                            <td style={{ textAlign: "center" }}>{item.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <DefectPopup open={openAddDefect} onClose={closeDialog} onAdd={addDefect} />
                    <Button variant='contained' sx={{ marginTop: '10px', backgroundColor: 'blue', borderRadius: '13px', height: '30px' }} onClick={openDialog}>
                      Add Defect
                    </Button>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ paddingTop: '20px' }}>Received By</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} inputRef={ReceivedByRef} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start', marginTop: '20px' }}>
                      <p className='custom-paragraph'  >Received Date</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} inputRef={ReceivedDateRef} />
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

function handleRender() {
  throw new Error('Function not implemented.');
}

function evaluateNTCV() {
  throw new Error('Function not implemented.');
}

