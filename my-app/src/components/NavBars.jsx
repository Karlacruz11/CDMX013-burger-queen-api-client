import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import Burger from '../images/Burger.png'
import Queen from '../images/Queen.png'
import check from '../images/check.png'
import logout from '../images/logout.png'
import plus from '../images/plus.png'
import active from '../images/active.png'
import prepared from '../images/prepared.png'
import partners from '../images/partners.png'
import products from '../images/products.png'
import NavBar from './Waiters/NavBar'

function NavBars({handleAccount}) {
    
    let navigate = useNavigate()
    function handleNavigate() {
        handleAccount(null)
        navigate('/')
    }

    const location = useLocation()
    let content

    if (location.pathname === '/waiters/new_order' || 
    location.pathname === '/waiters/ready') {
        content = (
            <NavBar>
                <div className="logo-box">
                    <img
                        className="burger-letters"
                        src={Burger}
                        alt="burger-letters"
                    ></img>
                    <img
                        className="queen-letters"
                        src={Queen}
                        alt="queen-letters"
                    ></img>
                </div>
                <NavLink 
                    className="menu-letters"
                    to="/waiters/new_order"
                >
                    <div className="menu-btns-box">
                        <img
                            className="new-order"
                            src={plus}
                            alt="new-order"
                        ></img>
                        <label className="menu-letters">New Order</label>
                    </div>
                </NavLink>
                <NavLink
                    className="menu-letters"
                    to="/waiters/ready"
                >
                <div className="menu-btns-box">
                    <img className="ready" src={check} alt="ready"></img>
                    <label className="menu-letters">Ready</label>
                </div>
                </NavLink>
                <div className="menu-btns-box" id="log-out-box">
                    <img
                        className="log-out"
                        src={logout}
                        alt="log-out"
                        onClick={handleNavigate}
                    ></img>
                    <label className="menu-letters">Log Out</label>
                </div>
            </NavBar>
        )
    } else if (location.pathname === '/kitchen/active' ||
     location.pathname === '/kitchen/prepared') {
        content = (
            <NavBar>
                <div className="logo-box">
                    <img
                        className="burger-letters"
                        src={Burger}
                        alt="burger-letters"
                    ></img>
                    <img
                        className="queen-letters"
                        src={Queen}
                        alt="queen-letters"
                    ></img>
                </div>
                <NavLink 
                    className="menu-letters"
                    to="/kitchen/active"
                >
                    <div className="menu-btns-box">
                        <img
                            className="active"
                            src={active}
                            alt="active-order"
                        ></img>
                        <label className="menu-letters">Active</label>
                    </div>
                </NavLink>
                <NavLink to="/kitchen/prepared">
                <div className="menu-btns-box">
                    <img
                        className="prepared"
                        src={prepared}
                        alt="prepared-order"
                    ></img>
                    <label className="menu-letters">Prepared</label>
                </div>
                </NavLink>
                <div className="menu-btns-box" id="log-out-box">
                    <img
                        className="log-out"
                        src={logout}
                        alt="log-out"
                        onClick={handleNavigate}
                    ></img>
                    <label className="menu-letters">Log Out</label>
                </div>
            </NavBar>
        )
    } else if (
        location.pathname === '/admin/partners' ||
        location.pathname === '/admin/products'
    ) {
        content = (
            <NavBar>
                <div className="logo-box">
                    <img
                        className="burger-letters"
                        src={Burger}
                        alt="burger-letters"
                    ></img>
                    <img
                        className="queen-letters"
                        src={Queen}
                        alt="queen-letters"
                    ></img>
                </div>
                <NavLink className="menu-letters" to="/admin/partners">
                    <div className="menu-btns-box">
                        <img
                            className="partners"
                            src={partners}
                            alt="partners"
                        ></img>
                        <label className="menu-letters">Partners</label>
                    </div>
                </NavLink>
                <NavLink to="/admin/products">
                    <div className="menu-btns-box">
                        <img
                            className="products"
                            src={products}
                            alt="products"
                        ></img>
                        <label className="menu-letters">Products</label>
                    </div>
                </NavLink>
                <NavLink to="/">
                    <div className="menu-btns-box" id="log-out-box">
                        <img
                            className="log-out"
                            src={logout}
                            alt="log-out"
                            onClick={handleNavigate}
                        ></img>
                        <label className="menu-letters">Log Out</label>
                    </div>
                </NavLink>
            </NavBar>
        )
    }

    return <>{content}</>
}

export default NavBars
