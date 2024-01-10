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
import { updateAbatementNewBusiness, updateAbatementRenewalBusiness } from '../../lib/controller';


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
  inspection_no: number;
  inspectiondate: string;
  ntc_no: number;
  ntc_date: string;
  ntcv_no: number;
  ntcv_date: string;
  abatement_no: number;
  abatement_date: string;
  teamleader: string;
  fireinspectors: string[];
  open: boolean;
  defects: {
    date: string;
    defects: string;
  }[];
  remarks: string;
  receivedby: string;
  receiveddate: string;
  handleClose: () => void;
}

interface DefectData {
  defects: string;
  date: string;
}

export default function ViewUpdateAbatementPopup(props: formdetails) {

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCons, setSelectedCons] = useState<boolean>(false)
  const [data, setData] = useState<DefectData[]>(props.defects ? props.defects.map(({ defects, date }) => ({ defects, date })) : []);
  const [arrayList, setArrayList] = useState<string[][]>([]);
  const [openAddDefect, setOpenAddDefect] = useState(false);
  const BusinessNoRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const PermiteeRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const BusinessnameRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const AddressRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const NatureBusinessRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const ContactnoRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const typeofoccupancyRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const EmailRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const DateRecievedRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const [selectedRemarks, setselectedRemarks] = useState(props?.remarks || '');//handles dropboxfield
  const NTCRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const NTCDateRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const NTCVRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const NTCVDateRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const ReceivedByRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const ReceivedDateRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const dateInspectionRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const inspectOrderRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const AbatementRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const AbatementDateRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const AmountRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const teamLeaderRef = useRef<HTMLInputElement | null>(null);//Handles input for textfield
  const [inputInspector, setInputInspector] = useState<string>(props.fireinspectors?.join('\n') || ''); // State to store the input value as a single string
  const [inputInspectorArray, setinputInspectorArray] = useState<string[]>(["test", "test2"]); // State to store the input values as an array
  const [render, setRender] = useState<boolean>(true); // Triggers the UseEffect

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

  const addDefect = (defect: string, date: string) => {
    const newData: DefectData = { defects: defect, date: date };
    setData([...data, newData]);
    console.log(data)
  };


  const handleCons = (event: SelectChangeEvent<boolean>) => {
    setSelectedCons(event.target.value as boolean);
    console.log(selectedCons)
  };

  const handleRemarks = (event: SelectChangeEvent<string>) => {
    setselectedRemarks(event.target.value); // Update the state variable with the new selected value
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

  //Removes Item From defects
  const removeItem = (indexToRemove: number) => {
    // Create a copy of the current data array
    const updatedData = [...data];
    // Remove the item at the specified index
    updatedData.splice(indexToRemove, 1);
    // Update the data state with the modified array
    setData(updatedData);
  };


  // uploads data to db
  const evaluateAbatement = async () => {
    const convertedTableData = data.map(item => ({
      defects: item.defects,
      date: item.date
    }));

    if (props.form === 'New') {
      updateAbatementNewBusiness(props.bpid, {
        bspermit_no: BusinessNoRef.current?.value,
        permittee: PermiteeRef.current?.value,
        business_name: BusinessnameRef.current?.value,
        address: AddressRef.current?.value,
        nature_business: NatureBusinessRef.current?.value,
        type_occupancy: typeofoccupancyRef.current?.value,
        contact_no: ContactnoRef.current?.value,
        email: EmailRef.current?.value,
        date_received: DateRecievedRef.current?.value,
        date_inspected: dateInspectionRef.current?.value,
        inspection_no: inspectOrderRef.current?.value,
        ntc_no: NTCRef.current?.value,
        ntc_date: NTCDateRef.current?.value,
        ntcv_no: NTCVRef.current?.value,
        ntcv_date: NTCVDateRef.current?.value,
        abatement_no: AbatementRef.current?.value,
        abatement_date: AbatementDateRef.current?.value,
        remarks: props.remarks,
        team_leader: teamLeaderRef.current?.value,
        fire_inspectors: inputInspectorArray,
        defects: convertedTableData,
        name: ReceivedByRef.current?.value,
        date: ReceivedDateRef.current?.value
      })
    }
    else if (props.form === "Renewal") {
      updateAbatementRenewalBusiness(props.bpid, {
        bspermit_no: BusinessNoRef.current?.value,
        permittee: PermiteeRef.current?.value,
        business_name: BusinessnameRef.current?.value,
        address: AddressRef.current?.value,
        nature_business: NatureBusinessRef.current?.value,
        type_occupancy: typeofoccupancyRef.current?.value,
        contact_no: ContactnoRef.current?.value,
        email: EmailRef.current?.value,
        date_received: DateRecievedRef.current?.value,
        date_inspected: dateInspectionRef.current?.value,
        inspection_no: inspectOrderRef.current?.value,
        ntc_no: NTCRef.current?.value,
        ntc_date: NTCDateRef.current?.value,
        ntcv_no: NTCVRef.current?.value,
        ntcv_date: NTCVDateRef.current?.value,
        abatement_no: AbatementRef.current?.value,
        abatement_date: AbatementDateRef.current?.value,
        remarks: props.remarks,
        team_leader: teamLeaderRef.current?.value,
        fire_inspectors: inputInspectorArray,
        defects: convertedTableData,
        name: ReceivedByRef.current?.value,
        date: ReceivedDateRef.current?.value
      })
    }


    props.handleClose();
  }

  // Sets the values of the array and uploads data to db
  const addEvaluation = () => {
    if (props.activity !== 'Update') {
      props.handleClose();
    }
    else {
      handleRender();
      evaluateAbatement();
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
                      <p className='custom-paragraph' >Business Permit Number</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} inputRef={BusinessNoRef} defaultValue={props.business_no} variant='standard' disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'>Name of Owner/Permitee</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} inputRef={PermiteeRef} defaultValue={props.permitee} variant='standard' disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Business Name</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} inputRef={BusinessnameRef} defaultValue={props.business_name} variant='standard' disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Address</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} inputRef={AddressRef} defaultValue={props.address} variant='standard' disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'>Nature of Business</p>
                      <TextField className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} inputRef={NatureBusinessRef} defaultValue={props.natureofbusiness} variant='standard' disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={5}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Type of Occupancy</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} inputRef={typeofoccupancyRef} defaultValue={props.typeofoccupancy} variant='standard' disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Contact Number</p>
                      <TextField className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} inputRef={ContactnoRef} defaultValue={props.contactno} variant='standard' disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'>Email</p>
                      <TextField className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} inputRef={EmailRef} defaultValue={props.email} variant='standard' disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ paddingTop: '20px' }}>Date Received</p>
                      <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} inputRef={DateRecievedRef} defaultValue={props.datereceived } variant='standard' disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ paddingTop: '20px' }} >Inspection Order Number</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} inputRef={inspectOrderRef} defaultValue={props.inspection_no} disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' style={{ paddingTop: '20px' }}>Date of Inspection</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} inputRef={dateInspectionRef} defaultValue={props.inspectiondate } disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'>NTC Number</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} defaultValue={props.ntc_no} inputRef={NTCRef} disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'>NTC Date</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} defaultValue={props.ntc_date } inputRef={NTCDateRef} disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >NTCV Number</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} defaultValue={props.ntcv_no} inputRef={NTCVRef} disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'  >NTCV Date</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} defaultValue={props.ntcv_date} inputRef={NTCVDateRef} disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Abatement Number</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} inputRef={AbatementRef} defaultValue={props.abatement_no} disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph'  >Abatement Date</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "305px" }} inputRef={AbatementDateRef} defaultValue={props.abatement_date } disabled={props.activity !== 'Update'} />
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
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "500px" }} inputRef={teamLeaderRef} defaultValue={props.teamleader} disabled={props.activity !== 'Update'} />
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
                        disabled={props.activity !== 'Update'}
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
                          <th style={{ width: "20px" }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item, index) => (
                          <tr key={index}>
                            <td style={{ textAlign: "center" }}>{item.defects}</td>
                            <td style={{ textAlign: "center" }}>{item.date}</td>
                            <th><Button variant='contained' sx={{ marginTop: '10px', backgroundColor: 'blue', borderRadius: '13px', height: '30px' }} onClick={() => removeItem(index)} disabled={props.activity !== 'Update'}>
                              Remove
                            </Button></th>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <DefectPopup open={openAddDefect} onClose={closeDialog} onAdd={addDefect} />
                    <Button variant='contained' sx={{ marginTop: '10px', backgroundColor: 'blue', borderRadius: '13px', height: '30px' }} onClick={openDialog} disabled={props.activity !== 'Update'}>
                      Add Defect
                    </Button>
                  </Grid>
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Received By</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} defaultValue={props.receivedby} inputRef={ReceivedByRef} disabled={props.activity !== 'Update'} />
                    </Stack>
                  </Grid>
                  {/*<Grid item xs={10} sm={5}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start', marginTop: '18px' }}>
                      <p className='custom-paragraph' >Status after Grace Period</p>
                      <Select
                        sx={{ height: '30px', width: '300px', borderRadius: '14px', borderWidth: '20px' }}
                        value={selectedRemarks}
                        onChange={handleRemarks}
                        disabled={props.activity !== 'Update'}
                      >
                        <MenuItem value="Complied">Complied</MenuItem>
                        <MenuItem value="For Issuance Closure">For Issuance Closure</MenuItem>
                        <MenuItem value="Issued Closure">Issued Closure</MenuItem>
                      </Select>
                    </Stack>
                        </Grid>*/}
                  <Grid item xs={10} sm={6}>
                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                      <p className='custom-paragraph' >Received Date</p>
                      <OutlinedInput className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} defaultValue={props.receiveddate ? new Date(props.receiveddate).toISOString().split('T')[0] : ''} inputRef={ReceivedDateRef} disabled={props.activity !== 'Update'} />
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
