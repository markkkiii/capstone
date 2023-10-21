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
import ViewUpdateDisapprovedOccupancy from './Disapproved_Occupancy/View-UpdateDissaprovedOccupancy';
import DeleteClerkPopup from './DeleteClerkPopup';
import PrintClerkPopup from './PrintClerkPopup';
import axios from 'axios';
import EvaluateNTCPopup from './Dissapproved_New-Renewal_Business/EvaluateNTC';
import EvaluateChoicePopup from './Dissapproved_New-Renewal_Business/EvaluateChoicePopup';
import EvaluateNTCVPopup from './Dissapproved_New-Renewal_Business/EvaluateNTCV';
import EvaluateAbatementPopup from './Dissapproved_New-Renewal_Business/EvaluateAbatement';
import EvaluateClosurePopup from './Dissapproved_New-Renewal_Business/EvaluateClosure';


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
    const [openViewOccupancy, setopenViewOccupancy] = useState<Record<number, boolean>>({});
    const [openUpdateOccupancy, setopenUpdateOccupancy] = useState<Record<number, boolean>>({});
    const [openEvalOccupancy, setopenEvalOccupancy] = useState<Record<number, boolean>>({});
    const [openViewUpdOccupancy, setopenViewUpdOccupancy] = useState<Record<number, boolean>>({});
    const [openprevEvaluateNTC, setopenprevEvaluateNTC] = useState<Record<number, boolean>>({}); //Opens NTC Form
    const [openprevEvaluateNTCV, setopenprevEvaluateNTCV] = useState<Record<number, boolean>>({}); //Opens NTCV Form
    const [openprevEvaluateAbatement, setopenprevEvaluateAbatement] = useState<Record<number, boolean>>({}); //Opens Abatement Form
    const [openprevEvaluateClosure, setopenprevEvaluateClosure] = useState<Record<number, boolean>>({}); //Opens Closure Form
    const [openEvalChoice, setopenEvalChoice] = useState<Record<number, boolean>>({});//Open NTC Choice Pop up
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

    };
    //Close EVAL NTC
    const handleCloseEvalNTC = (no: number) => {
        setopenprevEvaluateNTC((prevEvaluateNTC) => ({
            ...prevEvaluateNTC,
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

    };
    // Closes Evaluate Choice
    const handleCloseEvalCHoice = (no: number) => {
        setopenEvalChoice((prevEvalChoice) => ({
            ...prevEvalChoice,
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
        setopenViewOccupancy((prevOpenView) => ({
            ...prevOpenView,
            [no]: true,
        }));
    };

    //View Popup Close
    const handleCloseView = (no: number) => {
        setopenViewOccupancy((prevOpenView) => ({
            ...prevOpenView,
            [no]: false,
        }));
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
    };

    //Update Popup
    const handleCloseUpdate = (no: number) => {
        setopenUpdateOccupancy((prevOpenUpdate) => ({
            ...prevOpenUpdate,
            [no]: false,
        }));
    };

    //Evaluate Popup 
    const handleOpenEval = (no: number) => {
        setopenEvalOccupancy((prevOpenEval) => ({
            ...prevOpenEval,
            [no]: true,
        }));
    };

    //Evaluate Popup
    const handleCloseEval = (no: number) => {
        setopenEvalOccupancy((prevOpenEval) => ({
            ...prevOpenEval,
            [no]: false,
        }));
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
            }
            else if (selectedValue === 'Update') {
                handleOpenUpdate(value);
            }
            else if (selectedValue === 'Evaluate') {
                handleOpenEvalNTC(value);
            }
            else if (selectedValue === 'Print') {
                handlePrintOpen();

            }
        }
        else if (status === 'For Issuance NTCV') {
            if (selectedValue === 'Evaluate') {
                //Completed function condition goes here
                handleOpenEvalChoice(value);
            }
        }
        else if (status === 'For Issuance Abatement') {
            //Completed function condition goes here
            if (selectedValue === 'Evaluate') {
                handleOpenEvalChoice(value);
            }

        }
        else if (status === 'For Issuance Closure') {
            //Completed function condition goes here
            if (selectedValue === 'Evaluate') {
                handleOpenEvalChoice(value);
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
                        <h1 className="title">Renewal Business Permit List</h1>
                    </div>
                    <div className="sort-container">
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="">Sort By</option>
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
                                        <ViewPendingOccupancyList open={openViewOccupancy[applicationform.id]} handleClose={() => handleCloseView(applicationform.id)} />
                                        <UpdatePendingOccupancyPopup open={openUpdateOccupancy[applicationform.id]} handleClose={() => handleCloseUpdate(applicationform.id)} />
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
                                            ntcv = {applicationform.ntcv_no}
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
                                            defects={applicationform.defects}
                                            handleClose={() => handleCloseClosure(applicationform.id)}
                                        />

                                        <DeleteClerkPopup
                                            open={deleteit}
                                            value={applicationform.id}
                                            form = "New"
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