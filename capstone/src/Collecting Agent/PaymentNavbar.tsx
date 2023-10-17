import React from 'react'
import '../Nav.css'
import { Link } from 'react-router-dom';

const PaymentNavbar: React.FC = () => {
    return (
        <nav className="navbar">
            {/*<AccountCircleIcon sx={{ display: { xs: 'none', md: 'flex', fontSize: '2rem' }, mr: 1 }}/>*/}
            <div className='navButtons'>
                <Link to='/NewBusinessPayment' className="navlink">New Business List</Link>
                <Link to='/BusinessRenewalPayment' className="navlink">Business Renewal List</Link>
                <Link to='/OccupancyPayment' className="navlink">Occupancy List</Link>
                <Link to='/BuildingPayment' className="navlink">Building List</Link>
            </div>

        </nav>
    )
}

export default PaymentNavbar;