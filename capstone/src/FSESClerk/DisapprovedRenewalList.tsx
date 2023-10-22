import React, { useEffect, useState } from 'react';
import './ClerkCSS.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ClerkNavbar from './ClerkNavbar';
import AddOccupancy from './Pending_Occupancy/AddOccupancy';
import ViewPendingOccupancyList from './Pending_Occupancy/ViewPendingOccupancyPopup';
import UpdatePendingOccupancyPopup from './Pending_Occupancy/UpdatePendingOccupancyPopup';
import EvaluateDisapprovedOccupancy from './Disapproved_Occupancy/EvaluateDisapprovedOccupancy';
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
import ViewEvaluate from '../FSESEncoder/Approved_Business-Renewal_Permits/ViewEvaluate';
import EvaluatePopup from '../FSESEncoder/Approved_Business-Renewal_Permits/EvaluateApprovedApplication';
import ViewRenewalApplication from '../FSESEncoder/Approved_Business-Renewal_Permits/ViewRenewalApplication';
import UpdateRenewalApplication from '../FSESEncoder/Approved_Business-Renewal_Permits/UpdateRenewalApplication';


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
    const [selectedAction, setSelectedAction] = useState<Record<number, string>>({});
    const [openViewPending, setopenViewPending] = useState<Record<number, boolean>>({});
    const [openUpdatePending, setopenUpdatePending] = useState<Record<number, boolean>>({});
    const [openEvalOccupancy, setopenEvalOccupancy] = useState<Record<number, boolean>>({});
    const [openViewUpdOccupancy, setopenViewUpdOccupancy] = useState<Record<number, boolean>>({});
    const [openViewUpdateNTCV, setopenViewUpdateNTCV] = useState<Record<number, boolean>>({}); //Opens Update/View NTCV Form
    const [openprevViewUpdateNTC, setopenViewUpdateNTC] = useState<Record<number, boolean>>({}); //Opens Update/View NTC Form
    const [openViewUpdateAbatement, setopenViewUpdateAbatement] = useState<Record<number, boolean>>({}); //Opens Update/Vew NTCV Form
    const [openViewUpdateClosure, setopenViewUpdateClosure] = useState<Record<number, boolean>>({}); //Opens NTCV Form
    const [openprevEvaluateNTC, setopenprevEvaluateNTC] = useState<Record<number, boolean>>({}); //Opens NTC Form
    const [openprevEvaluateNTCV, setopenprevEvaluateNTCV] = useState<Record<number, boolean>>({}); //Opens NTCV Form
    const [openprevEvaluateAbatement, setopenprevEvaluateAbatement] = useState<Record<number, boolean>>({}); //Opens Abatement Form
    const [openprevEvaluateClosure, setopenprevEvaluateClosure] = useState<Record<number, boolean>>({}); //Opens Closure Form
    const [openEvalChoice, setopenEvalChoice] = useState<Record<number, boolean>>({});//Open NTC Choice Pop up
    const [openViewEvaluate, setopenViewEvaluate] = useState<Record<number, boolean>>({});// Opens Approved Form
    const [openEvaluateBusiness, setopenEvaluateBusiness] = useState<Record<number, boolean>>({});
    const [test, setTest] = useState<boolean>(false);
    const [deleteit, setDelete] = useState(false);
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
        date_inspection: "2023-01-01",
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
        fireInspectors: ["test", "test1"],
        recommendation: ["reco1", "reco2", "reco3"],
        defects: [['test'], ['test2']],
        received_name: 'Default',
        receivedntc_date: '01/01/2001',
        receivedntcv_date: '01/01/2001',
        receivedabatement_date: '01/01/2001',
        receivedclosure_date: '01/01/2001',
        status: 'default'
    }])

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
    const handleOpenEvalNTC = (no: number) => {
        setopenprevEvaluateNTC((prevEvaluateNTC) => ({
            ...prevEvaluateNTC,
            [no]: true,
        }));
        handleRender();
    };
    //Close EVAL NTC
    const handleCloseEvalNTC = (no: number) => {
        setopenprevEvaluateNTC((prevEvaluateNTC) => ({
            ...prevEvaluateNTC,
            [no]: false,
        }));
        handleRender();
    };

    //Opens Evaluate NTC
    const handleOpenViewUpdateNTC = (no: number) => {
        setopenViewUpdateNTC((prevEvaluateNTC) => ({
            ...prevEvaluateNTC,
            [no]: true,
        }));
        handleRender();
    };
    // Closes Evaluate NTC
    const handleCloseViewUpdateNTC = (no: number) => {
        setopenViewUpdateNTC((prevEvaluateNTC) => ({
            ...prevEvaluateNTC,
            [no]: false,
        }));
        handleRender();
    };

    //Opens Update View NTCV
    const handleOpenViewUpdateNTCV = (no: number) => {
        setopenViewUpdateNTCV((prevEvaluateNTC) => ({
            ...prevEvaluateNTC,
            [no]: true,
        }));
        handleRender();
    };
    // Closes Update View NTCV
    const handleCloseViewUpdateNTCV = (no: number) => {
        setopenViewUpdateNTCV((prevEvaluateNTC) => ({
            ...prevEvaluateNTC,
            [no]: false,
        }));
        handleRender();
    };

    //Opens Update View Abatement
    const handleOpenViewUpdateAbatement = (no: number) => {
        setopenViewUpdateAbatement((prevEvaluateAbatement) => ({
            ...prevEvaluateAbatement,
            [no]: true,
        }));
        handleRender();
    };
    // Closes Update View Abatement
    const handleCloseViewUpdateAbatement = (no: number) => {
        setopenViewUpdateAbatement((prevEvaluateAbatement) => ({
            ...prevEvaluateAbatement,
            [no]: false,
        }));
        handleRender();
    };

    //Opens Update View Closure
    const handleOpenViewUpdateClosure = (no: number) => {
        setopenViewUpdateClosure((prevEvaluateAbatement) => ({
            ...prevEvaluateAbatement,
            [no]: true,
        }));
        handleRender();
    };
    // Closes Update View Closure
    const handleCloseViewUpdateClosure = (no: number) => {
        setopenViewUpdateClosure((prevEvaluateAbatement) => ({
            ...prevEvaluateAbatement,
            [no]: false,
        }));
        handleRender();
    };


    //Opens Evaluate Choice
    const handleOpenEvalChoice = (no: number) => {
        setopenEvalChoice((prevEvalChoice) => ({
            ...prevEvalChoice,
            [no]: true,
        }));
        handleRender();
    };
    // Closes Evaluate Choice
    const handleCloseEvalCHoice = (no: number) => {
        setopenEvalChoice((prevEvalChoice) => ({
            ...prevEvalChoice,
            [no]: false,
        }));
        handleRender();
    };

    //Open Approved Eval Popup
    const handleOpenEvaluate = (no: number) => {
        setopenEvaluateBusiness((prevOpenEvaluate) => ({
            ...prevOpenEvaluate,
            [no]: true,
        }));    
        handleRender();
    };

    //Close Approved Eval Popup
    const handleCloseEvaluate = (no: number) => {
        setopenEvaluateBusiness((prevOpenEvaluate) => ({
            ...prevOpenEvaluate,
            [no]: false,
        }));
        handleRender()
    };


    //Opens Evaluate NTCV
    const handleOpenNTCV = (no: number) => {
        setopenprevEvaluateNTCV((prevEvaluateNTCV) => ({
            ...prevEvaluateNTCV,
            [no]: true,
        }));
        handleRender();
    };
    // Closes Evaluate NTCV
    const handleCloseNTCV = (no: number) => {
        setopenprevEvaluateNTCV((prevEvaluateNTCV) => ({
            ...prevEvaluateNTCV,
            [no]: false,
        }));
        handleRender();
    };

    //Opens Evaluate Abatement
    const handleOpenAbatement = (no: number) => {
        setopenprevEvaluateAbatement((prevEvaluateAbatement) => ({
            ...prevEvaluateAbatement,
            [no]: true,
        }));
        handleRender();
    };
    // Closes Evaluate Abatement
    const handleCloseAbatement = (no: number) => {
        setopenprevEvaluateAbatement((prevEvaluateAbatement) => ({
            ...prevEvaluateAbatement,
            [no]: false,
        }));
        handleRender();
    };

    //Opens Evaluate Closure
    const handleOpenClosure = (no: number) => {
        setopenprevEvaluateClosure((prevEvaluateClosure) => ({
            ...prevEvaluateClosure,
            [no]: true,
        }));
        handleRender();
    };
    // Closes Evaluate Closure
    const handleCloseClosure = (no: number) => {
        setopenprevEvaluateClosure((prevEvaluateClosure) => ({
            ...prevEvaluateClosure,
            [no]: false,
        }));
        handleRender();
    };

    // Gets Data from the DATABASE
    useEffect(() => {
        if (sortBy === 'Pending Records') {
            axios.get('http://localhost:8080/Renewal/getAllRenewalPermit').then(res => {
                SetApplicationForm(res.data)
                console.log(applicationform)
            }).catch(err => console.log(err))
        }
        else if (sortBy === 'NTC Records') {
            axios.get('http://localhost:8080/renewalbpnoticetocomply/getAllRenewalbpNoticeToComply').then(res => {
                SetApplicationForm(res.data)
            }).catch(err => console.log(err))
        }
        else if (sortBy === 'NTCV Records') {
            axios.get('http://localhost:8080/renewalbpnoticetocorrectviolation/getAllRenewalbpNoticeToCorrectViolation').then(res => {
                SetApplicationForm(res.data)
            }).catch(err => console.log(err))
        }
        else if (sortBy === 'Abatement Records') {
            axios.get('http://localhost:8080/renewalbpabatementorder/getAllRenewalbpAbatementOrder').then(res => {
                SetApplicationForm(res.data)
            }).catch(err => console.log(err))
        }
        else if (sortBy === 'Closure Records') {
            axios.get('http://localhost:8080/renewalbpclosureorder/getAllRenewalbpClosureOrder').then(res => {
                SetApplicationForm(res.data)
            }).catch(err => console.log(err))
        }
    }, [sortBy, test]);

    //Handles the selection of each Record, so that it doesnt change all the drop down option each change
    const handleActionChange = (event: React.ChangeEvent<HTMLSelectElement>, no: number) => {
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
    const handleOpenView = (no: number) => {
        setopenViewPending((prevOpenView) => ({
            ...prevOpenView,
            [no]: true,
        }));
        handleRender();
    };

    //View Popup Close
    const handleCloseView = (no: number) => {
        setopenViewPending((prevOpenView) => ({
            ...prevOpenView,
            [no]: false,
        }));
        handleRender();
    };

    //VIEW/Update Evaluate Popup Open
    const handleOpenViewUpdate = (no: number) => {
        setopenViewUpdOccupancy((prevOpenView) => ({
            ...prevOpenView,
            [no]: true,
        }));
        handleRender();
    };

    //VIEW/Update Evaluate Popup Close
    const handleCloseViewUpdate = (no: number) => {
        setopenViewUpdOccupancy((prevOpenView) => ({
            ...prevOpenView,
            [no]: false,
        }));
        handleRender();
    };

    //Update Popup 
    const handleOpenUpdate = (no: number) => {
        setopenUpdatePending((prevOpenUpdate) => ({
            ...prevOpenUpdate,
            [no]: true,
        }));
        handleRender();
    };

    //Update Popup
    const handleCloseUpdate = (no: number) => {
        setopenUpdatePending((prevOpenUpdate) => ({
            ...prevOpenUpdate,
            [no]: false,
        }));
        handleRender();
    };

    //Evaluate Popup 
    const handleOpenEval = (no: number) => {
        setopenEvalOccupancy((prevOpenEval) => ({
            ...prevOpenEval,
            [no]: true,
        }));
        handleRender();
    };

    //Evaluate Popup
    const handleCloseEval = (no: number) => {
        setopenEvalOccupancy((prevOpenEval) => ({
            ...prevOpenEval,
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
    // Delete Popup
    const handleDeleteOpen = () => {
        setDelete(true);
    };
    // Delete Popup
    const handleDeleteClose = () => {
        setDelete(false);
        handleRender();
    };


    //Handles the button Logic 
    const handleNext = (value: number, status: string, buildingno: string) => {
        const selectedValue = selectedAction[value];

        if (selectedValue === 'Delete') {
            // Perform delete logic here
            handleDeleteOpen();

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
                            <th>No.</th>
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
                        {applicationform
                            .filter((applicationform) => {
                                // Filter based on the searchText value
                                if (searchText === '') {
                                    return true; // Show all records if no search text is entered
                                } else {
                                    // Filter based on the businessPermitNo or ownerName containing the searchText
                                    return (
                                        applicationform.bspermit_no.toLowerCase().includes(searchText.toLowerCase()) ||
                                        applicationform.permittee.toLowerCase().includes(searchText.toLowerCase())
                                    );
                                }
                            })
                            .map((applicationform) => (
                                <tr key={applicationform.id}>
                                    <td>{applicationform.id}</td>
                                    <td>{applicationform.bspermit_no}</td>
                                    <td>{applicationform.permittee}</td>
                                    <td>{applicationform.business_name}</td>
                                    <td>{applicationform.type_occupancy}</td>
                                    <td>{sortBy === 'Pending Records' ? 'N/A' :
                                        'NTC Records' ? applicationform.ntc_no :
                                            'NTCV Records' ? applicationform.ntcv_no :
                                                'Abatement Records' ? applicationform.abatement_no :
                                                    'Closure Records' ? applicationform.closure_no :
                                                        'N/A'}</td>
                                    <td>{applicationform.remarks}</td>
                                    <td>
                                        <select
                                            value={selectedAction[applicationform.id] || ''}
                                            onChange={(event) => handleActionChange(event, applicationform.id)}
                                            style={{ height: '35px', width: '120px', borderRadius: '8px', textAlign: 'center', backgroundColor: '#D9D9D9' }}
                                        >
                                            <option value="">-select-</option>
                                            <option value="View">View</option>
                                            <option value="Update">Update</option>
                                            <option value="Evaluate">Evaluate</option>
                                            <option value="Print">Print</option>
                                            <option value="Delete">Delete</option>
                                        </select>
                                        <IconButton className="next-button" onClick={() => handleNext(applicationform.id, applicationform.remarks, applicationform.bspermit_no)}>
                                            <ArrowCircleRightIcon sx={{ color: '#3C486B' }} />
                                        </IconButton>
                                        <ViewRenewalApplication 
                                            open={openViewPending[applicationform.id]} 
                                            handleClose={() => handleCloseView(applicationform.id)}
                                            bspermit_no={applicationform.bspermit_no}
                                            permitee={applicationform.permittee}
                                            businessname={applicationform.business_name}
                                            address={applicationform.address}
                                            natureofbusiness={applicationform.nature_business}
                                            typeofoccupancy={applicationform.type_occupancy}
                                            contactno={applicationform.contact_no}
                                            email={applicationform.email}
                                            datereceived={applicationform.date_received}
                                        />
                                        <UpdateRenewalApplication 
                                            open={openUpdatePending[applicationform.id]} 
                                            handleClose={() => handleCloseUpdate(applicationform.id)} 
                                            bspermit_no={applicationform.bspermit_no}
                                            permitee={applicationform.permittee}
                                            businessname={applicationform.business_name}
                                            address={applicationform.address}
                                            natureofbusiness={applicationform.nature_business}
                                            typeofoccupancy={applicationform.type_occupancy}
                                            contactno={applicationform.contact_no}
                                            email={applicationform.email}
                                            datereceived={applicationform.date_received}
                                            id={applicationform.id}
                                            form="Renewal"
                                        />
                                        <EvaluateNTCPopup
                                            bpid={applicationform.id}
                                            form='Renewal'
                                            activity={selectedAction[applicationform.id]}
                                            open={openprevEvaluateNTC[applicationform.id]}
                                            business_no={applicationform.bspermit_no}
                                            permitee={applicationform.permittee}
                                            business_name={applicationform.business_name}
                                            address={applicationform.address}
                                            natureofbusiness={applicationform.nature_business}
                                            typeofoccupancy={applicationform.type_occupancy}
                                            contactno={applicationform.contact_no}
                                            email={applicationform.email}
                                            datereceived={applicationform.date_received}
                                            handleClose={() => handleCloseEvalNTC(applicationform.id)}
                                        />
                                        <EvaluateChoicePopup
                                            open={openEvalChoice[applicationform.id]}
                                            remarks={sortBy}
                                            handleOpenApproved={() => handleOpenEvaluate(applicationform.id)}
                                            handleOpenNTCV={() => handleOpenNTCV(applicationform.id)}
                                            handleOpenAbatement={() => handleOpenAbatement(applicationform.id)}
                                            handleOpenClosure={() => handleOpenClosure(applicationform.id)}
                                            handleClose={() => handleCloseEvalCHoice(applicationform.id)}

                                        />

                                        <EvaluateNTCVPopup
                                            bpid={applicationform.id}
                                            form='Renewal'
                                            open={openprevEvaluateNTCV[applicationform.id]}
                                            business_no={applicationform.bspermit_no}
                                            permitee={applicationform.permittee}
                                            business_name={applicationform.business_name}
                                            address={applicationform.address}
                                            natureofbusiness={applicationform.nature_business}
                                            typeofoccupancy={applicationform.type_occupancy}
                                            contactno={applicationform.contact_no}
                                            email={applicationform.email}
                                            datereceived={applicationform.date_received}
                                            ntc={applicationform.ntc_no}
                                            ntc_date={applicationform.ntc_date}
                                            defects={applicationform.defects}
                                            handleClose={() => handleCloseNTCV(applicationform.id)}
                                        />
                                        <EvaluateAbatementPopup
                                            bpid={applicationform.id}
                                            form='Renewal'
                                            open={openprevEvaluateAbatement[applicationform.id]}
                                            business_no={applicationform.bspermit_no}
                                            permitee={applicationform.permittee}
                                            business_name={applicationform.business_name}
                                            address={applicationform.address}
                                            natureofbusiness={applicationform.nature_business}
                                            typeofoccupancy={applicationform.type_occupancy}
                                            contactno={applicationform.contact_no}
                                            email={applicationform.email}
                                            datereceived={applicationform.date_received}
                                            ntc={applicationform.ntc_no}
                                            ntc_date={applicationform.ntc_date}
                                            ntcv={applicationform.ntcv_no}
                                            ntcv_date={applicationform.ntcv_date}
                                            defects={applicationform.defects}
                                            handleClose={() => handleCloseAbatement(applicationform.id)}
                                        />
                                        <EvaluateClosurePopup
                                            bpid={applicationform.id}
                                            form='Renewal'
                                            open={openprevEvaluateClosure[applicationform.id]}
                                            business_no={applicationform.bspermit_no}
                                            permitee={applicationform.permittee}
                                            business_name={applicationform.business_name}
                                            address={applicationform.address}
                                            natureofbusiness={applicationform.nature_business}
                                            typeofoccupancy={applicationform.type_occupancy}
                                            contactno={applicationform.contact_no}
                                            email={applicationform.email}
                                            datereceived={applicationform.date_received}
                                            ntc={applicationform.ntc_no}
                                            ntc_date={applicationform.ntc_date}
                                            ntcv={applicationform.ntcv_no}
                                            ntcv_date={applicationform.ntcv_date}
                                            abatement={applicationform.abatement_no}
                                            abatement_date={applicationform.abatement_date}
                                            defects={applicationform.defects}
                                            handleClose={() => handleCloseClosure(applicationform.id)}
                                        />
                                        <ViewUpdateNTC
                                            bpid={applicationform.id}
                                            form='Renewal'
                                            activity={selectedAction[applicationform.id]}
                                            open={openprevViewUpdateNTC[applicationform.id]}
                                            business_no={applicationform.bspermit_no}
                                            permitee={applicationform.permittee}
                                            business_name={applicationform.business_name}
                                            address={applicationform.address}
                                            natureofbusiness={applicationform.nature_business}
                                            typeofoccupancy={applicationform.type_occupancy}
                                            contactno={applicationform.contact_no}
                                            email={applicationform.email}
                                            datereceived={applicationform.date_received}
                                            inspection_no={applicationform.inspection_no}
                                            inspectiondate={applicationform.date_inspection}
                                            ntc_no={applicationform.ntc_no}
                                            ntc_date={applicationform.ntc_date}
                                            teamleader={applicationform.team_leader}
                                            fireinspectors={applicationform.fireInspectors}
                                            defects={applicationform.defects}
                                            remarks={applicationform.remarks}
                                            receivedby={applicationform.received_name}
                                            receiveddate={applicationform.receivedntc_date}
                                            handleClose={() => handleCloseViewUpdateNTC(applicationform.id)}
                                        />
                                        <ViewUpdateNTCVPopup
                                            bpid={applicationform.id}
                                            form='Renewal'
                                            activity={selectedAction[applicationform.id]}
                                            open={openViewUpdateNTCV[applicationform.id]}
                                            business_no={applicationform.bspermit_no}
                                            permitee={applicationform.permittee}
                                            business_name={applicationform.business_name}
                                            address={applicationform.address}
                                            natureofbusiness={applicationform.nature_business}
                                            typeofoccupancy={applicationform.type_occupancy}
                                            contactno={applicationform.contact_no}
                                            email={applicationform.email}
                                            datereceived={applicationform.date_received}
                                            inspection_no={applicationform.inspection_no}
                                            inspectiondate={applicationform.date_inspection}
                                            ntc_no={applicationform.ntc_no}
                                            ntc_date={applicationform.ntc_date}
                                            ntcv_no={applicationform.ntcv_no}
                                            ntcv_date={applicationform.ntcv_date}
                                            teamleader={applicationform.team_leader}
                                            fireinspectors={applicationform.fireInspectors}
                                            defects={applicationform.defects}
                                            remarks={applicationform.remarks}
                                            receivedby={applicationform.received_name}
                                            receiveddate={applicationform.receivedntcv_date}
                                            handleClose={() => handleCloseViewUpdateNTCV(applicationform.id)}
                                        />

                                        <ViewUpdateAbatementPopup
                                            bpid={applicationform.id}
                                            form='Renewal'
                                            activity={selectedAction[applicationform.id]}
                                            open={openViewUpdateAbatement[applicationform.id]}
                                            business_no={applicationform.bspermit_no}
                                            permitee={applicationform.permittee}
                                            business_name={applicationform.business_name}
                                            address={applicationform.address}
                                            natureofbusiness={applicationform.nature_business}
                                            typeofoccupancy={applicationform.type_occupancy}
                                            contactno={applicationform.contact_no}
                                            email={applicationform.email}
                                            datereceived={applicationform.date_received}
                                            inspection_no={applicationform.inspection_no}
                                            inspectiondate={applicationform.date_inspection}
                                            ntc_no={applicationform.ntc_no}
                                            ntc_date={applicationform.ntc_date}
                                            ntcv_no={applicationform.ntcv_no}
                                            ntcv_date={applicationform.ntcv_date}
                                            abatement_no={applicationform.abatement_no}
                                            abatement_date={applicationform.abatement_date}
                                            teamleader={applicationform.team_leader}
                                            fireinspectors={applicationform.fireInspectors}
                                            defects={applicationform.defects}
                                            remarks={applicationform.remarks}
                                            receivedby={applicationform.received_name}
                                            receiveddate={applicationform.receivedabatement_date}
                                            handleClose={() => handleCloseViewUpdateAbatement(applicationform.id)}
                                        />
                                        <ViewUpdateClosurePopup
                                            bpid={applicationform.id}
                                            form='Renewal'
                                            activity={selectedAction[applicationform.id]}
                                            open={openViewUpdateClosure[applicationform.id]}
                                            business_no={applicationform.bspermit_no}
                                            permitee={applicationform.permittee}
                                            business_name={applicationform.business_name}
                                            address={applicationform.address}
                                            natureofbusiness={applicationform.nature_business}
                                            typeofoccupancy={applicationform.type_occupancy}
                                            contactno={applicationform.contact_no}
                                            email={applicationform.email}
                                            datereceived={applicationform.date_received}
                                            inspection_no={applicationform.inspection_no}
                                            inspectiondate={applicationform.date_inspection}
                                            ntc_no={applicationform.ntc_no}
                                            ntc_date={applicationform.ntc_date}
                                            ntcv_no={applicationform.ntcv_no}
                                            ntcv_date={applicationform.ntcv_date}
                                            abatement_no={applicationform.abatement_no}
                                            abatement_date={applicationform.abatement_date}
                                            closure_no={applicationform.closure_no}
                                            closure_date={applicationform.closure_date}
                                            teamleader={applicationform.team_leader}
                                            fireinspectors={applicationform.fireInspectors}
                                            defects={applicationform.defects}
                                            remarks={applicationform.remarks}
                                            receivedby={applicationform.received_name}
                                            receiveddate={applicationform.receivedclosure_date}
                                            handleClose={() => handleCloseViewUpdateClosure(applicationform.id)}
                                        />
                                        <EvaluatePopup
                                            form='Renewal'
                                            activity={sortBy}
                                            bpid={applicationform.id}
                                            open={openEvaluateBusiness[applicationform.id]}
                                            business_no={applicationform.bspermit_no}
                                            permitee={applicationform.permittee}
                                            business_name={applicationform.business_name}
                                            address={applicationform.address}
                                            natureofbusiness={applicationform.nature_business}
                                            typeofoccupancy={applicationform.type_occupancy}
                                            contactno={applicationform.contact_no}
                                            email={applicationform.email}
                                            datereceived={applicationform.date_received}
                                            handleClose={() => handleCloseEvaluate(applicationform.id)}
                                        />

                                        <DeleteClerkPopup
                                            open={deleteit}
                                            value={applicationform.id}
                                            form="NewBR"
                                            sortby = {sortBy}
                                            remarks={applicationform.remarks}
                                            handleClose={() => handleDeleteClose()}
                                        />
                                        <PrintClerkPopup
                                            open={print}
                                            handleClose={() => handlePrintClose()}
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