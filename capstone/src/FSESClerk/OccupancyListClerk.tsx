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
import EvaluateApprovedOccupancy from '../FSESEncoder/Approved_Occupancy/EvaluateApprovedOccupancy';
import { OccupancyPermit } from '../types/Users';
import { onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { DisapprovedOccupancyCollection, occupancyPermCollection } from '../lib/controller';

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
    const [selectedAction, setSelectedAction] = useState<Record<string, string>>({});
    const [openViewOccupancy, setopenViewOccupancy] = useState<Record<string, boolean>>({});
    const [openUpdateOccupancy, setopenUpdateOccupancy] = useState<Record<string, boolean>>({});
    const [openEvalOccupancy, setopenEvalOccupancy] = useState<Record<string, boolean>>({});
    const [openApprovedEvalOccupancy, setopenApprovedEvalOccupancy] = useState<Record<string, boolean>>({});
    const [openViewUpdOccupancy, setopenViewUpdOccupancy] = useState<Record<string, boolean>>({});
    const [openViewUpdEvalOccupancy, setopenViewUpdEvalOccupancy] = useState<Record<string, boolean>>({});
    const [test, setTest] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<Record<string, boolean>>({});
    const [print, setPrint] = useState(false);
    const [occupancyPermit, setOccupancyPermit] = useState<OccupancyPermit[]>([]);

    const [applicationform, SetApplicationForm] = useState([{
        id: 0,
        control_no: 20,
        bldgpermit_no: '',
        applicants_name: 'Default',
        project_name: 'Default',
        location: 'Default',
        contact_no: 'Default',
        date_received: '2023-09-01',
        team_leader: 'default',
        fire_inspectors: ['default', 'default1'],
        inspection_no: 0,
        date_inspection: '2023-09-01',
        name: 'Default',
        date: '2023-09-01',
        defects: ['default', 'default1'],
        remarks: "Pending",
        nod_no: 12,
        nod_date: '',
        fsic_no: 12
    }])

    /*useEffect(() => {
        if (sortBy === 'Pending Records') {
            axios.get('http://localhost:8080/occupancyPendingclerk/getAllOccupancyPendingClerk').then(res => {
                SetApplicationForm(res.data)
            }).catch(err => console.log(err))
        }
        else if (sortBy === 'Disapproved Records') {
            axios.get('http://localhost:8080/occupancyDisapprovedClerk/getAllOccupancyDisapprovedClerk').then(res => {
                SetApplicationForm(res.data)
            }).catch(err => console.log(err))
        }
    }, [sortBy, test]);*/

    useEffect(
        () => {
            if (sortBy === 'Pending Records') {
                onSnapshot(occupancyPermCollection, (snapshot:
                    QuerySnapshot<DocumentData>) => {
                    setOccupancyPermit(
                        snapshot.docs.map((doc) => {
                            return {
                                id: doc.id,
                                ...doc.data(),
                            };
                        })
                    );
                    console.log(occupancyPermit)
                })
            }
            else if (sortBy === "Disapproved Records") {
                onSnapshot(DisapprovedOccupancyCollection, (snapshot:
                    QuerySnapshot<DocumentData>) => {
                    setOccupancyPermit(
                        snapshot.docs.map((doc) => {
                            return {
                                id: doc.id,
                                ...doc.data(),
                            };
                        })
                    );
                    console.log(occupancyPermit)
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

    //Renders Data
    const handleRender = () => {
        setTest(prevTest => !prevTest);
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
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickClose = () => {
        setOpen(false);
        handleRender();
    };

    //VIEW Popup
    const handleOpenView = (no: string) => {
        setopenViewOccupancy((prevOpenView) => ({
            ...prevOpenView,
            [no]: true,
        }));
        handleRender();
    };

    //View Popup Close
    const handleCloseView = (no: string) => {
        setopenViewOccupancy((prevOpenView) => ({
            ...prevOpenView,
            [no]: false,
        }));
        handleRender();
    };


    //VIEW/Update Evaluate Popup Open
    const handleOpenViewEvalUpdate = (no: string) => {
        setopenViewUpdEvalOccupancy((prevOpenView) => ({
            ...prevOpenView,
            [no]: true,
        }));
        handleRender();
    };

    //VIEW/Update Evaluate Popup Close
    const handleCloseViewEvalUpdate = (no: string) => {
        setopenViewUpdEvalOccupancy((prevOpenView) => ({
            ...prevOpenView,
            [no]: false,
        }));
        handleRender();
    };


    //Update Popup 
    const handleOpenUpdate = (no: string) => {
        setopenUpdateOccupancy((prevOpenUpdate) => ({
            ...prevOpenUpdate,
            [no]: true,
        }));
    };

    //Update Popup
    const handleCloseUpdate = (no: string) => {
        setopenUpdateOccupancy((prevOpenUpdate) => ({
            ...prevOpenUpdate,
            [no]: false,
        }));
    };

    //Evaluate Popup 
    const handleOpenEval = (no: string) => {
        setopenEvalOccupancy((prevOpenEval) => ({
            ...prevOpenEval,
            [no]: true,
        }));
        handleRender();
    };

    //Evaluate Popup
    const handleCloseEval = (no: string) => {
        setopenEvalOccupancy((prevOpenEval) => ({
            ...prevOpenEval,
            [no]: false,
        }));
        handleRender();
    };

    //Approved Evaluate Popup 
    const handleOpenApprovedEval = (no: string) => {
        setopenApprovedEvalOccupancy((prevOpenEval) => ({
            ...prevOpenEval,
            [no]: true,
        }));
        handleRender();
    };

    //Approved Evaluate Popup
    const handleCloseApprovedEval = (no: string) => {
        setopenApprovedEvalOccupancy((prevOpenEval) => ({
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
    const handleNext = (value: string, status: string,) => {
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
        } else if (status === 'Disapproved' || status === 'Complied') {
            //Completed function condition goes here
            if (selectedValue === 'Update' || selectedValue === 'View') {
                handleOpenViewEvalUpdate(value);
                handleRender();

            }
            else if (selectedValue === 'Evaluate' && status === 'Disapproved') {
                console.log("TEST");
                handleOpenApprovedEval(value);
            }
            else if (selectedValue === 'Evaluate' && status === 'Complied') {
                alert("Already Evaluated");
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
                            <th>Building Permit #</th>
                            <th>Applicant Name</th>
                            <th>Project Name</th>
                            <th>Date Received</th>
                            <th>Remarks</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {occupancyPermit
                            .filter((businessPermit) => {
                                if (sortBy === 'Pending Records') {
                                    return businessPermit.remarks === 'Pending';
                                } else {
                                    return true; // Show all records if no sortBy value is selected
                                }
                            })
                            .filter((occupancyPermit) => {
                                // Filter based on the searchText value
                                if (searchText === '') {
                                    return true; // Show all records if no search text is entered
                                } else {
                                    // Filter based on the businessPermitNo or ownerName containing the searchText
                                    const bldgpermitno = occupancyPermit.bldgpermitno || ""
                                    const applicantname = occupancyPermit.applicantname || ""
                                    return (
                                        bldgpermitno.toLowerCase().includes(searchText.toLowerCase()) ||
                                        applicantname.toLowerCase().includes(searchText.toLowerCase())
                                    );
                                }
                            })
                            .map((occupancyPermit) => (
                                <tr key={occupancyPermit.id}>
                                    <td>{sortBy === 'Disapproved Records' ? occupancyPermit.bldgpermitno :
                                        occupancyPermit.bldgpermitno}</td>
                                    <td>{occupancyPermit.applicantname}</td>
                                    <td>{occupancyPermit.projectname}</td>
                                    <td>{occupancyPermit.datereceived}</td>
                                    <td style={{
                                        color: occupancyPermit.remarks === 'Complied' || occupancyPermit.remarks === 'FSIC Printed' ? 'green' :
                                            occupancyPermit.remarks === 'Pending' ? 'black'
                                                : 'red'
                                    }}>{occupancyPermit.remarks}</td>
                                    <td>
                                        <select
                                            value={selectedAction[occupancyPermit.id] || ''}
                                            onChange={(event) => handleActionChange(event, occupancyPermit.id)}
                                            style={{ height: '35px', width: '120px', borderRadius: '8px', textAlign: 'center', backgroundColor: '#D9D9D9' }}
                                        >
                                            <option value="">-select-</option>
                                            <option value="View">View</option>
                                            <option value="Update">Update</option>
                                            <option value="Evaluate">Evaluate</option>
                                            {/* <option value="Print">Print</option>*/}
                                            <option value="Delete">Delete</option>
                                        </select>
                                        <IconButton className="next-button" onClick={() => handleNext(occupancyPermit.id, occupancyPermit.remarks || '')}>
                                            <ArrowCircleRightIcon sx={{ color: '#3C486B' }} />
                                        </IconButton>
                                        <ViewPendingOccupancyList
                                            id={occupancyPermit.id}
                                            open={openViewOccupancy[occupancyPermit.id]}
                                            handleClose={() => handleCloseView(occupancyPermit.id)}
                                            activity={selectedAction[occupancyPermit.id]}
                                            buildingno={occupancyPermit.bldgpermitno || ''}
                                            applicantname={occupancyPermit.applicantname || ''}
                                            projectname={occupancyPermit.projectname || ''}
                                            location={occupancyPermit.location || ''}
                                            contact_no={occupancyPermit.contactno || ''}
                                            date_received={occupancyPermit.datereceived || ''}
                                            team_leader={occupancyPermit.teamleader || ''}
                                            fire_inspectors={occupancyPermit.fireinspector ? ([] as string[]).concat(occupancyPermit.fireinspector) : []}
                                            inspection_no={occupancyPermit.inspectionno || 0}
                                            date_inspection={occupancyPermit.dateinspection || ''}
                                            received_name={occupancyPermit.receivedby || ''}
                                            receivedoccu_date={occupancyPermit.receiveddocu || ''}
                                        />

                                        <EvaluateDisapprovedOccupancy
                                            open={openEvalOccupancy[occupancyPermit.id]}
                                            handleClose={() => handleCloseEval(occupancyPermit.id)}
                                            id={occupancyPermit.id}
                                            inspectionno={occupancyPermit.inspectionno || 0}
                                            controlno={occupancyPermit.controlno || 0}
                                            buildingpermino={occupancyPermit.bldgpermitno || ''}
                                            applicantname={occupancyPermit.applicantname || ''}
                                            projecname={occupancyPermit.projectname || ''}
                                            address={occupancyPermit.location || ''}
                                            contactnumber={occupancyPermit.contactno || ''}
                                            datereceived={occupancyPermit.datereceived || ''}
                                        />
                                        <ViewUpdateDisapprovedOccupancy
                                        open={openViewUpdEvalOccupancy[occupancyPermit.id]}
                                        id={occupancyPermit.id}
                                        activity={selectedAction[occupancyPermit.id]}
                                        inspectionno={occupancyPermit.inspectionno || 0}
                                        controlno={occupancyPermit.controlno || 0}
                                        buildingpermitno={occupancyPermit.bldgpermitno || ''}
                                        applicantname={occupancyPermit.applicantname || ''}
                                        projecname={occupancyPermit.projectname || ''}
                                        address={occupancyPermit.location || ''}
                                        contactnumber={occupancyPermit.contactno || ''}
                                        datereceived={occupancyPermit.datereceived || ''}
                                        nod={occupancyPermit.nodno || 0}
                                        nod_date={occupancyPermit.noddate || ''}
                                        deficiencies={occupancyPermit.deficiencies || ['']}
                                        receivedby={occupancyPermit.receivednod || ''}
                                        receiveddate={occupancyPermit.receivednoddate || ''}
                                        remarks={occupancyPermit.remarks || ''}
                                        handleClose={() => handleCloseViewEvalUpdate(occupancyPermit.id)}
                                        />
                                        <DeleteClerkPopup
                                            open={openDelete[occupancyPermit.id]}
                                            value={occupancyPermit.id}
                                            form="Occupancy"
                                            sortby={sortBy}
                                            remarks={occupancyPermit.remarks || ''}
                                            handleClose={() => handleCloseDelete(occupancyPermit.id)}
                                        />
                                        <EvaluateApprovedOccupancy
                                            open={openApprovedEvalOccupancy[occupancyPermit.id]}
                                            handleClose={() => handleCloseApprovedEval(occupancyPermit.id)}
                                            id={occupancyPermit.id}
                                            inspectionno={occupancyPermit.inspectionno || 0}
                                            buildingpermino={occupancyPermit.bldgpermitno || ''}
                                            applicantname={occupancyPermit.applicantname || ''}
                                            projecname={occupancyPermit.projectname || ''}
                                            address={occupancyPermit.location || ''}
                                            contactnumber={occupancyPermit.contactno || ''}
                                            datereceived={occupancyPermit.datereceived || ''}
                                            controlno={occupancyPermit.controlno || 0}
                                            disapproved={true}
                                        />
                                        {/*

                                        <PrintClerkPopup
                                            open={print}
                                            handleClose={() => handlePrintClose()}
                                        />
                                        */}

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