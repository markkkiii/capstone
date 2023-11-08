import React, { ChangeEvent, useRef, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import { Card, CardContent, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';

const cardStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 1200,
    backgroundColor: 'lightgrey',
}; //Style Purposes

export interface formdetails {
    open: boolean;
    payor: string;
    business_permitno: string;
    or_no: string;
    ops_no: string;
    payment_date: string;
    agency: string;
    payment: string[][];
    handleClose: () => void;

}
const accountCodeOptions = ["628-BFP-01", "628-BFP-02", "628-BFP-03","628-BFP-04", "628-BFP-05", "628-BFP-06","628-BFP-07", "628-BFP-08", "628-BFP-09","628-BFP-10", "628-BFP-11a", "628-BFP-11b"];

const accountCodeToNatureOfCollectionMap: { [key: string]: string } = {
    "628-BFP-01": "Fire Code Construction Tax ",
    "628-BFP-02": "Fire Code Realty Tax",
    "628-BFP-03": "Fire Code Premium Tax",
    "628-BFP-04": "Fire Code Sales Tax ",
    "628-BFP-05": "Fire Code Proceeds Tax",
    "628-BFP-06": "Fire Safety Inspection Fee",
    "628-BFP-07": "Storage Clearance Fee",
    "628-BFP-08": "Conveyance Clearance Fee ",
    "628-BFP-09": "Installation Clearance Fee",
    "628-BFP-10": "Fire Code Administrative Fines",
    "628-BFP-11a": "Other Fees",
    "628-BFP-11b": "Certificate of Competency (COC)",
    // Add more mappings as needed
  };




const ViewPayment: React.FC<formdetails> = ({ open, handleClose, payor, business_permitno, ops_no, or_no, agency, payment_date, payment }) => {

    const [tableData, setTableData] = useState<Array<{ natureOfCollection: string; accountCode: string; amount: string }>>(
        payment.map(item => ({
            natureOfCollection: item[0] || '',
            accountCode: item[1] || '',
            amount: item[2] || '',
        })),
    );

    const payorRef = useRef<HTMLInputElement | null>(null);
    const bspermitnoRef = useRef<HTMLInputElement | null>(null);
    const ornumberRef = useRef<HTMLInputElement | null>(null);
    const opsnumberRef = useRef<HTMLInputElement | null>(null);
    const agencyRef = useRef<HTMLInputElement | null>(null);
    const dateRef = useRef<HTMLInputElement | null>(null);


    const handleAddRow = () => {
        const newRow = { natureOfCollection: '', accountCode: '', amount: '' };
        setTableData((prevData) => [...prevData, newRow]);
    };

    const handleDeleteRow = (rowIndex: number) => {
        const updatedData = [...tableData];
        updatedData.splice(rowIndex, 1);
        setTableData(updatedData);
    };

    const handleTableChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>,
        rowIndex: number,
        key: keyof typeof tableData[0]
      ) => {
        const newData = [...tableData];
      
        if ('target' in e) {
          newData[rowIndex][key] = e.target.value;
      
          // Update natureOfCollection when accountCode changes
          if (key === 'accountCode') {
            const selectedAccountCode = e.target.value;
            newData[rowIndex].natureOfCollection = accountCodeToNatureOfCollectionMap[selectedAccountCode];
          }
        } else {
          newData[rowIndex][key] = e;
        }
      
        setTableData(newData);
      };
      


    return (
        <Dialog open={open} fullWidth PaperProps={{ style: { backgroundColor: 'lightgrey', maxWidth: '1200px' } }}>
            <DialogTitle sx={{ height: '0px' }}>
                <IconButton sx={{ marginTop: '-25px', marginLeft: '-25px' }} onClick={handleClose}>
                    <CancelIcon sx={{ color: 'red' }} />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Card style={cardStyle} elevation={0}>
                    <CardContent style={{ marginLeft: 35, textAlign: 'center', marginTop: '-90px' }} >
                        <Grid container marginTop={'5rem'} style={{ height: '100%' }}>
                            <Grid item xs={10} sm={6}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph' style={{ marginLeft: '100px' }} >Payor</p>
                                    <OutlinedInput inputRef={payorRef} fullWidth className='custom-outlined-input' style={{ marginLeft: '100px', borderRadius: '11px', width: '340px' }} defaultValue={payor} readOnly />
                                </Stack>
                            </Grid>
                            <Grid item xs={10} sm={6}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph' >Business Permit No.</p>
                                    <OutlinedInput inputRef={bspermitnoRef} defaultValue={business_permitno} fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px', width: '360px' }} readOnly/>
                                </Stack>
                            </Grid>
                            <Grid item xs={10} sm={6}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph' style={{ marginLeft: '100px' }}>O.R. No.</p>
                                    <OutlinedInput inputRef={ornumberRef} defaultValue={or_no} fullWidth className='custom-outlined-input' style={{ marginLeft: '100px', borderRadius: '11px', width: '340px' }} readOnly/>
                                </Stack>
                            </Grid>
                            <Grid item xs={10} sm={6}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph' >OPS Number</p>
                                    <OutlinedInput inputRef={opsnumberRef} defaultValue={ops_no} fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px', width: '360px' }} readOnly/>
                                </Stack>
                            </Grid>
                            <Grid item xs={10} sm={6}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph' style={{ marginLeft: '100px' }}>Date</p>
                                    <OutlinedInput inputRef={dateRef} defaultValue={payment_date  ? new Date(payment_date).toISOString().split('T')[0] : ''}  fullWidth className='custom-outlined-input' style={{ marginLeft: '100px', borderRadius: '11px', width: '340px' }} placeholder='EX: YEAR-MONTH-DAY' readOnly/>
                                </Stack>
                            </Grid>
                            <Grid item xs={10} sm={6}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph' >Agency</p>
                                    <OutlinedInput inputRef={agencyRef} defaultValue={agency}  fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px', width: '360px' }}readOnly />
                                </Stack>
                            </Grid>
                            <Grid container marginTop={'5rem'} style={{ height: '100%' }}>
                                <Grid item xs={12}>
                                    <TableContainer>
                                        <Table sx={{ width: '100%', border: '1px solid #e0e0e0' }}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{ fontFamily: 'Oswald', fontSize: '16px', textAlign: 'center', background: '#f5f5f5' }}>Nature of Collection</TableCell>
                                                    <TableCell sx={{ fontFamily: 'Oswald', fontSize: '16px', textAlign: 'center', background: '#f5f5f5' }}>Account Code</TableCell>
                                                    <TableCell sx={{ fontFamily: 'Oswald', fontSize: '16px', textAlign: 'center', background: '#f5f5f5' }}>Amount</TableCell>
                                                    <TableCell sx={{ fontFamily: 'Oswald', fontSize: '16px', textAlign: 'center', background: '#f5f5f5' }}></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {tableData.map((row, rowIndex) => (
                                                    <TableRow key={rowIndex}>
                                                        <TableCell sx={{ fontFamily: 'Oswald', fontSize: '15px' }}>
                                                            <OutlinedInput
                                                                fullWidth
                                                                value={row.natureOfCollection}
                                                                onChange={(e) => handleTableChange(e, rowIndex, 'natureOfCollection')}
                                                                readOnly
                                                            />
                                                        </TableCell>
                                                        <TableCell sx={{ font: 'Oswald', fontSize: '15px' }} >
                                                            <Select
                                                                value={row.accountCode}
                                                                onChange={(e) => handleTableChange(e, rowIndex, 'accountCode')}
                                                                fullWidth
                                                                className='custom-outlined-input'
                                                                sx={{ borderRadius: '11px', height: '50px', textAlign: 'center' }}
                                                                style={{ alignSelf: 'center' }}
                                                                readOnly
                                                            >
                                                                {accountCodeOptions.map((option) => (
                                                                    <MenuItem key={option} value={option}>
                                                                        {option}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </TableCell>
                                                        <TableCell sx={{ fontFamily: 'Oswald', fontSize: '15px', alignItems: 'center' }}>
                                                            <OutlinedInput
                                                                style={{ margin: 'auto', textAlign: 'center' }}
                                                                fullWidth
                                                                value={row.amount}
                                                                onChange={(e) => handleTableChange(e, rowIndex, 'amount')}
                                                                readOnly
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button
                                                                variant="contained"
                                                                sx={{ borderRadius: '13px', height: '30px', backgroundColor: 'blue' }}
                                                                onClick={() => handleDeleteRow(rowIndex)}
                                                                disabled
                                                            >
                                                                Delete
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </DialogContent>
            <DialogActions style={{ justifyContent: 'center' }}>
                <Button variant='contained' onClick={handleClose} sx={{ backgroundColor: 'grey', borderRadius: '13px', height: '30px' }}>Close Payment</Button>
            </DialogActions>
        </Dialog>

    )
}

export default ViewPayment;