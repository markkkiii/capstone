import Navbar from './PaymentNavbar';
import React, { useEffect, useState } from 'react';
import './CollectingAgent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import axios from 'axios';
import ViewPaymentPopup from './ViewPaymentPopup';
import UpdatePaymentPopup from './UpdatePaymentPopup';
import DeletePaymentPopup from './DeletePaymentPopup';
import PrintPaymentPopup from './PrintPaymentPopup';
import AddPaymentPopup from './AddPaymentPopup';
import ViewPayment from './ViewPayment';
import { Payment } from '../types/Users';
import { RenewalBusinessPaymentCollection, renewalbusinessPermCollection } from '../lib/controller';
import { onSnapshot, QuerySnapshot, DocumentData } from '@firebase/firestore';


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

const BusinessRenewalPayment: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [sortBy, setSortBy] = useState('Pending Records');
    const [open, setOpen] = useState(false);
    const [selectedAction, setSelectedAction] = useState<Record<string, string>>({});
    const [openViewPayment, setopenViewPayment] = useState<Record<string, boolean>>({});
    const [openUpdatePayment, setopenUpdatePayment] = useState<Record<string, boolean>>({});
    const [test, setTest] = useState<boolean>(false);
    const [openDelete, setOpenDelete] = useState<Record<string, boolean>>({});
    const [print, setPrint] = useState(false);
    const [RenewalBusinessPayment, setRenewalBusinessPayment] = useState<Payment[]>([]);

    const [applicationform, SetApplicationForm] = useState([{
        id: 0,
        projectname: "",
        location: "",
        name: "",
        fsc: "",
        or_no: "",
        ops_no: "",
        ops_date: "2023-02-01",
        payment_date: "2023-02-01",
        amount_paid: 2000,
        total_amount: 2000,
        assessor_name: "",
        payment: [['Test1', 'Test2', 'Test3']]
    }])


    /*useEffect(() => {
        axios.get('http://localhost:8080/newRenewalBusinessPayment/getAllRenewalbpPayment').then(res => {
            SetApplicationForm(res.data)
        }).catch(err => console.log(err))
    }, [test]);*/

    useEffect(
        () =>
            onSnapshot(RenewalBusinessPaymentCollection, (snapshot:
                QuerySnapshot<DocumentData>) => {
                setRenewalBusinessPayment(
                    snapshot.docs.map((doc) => {
                        return {
                            id: doc.id,
                            ...doc.data(),
                        };
                    })
                );
                console.log(RenewalBusinessPayment)
            }),
        []
    )


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
    const handleOpenView = (no: string) => {
        setopenViewPayment((prevRenewal) => ({
            ...prevRenewal,
            [no]: true,
        }));
    };

    //View Popup Close
    const handleCloseView = (no: string) => {
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
    const handleNext = (value: string) => {
        const selectedValue = selectedAction[value];

        if (selectedValue === 'Delete') {
            // Perform delete logic here
            handleOpenDelete(value);

        }
        //Pending function condition goes here
        else if (selectedValue === 'View' || selectedValue === 'Update') {
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
                        <h1 className="title">Renewal Business Payment List</h1>
                    </div>
                    <div className="sort-container">
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
                            <th>OR No #</th>
                            <th>Payor</th>
                            <th>Project Name</th>
                            <th>Total</th>
                            <th>Payment Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {RenewalBusinessPayment
                            .filter((RenewalBusinessPayment) => {
                                // Filter based on the searchText value
                                if (searchText === '') {
                                    return true; // Show all records if no search text is entered
                                } else {
                                    // Filter based on the businessPermitNo or ownerName containing the searchText
                                    const opsno = RenewalBusinessPayment?.opsno || '';
                                    const name = RenewalBusinessPayment.name || '';

                                    return (
                                        opsno.toLowerCase().includes(searchText.toLowerCase()) ||
                                        name.toLowerCase().includes(searchText.toLowerCase())
                                    );
                                }
                            })
                            .map((RenewalBusinessPayment) => (
                                <tr key={RenewalBusinessPayment.id}>
                                    <td>{RenewalBusinessPayment.orno}</td>
                                    <td>{RenewalBusinessPayment.name}</td>
                                    <td>{RenewalBusinessPayment.projectname}</td>
                                    <td>{RenewalBusinessPayment.totalamount}</td>
                                    <td>{RenewalBusinessPayment.paymentdate}</td>
                                    <td>
                                        <select
                                            value={selectedAction[RenewalBusinessPayment.id] || ''}
                                            onChange={(event) => handleActionChange(event, RenewalBusinessPayment.id)}
                                            style={{ height: '35px', width: '120px', borderRadius: '8px', textAlign: 'center', backgroundColor: '#D9D9D9' }}
                                        >
                                            <option value="">-select-</option>
                                            <option value="View">View</option>
                                            <option value="Update">Update</option>
                                            {/* <option value="Print">Print</option>*/}
                                            <option value="Delete">Delete</option>
                                        </select>
                                        <IconButton className="next-button" onClick={() => handleNext(RenewalBusinessPayment.id)}>
                                            <ArrowCircleRightIcon sx={{ color: '#3C486B' }} />
                                        </IconButton>
                                        <DeletePaymentPopup
                                            open={openDelete[RenewalBusinessPayment.id]}
                                            value={RenewalBusinessPayment.id}
                                            form="Renewal"
                                            handleClose={() => handleCloseDelete(RenewalBusinessPayment.id)}
                                        />
                                        <ViewPayment
                                            open={openViewPayment[RenewalBusinessPayment.id]}
                                            id={RenewalBusinessPayment.id}
                                            update={selectedAction[RenewalBusinessPayment.id]}
                                            form="Renewal"
                                            projectname={RenewalBusinessPayment.projectname || ''}
                                            location={RenewalBusinessPayment.location || ''}
                                            name={RenewalBusinessPayment.name || ''}
                                            fsc={RenewalBusinessPayment.fsc || ''}
                                            or_no={RenewalBusinessPayment.orno || ''}
                                            ops_no={RenewalBusinessPayment.opsno || ''}
                                            ops_date={RenewalBusinessPayment.opsdate || ''}
                                            payment_date={RenewalBusinessPayment.paymentdate || ''}
                                            amount_paid={RenewalBusinessPayment.amountpaid || 0}
                                            total_amount={RenewalBusinessPayment.totalamount || 0}
                                            assessor_name={RenewalBusinessPayment.assessorname || ''}
                                            payment={RenewalBusinessPayment.payment || []}
                                            handleClose={() => handleCloseView(RenewalBusinessPayment.id)}
                                        />
                                        {/*<PrintPaymentPopup
                                            open={print}
                                            handleClose={() => handlePrintClose()}
                                        />
                                        */}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <AddPaymentPopup open={open} handleClose={handleClickClose} add="Renewal" />
            </div>
        </>
    )
}
export default BusinessRenewalPayment;