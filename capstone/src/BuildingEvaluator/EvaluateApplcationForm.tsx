import React, { useState } from 'react';
import '../Form.css'
import { Button, Card, CardContent, Grid, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack} from '@mui/material';
import { useLocation } from 'react-router-dom';


const cardStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 800,
    backgroundColor: 'lightgrey',
    flexGrow: 1,
    borderRadius: '10px',
}; //Style Purposes

export interface formdetails {
    no?: number;
    buildingPermitNo?: string;
    applicantName?: string;
    projectName?: string;
    update: boolean;
    //Add remaining Values here later 

}
// interface TableData {
//     natureOfCollection: string;
//     accountCode: string;
//     amount: string;
// }


export default function EvaluateApplicationForm() {

    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedValue, setSelectedValue] = React.useState<boolean>(false);
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };
    // const [tableData, setTableData] = useState<TableData[]>([
    //     { natureOfCollection: '', accountCode: '', amount: '' },
    // ]);

    // FOR PRINT AND CREATE PAYMENT PURPOSES
    // const handleAddRow = () => {
    //     setTableData([...tableData, { natureOfCollection: '', accountCode: '', amount: '' }]);
    // };

    // const handleChange = (index: number, field: keyof TableData, value: string) => {
    //     const updatedTableData = [...tableData];
    //     updatedTableData[index][field] = value;
    //     setTableData(updatedTableData);
    // };

    const handleStatus = (event: SelectChangeEvent<string>) => {
        const value = event.target.value as string;
        setSelectedValue(value === 'true');
    };
    const location = useLocation();
    const { buildingno, update } = location.state;

    // const updateFunction = () => {
    //     //Update Later once there is backend
    // }
    // const evaluateFunction = () => {
    //     //Update Later once there is backend
    // }

    // const handleClick = () => {
    //     if (update) {
    //         updateFunction();
    //     } else {
    //         evaluateFunction();
    //     }
    // };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200vh' }}>
                <Card style={cardStyle}>
                    <CardContent style={{ marginLeft: 35, textAlign: 'center' }} >
                        <Grid container marginTop={'1rem'} style={{ height: '100%' }}>
                            <Grid item xs={10} sm={11}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph'>Building Permit Number</p>
                                    <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={buildingno} />
                                </Stack>
                            </Grid>
                            <Grid item xs={10} sm={11}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph'>Name of Owner/Permitee</p>
                                    <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={buildingno} />
                                </Stack>
                            </Grid>
                            <Grid item xs={10} sm={11}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph'>Business Name</p>
                                    <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={buildingno} />
                                </Stack>
                            </Grid>
                            <Grid item xs={10} sm={11}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph'>Address</p>
                                    <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} />
                                </Stack>
                            </Grid>
                            <Grid item xs={10} sm={6}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph'>Type of Occupancy</p>
                                    <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} />
                                </Stack>
                            </Grid>
                            <Grid item xs={10} sm={5}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph'>Contact Number</p>
                                    <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} />
                                </Stack>
                            </Grid>
                            <Grid item xs={10} sm={11}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph'>Date Received</p>
                                    <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={selectedDate} onChange={handleDateChange} />
                                </Stack>
                            </Grid>
                            <Grid item xs={10} sm={11}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph'>Received By</p>
                                    <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} />
                                </Stack>
                            </Grid>
                            <Grid item xs={10} sm={11}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph'>------------------------------------------------------
                                        Evaluate Form-------------------------------------------------------</p>
                                </Stack>
                            </Grid>
                            <Grid item xs={10} sm={11}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph'>Evaluator</p>
                                    <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} />
                                </Stack>
                            </Grid>
                            <Grid item xs={10} sm={11}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph'>Status</p>
                                    <Select value={selectedValue.toString()} onChange={handleStatus}
                                        sx={{ height: '30px', width: '200px', borderRadius: '14px', borderWidth: '20px' }}
                                    >
                                        <MenuItem value="false">Approved</MenuItem>
                                        <MenuItem value="true">Disaproved</MenuItem>
                                    </Select>
                                </Stack>
                            </Grid>
                            <Grid item xs={10} sm={5}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph'>Number of Storey</p>
                                    <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} />
                                </Stack>
                            </Grid>
                            <Grid item xs={10} sm={6}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph'>New Construction/Renovation</p>
                                    <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} />
                                </Stack>
                            </Grid>
                            <Grid item xs={10} sm={11}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph'>Building/Structure Already Constructed?</p>
                                    <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} />
                                </Stack>
                            </Grid>
                            <Grid item xs={10} sm={5}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph'>Remarks</p>
                                    <OutlinedInput fullWidth className='custom-outlined-input' sx={{ borderRadius: '11px' }} defaultValue={"Not Printed"} readOnly />
                                </Stack>
                            </Grid>
                            <Grid item xs={10} sm={11}>
                                <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                    <p className='custom-paragraph'>Defects/Deficiencies</p>
                                    <OutlinedInput fullWidth className='custom-outlined-input-multiline'
                                        sx={{
                                            borderRadius: '11px',
                                            height: '100px',
                                            paddingTop: '0',
                                            '& textarea': {
                                                paddingTop: '20px', // Adjust the value as needed
                                            },
                                        }
                                        } multiline
                                        disabled={!selectedValue}
                                        rows={2}
                                    />
                                </Stack>
                            </Grid>
                           {/* <Grid item xs={10} sm={11} sx={{ marginTop: '10px' }}>
                                <TableContainer component={Paper} sx={{ backgroundColor: 'lightgrey' }}>
                                    <Table style={{ borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                                        <TableHead >
                                            <TableRow >
                                                <TableCell align="center" style={{ backgroundColor: 'grey', fontFamily: 'Oswald' }} >Nature of Collection</TableCell>
                                                <TableCell align="center" style={{ backgroundColor: 'grey', fontFamily: 'Oswald' }}>Account Code</TableCell>
                                                <TableCell align="center" style={{ backgroundColor: 'grey', fontFamily: 'Oswald' }}>Amount</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody >
                                            {tableData.map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell align="center" style={{ backgroundColor: 'lightgrey' }}>
                                                        <Select sx={{ width: '200px', height: '40px' }}>
                                                        </Select>
                                                    </TableCell>
                                                    <TableCell align="center" style={{ backgroundColor: 'lightgrey' }}>
                                                        <TextField
                                                            sx={{ width: '9rem' }}
                                                            type="text"
                                                            value={row.accountCode}
                                                            onChange={(e) => handleChange(index, 'accountCode', e.target.value)}
                                                            inputProps={{ style: { height: '10px' } }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center" style={{ backgroundColor: 'lightgrey' }}>
                                                        <TextField
                                                            sx={{ width: '9rem' }}
                                                            type="text"
                                                            value={row.amount}
                                                            onChange={(e) => handleChange(index, 'amount', e.target.value)}
                                                            inputProps={{ style: { height: '10px' } }}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    <Button variant="contained" onClick={handleAddRow} style={{ marginBottom: '8px', backgroundColor: 'blueviolet' }}>Add Row</Button>
                                </TableContainer>
                          </Grid>*/}
                            <Grid item xs={10} sm={11} sx={{ marginTop: '10px' }}>
                                <Button variant='contained' style={{ backgroundColor: 'blueviolet' }}>
                                    {update ? 'Update Evaluation' : 'Add Evaluation'}</Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}


