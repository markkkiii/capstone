import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import BuildingList from './BuildingEvaluator/BuildingList';
import EvaluateApplicationForm from './BuildingEvaluator/EvaluateApplcationForm';
import BusinessList from './FSESEncoder/BusinessList'
import RenewalBusinessList from './FSESEncoder/RenewalBusinessList';
import OccupancyListClerk from './FSESClerk/OccupancyListClerk';
import DisapprovedRenewalList from './FSESClerk/DisapprovedRenewalList';
import DisapprovedNewBusiness from './FSESClerk/DisapprovedNewBusinessList';
import BusinessRenewalPayment from './Collecting Agent/BusinessRenewalPayment';
import OccupancyPayment from './Collecting Agent/OccupancyPayment';
import BuildingPayment from './Collecting Agent/BuildingPayment';
import NewBusinessPayment from './Collecting Agent/NewBusinessPayment';
import OccupancyListApproved from './FSESEncoder/OccupancyListApproved';

export default function App(){

  return(
    <BrowserRouter>
        <Routes>
          <Route path = "/dashboard" element={<BuildingList/>}/>
          <Route path = "/evaluate" element={<EvaluateApplicationForm />}/>
          <Route path = "/businessdashboard" element={<BusinessList/>}/>
          <Route path = "/renewaldashboard" element={<RenewalBusinessList/>}/>
          <Route path = "/disapprovedoccupancy" element={<OccupancyListApproved/>}/>
          <Route path = "/occupancyListClerk" element={<OccupancyListClerk/>}/>
          <Route path = "/RenewalListClerk" element={<DisapprovedRenewalList/>}/>
          <Route path = "/NewBusinessListClerk" element={<DisapprovedNewBusiness/>}/>
          <Route path = "/BusinessRenewalPayment" element={<BusinessRenewalPayment/>}/>
          <Route path = "/OccupancyPayment" element={<OccupancyPayment/>}/>
          <Route path = "/BuildingPayment" element={<BuildingPayment/>}/>
          <Route path = "/NewBusinessPayment" element={<NewBusinessPayment/>}/>
        </Routes>
    </BrowserRouter>

  )
}