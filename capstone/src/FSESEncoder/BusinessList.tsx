import Navbar from '../Navbar'
import React, { useEffect, useState } from 'react';
import './BusinessList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import AddRenewalApplication from './AddRenewalApplication';
import ViewRenewalApplication from './ViewRenewalApplication';
import UpdateRenewalApplication from './UpdateRenewalApplication';
import EvaluateRenewalApplication from './EvaluateRenewalApplication';

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

const BusinessList: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedAction, setSelectedAction] = useState<Record<number, string>>({});
    const [openViewRenewal, setopenViewRenewal] = useState<Record<number, boolean>>({});
    const [openUpdateRenewal, setopenUpdateRenewal] = useState<Record<number, boolean>>({});
    const [openEvaluateRenewal, setopenEvaluateRenewal] = useState<Record<number, boolean>>({});

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
        setopenViewRenewal((prevRenewal) => ({
            ...prevRenewal,
            [no]: true,
        }));
    };

    //View Popup Close
    const handleCloseView = (no: number) => {
        setopenViewRenewal((prevRenewal) => ({
            ...prevRenewal,
            [no]: false,
        }));
    };
    //Update Popup 
  const handleOpenUpdate = (no: number) => {
    setopenUpdateRenewal((prevOpenUpdate) => ({
      ...prevOpenUpdate,
      [no]: true,
    }));
  };
  
 //Update Popup
 const handleCloseUpdate = (no: number) => {
    setopenUpdateRenewal((prevOpenUpdate) => ({
        ...prevOpenUpdate,
        [no]: false,
    }));
};

//Evaluate Popup
const handleOpenEvaluate = (no: number) => {
    setopenEvaluateRenewal((prevOpenEvaluate) => ({
      ...prevOpenEvaluate,
      [no]: true,
    }));
  };

 //Update Popup
 const handleCloseEvaluate = (no: number) => {
    setopenEvaluateRenewal((prevOpenEvaluate) => ({
        ...prevOpenEvaluate,
        [no]: false,
    }));
};

    //Handles the button Logic 
    const handleNext = (value: number, status: string, buildingno: string) => {
        const selectedValue = selectedAction[value];

        if (selectedValue === 'Delete') {
            // Perform delete logic here

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

            }
        } else if (status === 'Approved' || status === 'Disapproved') {
            //Completed function condition goes here

        }
        else if (selectedValue === 'Update') {


        }
        else if (selectedValue === 'View') {

        }
        else if (selectedValue === 'Print') {

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
                        <h1 className="title">Business Application List</h1>
                    </div>
                    <div className="sort-container">
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="">Sort By</option>
                            <option value="Pending Records">Pending Records</option>
                            <option value="Completed Records">Completed Records</option>
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
                                        <AddRenewalApplication open={open} handleClose={handleClickClose} />
                                        <ViewRenewalApplication open={openViewRenewal[applicationform.controlno]} handleClose={() => handleCloseView(applicationform.controlno)} />
                                        <UpdateRenewalApplication open={openUpdateRenewal[applicationform.controlno]} handleClose={() => handleCloseUpdate(applicationform.controlno)} />
                                        <EvaluateRenewalApplication  open={openEvaluateRenewal[applicationform.controlno]} handleClose={() => handleCloseEvaluate(applicationform.controlno)}/>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

            </div>
        </>
    )
}
export default BusinessList