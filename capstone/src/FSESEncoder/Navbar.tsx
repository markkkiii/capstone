import React from 'react'
import '../Nav.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            {/*<AccountCircleIcon sx={{ display: { xs: 'none', md: 'flex', fontSize: '2rem' }, mr: 1 }}/>*/}
            <div className='navButtons'>
                <Link to='/businessdashboard' className="navlink">New Business List</Link>
                <Link to='/renewaldashboard' className="navlink">Business Renewal List</Link>
                <Link to='/disapprovedoccupancy' className="navlink">Occupancy List</Link>
            </div>

        </nav>
    )
}

export default Navbar