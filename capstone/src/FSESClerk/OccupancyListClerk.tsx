import React, { useEffect, useState } from 'react';
import './ClerkCSS.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ClerkNavbar from './ClerkNavbar';
import AddOccupancy from './Pending_Occupancy/AddOccupancy';
import ViewPendingOccupancyList from './Pending_Occupancy/ViewPendingOccupancyPopup';
import EvaluateDisapprovedOccupancy from './Disapproved_Occupancy/EvaluateDisapprovedOccupancy';
import DeleteClerkPopup from './DeleteClerkPopup';
import PrintClerkPopup from './PrintClerkPopup';
import axios from 'axios';
import ViewUpdateDisapprovedOccupancy from './Disapproved_Occupancy/ViewUpdateDisapprovedOccupancy';

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

const OccupancyListClerk: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [sortBy, setSortBy] = useState('Pending Records');
    const [open, setOpen] = useState(false);
    const [selectedAction, setSelectedAction] = useState<Record<number, string>>({});
    const [openViewOccupancy, setopenViewOccupancy] = useState<Record<number, boolean>>({});
    const [openUpdateOccupancy, setopenUpdateOccupancy] = useState<Record<number, boolean>>({});
    const [openEvalOccupancy, setopenEvalOccupancy] = useState<Record<number, boolean>>({});
    const [openViewUpdOccupancy, setopenViewUpdOccupancy] = useState<Record<number, boolean>>({});
    const [openViewUpdEvalOccupancy, setopenViewUpdEvalOccupancy] = useState<Record<number, boolean>>({});
    const [test, setTest] = useState<boolean>(false);
    const [deleteit, setDelete] = useState(false);
    const [print, setPrint] = useState(false);

    const [applicationform, SetApplicationForm] = useState([{
        id: 0,
        control_no: 20,
        buildingpermitno: '20-2',
        building_no: '',
        applicant_name: 'Default',
        project_name: 'Default',
        location: 'Default',
        address:'',
        contact_no: 'Default',
        date_received: '2023-09-01',
        team_leader: 'default',
        fireInspectors: ['default', 'default1'],
        inspection_no: 0,
        date_inspection: '2023-09-01',
        received_name: 'Default',
        receivedoccu_date: '2023-09-01',
        receivednod_date: '2023-09-01',
        deficiencies:['default', 'default1'],
        remarks: "Pending",
        nod_no: 12,
        nod_date:'',
        fsic_no: 12
    }])

    useEffect(() => {
        if (sortBy === 'Pending Records') {
            axios.get('http://localhost:8080/occupancyPendingclerk/getAllOccupancyPendingClerk').then(res => {
                SetApplicationForm(res.data)
            }).catch(err => console.log(err))
        }
        else if (sortBy === 'Disapproved Records') {
            axios.get('http://localhost:8080/disaprovalapp/getAllOccupancyDisapprovedClerk').then(res => {
                SetApplicationForm(res.data)
            }).catch(err => console.log(err))
        }
    }, [sortBy, test]);


    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };
    const handleSearch = () => {
        // Perform search logic here based on the searchText value
        // For example, you can filter the buildingApplications array based on the searchText
    };

    //Renders Data
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
        handleRender();
    };

    //VIEW Popup
    const handleOpenView = (no: number) => {
        setopenViewOccupancy((prevOpenView) => ({
            ...prevOpenView,
            [no]: true,
        }));
        handleRender();
    };

    //View Popup Close
    const handleCloseView = (no: number) => {
        setopenViewOccupancy((prevOpenView) => ({
            ...prevOpenView,
            [no]: false,
        }));
        handleRender();
    };


    //VIEW/Update Evaluate Popup Open
    const handleOpenViewEvalUpdate = (no: number) => {
        setopenViewUpdEvalOccupancy((prevOpenView) => ({
            ...prevOpenView,
            [no]: true,
        }));
        handleRender();
    };

    //VIEW/Update Evaluate Popup Close
    const handleCloseViewEvalUpdate = (no: number) => {
        setopenViewUpdEvalOccupancy((prevOpenView) => ({
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
            if ((selectedValue === 'View') || (selectedValue === 'Update')) {
                handleOpenView(value);
            }
            else if (selectedValue === 'Evaluate') {
                handleOpenEval(value);
            }
            else if (selectedValue === 'Print') {
                handlePrintOpen();

            }
        } else if (status === 'Disapproved') {
            //Completed function condition goes here
            if (selectedValue === 'Update' || selectedValue === 'View') {
                handleOpenViewEvalUpdate(value);
                handleRender();

            }
            else if(selectedValue === 'Evaluate'){
                alert('Already evaluated!');
            }
            else if (selectedValue === 'Print') {
                handlePrintOpen();
            }
            else if (selectedValue === 'Delete') {
                // Perform delete logic here
                handleDeleteOpen();
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
                        <h1 className="title">Occupancy Permit List</h1>
                    </div>
                    <div className="sort-container">
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="">Sort By</option>
                            <option value="Pending Records">Pending Records</option>
                            <option value="Disapproved Records">Disapproved Records</option>
                        </select>
                        <div className="date-input-container">
                            <Button
                                variant="outlined"
                                startIcon={<AddCircleOutlineIcon />}
                                onClick={handleClickOpen}
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
                            <th>No.</th>
                            <th>Building Permit #</th>
                            <th>Applicant Name</th>
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
                                        applicationform.buildingpermitno.toLowerCase().includes(searchText.toLowerCase()) ||
                                        applicationform.applicant_name.toLowerCase().includes(searchText.toLowerCase())
                                    );
                                }
                            })
                            .map((applicationform) => (
                                <tr key={applicationform.id}>
                                    <td>{applicationform.id}</td>
                                    <td>{sortBy === 'Disapproved Records' ? applicationform.building_no :
                                        applicationform.buildingpermitno}</td>
                                    <td>{applicationform.applicant_name}</td>
                                    <td>{applicationform.project_name}</td>
                                    <td>{sortBy === 'Disapproved Records' ? applicationform.nod_no :
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
                                        <IconButton className="next-button" onClick={() => handleNext(applicationform.id, applicationform.remarks, applicationform.buildingpermitno)}>
                                            <ArrowCircleRightIcon sx={{ color: '#3C486B' }} />
                                        </IconButton>
                                        <ViewPendingOccupancyList
                                            open={openViewOccupancy[applicationform.id]}
                                            id={applicationform.id}
                                            handleClose={() => handleCloseView(applicationform.id)}
                                            activity={selectedAction[applicationform.id]}
                                            controlno={applicationform.control_no}
                                            buildingno={applicationform.buildingpermitno}
                                            applicantname={applicationform.applicant_name}
                                            projectname={applicationform.project_name}
                                            location={applicationform.location}
                                            contact_no={applicationform.contact_no}
                                            date_received={applicationform.date_received}
                                            team_leader={applicationform.team_leader}
                                            fireInspectors={applicationform.fireInspectors}
                                            inspection_no={applicationform.inspection_no}
                                            date_inspection={applicationform.date_inspection}
                                            received_name={applicationform.received_name}
                                            receivedoccu_date={applicationform.receivedoccu_date}
                                        />
                                        <EvaluateDisapprovedOccupancy
                                            open={openEvalOccupancy[applicationform.id]}
                                            handleClose={() => handleCloseEval(applicationform.id)}
                                            id={applicationform.id}
                                            inspectionno={applicationform.inspection_no}
                                            controlno={applicationform.control_no}
                                            buildingpermino={applicationform.buildingpermitno}
                                            applicantname={applicationform.applicant_name}
                                            projecname={applicationform.project_name}
                                            address={applicationform.location}
                                            contactnumber={applicationform.contact_no}
                                            datereceived={applicationform.date_received}
                                        />
                                        <ViewUpdateDisapprovedOccupancy
                                            open={openViewUpdEvalOccupancy[applicationform.id]}
                                            id={applicationform.id}
                                            activity={selectedAction[applicationform.id]}
                                            inspectionno={applicationform.inspection_no}
                                            controlno={applicationform.control_no}
                                            buildingpermitno={applicationform.building_no}
                                            applicantname={applicationform.applicant_name}
                                            projecname={applicationform.project_name}
                                            address={applicationform.address}
                                            contactnumber={applicationform.contact_no}
                                            datereceived={applicationform.date_received}
                                            nod = {applicationform.nod_no}
                                            nod_date={applicationform.nod_date}
                                            deficiencies={applicationform.deficiencies}
                                            receivedby={applicationform.received_name}
                                            receiveddate={applicationform.receivednod_date}
                                            remarks={applicationform.remarks}
                                            handleClose={() => handleCloseViewEvalUpdate(applicationform.id)}
                                        />
                                        <DeleteClerkPopup
                                            open={deleteit}
                                            value={applicationform.id}
                                            form = "New"
                                            sortby={sortBy}
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
                <AddOccupancy open={open} handleClose={handleClickClose} add="New" />

            </div>
        </>
    )
}
export default OccupancyListClerk