import React, { useRef } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import { Card, CardContent, DialogActions, DialogContent, DialogTitle, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import AddPaymentPopup from './AddPaymentPopup';

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
    payor: string;
    bspermit_no: string;
    ornumber: string;
    opsnumber: string;
    date:string;
    agency: string;
    natureOfCollection: string;
    accountCode: string;
    amount:string;
}



const ViewPaymentPopup: React.FC<formdetails> = (props: formdetails) => {

    // const natureOfCollection = useRef<HTMLInputElement | null>(null);
    // const accountCode = useRef<HTMLInputElement | null>(null);
    // const amount = useRef<HTMLInputElement | null>(null);
    // const addressRef = useRef<HTMLInputElement | null>(null);
    // const typeofoccupancyRef = useRef<HTMLInputElement | null>(null);
    // const contactnoRef = useRef<HTMLInputElement | null>(null);
    // const dateReceivedRef = useRef<HTMLInputElement | null>(null);
    // const receivedbyRef = useRef<HTMLInputElement | null>(null);

    const tableData = [
        { natureOfCollection: 'Collection 1', accountCode: 'ACC001', amount: '100.00' },
        { natureOfCollection: 'Collection 2', accountCode: 'ACC002', amount: '75.50' },
        { natureOfCollection: 'Collection 3', accountCode: 'ACC003', amount: '200.25' },
        { natureOfCollection: 'Collection 4', accountCode: 'ACC004', amount: '50.75' },
        { natureOfCollection: 'Collection 5', accountCode: 'ACC005', amount: '150.30' },
    ]
      

    return (
        <div>
            <Dialog open={props.open} maxWidth="md" fullWidth PaperProps={{ style: { backgroundColor: 'lightgrey' } }}>
                <DialogTitle sx={{ height: '0px' }}>
                    <IconButton sx={{ marginTop: '-25px', marginLeft: '-25px' }} onClick={props.handleClose}>
                        <CancelIcon sx={{ color: 'red' }} />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                    <Card style={cardStyle} elevation={0}>
                        <CardContent style={{ marginLeft: 35, textAlign: 'center' }} >
                            <Grid container marginTop={'5rem'} style={{ height: '100%' }}>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Payor</p>
                                        <TextField  className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} variant='standard' disabled defaultValue={props.payor}/>
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Business Permit No.</p>
                                        <TextField  fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} variant='standard' disabled defaultValue={props.bspermit_no}/>
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >O.R. No.</p>
                                        <TextField className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }}variant='standard' disabled defaultValue={props.ornumber}/>
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >OPS Number</p>
                                        <TextField  className='custom-outlined-input' sx={{ borderRadius: '11px', width: "365px" }} variant='standard' disabled defaultValue={props.opsnumber}/>
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Date</p>
                                        <TextField fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px', width: "330px" }} variant='standard' disabled defaultValue={props.date ? new Date(props.date).toISOString().split('T')[0] : ''}/>
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={6}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p className='custom-paragraph' >Agency</p>
                                        <TextField  fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} variant='standard' disabled defaultValue={props.bspermit_no}/>
                                    </Stack>
                                </Grid>
                                <Grid container marginTop={'5rem'} style={{ height: '100%'}}>
                                    <Grid item xs={12}>
                                    <TableContainer>
                                        <Table sx={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto' }}>
                                        <TableHead>
                                        <TableRow>
                                            <TableCell sx ={{fontFamily: 'Oswald', fontSize: '16px', textAlign: 'center'}}>Nature of Collection</TableCell>
                                            <TableCell sx ={{fontFamily: 'Oswald', fontSize: '16px', textAlign: 'center' }}>Account Code</TableCell>
                                            <TableCell sx ={{fontFamily: 'Oswald', fontSize: '16px', textAlign: 'center' }}>Amount</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {tableData.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell sx ={{fontFamily: 'Oswald', fontSize: '14px', textAlign: 'center'}}>{row.natureOfCollection}</TableCell>
                                                <TableCell sx ={{fontFamily: 'Oswald', fontSize: '14px', textAlign: 'center'}}>{row.accountCode}</TableCell>
                                                <TableCell sx ={{fontFamily: 'Oswald', fontSize: '14px', textAlign: 'center'}}>{row.amount}</TableCell>
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
                    <Button variant='contained' onClick={props.handleClose} sx={{ backgroundColor: 'Red', borderRadius: '13px', height: '30px' }}>Close</Button>
                </DialogActions>
            </Dialog>


        </div>
    )
}

export default ViewPaymentPopup;