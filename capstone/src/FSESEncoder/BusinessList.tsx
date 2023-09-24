import Navbar from '../Navbar'
import React, { useEffect, useState } from 'react';
import './BusinessList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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


    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };
    const handleSearch = () => {
        // Perform search logic here based on the searchText value
        // For example, you can filter the buildingApplications array based on the searchText
    };

    const handleSearchInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          handleSearch();
        }
      };
    const handleClickOpen = () => {
        setOpen(true);
      };
      
    return (
        <>
            <AdditionalTab />
            <Navbar />
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
        </>
    )
}
export default BusinessList