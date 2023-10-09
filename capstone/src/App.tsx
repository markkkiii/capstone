import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import BuildingList from './BuildingEvaluator/BuildingList';
import EvaluateApplicationForm from './BuildingEvaluator/EvaluateApplcationForm';
import BusinessList from './FSESEncoder/BusinessList'
import RenewalBusinessList from './FSESEncoder/RenewalBusinessList';
import OccupancyListDisapproved from './FSESEncoder/OccupancyListDisapproved';
import OccupancyListClerk from './FSESClerk/OccupancyListClerk';
import DisapprovedRenewalList from './FSESClerk/DisapprovedRenewalList';
import DisapprovedNewBusiness from './FSESClerk/DisapprovedNewBusinessList';

export default function App(){

  return(
    <BrowserRouter>
        <Routes>
          <Route path = "/dashboard" element={<BuildingList/>}/>
          <Route path = "/evaluate" element={<EvaluateApplicationForm />}/>
          <Route path = "/businessdashboard" element={<BusinessList/>}/>
          <Route path = "/renewaldashboard" element={<RenewalBusinessList/>}/>
          <Route path = "/disapprovedoccupancy" element={<OccupancyListDisapproved/>}/>
          <Route path = "/occupancyListClerk" element={<OccupancyListClerk/>}/>
          <Route path = "/RenewalListClerk" element={<DisapprovedRenewalList/>}/>
          <Route path = "/NewBusinessListClerk" element={<DisapprovedNewBusiness/>}/>
        </Routes>
    </BrowserRouter>

  )
}