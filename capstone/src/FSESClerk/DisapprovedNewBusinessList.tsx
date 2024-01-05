import React, { useEffect, useState } from 'react';
import './ClerkCSS.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ClerkNavbar from './ClerkNavbar';
import EvaluateClosurePopup from './Dissapproved_New-Renewal_Business/EvaluateClosure';
import PrintClerkPopup from './PrintClerkPopup';
import DeleteClerkPopup from './DeleteClerkPopup';
import axios from 'axios';
import EvaluateNTCPopup from './Dissapproved_New-Renewal_Business/EvaluateNTC';
import EvaluateChoicePopup from './Dissapproved_New-Renewal_Business/EvaluateChoicePopup';
import EvaluateNTCVPopup from './Dissapproved_New-Renewal_Business/EvaluateNTCV';
import EvaluateAbatementPopup from './Dissapproved_New-Renewal_Business/EvaluateAbatement';
import ViewUpdateNTC from './Dissapproved_New-Renewal_Business/View-UpdateNTC';
import ViewUpdateNTCVPopup from './Dissapproved_New-Renewal_Business/View-UpdateNTCV';
import ViewUpdateAbatementPopup from './Dissapproved_New-Renewal_Business/View-UpdateAbatement';
import ViewUpdateClosurePopup from './Dissapproved_New-Renewal_Business/View-UpdateClosure';
import EvaluatePopup from '../FSESEncoder/Approved_Business-Renewal_Permits/EvaluateApprovedApplication';
import UpdateRenewalApplication from '../FSESEncoder/Approved_Business-Renewal_Permits/UpdateRenewalApplication';
import ViewRenewalApplication from '../FSESEncoder/Approved_Business-Renewal_Permits/ViewRenewalApplication';
import { DocumentData, QuerySnapshot, onSnapshot } from 'firebase/firestore';
import { dissaprovedNewBusinessPermit } from '../types/Users';
import { disapprovedNewBusinessCollection } from '../lib/controller';



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

