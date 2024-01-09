import Navbar from './Navbar'
import React, { useEffect, useState } from 'react';
import './BusinessList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import UpdateRenewalApplication from './Approved_Business-Renewal_Permits/UpdateRenewalApplication';
import ViewRenewalApplication from './Approved_Business-Renewal_Permits/ViewRenewalApplication';
import AddApplication from './AddApplication';
import axios from 'axios';
import EvaluatePopup from './Approved_Business-Renewal_Permits/EvaluateApprovedApplication';
import ViewEvaluate from './Approved_Business-Renewal_Permits/ViewEvaluate';
import DeleteEncoderPopup from './DeleteEncoderPopup';
import PrintEncoderPopup from './PrintEncoderPopup';
import RenewalChoicePopup from './RenewalChoicePopup';
import RenewPermit from './RenewPermit';
import { businessPermit } from '../types/Users';
import { DocumentData, QuerySnapshot, onSnapshot } from 'firebase/firestore';
import { renewalbusinessPermCollection } from '../lib/controller';



//Header Part
const AdditionalTab: React.FC = () => {

    return (
        <div className="additional-tab">
            <img src="/images/redfirefighter.jpg" alt="Background IMG" className="background-image" />
            <div className="content">
                <img src="/images/DILG_logo.png" alt="DILG" className="logo" />
                <div className="text">
                    <p>Bureau of Fire Protection</p>
                    <p>Region VII</p>
                    <p>(District/Provincial Office)</p>
                    <p>(Station)</p>
                </div>
                <img src="/images/BFP_logo.png" alt="BFP" className="logo" />
            </div>
        </div>
    );
};

