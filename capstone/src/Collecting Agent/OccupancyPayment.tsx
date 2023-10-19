import Navbar from './PaymentNavbar';
import React, { useEffect, useState } from 'react';
import './CollectingAgent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import axios from 'axios';
import PrintPaymentPopup from './PrintPaymentPopup';
import DeletePaymentPopup from './DeletePaymentPopup';
import UpdatePaymentPopup from './UpdatePaymentPopup';
import ViewPaymentPopup from './ViewPaymentPopup';
import AddPaymentPopup from './AddPaymentPopup';


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

const OccupancyPayment: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [sortBy, setSortBy] = useState('Pending Records');
    const [open, setOpen] = useState(false);
    const [selectedAction, setSelectedAction] = useState<Record<number, string>>({});
    const [openViewPayment, setopenViewPayment] = useState<Record<number, boolean>>({});
    const [openUpdatePayment, setopenUpdatePayment] = useState<Record<number, boolean>>({});
    const [test, setTest] = useState<boolean>(false);
    const [deleteit, setDelete] = useState(false);
    const [print, setPrint] = useState(false);


    const [applicationform, SetApplicationForm] = useState([{
        id: 0,
        bspermit_no: "F2-010",
        payor: "John Doe",
        business_name: "Don Mac",
        type_occupancy: "test",
        status: "NTC",
        or_no: "2",
        amount: "2000",
        total_payment: "100",
        date: "10/10/2023",
        agency: "Test",
        ops_number: "200",
        nature_collection: "Rural",
        account_code: "1",
    }])


    useEffect(() => {
        if (sortBy === 'Pending Records') {
            axios.get('http://localhost:8080/BPPending/getAllBPPermit').then(res => {
                SetApplicationForm(res.data)
            }).catch(err => console.log(err))
        }
        else if (sortBy === 'Approved Records') {
            axios.get('http://localhost:8080/newbpapplication/getAllNewbpApprovedApplication').then(res => {
                SetApplicationForm(res.data)
            }).catch(err => console.log(err))
        }
    }, [sortBy, test]);


    const handleRender = () => {
        setTest(prevTest => !prevTest);
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

    //Open Add Application Popup
    const handleClickOpen = () => {
        setOpen(true);
    };

    //Close Add Application Popup
    const handleClickClose = () => {
        setOpen(false);
        handleRender();
    };

    //View Popup
    const handleOpenView = (no: number) => {
        setopenViewPayment((prevRenewal) => ({
            ...prevRenewal,
            [no]: true,
        }));
    };

    //View Popup Close
    const handleCloseView = (no: number) => {
        setopenViewPayment((prevRenewal) => ({
            ...prevRenewal,
            [no]: false,
        }));
        handleRender()
    };

    //Update Popup 
    const handleOpenUpdate = (no: number) => {
        setopenUpdatePayment((prevOpenUpdate) => ({
            ...prevOpenUpdate,
            [no]: true,
        }));
        
    };

    //Update Popup
    const handleCloseUpdate = (no: number) => {
        setopenUpdatePayment((prevOpenUpdate) => ({
            ...prevOpenUpdate,
            [no]: false,
        }));
        handleRender()
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
            else if (selectedValue === 'Print') {
                handlePrintOpen();

            }
        } else if (status === 'FSIC NOT PRINTED' || status === 'FSIC PRINTED') {
            //Completed function condition goes here

        }
        else if (selectedValue === 'Update') {
            handleOpenUpdate(value);

        }
        else if (selectedValue === 'View') {
            handleOpenView(value);
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
                        <h1 className="title">Occupancy List</h1>
                    </div>
                    <div className="sort-container">
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} >
                            <option value="">Sort By</option>
                            <option value="Pending Records">Pending Records</option>
                            <option value="Approved Records">Approved Records</option>
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
                            <th>{sortBy === 'NTC Records' ? 'NTC #' :
                                sortBy === 'NTCV Records' ? 'NTCV #' :
                                    sortBy === 'Abatement Records' ? 'Abatement#' :
                                        sortBy === 'Closure Records' ? 'Closure #' :
                                            'Status'}</th>
                            <th>Total Payment</th>
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
                                        applicationform.payor.toLowerCase().includes(searchText.toLowerCase())
                                    );
                                }
                            })
                            .map((applicationform, key = applicationform.id) => (
                                <tr key={applicationform.id}>
                                    <td>{applicationform.id}</td>
                                    <td>{applicationform.bspermit_no}</td>
                                    <td>{applicationform.payor}</td>
                                    <td>{applicationform.business_name}</td>
                                    <td>{applicationform.type_occupancy}</td>
                                    <td>{applicationform.status}</td>
                                    <td>{applicationform.total_payment}</td>
                                    <td>
                                        <select
                                            value={selectedAction[applicationform.id] || ''}
                                            onChange={(event) => handleActionChange(event, applicationform.id)}
                                            style={{ height: '35px', width: '120px', borderRadius: '8px', textAlign: 'center', backgroundColor: '#D9D9D9' }}
                                        >
                                            <option value="">-select-</option>
                                            <option value="View">View</option>
                                            <option value="Update">Update</option>
                                            <option value="Print">Print</option>                                         
                                            <option value="Delete">Delete</option>
                                        </select>
                                        <IconButton className="next-button" onClick={() => handleNext(applicationform.id, applicationform.total_payment, applicationform.bspermit_no)}>
                                            <ArrowCircleRightIcon sx={{ color: '#3C486B' }} />
                                        </IconButton>
                                        <ViewPaymentPopup 
                                        open={openViewPayment[applicationform.id]} 
                                        handleClose={() => handleCloseView(applicationform.id)} 
                                        bspermit_no={applicationform.bspermit_no}
                                        payor={applicationform.payor}
                                        date={applicationform.date}
                                        ornumber={applicationform.or_no}
                                        amount={applicationform.amount}
                                        agency={applicationform.agency}
                                        opsnumber={applicationform.ops_number}
                                        natureOfCollection={applicationform.nature_collection}
                                        accountCode={applicationform.account_code}
                                        />
                                        <UpdatePaymentPopup 
                                        open={openUpdatePayment[applicationform.id]} 
                                        handleClose={() => handleCloseUpdate(applicationform.id)} 
                                        bspermit_no={applicationform.bspermit_no}
                                        payor={applicationform.payor}
                                        date={applicationform.date}
                                        ornumber={applicationform.or_no}
                                        amount={applicationform.amount}
                                        agency={applicationform.agency}
                                        opsnumber={applicationform.ops_number}
                                        natureOfCollection={applicationform.nature_collection}
                                        accountCode={applicationform.account_code}
                                        id={applicationform.id}
                                        form ="New"
                                        />
                                        <DeletePaymentPopup
                                            open={deleteit}
                                            value={applicationform.id}
                                            handleClose={() => handleDeleteClose()}
                                        />
                                        <PrintPaymentPopup
                                            open={print}
                                            handleClose={() => handlePrintClose()}
                                        />
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <AddPaymentPopup open={open} handleClose={handleClickClose} add="New" />
            </div>
        </>
    )
}
export default OccupancyPayment;