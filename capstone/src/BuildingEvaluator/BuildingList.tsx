import React, { useEffect, useState } from 'react';
import './BuildingList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddApplicationPopup from './AddApplicationPopup';
import DeletePopup from './DeletePopup';
import IconButton from '@mui/material/IconButton';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import axios from 'axios';
import EvaluatePopup from './EvaluatePopup';
import ViewPopup from '../BuildingEvaluator/ViewPopup';
import PrintPopup from '../PrintPopup';
import UpdateApplicationPopup from './UpdateApplicationPopUp';
import ViewEvaluatePopup from '../BuildingEvaluator/ViewEvaluatePopup';


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

const BuildingApplicationListComponent: React.FC = () => {
  const [selectedAction, setSelectedAction] = useState<Record<number, string>>({});
  const [openStates, setOpenStates] = useState<Record<number, boolean>>({});
  const [openEvaluate, setOpenEvaluate] = useState<Record<number, boolean>>({});
  const [openViewEvaluate, setOpenViewEvaluate] = useState<Record<number, boolean>>({});
  const [print, setPrint] = useState(false);
  const [openUpdate, setOpenUpdate] = useState<Record<number, boolean>>({});
  const [openDelete, setOpenDelete] = useState<Record<number, boolean>>({});
  const [deleteit, setDelete] = useState(false);
  const [open, setOpen] = useState(false);
  const [test, setTest] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState('Pending Records');
  const [searchText, setSearchText] = useState('');

  const [applicationform, SetApplicationForm] = useState([{
    controlno: 100,
    buildingpermitno: '100',
    namepermitee: "default",
    businessname: "veryyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy longggggggggggggggggggggg nameeeeeeeeeeeeeeeeeeeeeeeeeeee",
    address: "default",
    typeofoccupancy: "default ",
    contactno: "default",
    datereceived: "2023-05-27",
    receivedby: "default",
    status: "Approved",
    evaluator: "-",
    nostorey: 0,
    constructrenovate: "New Construction",
    structureconstructed: false,
    remarks: "Not Printed",
    defects: "-"
  }])


  // Gets Building Application List 
  const getApplications = async () => {
    axios.get('http://localhost:8080/BFP/displayAllPermits').then(res => {
      SetApplicationForm(res.data)
    }).catch(err => console.log(err))
  }

  useEffect(() => {
    getApplications()
  }, [test]);

  const handleRender = () => {
    setTest(prevTest => !prevTest);
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


  //VIEW Popup
  const handleOpen = (no: number) => {
    setOpenStates((prevOpenStates) => ({
      ...prevOpenStates,
      [no]: true,
    }));
  };

  //View Popup Close
  const handleClose = (no: number) => {
    setOpenStates((prevOpenStates) => ({
      ...prevOpenStates,
      [no]: false,
    }));
    getApplications()
  };

  //Update Popup 
  const handleOpenUpdate = (no: number) => {
    setOpenUpdate((prevOpenUpdate) => ({
      ...prevOpenUpdate,
      [no]: true,
    }));
  };
  //Update Popup
  const handleCloseUpdate = (no: number) => {
    setOpenUpdate((prevOpenUpdate) => ({
      ...prevOpenUpdate,
      [no]: false,
    }));
    handleRender()
  };
  //Evaluate Popup
  const handleOpenEvaluate = (no: number) => {
    setOpenEvaluate((prevOpenUpdate) => ({
      ...prevOpenUpdate,
      [no]: true,
    }));
  };
  //Evaluate Popup
  const handleCloseEvaluate = (no: number) => {
    setOpenEvaluate((prevOpenUpdate) => ({
      ...prevOpenUpdate,
      [no]: false,
    }));
    handleRender()
  };
  //View Popup After Evaluation
  const handleOpenViewEvaluate = (no: number) => {
    setOpenViewEvaluate((prevOpenUpdate) => ({
      ...prevOpenUpdate,
      [no]: true,
    }));
  };
  //View Popup After Evaluation
  const handleCloseViewEvaluate = (no: number) => {
    setOpenViewEvaluate((prevOpenUpdate) => ({
      ...prevOpenUpdate,
      [no]: false,
    }));
    handleRender()
  };
  // Add Application
  const handleClickOpen = () => {
    setOpen(true);
  };
  // Close Add Application
  const handleClickClose = () => {
    setOpen(false);
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
    handleRender()
  };

  // const handleEvaluateClick = (buildingnoval:string, updateval:boolean, testval?:string) => {
  //   // Navigate to the EvaluateApplicationForm with props
  //   const state: EvaluateProps = { update: updateval, buildingno: buildingnoval, testvalue: testval};
  //   navigate('/evaluate',{ state });
  // };

  // const handleViewEvaluateClick = (buildingnoval:string) => {
  //   // Navigate to the EvaluateApplicationForm with props
  //   const state: ViewEvaluateProps = {  buildingno: buildingnoval};
  //   navigate('/viewevaluate',{ state });
  // };


  //Handles the selection of each Record, so that it doesnt change all the drop down option each change
  const handleActionChange = (event: React.ChangeEvent<HTMLSelectElement>, no: number) => {
    const value = event.target.value;
    setSelectedAction((prevSelectedAction) => ({
      ...prevSelectedAction,
      [no]: value
    }));
  };


  //Handles the button Logic 
  const handleNext = (value: number, status: string, buildingno: string) => {
    const selectedValue = selectedAction[value];

    if (selectedValue === 'Delete') {
      // Perform delete logic here
      handleOpenDelete(value);
    } else if (status === 'Pending') {
      //Pending function condition goes here
      if (selectedValue === 'View') {
        handleOpen(value)
      }
      else if (selectedValue === 'Update') {
        console.log('Before Update: ', test)
        handleOpenUpdate(value)
        console.log('After Update: ', test)
        handleRender()
      }
      else if (selectedValue === 'Evaluate') {
        handleOpenEvaluate(value)
      }
      else if (selectedValue === 'Print') {
        alert("Evaluate Application First!")
      }
    } else if (status === 'Approved' || status === 'Disapproved') {
      //Completed function condition goes here
      if (selectedValue === 'Evaluate') {
        alert('Application already Evaluated');
      }
      else if (selectedValue === 'Update') {
        handleOpenEvaluate(value)

      }
      else if (selectedValue === 'View') {
        handleOpenViewEvaluate(value)
      }
      else if (selectedValue === 'Print') {
        handlePrintOpen()
      }


    }
    getApplications();
    // Perform logic for the "Next" button click here
  };



  const handleSearch = () => {
    // Perform search logic here based on the searchText value
    // For example, you can filter the buildingApplications array based on the searchText
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSearchInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  /*const handleLogout = () => {
    // Implement your logout logic here
    console.log('Logout');
  };*/

  return (
    <>
      <AdditionalTab />
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
            <h1 className="title">Building Application List</h1>
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
              <th>Building Permit #</th>
              <th>Applicant's Name</th>
              <th>Project Name</th>
              <th>Date Received</th>
              <th>Status</th>
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
                  return true; // Show all records if no sortBy value is selected
                }
              })
              .filter((applicationform) => {
                // Filter based on the searchText value
                if (searchText === '') {
                  return true; // Show all records if no search text is entered
                } else {
                  // Filter based on the buildingPermitNo or applicantName containing the searchText
                  return (
                    applicationform.buildingpermitno.toLowerCase().includes(searchText.toLowerCase()) ||
                    applicationform.namepermitee.toLowerCase().includes(searchText.toLowerCase())
                  );
                }
              })
              .map((applicationform) => (
                <tr key={applicationform.controlno}>
                  <td>{applicationform.controlno}</td>
                  <td>{applicationform.buildingpermitno}</td>
                  <td>{applicationform.namepermitee}</td>
                  <td>{applicationform.businessname}</td>
                  <td>{new Date(applicationform.datereceived).toISOString().split('T')[0]}</td>
                  <td>{applicationform.status}</td>
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
                      {/* <option value="Print">Print</option>*/}
                      <option value="Delete">Delete</option>
                    </select>
                    <IconButton className="next-button" onClick={() => handleNext(applicationform.controlno, applicationform.status, applicationform.buildingpermitno)}>
                      <ArrowCircleRightIcon sx={{ color: '#3C486B' }} />
                    </IconButton>
                    <ViewPopup
                      no={applicationform.controlno}
                      buildingPermitNo={applicationform.buildingpermitno}
                      applicantName={applicationform.namepermitee}
                      projectName={applicationform.businessname}
                      address={applicationform.address}
                      typeofoccupancy={applicationform.typeofoccupancy}
                      contactno={applicationform.contactno}
                      datereceived={applicationform.datereceived}
                      receivedby={applicationform.receivedby}
                      open={openStates[applicationform.controlno]}
                      handleClose={() => handleClose(applicationform.controlno)}
                    />

                    <UpdateApplicationPopup
                      no={applicationform.controlno}
                      buildingPermitNo={applicationform.buildingpermitno}
                      applicantName={applicationform.namepermitee}
                      projectName={applicationform.businessname}
                      address={applicationform.address}
                      typeofoccupancy={applicationform.typeofoccupancy}
                      contactno={applicationform.contactno}
                      datereceived={applicationform.datereceived}
                      receivedby={applicationform.receivedby}
                      open={openUpdate[applicationform.controlno]}
                      handleClose={() => handleCloseUpdate(applicationform.controlno)
                      }
                    />
                    <EvaluatePopup
                      no={applicationform.controlno}
                      buildingPermitNo={applicationform.buildingpermitno}
                      applicantName={applicationform.namepermitee}
                      projectName={applicationform.businessname}
                      address={applicationform.address}
                      typeofoccupancy={applicationform.typeofoccupancy}
                      contactno={applicationform.contactno}
                      datereceived={applicationform.datereceived}
                      receivedby={applicationform.receivedby}
                      evaluator={applicationform.evaluator}
                      status={applicationform.status}
                      numberstorey={applicationform.nostorey}
                      newconsreno={applicationform.constructrenovate}
                      buildcons={applicationform.structureconstructed}
                      defects={applicationform.defects}
                      update={selectedAction[applicationform.controlno]}
                      open={openEvaluate[applicationform.controlno]}
                      handleClose={() => handleCloseEvaluate(applicationform.controlno)
                      }
                    />
                    <ViewEvaluatePopup
                      no={applicationform.controlno}
                      buildingPermitNo={applicationform.buildingpermitno}
                      applicantName={applicationform.namepermitee}
                      projectName={applicationform.businessname}
                      address={applicationform.address}
                      typeofoccupancy={applicationform.typeofoccupancy}
                      contactno={applicationform.contactno}
                      datereceived={applicationform.datereceived}
                      receivedby={applicationform.receivedby}
                      evaluator={applicationform.evaluator}
                      status={applicationform.status}
                      numberstorey={applicationform.nostorey}
                      newconsreno={applicationform.constructrenovate}
                      buildcons={applicationform.structureconstructed}
                      defects={applicationform.defects}
                      update={selectedAction[applicationform.controlno]}
                      open={openViewEvaluate[applicationform.controlno]}
                      handleClose={() => handleCloseViewEvaluate(applicationform.controlno)
                      }
                    />

                    <PrintPopup
                      open={print}
                      handleClose={() => handlePrintClose()}
                    />
                    <DeletePopup
                      open={openDelete[applicationform.controlno]}
                      value={applicationform.controlno}
                      handleClose={() => handleCloseDelete(applicationform.controlno)}
                    />
                  </td>
                </tr>
              ))}
            <AddApplicationPopup open={open} handleClose={handleClickClose} />
          </tbody>
        </table>
      </div>

    </>
  );
};

export default BuildingApplicationListComponent;
