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
import { onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { businessPermCollection, occupancyPermCollection } from '../lib/controller';
import { OccupancyPermit } from '../types/Users';

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
    const [selectedAction, setSelectedAction] = useState<Record<string, string>>({});
    const [openDisOccupancy, setopenDisOccupancy] = useState<Record<string, boolean>>({});
    const [openViewOccupancy, setopenViewOccupancy] = useState<Record<string, boolean>>({});
    const [openUpdateOccupancy, setopenUpdateOccupancy] = useState<Record<string, boolean>>({});
    const [openEvalOccupancy, setopenEvalOccupancy] = useState<Record<string, boolean>>({});
    const [openViewUpdateEvalOccupancy, setopenViewUpdateEvalOccupancy] = useState<Record<string, boolean>>({});
    const [openDelete, setOpenDelete] = useState<Record<string, boolean>>({});
    const [print, setPrint] = useState(false);
    const [test, setTest] = useState<boolean>(false);
    const [occupancyPermit, setOccupancyPermit] = useState<OccupancyPermit[]>([]);


    /*const [applicationform, SetApplicationForm] = useState([{
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
    }, [sortBy, test]);*/


    useEffect(
        () =>
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
            }),
        []
    )

    const handleRender = () => {
        setTest(prevTest => !prevTest);
    };
    //Evaluate Popup Open
    const handleOpenDisOccupancy = (no: string) => {
        setopenDisOccupancy((prevOccu) => ({
            ...prevOccu,
            [no]: true,
        }));
    };

    //Evaluate Popup Close
    const handleCloseDisOccupancy = (no: string) => {
        setopenDisOccupancy((prevOccu) => ({
            ...prevOccu,
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

    //View Update Evaluate Popup 
    const handleOpenUpdateViewEval = (no: string) => {
        setopenViewUpdateEvalOccupancy((prevOpenEval) => ({
            ...prevOpenEval,
            [no]: true,
        }));
        handleRender();
    };

    //View Update Evaluate Popup
    const handleCloseUpdateViewEval = (no: string) => {
        setopenViewUpdateEvalOccupancy((prevOpenEval) => ({
            ...prevOpenEval,
            [no]: false,
        }));
        handleRender();
    };


    //Open VIEW Update Popup
    const handleOpenView = (no: string) => {
        setopenViewOccupancy((prevOpenView) => ({
            ...prevOpenView,
            [no]: true,
        }));
        handleRender();
    };

    //Open View Update Popup Close
    const handleCloseView = (no: string) => {
        setopenViewOccupancy((prevOpenView) => ({
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


    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };
    const handleSearch = () => {
        // Perform search logic here based on the searchText value
        // For example, you can filter the buildingApplications array based on the searchText
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

    //Handles the button Logic 
    const handleNext = (value: string, status: string) => {
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
        } else if (status === 'I.O Not Printed' || status === 'I.O Printed') {
            //Completed function condition goes here
            if ((selectedValue === 'Update') || (selectedValue === 'View')) {
                handleOpenUpdateViewEval(value);

            }
            if (selectedValue === 'Evaluate') {
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
                            <th>Business Permit #</th>
                            <th>Owner's Name</th>
                            <th>Project Name</th>
                            <th>FSIC #</th>
                            <th>Remarks</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {occupancyPermit
                            .filter((businessPermit) => {
                                if (sortBy === 'Pending Records') {
                                    return businessPermit.remarks === 'Pending';
                                } else if (sortBy === 'Approved Records') {
                                    return businessPermit.remarks === 'I.O Printed' || businessPermit.remarks === 'I.O Not Printed';
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
                                    <td>{occupancyPermit.bldgpermitno}</td>
                                    <td>{occupancyPermit.applicantname}</td>
                                    <td>{occupancyPermit.projectname}</td>
                                    <td>{sortBy === 'Approved Records' ? occupancyPermit.fsicno :
                                        'N/A'}</td>
                                    <td style={{
                                        color: occupancyPermit.remarks === 'Complied' || occupancyPermit.remarks === 'I.O Printed' ? 'green' :
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
                                        <EvaluateApprovedOccupancy
                                            controlno={occupancyPermit.controlno || 0}
                                            open={openEvalOccupancy[occupancyPermit.id]}
                                            handleClose={() => handleCloseEval(occupancyPermit.id)}
                                            id={occupancyPermit.id}
                                            inspectionno={occupancyPermit.inspectionno || 0}
                                            buildingpermino={occupancyPermit.bldgpermitno || ''}
                                            applicantname={occupancyPermit.applicantname || ''}
                                            projecname={occupancyPermit.projectname || ''}
                                            address={occupancyPermit.location || ''}
                                            contactnumber={occupancyPermit.contactno || ''}
                                            datereceived={occupancyPermit.datereceived || ''}
                                            disapproved={false}
                                        />
                                        <ViewUpdateApprovedOccupancy
                                            open={openViewUpdateEvalOccupancy[occupancyPermit.id]}
                                            handleClose={() => handleCloseUpdateViewEval(occupancyPermit.id)}
                                            id={occupancyPermit.id}
                                            inspectionno={occupancyPermit.inspectionno || 0}
                                            buildingpermino={occupancyPermit.bldgpermitno || ''}
                                            applicantname={occupancyPermit.applicantname || ''}
                                            projecname={occupancyPermit.projectname || ''}
                                            address={occupancyPermit.location || ''}
                                            contactnumber={occupancyPermit.contactno || ''}
                                            datereceived={occupancyPermit.datereceived || ''}
                                            fsic_date={occupancyPermit.fsicdate || ''}
                                            fsic_no={occupancyPermit.fsicno || 0}
                                            amount={occupancyPermit.amountpaid || 0}
                                            or_no={occupancyPermit.orno || 0}
                                            remarks={occupancyPermit.remarks || ''}
                                            payment_date={occupancyPermit.paymentdate || ''}
                                            addtional_paymentdate={occupancyPermit.paymentdateadditional || ''}
                                            additional_amount={occupancyPermit.additionalamount || 0}
                                            additional_or_no={occupancyPermit.ornoadditional || ""}
                                            recommendations={occupancyPermit.recommendation ? ([] as string[]).concat(occupancyPermit.recommendation) : []}
                                            activity={selectedAction[occupancyPermit.id]}
                                        />
                                        <DeleteEncoderPopup
                                            open={openDelete[occupancyPermit.id]}
                                            value={occupancyPermit.id}
                                            remarks={occupancyPermit.remarks || ''}
                                            form="Occupancy"
                                            handleClose={() => handleCloseDelete(occupancyPermit.id)}
                                        />
                                        {/*
                                        <UpdatePendingOccupancyPopup open={openUpdateOccupancy[applicationform.id]} handleClose={() => handleCloseUpdate(applicationform.id)} />

                                        <PrintEncoderPopup
                                            open={print}
                                            handleClose={() => handlePrintClose()}
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

export default OccupancyListApproved