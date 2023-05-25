import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import BuildingList from './BuildingList';


export default function App(){

  return(
    <BrowserRouter>
        <Routes>
          <Route path = "/" element={<BuildingList/>}/>
        </Routes>
    </BrowserRouter>

  )
}