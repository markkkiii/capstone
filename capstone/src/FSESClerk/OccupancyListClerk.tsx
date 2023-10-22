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
import UpdatePendingOccupancyPopup from './Pending_Occupancy/UpdatePendingOccupancyPopup';
import EvaluateApprovedOccupancy from './EvaluateApprovedOccupancy';
import EvaluateDisapprovedOccupancy from './Disapproved_Occupancy/EvaluateDisapprovedOccupancy';
import ViewUpdateDisapprovedOccupancy from './Disapproved_Occupancy/View-UpdateDissaprovedOccupancy';
import DeleteClerkPopup from './DeleteClerkPopup';
import PrintClerkPopup from './PrintClerkPopup';
import axios from 'axios';

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
    const [test, setTest] = useState<boolean>(false);
    const [deleteit, setDelete] = useState(false);
    const [print, setPrint] = useState(false);
    
    const [applicationform, SetApplicationForm] = useState([{
        id: 0,
        application_no: "2",
        applicant_name: "Jane Does",
        building_no: "2",
        project_name: "Don Mac",
        location: "asdasd",
        contact_no: "2",
        assessment_fees: "100",
        date_received: "2023-09-08",
        remarks: "Pending",
        nod_no: 2,
    }])

    useEffect(() => {
        if (sortBy === 'Pending Records') {
            axios.get('http://localhost:8080/occupancyPendingclerk/getAllOccupancyPendingClerk').then(res => {
                SetApplicationForm(res.data)
            }).catch(err => console.log(err))
        }
        else if (sortBy === 'Disapproved Records') {
            axios.get('http://localhost:8080/occupancydisapprovedclerk/getAllOccupancyDisapprovedClerk').then(res => {
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
                handleOpenEval(value);
            }
            else if (selectedValue === 'Print') {
                handlePrintOpen();

            }
        } else if (status === 'Disapproved') {
            //Completed function condition goes here
            if (selectedValue === 'Update') {
                handleOpenViewUpdate(value)

            }
            else if (selectedValue === 'View') {
                handleOpenViewUpdate(value)
            }
            else if (selectedValue === 'Print') {
                handlePrintOpen();
            }
            else if(selectedValue === 'Delete') {
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
                            <th>Application Number #</th>
                            <th>Owner's Name</th>
                            <th>Project Name</th>
                            <th>Assessment Fees</th>
                            <th>NOD #</th>
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
                                        applicationform.application_no.toLowerCase().includes(searchText.toLowerCase()) ||
                                        applicationform.applicant_name.toLowerCase().includes(searchText.toLowerCase())
                                    );
                                }
                            })
                            .map((applicationform) => (
                                <tr key={applicationform.id}>
                                    <td>{applicationform.id}</td>
                                    <td>{applicationform.application_no}</td>
                                    <td>{applicationform.applicant_name}</td>
                                    <td>{applicationform.project_name}</td>
                                    <td>{applicationform.assessment_fees}</td>
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
                                        <IconButton className="next-button" onClick={() => handleNext(applicationform.id, applicationform.remarks, applicationform.application_no)}>
                                            <ArrowCircleRightIcon sx={{ color: '#3C486B' }} />
                                        </IconButton>
                                        <ViewPendingOccupancyList open={openViewOccupancy[applicationform.id]} handleClose={() => handleCloseView(applicationform.id)} />
                                        <UpdatePendingOccupancyPopup open={openUpdateOccupancy[applicationform.id]} handleClose={() => handleCloseUpdate(applicationform.id)} />
                                        <EvaluateDisapprovedOccupancy open={openEvalOccupancy[applicationform.id]} handleClose={() => handleCloseEval(applicationform.id)} />
                                        <ViewUpdateDisapprovedOccupancy open={openViewUpdOccupancy[applicationform.id]} handleClose={() => handleCloseViewUpdate(applicationform.id)} form={selectedAction[applicationform.id]} />
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