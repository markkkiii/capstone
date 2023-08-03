import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import ViewEvaluateApplicationForm from './ViewEvaluateApplcationForm';
import BuildingList from './BuildingList';
import EvaluateApplicationForm from './EvaluateApplcationForm';

export default function App(){

  return(
    <BrowserRouter>
        <Routes>
          <Route path = "/dashboard" element={<BuildingList/>}/>
          <Route path = "/evaluate" element={<EvaluateApplicationForm />}/>
          <Route path = "/viewevaluate" element={<ViewEvaluateApplicationForm />}/>
        </Routes>
    </BrowserRouter>

  )
}