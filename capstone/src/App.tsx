import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import BuildingList from './BuildingList';
import EvaluateApplicationForm from './EvaluateApplcationForm';


export default function App(){

  return(
    <BrowserRouter>
        <Routes>
          <Route path = "/dashboard" element={<BuildingList/>}/>
          <Route path = "/test" element={<EvaluateApplicationForm/>}/>
        </Routes>
    </BrowserRouter>

  )
}