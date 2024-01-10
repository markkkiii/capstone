import React, { useEffect, useState } from 'react';
import './ClerkCSS.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ClerkNavbar from './ClerkNavbar';
import DeleteClerkPopup from './DeleteClerkPopup';
import PrintClerkPopup from './PrintClerkPopup';
import axios from 'axios';
import EvaluateNTCPopup from './Dissapproved_New-Renewal_Business/EvaluateNTC';
import EvaluateChoicePopup from './Dissapproved_New-Renewal_Business/EvaluateChoicePopup';
import EvaluateNTCVPopup from './Dissapproved_New-Renewal_Business/EvaluateNTCV';
import EvaluateAbatementPopup from './Dissapproved_New-Renewal_Business/EvaluateAbatement';
import EvaluateClosurePopup from './Dissapproved_New-Renewal_Business/EvaluateClosure';
import ViewUpdateNTC from './Dissapproved_New-Renewal_Business/View-UpdateNTC';
import ViewUpdateNTCVPopup from './Dissapproved_New-Renewal_Business/View-UpdateNTCV';
import ViewUpdateAbatementPopup from './Dissapproved_New-Renewal_Business/View-UpdateAbatement';
import ViewUpdateClosurePopup from './Dissapproved_New-Renewal_Business/View-UpdateClosure';
import EvaluatePopup from '../FSESEncoder/Approved_Business-Renewal_Permits/EvaluateApprovedApplication';
import ViewRenewalApplication from '../FSESEncoder/Approved_Business-Renewal_Permits/ViewRenewalApplication';
import UpdateRenewalApplication from '../FSESEncoder/Approved_Business-Renewal_Permits/UpdateRenewalApplication';
import { disapprovedNewBusinessPermit, NTCNewBusiness, NTCVNewBusiness, AbatementNewBusiness, ClosureNewBusiness } from '../types/Users';
import { onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { businessPermCollection, NTCNewBusinessCollection, NTCVNewBusinessCollection, abatementNewBusinessCollection, closureNewBusinessCollection, NTCBusinessRenewalCollection, NTCVBusinessRenewalCollection, abatementBusinessRenewalCollection, closureBusinessRenewalCollection, renewalbusinessPermCollection } from '../lib/controller';


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

const DisapprovedRenewalList: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [sortBy, setSortBy] = useState('Pending Records');
    const [open, setOpen] = useState(false);
    const [selectedAction, setSelectedAction] = useState<Record<string, string>>({});
    const [openViewPending, setopenViewPending] = useState<Record<string, boolean>>({});
    const [openUpdatePending, setopenUpdatePending] = useState<Record<string, boolean>>({});
    const [openViewUpdateNTCV, setopenViewUpdateNTCV] = useState<Record<string, boolean>>({}); //Opens Update/View NTCV Form
    const [openprevViewUpdateNTC, setopenViewUpdateNTC] = useState<Record<string, boolean>>({}); //Opens Update/View NTC Form
    const [openViewUpdateAbatement, setopenViewUpdateAbatement] = useState<Record<string, boolean>>({}); //Opens Update/Vew NTCV Form
    const [openViewUpdateClosure, setopenViewUpdateClosure] = useState<Record<string, boolean>>({}); //Opens NTCV Form
    const [openprevEvaluateNTC, setopenprevEvaluateNTC] = useState<Record<string, boolean>>({}); //Opens NTC Form
    const [openprevEvaluateNTCV, setopenprevEvaluateNTCV] = useState<Record<string, boolean>>({}); //Opens NTCV Form
    const [openprevEvaluateAbatement, setopenprevEvaluateAbatement] = useState<Record<string, boolean>>({}); //Opens Abatement Form
    const [openprevEvaluateClosure, setopenprevEvaluateClosure] = useState<Record<string, boolean>>({}); //Opens Closure Form
    const [openEvalChoice, setopenEvalChoice] = useState<Record<string, boolean>>({});//Open NTC Choice Pop up
    const [openEvaluateBusiness, setopenEvaluateBusiness] = useState<Record<string, boolean>>({});
    const [test, setTest] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<Record<string, boolean>>({});
    const [disapprovedNewBusinessPermit, setdisapprovedNewBusinessPermit] = useState<disapprovedNewBusinessPermit[]>([]);
    const [print, setPrint] = useState(false);


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
        date_inspected: "2023-01-01",
        inspection_no: 2,
        fsic_no: 2,
        fsic_date: '2023-01-01',
        ntc_no: 2,
        ntc_date: '2023-01-01',
        ntcv_no: 2,
        ntcv_date: '2023-01-01',
        abatement_no: 2,
        abatement_date: '2023-01-01',
        or_no: 2,
        amount: 2000,
        payment_date: '2023-01-01',
        closure_no: 2,
        closure_date: '01/01/2001',
        remarks: "Pending",
        team_leader: "Jobert",
        fire_inspectors: ["test", "test1"],
        recommendation: ["reco1", "reco2", "reco3"],
        defects: [['test'], ['test2']],
        name: 'Default',
        date: '01/01/2001',
        status: 'default'
    }])

    useEffect(
        () => {
            if (sortBy === "Pending Records") {
                onSnapshot(renewalbusinessPermCollection, (snapshot:
                    QuerySnapshot<DocumentData>) => {
                    setdisapprovedNewBusinessPermit(
                        snapshot.docs.map((doc) => {
                            return {
                                id: doc.id,
                                ...doc.data(),
                            };
                        })
                    );
                    console.log(disapprovedNewBusinessPermit)
                })
            }
            else if (sortBy === "NTC Records") {
                onSnapshot(NTCBusinessRenewalCollection, (snapshot:
                    QuerySnapshot<DocumentData>) => {
                    setdisapprovedNewBusinessPermit(
                        snapshot.docs.map((doc) => {
                            return {
                                id: doc.id,
                                ...doc.data(),
                            };
                        })
                    );
                    console.log(disapprovedNewBusinessPermit)
                })
            }
            else if (sortBy === "NTCV Records") {
                onSnapshot(NTCVBusinessRenewalCollection, (snapshot:
                    QuerySnapshot<DocumentData>) => {
                    setdisapprovedNewBusinessPermit(
                        snapshot.docs.map((doc) => {
                            return {
                                id: doc.id,
                                ...doc.data(),
                            };
                        })
                    );
                    console.log(disapprovedNewBusinessPermit)
                })
            }
            else if (sortBy === "Abatement Records") {
                onSnapshot(abatementBusinessRenewalCollection, (snapshot:
                    QuerySnapshot<DocumentData>) => {
                    setdisapprovedNewBusinessPermit(
                        snapshot.docs.map((doc) => {
                            return {
                                id: doc.id,
                                ...doc.data(),
                            };
                        })
                    );
                    console.log(disapprovedNewBusinessPermit)
                })
            }
            else if (sortBy === "Closure Records") {
                onSnapshot(closureBusinessRenewalCollection, (snapshot:
                    QuerySnapshot<DocumentData>) => {
                    setdisapprovedNewBusinessPermit(
                        snapshot.docs.map((doc) => {
                            return {
                                id: doc.id,
                                ...doc.data(),
                            };
                        })
                    );
                    console.log(disapprovedNewBusinessPermit)
                })
            }
        }, [sortBy]
    )



    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };
    const handleSearch = () => {
        // Perform search logic here based on the searchText value
        // For example, you can filter the buildingApplications array based on the searchText
    };

    const handleRender = () => {
        setTest(prevTest => !prevTest);
    };
    //Open EVAL NTC
    const handleOpenEvalNTC = (no: string) => {
        setopenprevEvaluateNTC((prevEvaluateNTC) => ({
            ...prevEvaluateNTC,
            [no]: true,
        }));
        handleRender();
    };
    //Close EVAL NTC
    const handleCloseEvalNTC = (no: string) => {
        setopenprevEvaluateNTC((prevEvaluateNTC) => ({
            ...prevEvaluateNTC,
            [no]: false,
        }));
        handleRender();
    };

    //Opens Evaluate NTC
    const handleOpenViewUpdateNTC = (no: string) => {
        setopenViewUpdateNTC((prevEvaluateNTC) => ({
            ...prevEvaluateNTC,
            [no]: true,
        }));
        handleRender();
    };
    // Closes Evaluate NTC
    const handleCloseViewUpdateNTC = (no: string) => {
        setopenViewUpdateNTC((prevEvaluateNTC) => ({
            ...prevEvaluateNTC,
            [no]: false,
        }));
        handleRender();
    };

    //Opens Update View NTCV
    const handleOpenViewUpdateNTCV = (no: string) => {
        setopenViewUpdateNTCV((prevEvaluateNTC) => ({
            ...prevEvaluateNTC,
            [no]: true,
        }));
        handleRender();
    };
    // Closes Update View NTCV
    const handleCloseViewUpdateNTCV = (no: string) => {
        setopenViewUpdateNTCV((prevEvaluateNTC) => ({
            ...prevEvaluateNTC,
            [no]: false,
        }));
        handleRender();
    };

    //Opens Update View Abatement
    const handleOpenViewUpdateAbatement = (no: string) => {
        setopenViewUpdateAbatement((prevEvaluateAbatement) => ({
            ...prevEvaluateAbatement,
            [no]: true,
        }));
        handleRender();
    };
    // Closes Update View Abatement
    const handleCloseViewUpdateAbatement = (no: string) => {
        setopenViewUpdateAbatement((prevEvaluateAbatement) => ({
            ...prevEvaluateAbatement,
            [no]: false,
        }));
        handleRender();
    };

    //Opens Update View Closure
    const handleOpenViewUpdateClosure = (no: string) => {
        setopenViewUpdateClosure((prevEvaluateAbatement) => ({
            ...prevEvaluateAbatement,
            [no]: true,
        }));
        handleRender();
    };
    // Closes Update View Closure
    const handleCloseViewUpdateClosure = (no: string) => {
        setopenViewUpdateClosure((prevEvaluateAbatement) => ({
            ...prevEvaluateAbatement,
            [no]: false,
        }));
        handleRender();
    };


    //Opens Evaluate Choice
    const handleOpenEvalChoice = (no: string) => {
        setopenEvalChoice((prevEvalChoice) => ({
            ...prevEvalChoice,
            [no]: true,
        }));
        handleRender();
    };
    // Closes Evaluate Choice
    const handleCloseEvalCHoice = (no: string) => {
        setopenEvalChoice((prevEvalChoice) => ({
            ...prevEvalChoice,
            [no]: false,
        }));
        handleRender();
    };

    //Open Approved Eval Popup
    const handleOpenEvaluate = (no: string) => {
        setopenEvaluateBusiness((prevOpenEvaluate) => ({
            ...prevOpenEvaluate,
            [no]: true,
        }));
        handleRender();
    };

    //Close Approved Eval Popup
    const handleCloseEvaluate = (no: string) => {
        setopenEvaluateBusiness((prevOpenEvaluate) => ({
            ...prevOpenEvaluate,
            [no]: false,
        }));
        handleRender()
    };


    //Opens Evaluate NTCV
    const handleOpenNTCV = (no: string) => {
        setopenprevEvaluateNTCV((prevEvaluateNTCV) => ({
            ...prevEvaluateNTCV,
            [no]: true,
        }));
        handleRender();
    };
    // Closes Evaluate NTCV
    const handleCloseNTCV = (no: string) => {
        setopenprevEvaluateNTCV((prevEvaluateNTCV) => ({
            ...prevEvaluateNTCV,
            [no]: false,
        }));
        handleRender();
    };

    //Opens Evaluate Abatement
    const handleOpenAbatement = (no: string) => {
        setopenprevEvaluateAbatement((prevEvaluateAbatement) => ({
            ...prevEvaluateAbatement,
            [no]: true,
        }));
        handleRender();
    };
    // Closes Evaluate Abatement
    const handleCloseAbatement = (no: string) => {
        setopenprevEvaluateAbatement((prevEvaluateAbatement) => ({
            ...prevEvaluateAbatement,
            [no]: false,
        }));
        handleRender();
    };

    //Opens Evaluate Closure
    const handleOpenClosure = (no: string) => {
        setopenprevEvaluateClosure((prevEvaluateClosure) => ({
            ...prevEvaluateClosure,
            [no]: true,
        }));
        handleRender();
    };
    // Closes Evaluate Closure
    const handleCloseClosure = (no: string) => {
        setopenprevEvaluateClosure((prevEvaluateClosure) => ({
            ...prevEvaluateClosure,
            [no]: false,
        }));
        handleRender();
    };

    // Gets Data from the DATABASE


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
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickClose = () => {
        setOpen(false);
    };

    //VIEW Popup
    const handleOpenView = (no: string) => {
        setopenViewPending((prevOpenView) => ({
            ...prevOpenView,
            [no]: true,
        }));
        handleRender();
    };

    //View Popup Close
    const handleCloseView = (no: string) => {
        setopenViewPending((prevOpenView) => ({
            ...prevOpenView,
            [no]: false,
        }));
        handleRender();
    };

    //Update Popup 
    const handleOpenUpdate = (no: string) => {
        setopenUpdatePending((prevOpenUpdate) => ({
            ...prevOpenUpdate,
            [no]: true,
        }));
        handleRender();
    };

    //Update Popup
    const handleCloseUpdate = (no: string) => {
        setopenUpdatePending((prevOpenUpdate) => ({
            ...prevOpenUpdate,
            [no]: false,
        }));
        handleRender();
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
    const handleNext = (value: string, status: string, buildingno: string) => {
        const selectedValue = selectedAction[value];

        if (selectedValue === 'Delete') {
            // Perform delete logic here
            handleOpenDelete(value);

        } else if (status === 'Pending') {
            //Pending function condition goes here
            if (selectedValue === 'View') {
                handleOpenView(value);
                handleRender();
            }
            else if (selectedValue === 'Update') {
                handleOpenUpdate(value);
                handleRender();
            }
            else if (selectedValue === 'Evaluate') {
                handleOpenEvalNTC(value);
            }
            else if (selectedValue === 'Print') {
                handlePrintOpen();

            }
        }
        else if ((sortBy === 'NTC Records' && status === 'For Issuance NTCV') || (sortBy === 'NTC Records' && status === 'Issued NTCV') || (sortBy === 'NTC Records' && status === 'Complied')) {
            if ((selectedValue === 'Evaluate') && (status === 'For Issuance NTCV')) {
                //Completed function condition goes here
                handleOpenEvalChoice(value);
                handleRender();
            }
            else if ((selectedValue === 'View') || (selectedValue === 'Update')) {
                handleOpenViewUpdateNTC(value);
                handleRender();
            }
        }
        else if ((sortBy === 'NTCV Records' && status === 'For Issuance Abatement') || (sortBy === 'NTCV Records' && status === 'Issued Abatement') || (sortBy === 'NTCV Records' && status === 'Complied')) {
            //Completed function condition goes here
            if ((selectedValue === 'Evaluate') && (status === 'For Issuance Abatement')) {
                handleOpenEvalChoice(value);
                handleRender();
            }
            else if ((selectedValue === 'View') || (selectedValue === 'Update')) {
                handleOpenViewUpdateNTCV(value);
                handleRender();
            }
        }
        else if ((sortBy === 'Abatement Records' && status === 'For Issuance Closure') || (sortBy === 'Abatement Records' && status === 'Issued Closure') || (sortBy === 'Abatement Records' && status === 'Complied')) {
            //Completed function condition goes here
            if ((selectedValue === 'Evaluate') && (status === 'For Issuance Closure')) {
                handleOpenEvalChoice(value);
                handleRender();

            }
            else if ((selectedValue === 'View') || (selectedValue === 'Update')) {
                handleOpenViewUpdateAbatement(value);
                handleRender();
                console.log(sortBy)
            }
        }
        else if ((sortBy === 'Closure Records' && status === 'For Issuance Closure') || (sortBy === 'Closure Records' && status === 'Issued Closure') || (sortBy === 'Closure Records' && status === 'Complied')) {
            if ((selectedValue === 'Evaluate') && (status === 'Issued Closure')) {
                handleOpenEvalChoice(value);
                handleRender();

            }
            if ((selectedValue === 'View') || (selectedValue === 'Update')) {
                handleOpenViewUpdateClosure(value);
                handleRender();
            }
        }
    }

    return (
        <>
            <AdditionalTab />
            <ClerkNavbar />
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
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="Pending Records">Pending Records</option>
                            <option value="NTC Records">NTC Records</option>
                            <option value="NTCV Records">NTCV Records</option>
                            <option value="Abatement Records">Abatement Records</option>
                            <option value="Closure Records">Closure Records</option>
                        </select>
                        <div className="date-input-container">
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
                                    sortBy === 'Abatement Records' ? 'Abatement #' :
                                        sortBy === 'Closure Records' ? 'Closure #' :
                                            'FSIC #'}</th>
                            <th>Remarks</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {disapprovedNewBusinessPermit
                            .filter((disapprovedNewBusinessPermit) => {
                                if (sortBy === 'Pending Records') {
                                    return disapprovedNewBusinessPermit.remarks === 'Pending';
                                } else {
                                    return true;
                                }
                            })
                            .filter((disapprovedNewBusinessPermit) => {
                                // Filter based on the searchText value
                                if (searchText === '') {
                                    return true; // Show all records if no search text is entered
                                } else {
                                    // Filter based on the businessPermitNo or ownerName containing the searchText
                                    const bspermit_no = disapprovedNewBusinessPermit?.bspermit_no || '';
                                    const permittee = disapprovedNewBusinessPermit?.permittee || '';
                                    return (
                                        bspermit_no.toLowerCase().includes(searchText.toLowerCase()) ||
                                        permittee.toLowerCase().includes(searchText.toLowerCase())
                                    );
                                }
                            })
                            .map((disapprovedNewBusinessPermit) => (
                                <tr key={disapprovedNewBusinessPermit.id}>
                                    <td>{disapprovedNewBusinessPermit.bspermit_no}</td>
                                    <td>{disapprovedNewBusinessPermit.permittee}</td>
                                    <td>{disapprovedNewBusinessPermit.business_name}</td>
                                    <td>{disapprovedNewBusinessPermit.type_occupancy}</td>
                                    <td>{sortBy === 'Pending Records' ? 'N/A' :
                                        'NTC Records' ? disapprovedNewBusinessPermit.ntc_no :
                                            'NTCV Records' ? disapprovedNewBusinessPermit.ntcv_no :
                                                'Abatement Records' ? disapprovedNewBusinessPermit.abatement_no :
                                                    'Closure Records' ? disapprovedNewBusinessPermit.closure_no :
                                                        'N/A'}</td>
                                    <td style={{
                                        color: disapprovedNewBusinessPermit.remarks === 'Complied' || disapprovedNewBusinessPermit.remarks === 'FSIC Printed' ? 'green' :
                                            disapprovedNewBusinessPermit.remarks === 'Pending' || disapprovedNewBusinessPermit.remarks === 'For Issuance NTCV' || disapprovedNewBusinessPermit.remarks === 'For Issuance Abatement' || disapprovedNewBusinessPermit.remarks === 'For Issuance Closure' ? 'black'
                                                : 'red'
                                    }}
                                    >{disapprovedNewBusinessPermit.remarks}</td>
                                    <td>
                                        <select
                                            value={selectedAction[disapprovedNewBusinessPermit.id] || ''}
                                            onChange={(event) => handleActionChange(event, disapprovedNewBusinessPermit.id)}
                                            style={{ height: '35px', width: '120px', borderRadius: '8px', textAlign: 'center', backgroundColor: '#D9D9D9' }}
                                        >
                                            <option value="">-select-</option>
                                            <option value="View">View</option>
                                            <option value="Update">Update</option>
                                            <option value="Evaluate">Evaluate</option>
                                            {/* <option value="Print">Print</option>*/}
                                            <option value="Delete">Delete</option>
                                        </select>
                                        <IconButton className="next-button" onClick={() => handleNext((disapprovedNewBusinessPermit.id || ''), (disapprovedNewBusinessPermit.remarks || ''), (disapprovedNewBusinessPermit.bspermit_no || ''))}>
                                            <ArrowCircleRightIcon sx={{ color: '#3C486B' }} />
                                        </IconButton>
                                        <ViewRenewalApplication 
                                        open={openViewPending[disapprovedNewBusinessPermit.id]} 
                                        handleClose={() => handleCloseView(disapprovedNewBusinessPermit.id)} 
                                        bspermit_no={disapprovedNewBusinessPermit.bspermit_no || ''}
                                        permitee={disapprovedNewBusinessPermit.permittee || ''}
                                        businessname={disapprovedNewBusinessPermit.business_name || ''}
                                        address={disapprovedNewBusinessPermit.address || ''}
                                        natureofbusiness={disapprovedNewBusinessPermit.nature_business || ''}
                                        typeofoccupancy={disapprovedNewBusinessPermit.type_occupancy || ''}
                                        contactno={disapprovedNewBusinessPermit.contact_no || ''}
                                        email={disapprovedNewBusinessPermit.email || ''}
                                        datereceived={disapprovedNewBusinessPermit.date_received || ''}
                                        />
                                        <UpdateRenewalApplication 
                                        open={openUpdatePending[disapprovedNewBusinessPermit.id]} 
                                        handleClose={() => handleCloseUpdate(disapprovedNewBusinessPermit.id)} 
                                        bspermit_no={disapprovedNewBusinessPermit.bspermit_no || ''}
                                        permitee={disapprovedNewBusinessPermit.permittee || ''}
                                        businessname={disapprovedNewBusinessPermit.business_name || ''}
                                        address={disapprovedNewBusinessPermit.address || ''}
                                        natureofbusiness={disapprovedNewBusinessPermit.nature_business || ''}
                                        typeofoccupancy={disapprovedNewBusinessPermit.type_occupancy || ''}
                                        contactno={disapprovedNewBusinessPermit.contact_no || ''}
                                        email={disapprovedNewBusinessPermit.email || ''}
                                        datereceived={disapprovedNewBusinessPermit.date_received || ''}
                                        id={disapprovedNewBusinessPermit.id || ''}
                                        form ="Renewal"
                                        />
                                        <EvaluateNTCPopup
                                            bpid={disapprovedNewBusinessPermit.id || ''}
                                            form='Renewal'
                                            activity={selectedAction[disapprovedNewBusinessPermit.id || '']}
                                            open={openprevEvaluateNTC[disapprovedNewBusinessPermit.id]}
                                            business_no={disapprovedNewBusinessPermit.bspermit_no || ''}
                                            permitee={disapprovedNewBusinessPermit.permittee || ''}
                                            business_name={disapprovedNewBusinessPermit.business_name || ''}
                                            address={disapprovedNewBusinessPermit.address || ''}
                                            natureofbusiness={disapprovedNewBusinessPermit.nature_business || ''}
                                            typeofoccupancy={disapprovedNewBusinessPermit.type_occupancy || ''}
                                            contactno={disapprovedNewBusinessPermit.contact_no || ''}
                                            email={disapprovedNewBusinessPermit.email || ''}
                                            datereceived={disapprovedNewBusinessPermit.date_received || ''}
                                            handleClose={() => handleCloseView(disapprovedNewBusinessPermit.id)}
                                            defects={[]} 
                                        />
                                        <DeleteClerkPopup
                                            open={openDelete[disapprovedNewBusinessPermit.id]}
                                            value={disapprovedNewBusinessPermit.id}
                                            form="NewBR"
                                            sortby = {sortBy}
                                            remarks={disapprovedNewBusinessPermit.remarks || ''}
                                            handleClose={() => handleCloseDelete(disapprovedNewBusinessPermit.id)}
                                        />
                                        <EvaluateChoicePopup
                                            open={openEvalChoice[disapprovedNewBusinessPermit.id]}
                                            remarks={sortBy}
                                            handleOpenApproved={() => handleOpenEvaluate(disapprovedNewBusinessPermit.id)}
                                            handleOpenNTCV={() => handleOpenNTCV(disapprovedNewBusinessPermit.id)}
                                            handleOpenAbatement={() => handleOpenAbatement(disapprovedNewBusinessPermit.id)}
                                            handleOpenClosure={() => handleOpenClosure(disapprovedNewBusinessPermit.id)}
                                            handleClose={() => handleCloseEvalCHoice(disapprovedNewBusinessPermit.id)}

                                        />
                                        <EvaluateNTCVPopup
                                            bpid={disapprovedNewBusinessPermit.id}
                                            form='Renewal'
                                            open={openprevEvaluateNTCV[disapprovedNewBusinessPermit.id]}
                                            business_no={disapprovedNewBusinessPermit.bspermit_no || ''}
                                            permitee={disapprovedNewBusinessPermit.permittee || ''}
                                            business_name={disapprovedNewBusinessPermit.business_name || ''}
                                            address={disapprovedNewBusinessPermit.address || ''}
                                            natureofbusiness={disapprovedNewBusinessPermit.nature_business || ''}
                                            typeofoccupancy={disapprovedNewBusinessPermit.type_occupancy || ''}
                                            contactno={disapprovedNewBusinessPermit.contact_no || ''}
                                            email={disapprovedNewBusinessPermit.email || ''}
                                            datereceived={disapprovedNewBusinessPermit.date_received || ''}
                                            ntc_no={disapprovedNewBusinessPermit.ntc_no || 0}
                                            ntc_date={disapprovedNewBusinessPermit.ntc_date || ''}
                                            ntcv_no={disapprovedNewBusinessPermit.ntcv_no || 0}
                                            ntcv_date={disapprovedNewBusinessPermit.ntcv_date || ''}
                                            handleClose={() => handleCloseNTCV(disapprovedNewBusinessPermit.id)}
                                            defects={[]} 
                                        />
                                        <EvaluateAbatementPopup
                                            bpid={disapprovedNewBusinessPermit.id}
                                            form='Renewal'
                                            open={openprevEvaluateAbatement[disapprovedNewBusinessPermit.id]}
                                            business_no={disapprovedNewBusinessPermit.bspermit_no || ''}
                                            permitee={disapprovedNewBusinessPermit.permittee || ''}
                                            business_name={disapprovedNewBusinessPermit.business_name || ''}
                                            address={disapprovedNewBusinessPermit.address || ''}
                                            natureofbusiness={disapprovedNewBusinessPermit.nature_business || ''}
                                            typeofoccupancy={disapprovedNewBusinessPermit.type_occupancy || ''}
                                            contactno={disapprovedNewBusinessPermit.contact_no || ''}
                                            email={disapprovedNewBusinessPermit.email || ''}
                                            datereceived={disapprovedNewBusinessPermit.date_received || ''}
                                            ntc_no={disapprovedNewBusinessPermit.ntc_no || 0}
                                            ntc_date={disapprovedNewBusinessPermit.ntc_date || ''}
                                            ntcv_no={disapprovedNewBusinessPermit.ntcv_no || 0}
                                            ntcv_date={disapprovedNewBusinessPermit.ntcv_date || ''}
                                            handleClose={() => handleCloseAbatement(disapprovedNewBusinessPermit.id)} 
                                            defects={[]}    
                                        />
                                        <EvaluateClosurePopup
                                            bpid={disapprovedNewBusinessPermit.id}
                                            form='Renewal'
                                            open={openprevEvaluateClosure[disapprovedNewBusinessPermit.id]}
                                            business_no={disapprovedNewBusinessPermit.bspermit_no || ''}
                                            permitee={disapprovedNewBusinessPermit.permittee || ''}
                                            business_name={disapprovedNewBusinessPermit.business_name || ''}
                                            address={disapprovedNewBusinessPermit.address || ''}
                                            natureofbusiness={disapprovedNewBusinessPermit.nature_business || ''}
                                            typeofoccupancy={disapprovedNewBusinessPermit.type_occupancy || ''}
                                            contactno={disapprovedNewBusinessPermit.contact_no || ''}
                                            email={disapprovedNewBusinessPermit.email || ''}
                                            datereceived={disapprovedNewBusinessPermit.date_received || ''}
                                            ntc={disapprovedNewBusinessPermit.ntc_no || 0}
                                            ntc_date={disapprovedNewBusinessPermit.ntc_date || ''}
                                            ntcv={disapprovedNewBusinessPermit.ntcv_no || 0}
                                            ntcv_date={disapprovedNewBusinessPermit.ntcv_date || ''}
                                            abatement={disapprovedNewBusinessPermit.abatement_no || 0}
                                            abatement_date={disapprovedNewBusinessPermit.abatement_date || ''}
                                            defects={[]}
                                            handleClose={() => handleCloseClosure(disapprovedNewBusinessPermit.id)}
                                        />
                                        <ViewUpdateNTC
                                            bpid={disapprovedNewBusinessPermit.id}
                                            form='Renewal'
                                            activity={selectedAction[disapprovedNewBusinessPermit.id]}
                                            open={openprevViewUpdateNTC[disapprovedNewBusinessPermit.id]}
                                            business_no={disapprovedNewBusinessPermit.bspermit_no || ''}
                                            permitee={disapprovedNewBusinessPermit.permittee || ''}
                                            business_name={disapprovedNewBusinessPermit.business_name || ''}
                                            address={disapprovedNewBusinessPermit.address || ''}
                                            natureofbusiness={disapprovedNewBusinessPermit.nature_business || ''}
                                            typeofoccupancy={disapprovedNewBusinessPermit.type_occupancy || ''}
                                            contactno={disapprovedNewBusinessPermit.contact_no || ''}
                                            email={disapprovedNewBusinessPermit.email || ''}
                                            datereceived={disapprovedNewBusinessPermit.date_received || ''}
                                            inspection_no={disapprovedNewBusinessPermit.inspection_no || 0}
                                            inspectiondate={disapprovedNewBusinessPermit.date_inspected || ''}
                                            ntc_no={disapprovedNewBusinessPermit.ntc_no || 0}
                                            ntc_date={disapprovedNewBusinessPermit.ntc_date || ''}
                                            teamleader={disapprovedNewBusinessPermit.team_leader || ''}
                                            fireinspectors={disapprovedNewBusinessPermit.fire_inspectors || []}
                                            defects={[]}
                                            remarks={disapprovedNewBusinessPermit.remarks || ''}
                                            receivedby={disapprovedNewBusinessPermit.name || ''}
                                            receiveddate={disapprovedNewBusinessPermit.date || ''}
                                            handleClose={() => handleCloseViewUpdateNTC(disapprovedNewBusinessPermit.id)}
                                        />
                                        <ViewUpdateNTCVPopup
                                            bpid={disapprovedNewBusinessPermit.id}
                                            form='Renewal'
                                            activity={selectedAction[disapprovedNewBusinessPermit.id]}
                                            open={openViewUpdateNTCV[disapprovedNewBusinessPermit.id]}
                                            business_no={disapprovedNewBusinessPermit.bspermit_no || ''}
                                            permitee={disapprovedNewBusinessPermit.permittee || ''}
                                            business_name={disapprovedNewBusinessPermit.business_name || ''}
                                            address={disapprovedNewBusinessPermit.address || ''}
                                            natureofbusiness={disapprovedNewBusinessPermit.nature_business || ''}
                                            typeofoccupancy={disapprovedNewBusinessPermit.type_occupancy || ''}
                                            contactno={disapprovedNewBusinessPermit.contact_no || ''}
                                            email={disapprovedNewBusinessPermit.email || ''}
                                            datereceived={disapprovedNewBusinessPermit.date_received || ''}
                                            inspection_no={disapprovedNewBusinessPermit.inspection_no || 0}
                                            inspectiondate={disapprovedNewBusinessPermit.date_inspected || ''}
                                            ntc_no={disapprovedNewBusinessPermit.ntc_no || 0}
                                            ntc_date={disapprovedNewBusinessPermit.ntc_date || ''}
                                            ntcv_no={disapprovedNewBusinessPermit.ntcv_no || 0}
                                            ntcv_date={disapprovedNewBusinessPermit.ntcv_date || ''}
                                            teamleader={disapprovedNewBusinessPermit.team_leader || ''}
                                            fireinspectors={disapprovedNewBusinessPermit.fire_inspectors || []}
                                            defects={[]}
                                            remarks={disapprovedNewBusinessPermit.remarks || ''}
                                            receivedby={disapprovedNewBusinessPermit.name || ''}
                                            receiveddate={disapprovedNewBusinessPermit.date || ''}
                                            handleClose={() => handleCloseViewUpdateNTCV(disapprovedNewBusinessPermit.id)}
                                        />
                                        <ViewUpdateAbatementPopup
                                            bpid={disapprovedNewBusinessPermit.id}
                                            form='Renewal'
                                            activity={selectedAction[disapprovedNewBusinessPermit.id]}
                                            open={openViewUpdateAbatement[disapprovedNewBusinessPermit.id]}
                                            business_no={disapprovedNewBusinessPermit.bspermit_no || ''}
                                            permitee={disapprovedNewBusinessPermit.permittee || ''}
                                            business_name={disapprovedNewBusinessPermit.business_name || ''}
                                            address={disapprovedNewBusinessPermit.address || ''}
                                            natureofbusiness={disapprovedNewBusinessPermit.nature_business || ''}
                                            typeofoccupancy={disapprovedNewBusinessPermit.type_occupancy || ''}
                                            contactno={disapprovedNewBusinessPermit.contact_no || ''}
                                            email={disapprovedNewBusinessPermit.email || ''}
                                            datereceived={disapprovedNewBusinessPermit.date_received || ''}
                                            inspection_no={disapprovedNewBusinessPermit.inspection_no || 0}
                                            inspectiondate={disapprovedNewBusinessPermit.date_inspected || ''}
                                            ntc_no={disapprovedNewBusinessPermit.ntc_no || 0}
                                            ntc_date={disapprovedNewBusinessPermit.ntc_date || ''}
                                            ntcv_no={disapprovedNewBusinessPermit.ntcv_no || 0}
                                            ntcv_date={disapprovedNewBusinessPermit.ntcv_date || ''}
                                            abatement_no={disapprovedNewBusinessPermit.abatement_no || 0}
                                            abatement_date={disapprovedNewBusinessPermit.abatement_date || ''}
                                            teamleader={disapprovedNewBusinessPermit.team_leader || ''}
                                            fireinspectors={disapprovedNewBusinessPermit.fire_inspectors || []}
                                            defects={[]}
                                            remarks={disapprovedNewBusinessPermit.remarks || ''}
                                            receivedby={disapprovedNewBusinessPermit.name || ''}
                                            receiveddate={disapprovedNewBusinessPermit.date || ''}
                                            handleClose={() => handleCloseViewUpdateAbatement(disapprovedNewBusinessPermit.id)}
                                        />
                                        <ViewUpdateClosurePopup
                                            bpid={disapprovedNewBusinessPermit.id}
                                            form='Renewal'
                                            activity={selectedAction[disapprovedNewBusinessPermit.id]}
                                            open={openViewUpdateClosure[disapprovedNewBusinessPermit.id]}
                                            business_no={disapprovedNewBusinessPermit.bspermit_no || ''}
                                            permitee={disapprovedNewBusinessPermit.permittee || ''}
                                            business_name={disapprovedNewBusinessPermit.business_name || ''}
                                            address={disapprovedNewBusinessPermit.address || ''}
                                            natureofbusiness={disapprovedNewBusinessPermit.nature_business || ''}
                                            typeofoccupancy={disapprovedNewBusinessPermit.type_occupancy || ''}
                                            contactno={disapprovedNewBusinessPermit.contact_no || ''}
                                            email={disapprovedNewBusinessPermit.email || ''}
                                            datereceived={disapprovedNewBusinessPermit.date_received || ''}
                                            inspection_no={disapprovedNewBusinessPermit.inspection_no || 0}
                                            inspectiondate={disapprovedNewBusinessPermit.date_inspected || ''}
                                            ntc_no={disapprovedNewBusinessPermit.ntc_no || 0}
                                            ntc_date={disapprovedNewBusinessPermit.ntc_date || ''}
                                            ntcv_no={disapprovedNewBusinessPermit.ntcv_no || 0}
                                            ntcv_date={disapprovedNewBusinessPermit.ntcv_date || ''}
                                            abatement_no={disapprovedNewBusinessPermit.abatement_no || 0}
                                            abatement_date={disapprovedNewBusinessPermit.abatement_date || ''}
                                            closure_no={disapprovedNewBusinessPermit.closure_no || 0}
                                            closure_date={disapprovedNewBusinessPermit.closure_date || ''}
                                            teamleader={disapprovedNewBusinessPermit.team_leader || ''}
                                            fireinspectors={disapprovedNewBusinessPermit.fire_inspectors || []}
                                            defects={disapprovedNewBusinessPermit.defects || []}
                                            remarks={disapprovedNewBusinessPermit.remarks || ''}
                                            receivedby={disapprovedNewBusinessPermit.name || ''}
                                            receiveddate={disapprovedNewBusinessPermit.date || ''}
                                            handleClose={() => handleCloseViewUpdateClosure(disapprovedNewBusinessPermit.id)}
                                        />
                                        <EvaluatePopup
                                            form='Renewal'
                                            activity={sortBy}
                                           
                                            bpid={disapprovedNewBusinessPermit.id}
                                            open={openEvaluateBusiness[disapprovedNewBusinessPermit.id]}
                                            business_no={disapprovedNewBusinessPermit.bspermit_no || ''}
                                            permitee={disapprovedNewBusinessPermit.permittee || ''}
                                            business_name={disapprovedNewBusinessPermit.business_name || ''}
                                            address={disapprovedNewBusinessPermit.address || ''}
                                            natureofbusiness={disapprovedNewBusinessPermit.nature_business|| ''}
                                            typeofoccupancy={disapprovedNewBusinessPermit.type_occupancy || ''}
                                            contactno={disapprovedNewBusinessPermit.contact_no || ''}
                                            email={disapprovedNewBusinessPermit.email || ''}
                                            datereceived={disapprovedNewBusinessPermit.date_received || ''}
                                            handleClose={() => handleCloseEvaluate(disapprovedNewBusinessPermit.id)}
                                        />
                                        <DeleteClerkPopup
                                            open={openDelete[disapprovedNewBusinessPermit.id]}
                                            value={disapprovedNewBusinessPermit.id}
                                            form="Renewal Business"
                                            sortby={sortBy}
                                            remarks={disapprovedNewBusinessPermit.remarks || ''}
                                            handleClose={() => handleCloseDelete(disapprovedNewBusinessPermit.id)}
                                        />

                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

            </div>
        </>
    )
}
export default DisapprovedRenewalList;