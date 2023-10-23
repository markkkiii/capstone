import React, { ChangeEvent, useRef, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import { Card, CardContent, DialogActions, DialogContent, DialogTitle, Grid, OutlinedInput, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';

const cardStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 800,
    backgroundColor: 'lightgrey',
}; //Style Purposes

export interface formdetails {
    open: boolean;
    handleClose: () => void;
    add: string;
}



const AddPaymentPopup: React.FC<formdetails> = ({open, handleClose, add}) => {

    const [tableData, setTableData] = useState<Array<{ natureOfCollection: string; accountCode: string; amount: string }>>([
        { natureOfCollection: '', accountCode: '', amount: '' },
      ]);
    
    const payorRef = useRef<HTMLInputElement | null>(null);
    const bspermitnoRef = useRef<HTMLInputElement | null>(null);
    const businessnameRef = useRef<HTMLInputElement | null>(null);
    const ornumberRef = useRef<HTMLInputElement | null>(null);
    const opsnumberRef = useRef<HTMLInputElement | null>(null);
    const agencyRef = useRef<HTMLInputElement | null>(null);
    const dateRef = useRef<HTMLInputElement | null>(null);
    const natureOfCollectionRef = useRef<HTMLInputElement | null>(null);
    const accountCodeRef = useRef<HTMLInputElement | null>(null);
    const amountRef = useRef<HTMLInputElement | null>(null);

    const handleAddRow = () => {
        const newRow = { natureOfCollection: '', accountCode: '', amount: '' };
        setTableData((prevData) => [...prevData, newRow]);
      };

    const handleDeleteRow = (rowIndex: number) => {
        const updatedData = [...tableData];
        updatedData.splice(rowIndex, 1);
        setTableData(updatedData);
      };
      

    const handleTableChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, rowIndex: number, key: keyof typeof tableData[0]) => {
        const newData = [...tableData];
        newData[rowIndex][key] = e.target.value;
        setTableData(newData);
      };
    const AddForm = async () => {
        const convertedTableData = tableData.map(item => [item.natureOfCollection, item.accountCode, item.amount]);

        let NEW_URL = '';
        if(add === 'New'){
            NEW_URL = 'http://localhost:8080/newBusinessPayment/insertNewBpPayment';
        }
        else if (add === 'Renewal'){
            NEW_URL = 'http://localhost:8080/newRenewalBusinessPayment/insertRenewalBpPayment';
        }
        else if (add === 'Occupancy'){
            NEW_URL = 'http://localhost:8080/OccupancyPayment/insertOccupancyPayment';
        }
        else if (add === 'Building'){
            NEW_URL = 'http://localhost:8080/BuildingPermitPayment/insertBuildingPayment';
        }
        axios.post(NEW_URL, {
                business_permitno: bspermitnoRef.current?.value,
                payor: payorRef.current?.value,
                or_no:ornumberRef.current?.value,
                ops_no: opsnumberRef.current?.value,
                agency: agencyRef.current?.value,
                payment_date: dateRef.current?.value,
                payment:convertedTableData
            })
            .then(res => {
                if (res.data) {
                    console.log(bspermitnoRef.current?.value)
                    console.log("Successfully Added!" + JSON.stringify(res.data));
                    handleClose()
                }

            })
            .catch(err => {
                console.log(err)
            })
            
    }
      

    return (
        <div>
            <Dialog open={open} maxWidth="md" fullWidth PaperProps={{ style: { backgroundColor: 'lightgrey' } }}>
                <DialogTitle sx={{ height: '0px' }}>
                    <IconButton sx={{ marginTop: '-25px', marginLeft: '-25px' }} onClick={handleClose}>
                        <CancelIcon sx={{ color: 'red' }} />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                    <Card style={cardStyle} elevation={0}>
                        <CardContent style={{ marginLeft: 35, textAlign: 'center', marginTop: '-90px' }} >
                            <Grid container marginTop={'5rem'} style={{ height: '100%' }}>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Payor</p>
                                        <OutlinedInput inputRef={payorRef} fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px', width: '340px' }} />
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Business Permit No.</p>
                                        <OutlinedInput inputRef={bspermitnoRef} fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px', width: '360px' }} />
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >O.R. No.</p>
                                        <OutlinedInput inputRef={ornumberRef} fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px', width: '340px' }} /> 
                                        </Stack>
                                </Grid>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >OPS Number</p>
                                        <OutlinedInput inputRef={opsnumberRef} fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px', width: '360px' }} /> 
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Date</p>
                                        <OutlinedInput inputRef={dateRef} fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px', width: '340px' }} placeholder='EX: YEAR-MONTH-DAY' /> 
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Agency</p>
                                        <OutlinedInput inputRef={agencyRef} fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px', width: '360px' }} /> 
                                    </Stack>
                                </Grid>
                                <Grid container marginTop={'5rem'} style={{ height: '100%'}}>
                                    <Grid item xs={12}>
                                    <TableContainer>
                                        <Table sx={{ width: '100%', border: '1px solid #e0e0e0' }}>
                                        <TableHead>
                                            <TableRow>
                                            <TableCell sx ={{fontFamily: 'Oswald', fontSize: '16px', textAlign: 'center', background: '#f5f5f5'}}>Nature of Collection</TableCell>
                                            <TableCell sx ={{fontFamily: 'Oswald', fontSize: '16px', textAlign: 'center', background: '#f5f5f5' }}>Account Code</TableCell>
                                            <TableCell sx ={{fontFamily: 'Oswald', fontSize: '16px', textAlign: 'center', background: '#f5f5f5' }}>Amount</TableCell>
                                            <TableCell sx ={{fontFamily: 'Oswald', fontSize: '16px', textAlign: 'center', background: '#f5f5f5' }}></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {tableData.map((row, rowIndex) => (
                                            <TableRow key={rowIndex}>
                                                <TableCell sx={{ fontFamily: 'Oswald', fontSize: '14px' }}>
                                                <OutlinedInput
                                                    fullWidth
                                                    value={row.natureOfCollection}
                                                    onChange={(e) => handleTableChange(e, rowIndex, 'natureOfCollection')}
                                                />
                                                </TableCell>
                                                <TableCell sx={{ font: 'Oswald', fontSize: '14px' }}>
                                                <OutlinedInput
                                                    fullWidth
                                                    value={row.accountCode}
                                                    onChange={(e) => handleTableChange(e, rowIndex, 'accountCode')}
                                                />
                                                </TableCell>
                                                <TableCell sx={{ fontFamily: 'Arial', fontSize: '14px'}}>
                                                <OutlinedInput
                                                    fullWidth
                                                    value={row.amount}
                                                    onChange={(e) => handleTableChange(e, rowIndex, 'amount')}
                                                />
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                    variant="contained"
                                                    sx={{ borderRadius: '13px', height: '30px', backgroundColor: 'blue' }}
                                                    onClick={() => handleDeleteRow(rowIndex)}
                                                    >
                                                    Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                            ))}
                                        </TableBody>
                                        </Table>
                                    </TableContainer>
                                        <Grid item xs={12} marginTop={'1rem'}>
                                            <Button
                                            variant="contained"
                                            sx={{ backgroundColor: 'grey', borderRadius: '13px', height: '30px' }}
                                            onClick={handleAddRow} // Call the handleAddRow function to add a new row
                                            >
                                            Add Row
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button variant='contained'  onClick={AddForm} sx={{ backgroundColor: 'grey', borderRadius: '13px', height: '30px' }}>Add Application</Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default AddPaymentPopup;