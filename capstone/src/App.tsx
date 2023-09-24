import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import ViewEvaluateApplicationForm from './ViewEvaluateApplcationForm';
import BuildingList from './BuildingEvaluator/BuildingList';
import EvaluateApplicationForm from './BuildingEvaluator/EvaluateApplcationForm';
import BusinessList from './FSESEncoder/BusinessList'

export default function App(){

  return(
    <BrowserRouter>
        <Routes>
          <Route path = "/dashboard" element={<BuildingList/>}/>
          <Route path = "/evaluate" element={<EvaluateApplicationForm />}/>
          <Route path = "/viewevaluate" element={<ViewEvaluateApplicationForm />}/>
          <Route path = "/businessdashboard" element={<BusinessList/>}/>
        </Routes>
    </BrowserRouter>

  )
}