import React, { useEffect, useState } from 'react';
import './ClerkCSS.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {IconButton } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ClerkNavbar from './ClerkNavbar';
import AddOccupancy from './Pending_Occupancy/AddOccupancy';
import ViewPendingOccupancyList from './Pending_Occupancy/ViewPendingOccupancyPopup';
import UpdatePendingOccupancyPopup from './Pending_Occupancy/UpdatePendingOccupancyPopup';
import EvaluateDisapprovedOccupancy from './Disapproved_Occupancy/EvaluateDisapprovedOccupancy';
import ViewUpdateDisapprovedOccupancy from './Disapproved_Occupancy/View-UpdateDissaprovedOccupancy';
import DeleteClerkPopup from './DeleteClerkPopup';
import PrintClerkPopup from './PrintClerkPopup';


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
    const [sortBy, setSortBy] = useState('');
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
        controlno: 100,
        businesspermit: '100',
        ownersname: "default",
        businessname: "veryyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy longggggggggggggggggggggg nameeeeeeeeeeeeeeeeeeeeeeeeeeee",
        typeofoccupancy: "Occupancy",
        fsicno: "#23451",
        contactno: "default",
        datereceived: "2023-05-27",
        receivedby: "default",
        status: "Pending",
        evaluator: "-",
        nostorey: 0,
        constructrenovate: "New Construction",
        structureconstructed: false,
        remarks: "Not Printed",
        defects: "-"
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
        } else if (status === 'Approved' || status === 'Disapproved') {
            //Completed function condition goes here
            handleOpenViewUpdate(value)

        }
        else if (selectedValue === 'Update') {


        }
        else if (selectedValue === 'View') {
            handleOpenViewUpdate(value)

        }
        else if (selectedValue === 'Print') {
            handlePrintOpen();

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
                            <option value="Completed Records">Completed Records</option>
                        </select>
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
                            <th>FSIC #</th>
                            <th>Remarks</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {applicationform
                            .filter((applicationform) => {
                                if (sortBy === 'Pending Records') {
                                    return applicationform.status === 'Pending';
                                } else if (sortBy === 'Completed Records') {
                                    return applicationform.status === 'Approved' || applicationform.status === 'Disapproved';
                                } else {
                                    return true;// Show all records if no sortBy value is selected
                                }
                            })
                            .filter((applicationform) => {
                                // Filter based on the searchText value
                                if (searchText === '') {
                                    return true; // Show all records if no search text is entered
                                } else {
                                    // Filter based on the businessPermitNo or ownerName containing the searchText
                                    return (
                                        applicationform.businesspermit.toLowerCase().includes(searchText.toLowerCase()) ||
                                        applicationform.ownersname.toLowerCase().includes(searchText.toLowerCase())
                                    );
                                }
                            })
                            .map((applicationform) => (
                                <tr key={applicationform.controlno}>
                                    <td>{applicationform.controlno}</td>
                                    <td>{applicationform.businesspermit}</td>
                                    <td>{applicationform.ownersname}</td>
                                    <td>{applicationform.businessname}</td>
                                    <td>{applicationform.typeofoccupancy}</td>
                                    <td>{applicationform.fsicno}</td>
                                    <td>{applicationform.remarks}</td>
                                    <td>
                                        <select
                                            value={selectedAction[applicationform.controlno] || ''}
                                            onChange={(event) => handleActionChange(event, applicationform.controlno)}
                                            style={{ height: '35px', width: '120px', borderRadius: '8px', textAlign: 'center', backgroundColor: '#D9D9D9' }}
                                        >
                                            <option value="">-select-</option>
                                            <option value="View">View</option>
                                            <option value="Update">Update</option>
                                            <option value="Evaluate">Evaluate</option>
                                            <option value="Print">Print</option>
                                            <option value="Delete">Delete</option>
                                        </select>
                                        <IconButton className="next-button" onClick={() => handleNext(applicationform.controlno, applicationform.status, applicationform.businesspermit)}>
                                            <ArrowCircleRightIcon sx={{ color: '#3C486B' }} />
                                        </IconButton>
                                        <AddOccupancy open={open} handleClose={handleClickClose} />
                                        <ViewPendingOccupancyList open={openViewOccupancy[applicationform.controlno]} handleClose={() => handleCloseView(applicationform.controlno)} />
                                        <UpdatePendingOccupancyPopup open={openUpdateOccupancy[applicationform.controlno]} handleClose={() => handleCloseUpdate(applicationform.controlno)} />
                                        <EvaluateDisapprovedOccupancy open={openEvalOccupancy[applicationform.controlno]} handleClose={() => handleCloseEval(applicationform.controlno)} />
                                        <ViewUpdateDisapprovedOccupancy open={openViewUpdOccupancy[applicationform.controlno]} handleClose={() => handleCloseViewUpdate(applicationform.controlno)} form={selectedAction[applicationform.controlno]} />
                                        <DeleteClerkPopup
                                            open={deleteit}
                                            value={applicationform.controlno}
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