import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import BuildingList from './BuildingList';
import AddApplicationForm from './AddApplicationForm';


export default function App(){

  return(
    <BrowserRouter>
        <Routes>
          <Route path = "/dashboard" element={<BuildingList/>}/>
          <Route path = "/test" element={<AddApplicationForm/>}/>
        </Routes>
    </BrowserRouter>

  )
}