const DisapprovedNewBusiness: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [sortBy, setSortBy] = useState('Pending Records');
    const [open, setOpen] = useState(false);
    const [selectedAction, setSelectedAction] = useState<Record<number, string>>({});
    const [openViewPending, setopenViewPending] = useState<Record<number, boolean>>({});
    const [openUpdateOccupancy, setopenUpdateOccupancy] = useState<Record<number, boolean>>({});
    const [openprevEvaluateNTC, setopenprevEvaluateNTC] = useState<Record<number, boolean>>({}); //Opens NTC Form
    const [openprevEvaluateNTCV, setopenprevEvaluateNTCV] = useState<Record<number, boolean>>({}); //Opens NTCV Form
    const [openprevViewUpdateNTC, setopenViewUpdateNTC] = useState<Record<number, boolean>>({}); //Opens VIEW UPDATE NTC Form
    const [openViewUpdateNTCV, setopenViewUpdateNTCV] = useState<Record<number, boolean>>({}); //Opens VIEW UPDATE NTCV Form
    const [openViewUpdateAbatement, setopenViewUpdateAbatement] = useState<Record<number, boolean>>({}); //Opens NTCV Form
    const [openViewUpdateClosure, setopenViewUpdateClosure] = useState<Record<number, boolean>>({}); //Opens NTCV Form
    const [openprevEvaluateAbatement, setopenprevEvaluateAbatement] = useState<Record<number, boolean>>({}); //Opens Abatement Form
    const [openprevEvaluateClosure, setopenprevEvaluateClosure] = useState<Record<number, boolean>>({}); //Opens Closure Form
    const [openEvaluateBusiness, setopenEvaluateBusiness] = useState<Record<number, boolean>>({});
    const [openEvalChoice, setopenEvalChoice] = useState<Record<number, boolean>>({});
    const [openViewUpdOccupancy, setopenViewUpdOccupancy] = useState<Record<number, boolean>>({});
    const [test, setTest] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<Record<number, boolean>>({});
    const [print, setPrint] = useState(false);
    const [dissaprovedNewBusinessPermit, setdissaprovedNewBusinessPermit] = useState<dissaprovedNewBusinessPermit[]>([]);



    useEffect(
        () =>
            onSnapshot(disapprovedNewBusinessCollection, (snapshot:
                QuerySnapshot<DocumentData>) => {
                setdissaprovedNewBusinessPermit(
                    snapshot.docs.map((doc) => {
                        return {
                            id: doc.id,
                            ...doc.data(),
                        };
                    })
                );
                console.log(dissaprovedNewBusinessPermit)
            }),
        []
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

    //VIEW Popup
    const handleOpenViewPending = (no: number) => {
        setopenViewPending((prevRenewal) => ({
            ...prevRenewal,
            [no]: true,
        }));
    };

    //View Popup Close
    const handleCloseViewPending = (no: number) => {
        setopenViewPending((prevRenewal) => ({
            ...prevRenewal,
            [no]: false,
        }));
        handleRender()
    };


    //Opens Evaluate NTC
    const handleOpenView = (no: number) => {
        setopenprevEvaluateNTC((prevEvaluateNTC) => ({
            ...prevEvaluateNTC,
            [no]: true,
        }));
        handleRender();
    };
    // Closes Evaluate NTC
    const handleCloseView = (no: number) => {
        setopenprevEvaluateNTC((prevEvaluateNTC) => ({
            ...prevEvaluateNTC,
            [no]: false,
        }));
        handleRender();
    };
    //Opens Update View NTC
    const handleOpenViewUpdateNTC = (no: number) => {
        setopenViewUpdateNTC((prevEvaluateNTC) => ({
            ...prevEvaluateNTC,
            [no]: true,
        }));
        handleRender();
    };
    // Closes Update View NTC
    const handleCloseViewUpdateNTC = (no: number) => {
        setopenViewUpdateNTC((prevEvaluateNTC) => ({
            ...prevEvaluateNTC,
            [no]: false,
        }));
        handleRender();
    };

    //Opens Update View NTCV
    const handleOpenViewUpdateNTCV = (no: number) => {
        setopenViewUpdateNTCV((prevEvaluateNTCV) => ({
            ...prevEvaluateNTCV,
            [no]: true,
        }));
        handleRender();
    };
    // Closes Update View NTCV
    const handleCloseViewUpdateNTCV = (no: number) => {
        setopenViewUpdateNTCV((prevEvaluateNTCV) => ({
            ...prevEvaluateNTCV,
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



    //Opens Evaluate NTCV
    const handleOpenNTCV = (no: number) => {
        setopenprevEvaluateNTCV((prevEvaluateNTCV) => ({
            ...prevEvaluateNTCV,
            [no]: true,
        }));

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


    //Opens Evaluate Closure
    const handleOpenClosure = (no: number) => {
        setopenprevEvaluateClosure((prevEvaluateClosure) => ({
            ...prevEvaluateClosure,
            [no]: true,
        }));

    };
    // Closes Evaluate Closure
    const handleCloseClosure = (no: number) => {
        setopenprevEvaluateClosure((prevEvaluateClosure) => ({
            ...prevEvaluateClosure,
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
    };

    //VIEW/Update Evaluate Popup Close
    const handleCloseViewUpdate = (no: number) => {
        setopenViewUpdOccupancy((prevOpenView) => ({
            ...prevOpenView,
            [no]: false,
        }));
    };

    //Update Popup 
    const handleOpenUpdate = (no: number) => {
        setopenUpdateOccupancy((prevOpenUpdate) => ({
            ...prevOpenUpdate,
            [no]: true,
        }));
        handleRender();
    };

    //Update Popup
    const handleCloseUpdate = (no: number) => {
        setopenUpdateOccupancy((prevOpenUpdate) => ({
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
    const handleOpenDelete = (no: number) => {
        setOpenDelete((prevRenewal) => ({
            ...prevRenewal,
            [no]: true,
        }));
    };

    //Delete Popup Close
    const handleCloseDelete = (no: number) => {
        setOpenDelete((prevRenewal) => ({
            ...prevRenewal,
            [no]: false,
        }));
        handleRender()
    };

    //Handles the button Logic 
    const handleNext = (value: number, status: string, buildingno: string) => {
        const selectedValue = selectedAction[value];

        if (selectedValue === 'Delete') {
            // Perform delete logic here
            handleOpenDelete(value);

        }
        if (status === 'Pending') {
            //Pending function condition goes here
            if (selectedValue === 'View') {
                handleOpenViewPending(value);
            }
            else if (selectedValue === 'Update') {
                handleOpenUpdate(value);

            }
            else if (selectedValue === 'Evaluate') {
                handleOpenView(value);
            }
            else if (selectedValue === 'Print') {
                handlePrintOpen();

            }
        }
        else if ((sortBy === 'NTC Records' && status === 'For Issuance NTCV') || (sortBy === 'NTC Records' && status === 'Issued NTCV') || (sortBy === 'NTC Records' && status === 'Complied')) {
            if ((selectedValue === 'Evaluate') && (status === 'For Issuance NTCV')) {
                //Completed function condition goes here
                handleOpenEvalChoice(value);
            }
            else if ((selectedValue === 'View') || (selectedValue === 'Update')) {
                handleOpenViewUpdateNTC(value);
                handleRender();
            }
            else if (selectedValue === 'Print') {
                handlePrintOpen();

            }
        }
        else if ((sortBy === 'NTCV Records' && status === 'For Issuance Abatement') || (sortBy === 'NTCV Records' && status === 'Issued Abatement') || (sortBy === 'NTCV Records' && status === 'Complied')) {
            //Completed function condition goes here
            if ((selectedValue === 'Evaluate') && (status === 'For Issuance Abatement')) {
                handleOpenEvalChoice(value);
            }
            else if ((selectedValue === 'View') || (selectedValue === 'Update')) {
                handleOpenViewUpdateNTCV(value);
                handleRender();
            }
            else if (selectedValue === 'Print') {
                handlePrintOpen();

            }
        }
        else if ((sortBy === 'Abatement Records' && status === 'For Issuance Closure') || (sortBy === 'Abatement Records' && status === 'Issued Closure') || (sortBy === 'Abatement Records' && status === 'Complied')) {
            //Completed function condition goes here
            if ((selectedValue === 'Evaluate') && (status === 'For Issuance Closure')) {
                handleOpenEvalChoice(value);

            }
            else if ((selectedValue === 'View') || (selectedValue === 'Update')) {
                handleOpenViewUpdateAbatement(value);
                console.log(sortBy)
                handleRender();
            }
            else if (selectedValue === 'Print') {
                handlePrintOpen();

            }
        }
        else if ((sortBy === 'Closure Records' && status === 'For Issuance Closure') || (sortBy === 'Closure Records' && status === 'Issued Closure') || (sortBy === 'Closure Records' && status === 'Complied')) {
            if ((selectedValue === 'Evaluate') && (status === 'Issued Closure')) {
                handleOpenEvalChoice(value);

            }
            else if ((selectedValue === 'View') || (selectedValue === 'Update')) {
                handleOpenViewUpdateClosure(value);
            }else if (selectedValue === 'Print') {
                handlePrintOpen();

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
                        <h1 className="title">New Business List</h1>
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
                        {dissaprovedNewBusinessPermit
                            .filter((dissaprovedNewBusinessPermit) => {
                                // Filter based on the searchText value
                                if (searchText === '') {
                                    return true; // Show all records if no search text is entered
                                } else {
                                    // Filter based on the businessPermitNo or ownerName containing the searchText
                                    const business_no = dissaprovedNewBusinessPermit?.businessno || '';
                                    const permittee = dissaprovedNewBusinessPermit?.permittee || '';
                                    return (
                                        business_no.toLowerCase().includes(searchText.toLowerCase()) ||
                                        permittee.toLowerCase().includes(searchText.toLowerCase())
                                    );
                                }
                            })
                            .map((dissaprovedNewBusinessPermit) => (
                                <tr key={dissaprovedNewBusinessPermit.id}>
                                    <td>{dissaprovedNewBusinessPermit.id}</td>
                                    <td>{dissaprovedNewBusinessPermit.businessno}</td>
                                    <td>{dissaprovedNewBusinessPermit.permittee}</td>
                                    <td>{dissaprovedNewBusinessPermit.businessname}</td>
                                    <td>{dissaprovedNewBusinessPermit.typeoccupancy}</td>
                                    <td>{sortBy === 'Pending Records' ? 'N/A' :
                                        'NTC Records' ? dissaprovedNewBusinessPermit.ntc_no :
                                            'NTCV Records' ? dissaprovedNewBusinessPermit.ntcv_no :
                                                'Abatement Records' ? dissaprovedNewBusinessPermit.abatement_no :
                                                    'Closure Records' ? dissaprovedNewBusinessPermit.closure_no :
                                                        'N/A'}</td>
                                    <td style={{ color: dissaprovedNewBusinessPermit.remarks === 'Complied' || dissaprovedNewBusinessPermit.remarks === 'FSIC Printed' ? 'green' : 
                                    dissaprovedNewBusinessPermit.remarks === 'Pending' || dissaprovedNewBusinessPermit.remarks === 'For Issuance NTCV' || dissaprovedNewBusinessPermit.remarks === 'For Issuance Abatement' || dissaprovedNewBusinessPermit.remarks === 'For Issuance Closure' ? 'black' 
                                    : 'red'}}
                                    >{dissaprovedNewBusinessPermit.remarks}</td>
                                    <td>
                                        <select
                                            value={selectedAction[dissaprovedNewBusinessPermit.id] || ''}
                                            onChange={(event) => handleActionChange(event, dissaprovedNewBusinessPermit.id)}
                                            style={{ height: '35px', width: '120px', borderRadius: '8px', textAlign: 'center', backgroundColor: '#D9D9D9' }}
                                        >
                                            <option value="">-select-</option>
                                            <option value="View">View</option>
                                            <option value="Update">Update</option>
                                            <option value="Evaluate">Evaluate</option>
                                            {/* <option value="Print">Print</option>*/}
                                            <option value="Delete">Delete</option>
                                        </select>
                                        <IconButton className="next-button" onClick={() => handleNext(dissaprovedNewBusinessPermit.id, dissaprovedNewBusinessPermit.remarks, dissaprovedNewBusinessPermit.businessno)}>
                                            <ArrowCircleRightIcon sx={{ color: '#3C486B' }} />
                                        </IconButton>
                                        {/*<ViewRenewalApplication 
                                        open={openViewPending[dissaprovedNewBusinessPermit.id]} 
                                        handleClose={() => handleCloseViewPending(dissaprovedNewBusinessPermit.id)} 
                                        bspermit_no={dissaprovedNewBusinessPermit.bspermit_no}
                                        permitee={dissaprovedNewBusinessPermit.permittee}
                                        businessname={dissaprovedNewBusinessPermit.business_name}
                                        address={dissaprovedNewBusinessPermit.address}
                                        natureofbusiness={dissaprovedNewBusinessPermit.nature_business}
                                        typeofoccupancy={dissaprovedNewBusinessPermit.type_occupancy}
                                        contactno={dissaprovedNewBusinessPermit.contact_no}
                                        email={dissaprovedNewBusinessPermit.email}
                                        datereceived={dissaprovedNewBusinessPermit.date_received}
                                        />
                                        <UpdateRenewalApplication 
                                        open={openUpdateOccupancy[dissaprovedNewBusinessPermit.id]} 
                                        handleClose={() => handleCloseUpdate(dissaprovedNewBusinessPermit.id)} 
                                        bspermit_no={dissaprovedNewBusinessPermit.bspermit_no}
                                        permitee={dissaprovedNewBusinessPermit.permittee}
                                        businessname={dissaprovedNewBusinessPermit.business_name}
                                        address={dissaprovedNewBusinessPermit.address}
                                        natureofbusiness={dissaprovedNewBusinessPermit.nature_business}
                                        typeofoccupancy={dissaprovedNewBusinessPermit.type_occupancy}
                                        contactno={dissaprovedNewBusinessPermit.contact_no}
                                        email={dissaprovedNewBusinessPermit.email}
                                        datereceived={dissaprovedNewBusinessPermit.date_received}
                                        id={dissaprovedNewBusinessPermit.id}
                                        form ="New"
                                        />
                                        <EvaluateNTCPopup
                                            bpid={dissaprovedNewBusinessPermit.id}
                                            form='New'
                                            activity={selectedAction[dissaprovedNewBusinessPermit.id]}
                                            open={openprevEvaluateNTC[dissaprovedNewBusinessPermit.id]}
                                            business_no={dissaprovedNewBusinessPermit.bspermit_no}
                                            permitee={dissaprovedNewBusinessPermit.permittee}
                                            business_name={dissaprovedNewBusinessPermit.business_name}
                                            address={dissaprovedNewBusinessPermit.address}
                                            natureofbusiness={dissaprovedNewBusinessPermit.nature_business}
                                            typeofoccupancy={dissaprovedNewBusinessPermit.type_occupancy}
                                            contactno={dissaprovedNewBusinessPermit.contact_no}
                                            email={dissaprovedNewBusinessPermit.email}
                                            datereceived={dissaprovedNewBusinessPermit.date_received}
                                            handleClose={() => handleCloseView(dissaprovedNewBusinessPermit.id)}
                                        />
                                        <DeleteClerkPopup
                                            open={openDelete[dissaprovedNewBusinessPermit.id]}
                                            value={dissaprovedNewBusinessPermit.id}
                                            form="NewBP"
                                            sortby = {sortBy}
                                            remarks={dissaprovedNewBusinessPermit.remarks}
                                            handleClose={() => handleCloseDelete(dissaprovedNewBusinessPermit.id)}
                                        />
                                        <PrintClerkPopup
                                            open={print}
                                            handleClose={() => handlePrintClose()}
                                        />
                                        <EvaluateChoicePopup
                                            open={openEvalChoice[dissaprovedNewBusinessPermit.id]}
                                            remarks={sortBy}
                                            handleOpenApproved={() => handleOpenEvaluate(dissaprovedNewBusinessPermit.id)}
                                            handleOpenNTCV={() => handleOpenNTCV(dissaprovedNewBusinessPermit.id)}
                                            handleOpenAbatement={() => handleOpenAbatement(dissaprovedNewBusinessPermit.id)}
                                            handleOpenClosure={() => handleOpenClosure(dissaprovedNewBusinessPermit.id)}
                                            handleClose={() => handleCloseEvalCHoice(dissaprovedNewBusinessPermit.id)}

                                        />
                                        <EvaluateNTCVPopup
                                            bpid={dissaprovedNewBusinessPermit.id}
                                            form='New'
                                            open={openprevEvaluateNTCV[dissaprovedNewBusinessPermit.id]}
                                            business_no={dissaprovedNewBusinessPermit.bspermit_no}
                                            permitee={dissaprovedNewBusinessPermit.permittee}
                                            business_name={dissaprovedNewBusinessPermit.business_name}
                                            address={dissaprovedNewBusinessPermit.address}
                                            natureofbusiness={dissaprovedNewBusinessPermit.nature_business}
                                            typeofoccupancy={dissaprovedNewBusinessPermit.type_occupancy}
                                            contactno={dissaprovedNewBusinessPermit.contact_no}
                                            email={dissaprovedNewBusinessPermit.email}
                                            datereceived={dissaprovedNewBusinessPermit.date_received}
                                            ntc={dissaprovedNewBusinessPermit.ntc_no}
                                            ntc_date={dissaprovedNewBusinessPermit.ntc_date}
                                            defects={dissaprovedNewBusinessPermit.defects}
                                            handleClose={() => handleCloseNTCV(dissaprovedNewBusinessPermit.id)}
                                        />
                                        <EvaluateAbatementPopup
                                            bpid={dissaprovedNewBusinessPermit.id}
                                            form='New'
                                            open={openprevEvaluateAbatement[dissaprovedNewBusinessPermit.id]}
                                            business_no={dissaprovedNewBusinessPermit.bspermit_no}
                                            permitee={dissaprovedNewBusinessPermit.permittee}
                                            business_name={dissaprovedNewBusinessPermit.business_name}
                                            address={dissaprovedNewBusinessPermit.address}
                                            natureofbusiness={dissaprovedNewBusinessPermit.nature_business}
                                            typeofoccupancy={dissaprovedNewBusinessPermit.type_occupancy}
                                            contactno={dissaprovedNewBusinessPermit.contact_no}
                                            email={dissaprovedNewBusinessPermit.email}
                                            datereceived={dissaprovedNewBusinessPermit.date_received}
                                            ntc={dissaprovedNewBusinessPermit.ntc_no}
                                            ntc_date={dissaprovedNewBusinessPermit.ntc_date}
                                            ntcv={dissaprovedNewBusinessPermit.ntcv_no}
                                            ntcv_date={dissaprovedNewBusinessPermit.ntcv_date}
                                            defects={dissaprovedNewBusinessPermit.defects}
                                            handleClose={() => handleCloseAbatement(dissaprovedNewBusinessPermit.id)}
                                        />
                                        <EvaluateClosurePopup
                                            bpid={dissaprovedNewBusinessPermit.id}
                                            form='New'
                                            open={openprevEvaluateClosure[dissaprovedNewBusinessPermit.id]}
                                            business_no={dissaprovedNewBusinessPermit.bspermit_no}
                                            permitee={dissaprovedNewBusinessPermit.permittee}
                                            business_name={dissaprovedNewBusinessPermit.business_name}
                                            address={dissaprovedNewBusinessPermit.address}
                                            natureofbusiness={dissaprovedNewBusinessPermit.nature_business}
                                            typeofoccupancy={dissaprovedNewBusinessPermit.type_occupancy}
                                            contactno={dissaprovedNewBusinessPermit.contact_no}
                                            email={dissaprovedNewBusinessPermit.email}
                                            datereceived={dissaprovedNewBusinessPermit.date_received}
                                            ntc={dissaprovedNewBusinessPermit.ntc_no}
                                            ntc_date={dissaprovedNewBusinessPermit.ntc_date}
                                            ntcv={dissaprovedNewBusinessPermit.ntcv_no}
                                            ntcv_date={dissaprovedNewBusinessPermit.ntcv_date}
                                            abatement={dissaprovedNewBusinessPermit.abatement_no}
                                            abatement_date={dissaprovedNewBusinessPermit.abatement_date}
                                            defects={dissaprovedNewBusinessPermit.defects}
                                            handleClose={() => handleCloseClosure(dissaprovedNewBusinessPermit.id)}

                                        />
                                        <ViewUpdateNTC
                                            bpid={dissaprovedNewBusinessPermit.id}
                                            form='New'
                                            activity={selectedAction[dissaprovedNewBusinessPermit.id]}
                                            open={openprevViewUpdateNTC[dissaprovedNewBusinessPermit.id]}
                                            business_no={dissaprovedNewBusinessPermit.bspermit_no}
                                            permitee={dissaprovedNewBusinessPermit.permittee}
                                            business_name={dissaprovedNewBusinessPermit.business_name}
                                            address={dissaprovedNewBusinessPermit.address}
                                            natureofbusiness={dissaprovedNewBusinessPermit.nature_business}
                                            typeofoccupancy={dissaprovedNewBusinessPermit.type_occupancy}
                                            contactno={dissaprovedNewBusinessPermit.contact_no}
                                            email={dissaprovedNewBusinessPermit.email}
                                            datereceived={dissaprovedNewBusinessPermit.date_received}
                                            inspection_no={dissaprovedNewBusinessPermit.inspection_no}
                                            inspectiondate={dissaprovedNewBusinessPermit.date_inspected}
                                            ntc_no={dissaprovedNewBusinessPermit.ntc_no}
                                            ntc_date={dissaprovedNewBusinessPermit.ntc_date}
                                            teamleader={dissaprovedNewBusinessPermit.team_leader}
                                            fireinspectors={dissaprovedNewBusinessPermit.fire_inspectors}
                                            defects={dissaprovedNewBusinessPermit.defects}
                                            remarks={dissaprovedNewBusinessPermit.remarks}
                                            receivedby={dissaprovedNewBusinessPermit.name}
                                            receiveddate={dissaprovedNewBusinessPermit.date}
                                            handleClose={() => handleCloseViewUpdateNTC(dissaprovedNewBusinessPermit.id)}
                                        />
                                        <ViewUpdateNTCVPopup
                                            bpid={dissaprovedNewBusinessPermit.id}
                                            form='New'
                                            activity={selectedAction[dissaprovedNewBusinessPermit.id]}
                                            open={openViewUpdateNTCV[dissaprovedNewBusinessPermit.id]}
                                            business_no={dissaprovedNewBusinessPermit.bspermit_no}
                                            permitee={dissaprovedNewBusinessPermit.permittee}
                                            business_name={dissaprovedNewBusinessPermit.business_name}
                                            address={dissaprovedNewBusinessPermit.address}
                                            natureofbusiness={dissaprovedNewBusinessPermit.nature_business}
                                            typeofoccupancy={dissaprovedNewBusinessPermit.type_occupancy}
                                            contactno={dissaprovedNewBusinessPermit.contact_no}
                                            email={dissaprovedNewBusinessPermit.email}
                                            datereceived={dissaprovedNewBusinessPermit.date_received}
                                            inspection_no={dissaprovedNewBusinessPermit.inspection_no}
                                            inspectiondate={dissaprovedNewBusinessPermit.date_inspected}
                                            ntc_no={dissaprovedNewBusinessPermit.ntc_no}
                                            ntc_date={dissaprovedNewBusinessPermit.ntc_date}
                                            ntcv_no={dissaprovedNewBusinessPermit.ntcv_no}
                                            ntcv_date={dissaprovedNewBusinessPermit.ntcv_date}
                                            teamleader={dissaprovedNewBusinessPermit.team_leader}
                                            fireinspectors={dissaprovedNewBusinessPermit.fire_inspectors}
                                            defects={dissaprovedNewBusinessPermit.defects}
                                            remarks={dissaprovedNewBusinessPermit.remarks}
                                            receivedby={dissaprovedNewBusinessPermit.name}
                                            receiveddate={dissaprovedNewBusinessPermit.date}
                                            handleClose={() => handleCloseViewUpdateNTCV(dissaprovedNewBusinessPermit.id)}
                                        />
                                        <ViewUpdateAbatementPopup
                                            bpid={dissaprovedNewBusinessPermit.id}
                                            form='New'
                                            activity={selectedAction[dissaprovedNewBusinessPermit.id]}
                                            open={openViewUpdateAbatement[dissaprovedNewBusinessPermit.id]}
                                            business_no={dissaprovedNewBusinessPermit.bspermit_no}
                                            permitee={dissaprovedNewBusinessPermit.permittee}
                                            business_name={dissaprovedNewBusinessPermit.business_name}
                                            address={dissaprovedNewBusinessPermit.address}
                                            natureofbusiness={dissaprovedNewBusinessPermit.nature_business}
                                            typeofoccupancy={dissaprovedNewBusinessPermit.type_occupancy}
                                            contactno={dissaprovedNewBusinessPermit.contact_no}
                                            email={dissaprovedNewBusinessPermit.email}
                                            datereceived={dissaprovedNewBusinessPermit.date_received}
                                            inspection_no={dissaprovedNewBusinessPermit.inspection_no}
                                            inspectiondate={dissaprovedNewBusinessPermit.date_inspected}
                                            ntc_no={dissaprovedNewBusinessPermit.ntc_no}
                                            ntc_date={dissaprovedNewBusinessPermit.ntc_date}
                                            ntcv_no={dissaprovedNewBusinessPermit.ntcv_no}
                                            ntcv_date={dissaprovedNewBusinessPermit.ntcv_date}
                                            abatement_no={dissaprovedNewBusinessPermit.abatement_no}
                                            abatement_date={dissaprovedNewBusinessPermit.abatement_date}
                                            teamleader={dissaprovedNewBusinessPermit.team_leader}
                                            fireinspectors={dissaprovedNewBusinessPermit.fire_inspectors}
                                            defects={dissaprovedNewBusinessPermit.defects}
                                            remarks={dissaprovedNewBusinessPermit.remarks}
                                            receivedby={dissaprovedNewBusinessPermit.name}
                                            receiveddate={dissaprovedNewBusinessPermit.date}
                                            handleClose={() => handleCloseViewUpdateAbatement(dissaprovedNewBusinessPermit.id)}
                                        />
                                        <ViewUpdateClosurePopup
                                            bpid={dissaprovedNewBusinessPermit.id}
                                            form='New'
                                            activity={selectedAction[dissaprovedNewBusinessPermit.id]}
                                            open={openViewUpdateClosure[dissaprovedNewBusinessPermit.id]}
                                            business_no={dissaprovedNewBusinessPermit.bspermit_no}
                                            permitee={dissaprovedNewBusinessPermit.permittee}
                                            business_name={dissaprovedNewBusinessPermit.business_name}
                                            address={dissaprovedNewBusinessPermit.address}
                                            natureofbusiness={dissaprovedNewBusinessPermit.nature_business}
                                            typeofoccupancy={dissaprovedNewBusinessPermit.type_occupancy}
                                            contactno={dissaprovedNewBusinessPermit.contact_no}
                                            email={dissaprovedNewBusinessPermit.email}
                                            datereceived={dissaprovedNewBusinessPermit.date_received}
                                            inspection_no={dissaprovedNewBusinessPermit.inspection_no}
                                            inspectiondate={dissaprovedNewBusinessPermit.date_inspected}
                                            ntc_no={dissaprovedNewBusinessPermit.ntc_no}
                                            ntc_date={dissaprovedNewBusinessPermit.ntc_date}
                                            ntcv_no={dissaprovedNewBusinessPermit.ntcv_no}
                                            ntcv_date={dissaprovedNewBusinessPermit.ntcv_date}
                                            abatement_no={dissaprovedNewBusinessPermit.abatement_no}
                                            abatement_date={dissaprovedNewBusinessPermit.abatement_date}
                                            closure_no={dissaprovedNewBusinessPermit.closure_no}
                                            closure_date={dissaprovedNewBusinessPermit.closure_date}
                                            teamleader={dissaprovedNewBusinessPermit.team_leader}
                                            fireinspectors={dissaprovedNewBusinessPermit.fire_inspectors}
                                            defects={dissaprovedNewBusinessPermit.defects}
                                            remarks={dissaprovedNewBusinessPermit.remarks}
                                            receivedby={dissaprovedNewBusinessPermit.name}
                                            receiveddate={dissaprovedNewBusinessPermit.date}
                                            handleClose={() => handleCloseViewUpdateClosure(dissaprovedNewBusinessPermit.id)}
                                        />

                                        <EvaluatePopup
                                            form='New'
                                            activity={sortBy}
                                            bpid={dissaprovedNewBusinessPermit.id}
                                            open={openEvaluateBusiness[dissaprovedNewBusinessPermit.id]}
                                            business_no={dissaprovedNewBusinessPermit.bspermit_no}
                                            permitee={dissaprovedNewBusinessPermit.permittee}
                                            business_name={dissaprovedNewBusinessPermit.business_name}
                                            address={dissaprovedNewBusinessPermit.address}
                                            natureofbusiness={dissaprovedNewBusinessPermit.nature_business}
                                            typeofoccupancy={dissaprovedNewBusinessPermit.type_occupancy}
                                            contactno={dissaprovedNewBusinessPermit.contact_no}
                                            email={dissaprovedNewBusinessPermit.email}
                                            datereceived={dissaprovedNewBusinessPermit.date_received}
                                            handleClose={() => handleCloseEvaluate(dissaprovedNewBusinessPermit.id)}
                                        />*/}

                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

            </div>
        </>
    )
}
export default DisapprovedNewBusiness