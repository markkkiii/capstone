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
import EvaluatePopup from './EvaluatePopup';
import ViewPopup from '../BuildingEvaluator/ViewPopup';
import UpdateApplicationPopup from './UpdateApplicationPopUp';
import ViewEvaluatePopup from '../BuildingEvaluator/ViewEvaluatePopup';
import { NewBusinessListPending } from '../types/Users';
import { DocumentData, QuerySnapshot, onSnapshot } from 'firebase/firestore';
import { buildingEvalCollection } from '../lib/controller';
import { Key } from '@mui/icons-material';


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
  const [selectedAction, setSelectedAction] = useState<Record<string, string>>({});
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({}); // View
  const [openEvaluate, setOpenEvaluate] = useState<Record<string, boolean>>({});//Evaluate
  const [openViewEvaluate, setOpenViewEvaluate] = useState<Record<string, boolean>>({});
  const [print, setPrint] = useState(false);
  const [openUpdate, setOpenUpdate] = useState<Record<string, boolean>>({});
  const [openDelete, setOpenDelete] = useState<Record<string, boolean>>({});
  const [deleteit, setDelete] = useState(false);
  const [open, setOpen] = useState(false);
  const [test, setTest] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState('Pending Records');
  const [searchText, setSearchText] = useState('');
  const [buildingEvaluator, setBuildingEvaluator] = useState<NewBusinessListPending[]>([]);

  const handleRender = () => {
    setTest(prevTest => !prevTest);
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


  // VIEW Popup
  const handleOpen = (no: string) => {
    setOpenStates((prevOpenStates) => ({
      ...prevOpenStates,
      [no]: true,
    }));
  };

  // View Popup Close
  const handleClose = (no: string) => {
    setOpenStates((prevOpenStates) => ({
      ...prevOpenStates,
      [no]: false,
    }));
  };

  //Update Popup 
  const handleOpenUpdate = (no: string) => {
    setOpenUpdate((prevOpenUpdate) => ({
      ...prevOpenUpdate,
      [no]: true,
    }));
  };
  //Update Popup
  const handleCloseUpdate = (no: string) => {
    setOpenUpdate((prevOpenUpdate) => ({
      ...prevOpenUpdate,
      [no]: false,
    }));
    handleRender()
  };
  //Evaluate Popup
  const handleOpenEvaluate = (no: string) => {
    setOpenEvaluate((prevOpenUpdate) => ({
      ...prevOpenUpdate,
      [no]: true,
    }));
  };
  //Evaluate Popup
  const handleCloseEvaluate = (no: string) => {
    setOpenEvaluate((prevOpenUpdate) => ({
      ...prevOpenUpdate,
      [no]: false,
    }));
    handleRender()
  };
  //View Popup After Evaluation
  const handleOpenViewEvaluate = (no: string) => {
    setOpenViewEvaluate((prevOpenUpdate) => ({
      ...prevOpenUpdate,
      [no]: true,
    }));
  };
  //View Popup After Evaluation
  const handleCloseViewEvaluate = (no: string) => {
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



  useEffect(
    () =>
      onSnapshot(buildingEvalCollection, (snapshot:
        QuerySnapshot<DocumentData>) => {
        setBuildingEvaluator(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          })
        );
        console.log(buildingEvaluator)
      }),
    []
  )

  //Handles the selection of each Record, so that it doesnt change all the drop down option each change
  const handleActionChange = (event: React.ChangeEvent<HTMLSelectElement>, no: string) => {
    const value = event.target.value;
    setSelectedAction((prevSelectedAction) => ({
      ...prevSelectedAction,
      [no]: value
    }));
  };


  //Handles the button Logic 
  const handleNext = (value: string, status: string) => {
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
      else if (value === 'Print') {
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
      else if (value === 'Print') {
        handlePrintOpen()
      }


    }
    // Perform logic for the "Next" button click here
  };




  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSearchInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {

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
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
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
            {buildingEvaluator
              .filter((buildingEvaluator) => {
                if (sortBy === 'Pending Records') {
                  
                  return buildingEvaluator.status === 'Pending';
                } else if (sortBy === 'Completed Records') {
                
                  return buildingEvaluator.status === 'Approved' || buildingEvaluator.status === 'Disapproved';
                  
                } else {
                  return true; // Show all records if no sortBy value is selected
                }
              })
              .filter((buildingEvaluator) => {
                // Filter based on the searchText value
                if (searchText === '') {
                  return true; // Show all records if no search text is entered
                } else {
                  // Filter based on the buildingPermitNo or applicantName containing the searchText
                  const buildingNo = buildingEvaluator?.buildingNo || '';
                  const applicantName = buildingEvaluator?.applicantName || '';
                  return (
                    buildingNo.toLowerCase().includes(searchText.toLowerCase()) ||
                    applicantName.toLowerCase().includes(searchText.toLowerCase())
                  );
                }
              })
              .map((buildingEvaluator) => (
                <tr key={buildingEvaluator.id}>
                  <td>{buildingEvaluator.buildingNo}</td>
                  <td>{buildingEvaluator.applicantName}</td>
                  <td>{buildingEvaluator.projectName}</td>
                  {/*<td>{new Date(buildingEvaluator.dateReceived ? buildingEvaluator.dateReceived : "").toISOString().split('T')[0]}</td>*/}
                  <td>{buildingEvaluator.dateReceived}</td>
                  <td>{buildingEvaluator.status}</td>
                  <td>{buildingEvaluator.remarks}</td>
                  <td>
                    <select
                      value={(buildingEvaluator.id && selectedAction[buildingEvaluator.id]) || ''}
                      onChange={(event) => handleActionChange(event, buildingEvaluator.id || '')}
                      style={{ height: '35px', width: '120px', borderRadius: '8px', textAlign: 'center', backgroundColor: '#D9D9D9' }}
                    >
                      <option value="">-select-</option>
                      <option value="View">View</option>
                      <option value="Update">Update</option>
                      <option value="Evaluate">Evaluate</option>
                      <option value="Delete">Delete</option>
                    </select>
                    <IconButton className="next-button" onClick={() => handleNext((buildingEvaluator.id || ''), (buildingEvaluator.status || ''))}>
                      <ArrowCircleRightIcon sx={{ color: '#3C486B' }} />
                    </IconButton>
                    <ViewPopup
                      no={buildingEvaluator.id || ""}
                      buildingPermitNo={buildingEvaluator.buildingNo || ""}
                      applicantName={buildingEvaluator.applicantName || ""}
                      projectName={buildingEvaluator.projectName || ''}
                      address={buildingEvaluator.address || ''}
                      typeofoccupancy={buildingEvaluator.typeofoccupancy || ''}
                      contactno={buildingEvaluator.contactno || ''}
                      datereceived={buildingEvaluator.dateReceived || ''}
                      receivedby={buildingEvaluator.receivedby || ''}
                      open={openStates[buildingEvaluator.id || '']}
                      handleClose={() => handleClose(buildingEvaluator.id || '')}
                    />
                    <DeletePopup
                      open={openDelete[buildingEvaluator.id || ""]}
                      value={buildingEvaluator.id || ""}
                      handleClose={() => handleCloseDelete(buildingEvaluator.id || "")}
                    />
                    <UpdateApplicationPopup
                      no={buildingEvaluator.id || ""}
                      buildingPermitNo={buildingEvaluator.buildingNo || ""}
                      applicantName={buildingEvaluator.applicantName || ""}
                      projectName={buildingEvaluator.projectName || ''}
                      address={buildingEvaluator.address || ''}
                      typeofoccupancy={buildingEvaluator.typeofoccupancy || ''}
                      contactno={buildingEvaluator.contactno || ''}
                      datereceived={buildingEvaluator.dateReceived || ''}
                      receivedby={buildingEvaluator.receivedby || ''}
                      open={openUpdate[buildingEvaluator.id || ""]}
                      handleClose={() => handleCloseUpdate(buildingEvaluator.id || "")
                      }
                    />
                    <EvaluatePopup
                      no={buildingEvaluator.id || ""}
                      buildingPermitNo={buildingEvaluator.buildingNo || ""}
                      applicantName={buildingEvaluator.applicantName || ""}
                      projectName={buildingEvaluator.projectName || ''}
                      address={buildingEvaluator.address || ''}
                      typeofoccupancy={buildingEvaluator.typeofoccupancy || ''}
                      contactno={buildingEvaluator.contactno || ''}
                      datereceived={buildingEvaluator.dateReceived || ''}
                      receivedby={buildingEvaluator.receivedby || ''}
                      evaluator={buildingEvaluator.evaluator || ''}
                      status={buildingEvaluator.status || ''}
                      numberstorey={buildingEvaluator.nostorey || 0}
                      newconsreno={buildingEvaluator.constructrenovate || ''}
                      buildcons={buildingEvaluator.structureconstructed || false}
                      defects={buildingEvaluator.defects ? ([] as string[]).concat(buildingEvaluator.defects) : []}
                      update={selectedAction[buildingEvaluator.id || ""]}
                      open={openEvaluate[buildingEvaluator.id || ""]}
                      handleClose={() => handleCloseEvaluate(buildingEvaluator.id || "")
                      }
                    />
                    <ViewEvaluatePopup
                      no={buildingEvaluator.id || ""}
                      buildingPermitNo={buildingEvaluator.buildingNo || ""}
                      applicantName={buildingEvaluator.applicantName || ""}
                      projectName={buildingEvaluator.projectName || ''}
                      address={buildingEvaluator.address || ''}
                      typeofoccupancy={buildingEvaluator.typeofoccupancy || ''}
                      contactno={buildingEvaluator.contactno || ''}
                      datereceived={buildingEvaluator.dateReceived || ''}
                      receivedby={buildingEvaluator.receivedby || ''}
                      evaluator={buildingEvaluator.evaluator || ''}
                      status={buildingEvaluator.status || ''}
                      numberstorey={buildingEvaluator.nostorey || 0}
                      newconsreno={buildingEvaluator.constructrenovate || ''}
                      buildcons={buildingEvaluator.structureconstructed || false}
                      defects={buildingEvaluator.defects ? ([] as string[]).concat(buildingEvaluator.defects) : []}
                      update={selectedAction[buildingEvaluator.id || ""]}
                      open={openViewEvaluate[buildingEvaluator.id || ""]}
                      handleClose={() => handleCloseViewEvaluate(buildingEvaluator.id || "")}
                    />
                    {/*
                    
                    
                    
                    

                    <PrintPopup
                      open={print}
                      handleClose={() => handlePrintClose()}
                    />
                    */}
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
