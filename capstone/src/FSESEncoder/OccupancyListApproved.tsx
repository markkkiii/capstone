import React, { useEffect, useState } from 'react';
import Navbar from './Navbar'
import './BusinessList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button, IconButton } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ViewPendingOccupancyList from '../FSESClerk/Pending_Occupancy/ViewPendingOccupancyPopup';
import UpdatePendingOccupancyPopup from '../FSESClerk/Pending_Occupancy/UpdatePendingOccupancyPopup';
import DeleteEncoderPopup from './DeleteEncoderPopup';
import PrintEncoderPopup from './PrintEncoderPopup';
import axios from 'axios';
import EvaluateApprovedOccupancy from './Approved_Occupancy/EvaluateApprovedOccupancy';
import ViewUpdateApprovedOccupancy from './Approved_Occupancy/ViewUpdateApprovedOccupancy';

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


const OccupancyListApproved: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [sortBy, setSortBy] = useState('Pending Records');
    const [open, setOpen] = useState(false);
    const [selectedAction, setSelectedAction] = useState<Record<number, string>>({});
    const [openDisOccupancy, setopenDisOccupancy] = useState<Record<number, boolean>>({});
    const [openViewOccupancy, setopenViewOccupancy] = useState<Record<number, boolean>>({});
    const [openUpdateOccupancy, setopenUpdateOccupancy] = useState<Record<number, boolean>>({});
    const [openEvalOccupancy, setopenEvalOccupancy] = useState<Record<number, boolean>>({});
    const [openViewUpdateEvalOccupancy, setopenViewUpdateEvalOccupancy] = useState<Record<number, boolean>>({});
    const [openDelete, setOpenDelete] = useState<Record<number, boolean>>({});
    const [print, setPrint] = useState(false);
    const [test, setTest] = useState<boolean>(false);


    const [applicationform, SetApplicationForm] = useState([{
        id: 0,
        control_no: 20,
        bldgpermit_no: '20-2',
        applicants_name: 'Default',
        project_name: 'Default',
        location: 'Default',
        contact_no: 'Default',
        date_received: '2023-09-01',
        team_leader: 'default',
        fire_inspectors: ['default', 'default1'],
        inspection_no: 0,
        date_inspection: '2023-09-01',
        amount_additional:0,
        or_no_additional:"",
        payment_date_additional:'2023-09-01',
        received_name: 'Default',
        receivedoccu_date: '2023-09-01',
        recommendations: ['default', 'default1'],
        remarks: "Pending",
        fsic_no: 12,
        fsic_date: '',
        amount: 0,
        or_no: '',
        payment_date: '',

    }])

    useEffect(() => {
        if (sortBy === 'Pending Records') {
            axios.get('http://localhost:8080/occupancyPendingclerk/getAllOccupancyPendingClerk').then(res => {
                SetApplicationForm(res.data)
            }).catch(err => console.log(err))
        }
        else if (sortBy === 'Approved Records') {
            axios.get('http://localhost:8080/approved/getAllApprovedApplication').then(res => {
                SetApplicationForm(res.data)
                console.log(applicationform)
                console.log(res.data)
            }).catch(err => console.log(err))
        }
    }, [sortBy, test]);



    const handleRender = () => {
        setTest(prevTest => !prevTest);
    };
    //Evaluate Popup Open
    const handleOpenDisOccupancy = (no: number) => {
        setopenDisOccupancy((prevOccu) => ({
            ...prevOccu,
            [no]: true,
        }));
    };

    //Evaluate Popup Close
    const handleCloseDisOccupancy = (no: number) => {
        setopenDisOccupancy((prevOccu) => ({
            ...prevOccu,
            [no]: false,
        }));
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

    //View Update Evaluate Popup 
    const handleOpenUpdateViewEval = (no: number) => {
        setopenViewUpdateEvalOccupancy((prevOpenEval) => ({
            ...prevOpenEval,
            [no]: true,
        }));
        handleRender();
    };

    //View Update Evaluate Popup
    const handleCloseUpdateViewEval = (no: number) => {
        setopenViewUpdateEvalOccupancy((prevOpenEval) => ({
            ...prevOpenEval,
            [no]: false,
        }));
        handleRender();
    };


    //Open VIEW Update Popup
    const handleOpenView = (no: number) => {
        setopenViewOccupancy((prevOpenView) => ({
            ...prevOpenView,
            [no]: true,
        }));
        handleRender();
    };

    //Open View Update Popup Close
    const handleCloseView = (no: number) => {
        setopenViewOccupancy((prevOpenView) => ({
            ...prevOpenView,
            [no]: false,
        }));
        handleRender();
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


    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };
    const handleSearch = () => {
        // Perform search logic here based on the searchText value
        // For example, you can filter the buildingApplications array based on the searchText
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

    //Handles the button Logic 
    const handleNext = (value: number, status: string, buildingno: string) => {
        const selectedValue = selectedAction[value];

        if (selectedValue === 'Delete') {
            // Perform delete logic here
            handleOpenDelete(value);

        } else if (status === 'Pending') {
            //Pending function condition goes here
            if ((selectedValue === 'View') || (selectedValue === 'Update')) {
                handleOpenView(value);

            }
            else if (selectedValue === 'Evaluate') {
                handleOpenEval(value);
            }
            else if (selectedValue === 'Print') {
                handlePrintOpen();

            }
        } else if (status === 'FSIC Not Printed' || status === 'FSIC Printed') {
            //Completed function condition goes here
            if ((selectedValue === 'Update')|| (selectedValue === 'View')) {
                handleOpenUpdateViewEval(value);
    
            }
            if(selectedValue === 'Evaluate'){
                alert('Already evaluated!');
            }
            
        }

        else if (selectedValue === 'Print') {
            handlePrintOpen();

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
                        <h1 className="title">Occupancy Permit List</h1>
                    </div>
                    <div className="sort-container">
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="">Sort By</option>
                            <option value="Pending Records">Pending Records</option>
                            <option value="Approved Records">Approved Records</option>
                        </select>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Business Permit #</th>
                            <th>Owner's Name</th>
                            <th>Project Name</th>
                            <th>FSIC #</th>
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
                                        applicationform.bldgpermit_no.toLowerCase().includes(searchText.toLowerCase()) ||
                                        applicationform.applicants_name.toLowerCase().includes(searchText.toLowerCase())
                                    );
                                }
                            })
                            .map((applicationform) => (
                                <tr key={applicationform.id}>
                                    <td>{applicationform.id}</td>
                                    <td>{sortBy === 'Approved Records' ? applicationform.bldgpermit_no :
                                        applicationform.bldgpermit_no}</td>
                                    <td>{applicationform.applicants_name}</td>
                                    <td>{applicationform.project_name}</td>
                                    <td>{sortBy === 'Approved Records' ? applicationform.fsic_no :
                                        'N/A'}</td>
                                    <td style={{ color: applicationform.remarks === 'Complied' || applicationform.remarks === 'FSIC Printed' ? 'green' : 
                                    applicationform.remarks === 'Pending' ? 'black' 
                                    : 'red'}}>{applicationform.remarks}</td>
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
                                            {/* <option value="Print">Print</option>*/}
                                            <option value="Delete">Delete</option>
                                        </select>
                                        <IconButton className="next-button" onClick={() => handleNext(applicationform.id, applicationform.remarks, applicationform.bldgpermit_no)}>
                                            <ArrowCircleRightIcon sx={{ color: '#3C486B' }} />
                                        </IconButton>
                                        <ViewPendingOccupancyList
                                            id={applicationform.id}
                                            open={openViewOccupancy[applicationform.id]}
                                            handleClose={() => handleCloseView(applicationform.id)}
                                            activity={selectedAction[applicationform.id]}
                                            controlno={applicationform.control_no}
                                            buildingno={applicationform.bldgpermit_no}
                                            applicantname={applicationform.applicants_name}
                                            projectname={applicationform.project_name}
                                            location={applicationform.location}
                                            contact_no={applicationform.contact_no}
                                            date_received={applicationform.date_received}
                                            team_leader={applicationform.team_leader}
                                            fire_inspectors={applicationform.fire_inspectors}
                                            inspection_no={applicationform.inspection_no}
                                            date_inspection={applicationform.date_inspection}
                                            received_name={applicationform.received_name}
                                            receivedoccu_date={applicationform.receivedoccu_date}
                                        />
                                        <UpdatePendingOccupancyPopup open={openUpdateOccupancy[applicationform.id]} handleClose={() => handleCloseUpdate(applicationform.id)} />
                                        <EvaluateApprovedOccupancy
                                            open={openEvalOccupancy[applicationform.id]}
                                            handleClose={() => handleCloseEval(applicationform.id)}
                                            id={applicationform.id}
                                            inspectionno={applicationform.inspection_no}
                                            controlno={applicationform.control_no}
                                            buildingpermino={applicationform.bldgpermit_no}
                                            applicantname={applicationform.applicants_name}
                                            projecname={applicationform.project_name}
                                            address={applicationform.location}
                                            contactnumber={applicationform.contact_no}
                                            datereceived={applicationform.date_received}
                                            disapproved= {false}
                                        />
                                        <ViewUpdateApprovedOccupancy
                                            open={openViewUpdateEvalOccupancy[applicationform.id]}
                                            handleClose={() => handleCloseUpdateViewEval(applicationform.id)}
                                            id={applicationform.id}
                                            inspectionno={applicationform.inspection_no}
                                            controlno={applicationform.control_no}
                                            buildingpermino={applicationform.bldgpermit_no}
                                            applicantname={applicationform.applicants_name}
                                            projecname={applicationform.project_name}
                                            address={applicationform.location}
                                            contactnumber={applicationform.contact_no}
                                            datereceived={applicationform.date_received}
                                            fsic_date={applicationform.fsic_date}
                                            fsic_no={applicationform.fsic_no}
                                            amount={applicationform.amount}
                                            or_no={applicationform.or_no}
                                            remarks={applicationform.remarks}
                                            payment_date={applicationform.payment_date}
                                            addtional_paymentdate={applicationform.payment_date_additional}
                                            additional_amount= {applicationform.amount_additional}
                                            additional_or_no={applicationform.or_no_additional}
                                            recommendations={applicationform.recommendations}
                                            activity={selectedAction[applicationform.id]}
                                        />
                                        <DeleteEncoderPopup
                                            open={openDelete[applicationform.id]}
                                            value={applicationform.id}
                                            remarks={applicationform.remarks}
                                            form="Occupancy"
                                            handleClose={() => handleCloseDelete(applicationform.id)}
                                        />
                                        <PrintEncoderPopup
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

export default OccupancyListApproved