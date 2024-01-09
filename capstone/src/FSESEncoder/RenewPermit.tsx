import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CancelIcon from '@mui/icons-material/Cancel';
import './BusinessList.css';
import IconButton from '@mui/material/IconButton';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Card, CardContent, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, MenuItem, OutlinedInput, Radio, RadioGroup, Select, SelectChangeEvent, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ViewEvaluate from './Approved_Business-Renewal_Permits/ViewEvaluate';
import AddApplication from './AddApplication';
import { businessPermit } from '../types/Users';
import { renewalbusinessPermCollection } from '../lib/controller';
import { onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';

const cardStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 1200,
    backgroundColor: '#3C486B',
}; //Style Purposes

export interface formdetails {
    open: boolean;
    handleClose: () => void;
}



const RenewPermit: React.FC<formdetails> = ({ open, handleClose }) => {

    const [selectedAction, setSelectedAction] = useState<Record<string, string>>({});
    const [searchText, setSearchText] = useState('');
    const [openViewEvaluate, setopenViewEvaluate] = useState<Record<string, boolean>>({});
    const [openAdd, setopenAdd] = useState<Record<string, boolean>>({});

    const [businessPermit, setBusinessPermit] = useState<businessPermit[]>([]);

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const [applicationform, SetApplicationForm] = useState([{
        id: 0,
        bspermit_no: "F2-010",
        permittee: "JohnDoe",
        business_name: "Default",
        address: 'Default Location',
        nature_business: "test",
        type_occupancy: "test",
        contact_no: '09123123123',
        email: 'test@gmail',
        date_received: '2023-01-01',
        date_inspection: "2023-01-01",
        inspection_no: 2,
        fsic_no: 2,
        fsic_date: '2023-01-01',
        ntc_no: 2,
        ntc_date: '2023-01-01',
        ntcv_no: 2,
        ntcv_date: '2023-01-01',
        or_no: 2,
        amount: 2000,
        payment_date: '2023-01-01',
        abatement_no: 2,
        abatement_date: '01/01/2001',
        closure_no: 2,
        closure_date: '01/01/2001',
        remarks: "Pending",
        team_leader: "Jobert",
        fire_inspectors: ["test", "test1"],
        recommendation: ["reco1", "reco2", "reco3"],
        defects: [['test'], ['test2']]
    }])

    /*useEffect(() => {
        axios.get('http://localhost:8080/renewalbpapprovedapplication/getAllRenewalbpApprovedApplication').then(res => {
            SetApplicationForm(res.data)
        }).catch(err => console.log(err))

    }, []);*/

    useEffect(
        () =>
            onSnapshot(renewalbusinessPermCollection, (snapshot:
                QuerySnapshot<DocumentData>) => {
                setBusinessPermit(
                    snapshot.docs.map((doc) => {
                        return {
                            id: doc.id,
                            ...doc.data(),
                        };
                    })
                );
                console.log(businessPermit)
            }),
        []
    )


    const handleActionChange = (event: React.ChangeEvent<HTMLSelectElement>, no: string) => {
        const value = event.target.value;
        setSelectedAction((prevSelectedAction) => ({
            ...prevSelectedAction,
            [no]: value
        }));
    };

    const handleClickOpen = (no: string) => {
        setopenAdd((prevAdd) => ({
            ...prevAdd,
            [no]: true,
        }));
    };


    const handleClickClose = (no: string) => {
        setopenAdd((prevAdd) => ({
            ...prevAdd,
            [no]: false,
        }));
    };

    //VIEW Evaliate Popup
    const handleOpenViewEval = (no: string) => {
        setopenViewEvaluate((prevRenewal) => ({
            ...prevRenewal,
            [no]: true,
        }));
    };

    //View Evaluate  Close
    const handleCloseViewEval = (no: string) => {
        setopenViewEvaluate((prevRenewal) => ({
            ...prevRenewal,
            [no]: false,
        }));
    };


    const handleNext = (value: string, status: string) => {
        const selectedValue = selectedAction[value];

        if (selectedValue === "View") {
            handleOpenViewEval(value);
        }
        else if (selectedValue === "Renew") {
            handleClickOpen(value);
        }

    }










    return (
        <div>
            <Dialog open={open} fullWidth PaperProps={{ style: { backgroundColor: 'white', maxWidth: '1100px' } }}>
                <DialogTitle sx={{ height: '0px' }}>
                    <IconButton sx={{ marginTop: '-25px', marginLeft: '-25px' }} onClick={handleClose}>
                        <CancelIcon sx={{ color: 'red' }} />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Card style={cardStyle} elevation={0}>
                        <CardContent style={{ marginLeft: 35, textAlign: 'center', marginTop: '-90px', alignItems: 'center' }} >
                            <Grid container marginTop={'5rem'} style={{ height: '100%' }}>
                                <Grid item xs={10} sm={11}>
                                    <Stack spacing={-1} sx={{ alignItems: 'flex-start' }}>
                                        <p style={{ alignSelf: 'center', fontSize: '1.5em', fontWeight: 'bold', color: 'white' }}>Renewal Business Permits</p>
                                    </Stack>
                                </Grid>
                                <Grid item xs={10} sm={11}>
                                    <input
                                        type="text"
                                        placeholder="Search Name or Business Permit No."
                                        value={searchText}
                                        onChange={handleSearchInputChange}
                                        style={{ width: "600px", height: "30px", backgroundColor: "white", borderRadius: "10px" }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} style={{ alignItems: "center" }}>
                                    <div className="app-container">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Business Permit #</th>
                                                    <th>Owner's Name</th>
                                                    <th>Business Name</th>
                                                    <th>FSIC Date</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <>
                                                    {businessPermit
                                                        .filter((businessPermit) => {
                                                            return businessPermit.remarks === 'FSIC Printed' || businessPermit.remarks === 'FSIC Not Printed';
                                                        })
                                                        .filter((businessPermit) => {
                                                            // Filter based on the searchText value
                                                            if (searchText === '') {
                                                                return true; // Show all records if no search text is entered
                                                            } else {
                                                                // Filter based on the businessPermitNo or ownerName containing the searchText
                                                                const business_no = businessPermit?.bspermit_no || '';
                                                                const permittee = businessPermit?.permittee || '';
                                                                return (
                                                                    business_no.toLowerCase().includes(searchText.toLowerCase()) ||
                                                                    permittee.toLowerCase().includes(searchText.toLowerCase())
                                                                );
                                                            }
                                                        })
                                                        .map((businessPermit) => (
                                                            <tr key={businessPermit.id}>
                                                                <td>{businessPermit.bspermit_no}</td>
                                                                <td>{businessPermit.permittee}</td>
                                                                <td>{businessPermit.business_name}</td>
                                                                <td>{businessPermit.fsicdate}</td>
                                                                <td>
                                                                    <select
                                                                        value={selectedAction[businessPermit.id] || ''}
                                                                        onChange={(event) => handleActionChange(event, businessPermit.id)}
                                                                        style={{ height: '35px', width: '120px', borderRadius: '8px', textAlign: 'center', backgroundColor: '#D9D9D9' }}
                                                                    >
                                                                        <option value="">-select-</option>
                                                                        <option value="View">View</option>
                                                                        <option value="Renew">Renew</option>
                                                                    </select>
                                                                    <IconButton className="next-button" onClick={() => handleNext(businessPermit.id, businessPermit.remarks || '')}>
                                                                        <ArrowCircleRightIcon sx={{ color: '#3C486B' }} />
                                                                    </IconButton>
                                                                </td>
                                                                <ViewEvaluate
                                                                    form={selectedAction[businessPermit.id]}
                                                                    permit='Renewal'
                                                                    open={openViewEvaluate[businessPermit.id]}
                                                                    handleClose={() => handleCloseViewEval(businessPermit.id)}
                                                                    bpid={businessPermit.id}
                                                                    business_no={businessPermit.bspermit_no || ''}
                                                                    permitee={businessPermit.permittee || ''}
                                                                    business_name={businessPermit.business_name || ''}
                                                                    address={businessPermit.address || ''}
                                                                    natureofbusiness={businessPermit.nature_business || ''}
                                                                    typeofoccupancy={businessPermit.type_occupancy || ''}
                                                                    contactno={businessPermit.contact_no || ''}
                                                                    email={businessPermit.email || ''}
                                                                    date_received={businessPermit.date_received || ''}
                                                                    date_inspection={businessPermit.dateinspection || ''}
                                                                    inspection_no={businessPermit.inspection_no || 0}
                                                                    fsic_no={businessPermit.fsicno || 0}
                                                                    fsic_date={businessPermit.fsicdate || ''}
                                                                    amount={businessPermit.amount || 0}
                                                                    or_no={businessPermit.orno || 0}
                                                                    payment_date={businessPermit.date || ''}
                                                                    remarks={businessPermit.remarks || ''}
                                                                    team_leader={businessPermit.teamleader || ''}
                                                                    fire_inspectors={businessPermit.fireinspectors ? ([] as string[]).concat(businessPermit.fireinspectors) : []}
                                                                    recommendation={businessPermit.recommendation}
                                                                />
                                                                <AddApplication
                                                                    open={openAdd[businessPermit.id]}
                                                                    handleClose={() => handleClickClose(businessPermit.id)}
                                                                    add="Renewal"
                                                                    buildingpermit={businessPermit.bspermit_no}
                                                                    name={businessPermit.permittee}
                                                                    address={businessPermit.address}
                                                                    businessname={businessPermit.business_name}
                                                                    natureofbusiness={businessPermit.nature_business}
                                                                    typeofoccupancy={businessPermit.type_occupancy}
                                                                    contactno={businessPermit.contact_no}
                                                                    email={businessPermit.email}

                                                                />
                                                            </tr>
                                                        ))}
                                                </>
                                            </tbody>
                                        </table>

                                    </div>
                                </Grid>
                            </Grid>

                        </CardContent>
                    </Card>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default RenewPermit;