const RenewalBusinessList: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [sortBy, setSortBy] = useState('Pending Records');
    const [open, setOpen] = useState(false);
    const [renewopen, setrenewOpen] = useState(false);
    const [openRenewChoice, setOpenRenewChoice] = useState(false);
    const [selectedAction, setSelectedAction] = useState<Record<string, string>>({});
    const [openViewRenewal, setopenViewRenewal] = useState<Record<string, boolean>>({});
    const [openUpdateRenewal, setopenUpdateRenewal] = useState<Record<string, boolean>>({});
    const [openEvaluateBusiness, setopenEvaluateBusiness] = useState<Record<string, boolean>>({});
    const [test, setTest] = useState<boolean>(false);
    const [openViewEvaluate, setopenViewEvaluate] = useState<Record<string, boolean>>({});
    const [openDelete, setOpenDelete] = useState<Record<string, boolean>>({});
    const [print, setPrint] = useState(false);
    const [businessPermit, setBusinessPermit] = useState<businessPermit[]>([]);

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
        if (sortBy === 'Pending Records') {
            axios.get('http://localhost:8080/Renewal/getAllRenewalPermit').then(res => {
                SetApplicationForm(res.data)
            }).catch(err => console.log(err))
        }
        else if (sortBy === 'Approved Records') {
            axios.get('http://localhost:8080/renewalbpapprovedapplication/getAllRenewalbpApprovedApplication').then(res => {
                SetApplicationForm(res.data)
            }).catch(err => console.log(err))
        }
    }, [sortBy, test]);*/

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


    const handleRender = () => {
        setTest(prevTest => !prevTest);
    };

    //Evaluate Popup
    const handleOpenEvaluate = (no: string) => {
        setopenEvaluateBusiness((prevOpenEvaluate) => ({
            ...prevOpenEvaluate,
            [no]: true,
        }));
    };

    //Evaluate Popup
    const handleCloseEvaluate = (no: string) => {
        setopenEvaluateBusiness((prevOpenEvaluate) => ({
            ...prevOpenEvaluate,
            [no]: false,
        }));
        handleRender();
    };

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };
    const handleSearch = () => {
        // Perform search logic here based on the searchText value
        // For example, you can filter the buildingApplications array based on the searchText
    };


    //Handles the selection of each Record, so that it doesnt change all the drop down option each change
    const handleActionChange = (event: React.ChangeEvent<HTMLSelectElement>, no: string) => {
        const value = event.target.value;
        setSelectedAction((prevSelectedAction) => ({
            ...prevSelectedAction,
            [no]: value
        }));
    };


    const handleSearchInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };
    //Open Add Application Popup
    const handleClickOpen = () => {
        setOpen(true);
    };

    //Close Add Application Popup
    const handleClickClose = () => {
        setOpen(false);
        handleRender();
    };

    const handleClickOpenRenewChoice = () => {
        setOpenRenewChoice(true);
    };

    //Close Add Application Popup
    const handleClickCloseRenewChoice = () => {
        setOpenRenewChoice(false);
        handleRender();
    };

    //Open Add Application Popup
    const handleClickOpenrenew = () => {
        setrenewOpen(true);
    };

    //Close Add Application Popup
    const handleClickCloserenew = () => {
        setrenewOpen(false);
        handleRender();
    };



    //VIEW Popup
    const handleOpenView = (no: string) => {
        setopenViewRenewal((prevRenewal) => ({
            ...prevRenewal,
            [no]: true,
        }));
    };

    //View Popup Close
    const handleCloseView = (no: string) => {
        setopenViewRenewal((prevRenewal) => ({
            ...prevRenewal,
            [no]: false,
        }));
        handleRender()
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
        handleRender()
    };


    //Update Popup 
    const handleOpenUpdate = (no: string) => {
        setopenUpdateRenewal((prevOpenUpdate) => ({
            ...prevOpenUpdate,
            [no]: true,
        }));

    };

    //Update Popup
    const handleCloseUpdate = (no: string) => {
        setopenUpdateRenewal((prevOpenUpdate) => ({
            ...prevOpenUpdate,
            [no]: false,
        }));
        handleRender()
    };

    // Print Popup 
    const handlePrintOpen = () => {
        setPrint(true);
    };
    // Print Popup
    const handlePrintClose = () => {
        setPrint(false);
    };

    //Delete Popup
    const handleOpenDelete = (no: string) => {
        setOpenDelete((prevRenewal) => ({
            ...prevRenewal,
            [no]: true,
        }));
    };

    //Delete Popup Close
    const handleCloseDelete = (no: string) => {
        setOpenDelete((prevRenewal) => ({
            ...prevRenewal,
            [no]: false,
        }));
        handleRender()
    };


    //Handles the button Logic 
    const handleNext = (value: string, status: string) => {
        const selectedValue = selectedAction[value];

        if (selectedValue === 'Delete') {
            // Perform delete logic here
            handleOpenDelete(value);

        } else if (status === 'Pending') {
            //Pending function condition goes here
            if (selectedValue === 'View') {
                handleOpenView(value);
            }
            else if (selectedValue === 'Update') {
                handleOpenUpdate(value);

            }
            else if (selectedValue === 'Evaluate') {
                handleOpenEvaluate(value);

            }
            else if (selectedValue === 'Print') {
                handlePrintOpen();

            }
        } else if ((status === 'FSIC Not Printed' || status === 'FSIC Printed')) {
            //Completed function condition goes here
            if (selectedValue === 'Evaluate') {
                alert('Application already evaluated!');
            }
            else if ((selectedValue === 'View') || (selectedValue === 'Update')) {
                handleOpenViewEval(value);
            }
            else if (selectedValue === 'Print') {
                handlePrintOpen();
            }
            else if (selectedValue === 'Delete') {
                // Perform delete logic here
                handleOpenDelete(value);
            }
        }
    }
    return (
        <>
            <AdditionalTab />
            <Navbar />
            <div className="app-container">
                <div className="header">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchText}
                            onChange={handleSearchInputChange}
                            onKeyPress={handleSearchInputKeyPress}
                        />
                        <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={handleSearch} />
                    </div>
                    <div className="title-container">
                        <h1 className="title">Business Renewal List</h1>
                    </div>
                    <div className="sort-container">
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} >
                            <option value="">Sort By</option>
                            <option value="Pending Records">Pending Records</option>
                            <option value="Approved Records">Approved Records</option>
                        </select>
                        <div className="date-input-container">
                            <Button
                                variant="outlined"
                                startIcon={<AddCircleOutlineIcon />}
                                onClick={handleClickOpenRenewChoice}
                                disableElevation
                                sx={{
                                    color: 'lightgrey',
                                    outlineColor: 'lightgrey',
                                    borderWidth: '3px',
                                    borderColor: 'lightgray',
                                    borderRadius: '15px',
                                    '&:hover': {
                                        borderWidth: '3px',
                                        borderColor: '#D02D2D',
                                        color: 'white'
                                    },
                                }}
                            >
                                Add Application
                            </Button>
                        </div>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Business Permit #</th>
                            <th>Owner's Name</th>
                            <th>Business Name</th>
                            <th>Type of Occupancy</th>
                            <th>{sortBy === 'NTC Records' ? 'NTC #' :
                                sortBy === 'NTCV Records' ? 'NTCV #' :
                                    sortBy === 'Abatement Records' ? 'Abatement#' :
                                        sortBy === 'Closure Records' ? 'Closure #' :
                                            'FSIC #'}</th>
                            <th>Remarks</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {businessPermit
                            .filter((businessPermit) => {
                                if (sortBy === 'Pending Records') {
                                    return businessPermit.remarks === 'Pending';
                                } else if (sortBy === 'Approved Records') {
                                    return businessPermit.remarks === 'FSIC Printed' || businessPermit.remarks === 'FSIC Not Printed';
                                } else {
                                    return true; // Show all records if no sortBy value is selected
                                }
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
                                    <td>{businessPermit.type_occupancy}</td>
                                    <td>{sortBy === 'Approved Records' ? businessPermit.fsicno :
                                        'N/A'}</td>
                                    <td style={{
                                        color: businessPermit.remarks === 'Complied' || businessPermit.remarks === 'FSIC Printed' ? 'green' :
                                            businessPermit.remarks === 'Pending' ? 'black'
                                                : 'red'
                                    }}>{businessPermit.remarks}</td>
                                    <td>
                                        <select
                                            value={selectedAction[businessPermit.id] || ''}
                                            onChange={(event) => handleActionChange(event, (businessPermit.id || ''))}
                                            style={{ height: '35px', width: '120px', borderRadius: '8px', textAlign: 'center', backgroundColor: '#D9D9D9' }}
                                        >
                                            <option value="">-select-</option>
                                            <option value="View">View</option>
                                            <option value="Update">Update</option>
                                            <option value="Evaluate">Evaluate</option>
                                            {/* <option value="Print">Print</option>*/}
                                            <option value="Delete">Delete</option>
                                        </select>
                                        <IconButton className="next-button" onClick={() => handleNext(businessPermit.id, (businessPermit.remarks || ''))}>
                                            <ArrowCircleRightIcon sx={{ color: '#3C486B' }} />
                                        </IconButton>
                                        <ViewRenewalApplication
                                            open={openViewRenewal[businessPermit.id]}
                                            handleClose={() => handleCloseView(businessPermit.id)}
                                            bspermit_no={businessPermit.bspermit_no || ''}
                                            permitee={businessPermit.permittee || ''}
                                            businessname={businessPermit.business_name || ''}
                                            address={businessPermit.address || ''}
                                            natureofbusiness={businessPermit.nature_business || ''}
                                            typeofoccupancy={businessPermit.type_occupancy || ''}
                                            contactno={businessPermit.contact_no || ''}
                                            email={businessPermit.email || ''}
                                            datereceived={businessPermit.date_received || ''}
                                        />
                                         <UpdateRenewalApplication
                                            open={openUpdateRenewal[businessPermit.id]}
                                            handleClose={() => handleCloseUpdate(businessPermit.id)}
                                            bspermit_no={businessPermit.bspermit_no || ''}
                                            permitee={businessPermit.permittee || ''}
                                            businessname={businessPermit.business_name || ''}
                                            address={businessPermit.address || ''}
                                            natureofbusiness={businessPermit.nature_business || ''}
                                            typeofoccupancy={businessPermit.type_occupancy || ''}
                                            contactno={businessPermit.contact_no || ''}
                                            email={businessPermit.email || ''}
                                            datereceived={businessPermit.date_received || ''}
                                            id={businessPermit.id}
                                            form="Renewal"
                                        />
                                        <EvaluatePopup
                                            form='Renewal'
                                            bpid={businessPermit.id}
                                            activity='Pending'
                                            open={openEvaluateBusiness[businessPermit.id]}
                                            permitee={businessPermit.permittee || ''}
                                            business_no={businessPermit.bspermit_no || ''}
                                            business_name={businessPermit.business_name || ''}
                                            address={businessPermit.address || ''}
                                            natureofbusiness={businessPermit.nature_business || ''}
                                            typeofoccupancy={businessPermit.type_occupancy || ''}
                                            contactno={businessPermit.contact_no || ''}
                                            email={businessPermit.email || ''}
                                            datereceived={businessPermit.date_received || ''}
                                            handleClose={() => handleCloseEvaluate(businessPermit.id)}
                                        />
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
                                        <DeleteEncoderPopup
                                            open={openDelete[businessPermit.id]}
                                            value={businessPermit.id}
                                            remarks={businessPermit.remarks || ''}
                                            form="Renewal"
                                            handleClose={() => handleCloseDelete(businessPermit.id)}
                                        />
                                    </td>
                                    {/*
                                        <PrintEncoderPopup
                                            open={print}
                                            handleClose={() => handlePrintClose()}
                                        />*/}
                                </tr>

                            ))}
                    </tbody>
                </table>
                <RenewalChoicePopup
                    open={openRenewChoice}
                    handleClose={handleClickCloseRenewChoice}
                    handleOpenAddRenewal={handleClickOpen}
                    handleOpenFindRenewal={handleClickOpenrenew}
                />
                <AddApplication open={open} handleClose={handleClickClose} add="Renewal" />
                <RenewPermit open={renewopen} handleClose={handleClickCloserenew} />

            </div>
        </>
    )
}

export default RenewalBusinessList