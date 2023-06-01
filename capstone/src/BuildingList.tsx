import React, { useEffect, useState } from 'react';
import './BuildingList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch} from '@fortawesome/free-solid-svg-icons';
import ViewPopup from './ViewPopup';
import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddApplicationPopup from './AddApplicationPopup';
import UpdateApplicationPopup from './UpdateApplicationPopUp';
import NavigationBar from './NavigationBar';
import IconButton from '@mui/material/IconButton';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Print from './Print';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

interface BuildingApplication {
  no: number;
  buildingPermitNo: string;
  applicantName: string;
  projectName: string;
  dateReceived: Date;
  status: string;
  remarks: string;
}

interface EvaluateProps{
  update:boolean;
  buildingno: string;
  testvalue?:string;
}
interface ViewEvaluateProps{
  buildingno: string;
 
}


const BuildingApplicationListComponent: React.FC = () => {
  const [selectedAction, setSelectedAction] = useState<Record<number, string>>({});
  const [openStates, setOpenStates] = useState<Record<number, boolean>>({});
  const [openUpdate, setOpenUpdate] = useState<Record<number, boolean>>({});
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [open, setOpen] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);

  const[applicationform,SetApplicationForm] = useState([{
    controlno:100,
    buildingpermitno: '100',
    namepermitee: "default",
    businessname: "don default",
    address: "default",
    typeofoccupancy: "default ",
    contactno: "default",
    datereceived: "2023-05-27T16:00:00.000+00:00",
    receivedby: "default",
    status: "default",
    evaluator: "default",
    nostorey: 2,
    constructrenovate: "default ",
    structureconstructed: false,
    remarks: "default",
    defects: "default"
  }])

  const getApplications = async () =>{
      axios.get('http://localhost:8080/BFP/displayAllPermits').then(res =>{
          SetApplicationForm(res.data)
          console.log(res.data)
      }).catch(err => console.log(err))
  }

  useEffect(() => {

  }, [applicationform]);



  const handleOpen = (no: number) => {
    setOpenStates((prevOpenStates) => ({
      ...prevOpenStates,
      [no]: true,
    }));
  };

  const handleClose = (no: number) => {
    setOpenStates((prevOpenStates) => ({
      ...prevOpenStates,
      [no]: false,
    }));
    getApplications()
  };

  const handleOpenUpdate = (no: number) => {
    setOpenUpdate((prevOpenUpdate) => ({
      ...prevOpenUpdate,
      [no]: true,
    }));
  };

  const handleCloseUpdate = (no: number) => {
    setOpenUpdate((prevOpenUpdate) => ({
      ...prevOpenUpdate,
      [no]: false,
    }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

 

  const handleEvaluateClick = (buildingnoval:string, updateval:boolean, testval?:string) => {
    // Navigate to the EvaluateApplicationForm with props
    const state: EvaluateProps = { update: updateval, buildingno: buildingnoval, testvalue: testval};
    navigate('/evaluate',{ state });
  };

  const handleViewEvaluateClick = (buildingnoval:string) => {
    // Navigate to the EvaluateApplicationForm with props
    const state: ViewEvaluateProps = {  buildingno: buildingnoval};
    navigate('/viewevaluate',{ state });
  };


  const buildingApplications: BuildingApplication[] = [
    {
      no: 1,
      buildingPermitNo: '123456789',
      applicantName: 'Jo March',
      projectName: 'My House',
      dateReceived: new Date('2023-05-28'),
      status: 'Pending',
      remarks: 'Printed'
    },
    {
      no: 2,
      buildingPermitNo: '987654321',
      applicantName: 'Joe Mama',
      projectName: 'My Apartment',
      dateReceived: new Date('2023-05-26'),
      status: 'Approved',
      remarks: 'Not Printed'
    },
    {
      no: 3,
      buildingPermitNo: '567891234',
      applicantName: 'Laurrie',
      projectName: 'Commercial Building',
      dateReceived: new Date('2023-04-28'),
      status: 'Disapproved',
      remarks: 'Printed'
    },
    {
      no: 4,
      buildingPermitNo: '21451512',
      applicantName: 'Jamie',
      projectName: 'Residential',
      dateReceived: new Date('2022-05-28'),
      status: 'Pending',
      remarks: 'Printed'
    }
  ];

  const handleActionChange = (event: React.ChangeEvent<HTMLSelectElement>, no: number) => {
    const value = event.target.value;
    setSelectedAction((prevSelectedAction) => ({
      ...prevSelectedAction,
      [no]: value
    }));
  };

  const handleNext = (value: number, status:string, buildingno:string) => {
    const selectedValue = selectedAction[value];
    const deletedval = parseInt(selectedAction[value],10)
    
    if (selectedValue === 'Delete') {
      
      const confirmed = window.confirm('Are you sure you want to delete this application?');

      if (confirmed) {
        // Perform delete logic here
        console.log('Deleting application:', value);
        axios.delete('http://localhost:8080/BFP/deletePermit/'+value).then(res => {
          console.log(res.data);
          alert("Deleted Successfully!");
      }).catch(err => console.log(err))
      } else {
        // User canceled the delete operation
        return;
      }
    } else if (status ==='Pending') {
        //Pending function condition goes here
        if(selectedValue ==='View'){
          handleOpen(value)
        }
        else if(selectedValue === 'Update'){
          handleOpenUpdate(value);
        }
        else if (selectedValue === 'Evaluate'){
          handleEvaluateClick(buildingno,false, 'test')
        }
        else if (selectedValue === 'Print'){
          alert("Evaluate Application First!")
        }
    } else if (status === 'Approved' || status ==='Disapproved') {
        //Completed function condition goes here
        if(selectedValue === 'Evaluate'){
          alert('Application already Evaluated');
        }
        else if(selectedValue === 'Update'){
          handleEvaluateClick(buildingno,true, 'test')
        }
        else if(selectedValue ==='View'){
          handleViewEvaluateClick(buildingno)
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

  const handleLogout = () => {
    // Implement your logout logic here
    console.log('Logout');
  };

  return (
    <>
      <AdditionalTab />
      <NavigationBar onLogout={handleLogout} />
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
                  borderRadius:'15px',
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
                      style={{height:'35px', width:'120px', borderRadius:'8px', textAlign: 'center', backgroundColor: '#D9D9D9' }}
                    >
                      <option value="">-select-</option>
                      <option value="View">View</option>
                      <option value="Update">Update</option>
                      <option value="Evaluate">Evaluate</option>
                      <option value="Print">Print</option>
                      <option value="Delete">Delete</option>
                    </select>
                    <IconButton className="next-button" onClick={() => handleNext(applicationform.controlno ,applicationform.status,applicationform.buildingpermitno)}>
                      <ArrowCircleRightIcon sx={{color : '#3C486B'}} />
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
                    <AddApplicationPopup open={open} handleClose={handleClickClose} />
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
                      handleClose={() => handleCloseUpdate(applicationform.controlno)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
                
    </>
  );
};

export default BuildingApplicationListComponent;

