import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendarAlt, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import BuildingList from './BuildingList';
import ViewPending from './ViewPending';


export default function App(){

  return(
    <BrowserRouter>
        <Routes>
          <Route path = "/" element={<BuildingList/>}/>
        </Routes>
    </BrowserRouter>

  )
}