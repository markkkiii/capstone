import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendarAlt, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface BuildingApplication {
  no: number;
  buildingPermitNo: string;
  applicantName: string;
  projectName: string;
  status: string;
  remarks: string;
}

const BuildingApplicationListComponent: React.FC = () => {
  const buildingApplications: BuildingApplication[] = [
    {
      no: 1,
      buildingPermitNo: '123456789',
      applicantName: 'Jo March',
      projectName: 'My House',
      status: 'Pending',
      remarks: 'Printed'
    },
    {
      no: 2,
      buildingPermitNo: '987654321',
      applicantName: 'Joe Mama',
      projectName: 'My Apartment',
      status: 'Approved',
      remarks: 'Not Printed'
    },
    {
      no: 3,
      buildingPermitNo: '567891234',
      applicantName: 'Laurrie',
      projectName: 'Commercial Building',
      status: 'In Progress',
      remarks: 'Printed'
    },
    {
      no: 4,
      buildingPermitNo: '21451512',
      applicantName: 'Jamie',
      projectName: 'Residencial',
      status: 'In Progress',
      remarks: 'Printed'
    }
  ];

  const [selectedAction, setSelectedAction] = useState<Record<number, string>>({});

  const handleActionChange = (event: React.ChangeEvent<HTMLSelectElement>, no: number) => {
    const value = event.target.value;
    setSelectedAction((prevSelectedAction) => ({
      ...prevSelectedAction,
      [no]: value
    }));
  };

  const handleNext = () => {
    // Perform logic for the "Next" button click here
  };

  return (
    <div className="app-container">
      <div className="header">
        <div className="search-container">
          <input type="text" placeholder="Search" />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
        <div className="title-container">
          <h1 className="title">Building Application List</h1>
        </div>
        <div className="sort-container">
          <select>
            <option>Sort By</option>
            <option>Pending Records</option>
            <option>Completed Records</option>
          </select>
          <div className="date-input-container">
            <input type="text" value={new Date().toLocaleDateString()} disabled />
            <FontAwesomeIcon icon={faCalendarAlt} className="date-icon" />
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
            <th>Status</th>
            <th>Remarks</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {buildingApplications.map((application) => (
            <tr key={application.no}>
              <td>{application.no}</td>
              <td>{application.buildingPermitNo}</td>
              <td>{application.applicantName}</td>
              <td>{application.projectName}</td>
              <td>{application.status}</td>
              <td>{application.remarks}</td>
              <td>
                <select
                  value={selectedAction[application.no] || ''}
                  onChange={(event) => handleActionChange(event, application.no)}
                >
                  <option value="">Select Action</option>
                  <option value="View">View</option>
                  <option value="Update">Update</option>
                  <option value="Print">Print</option>
                  <option value="Delete">Delete</option>
                </select>
                <button className="next-button" onClick={handleNext}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BuildingApplicationListComponent;
