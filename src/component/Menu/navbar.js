import React, {useState} from "react";
import * as FaIcons from "react-icons/fa";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import "./navbar.css";
import {sidebarData, sidebarDataAdmin} from "./sidebarData";
import { setLogOut } from "../../repository";

function Navbar(){ 
    const [sidebar, setSidebar] = useState(false);
   //const location = useLocation();
    const showSidebar = () => setSidebar(!sidebar);
    const navigate = useNavigate();
    const logout = () => {
        setLogOut();
        navigate("/");
    }

    return(
    <>
        <nav className="navbar sticky-top navbar-expand navbar-blue bg-dark">
        <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar}/>
        </Link>  
        <h1>(Nama Proyek)</h1>
        </nav>
        <nav className={sidebar ? 'nav-menu-active' : 'nav-menu'}>
            
            <ul classname="nav-menu-items" onClick={showSidebar}>
                {sidebarDataAdmin.map((item, index) => {
                    return(
                        <li key={index} className={item.classname}>
                            <Link to={item.path}>
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    )
                })}
                <li className="nav-text">
                    <button onClick={logout}>
                        logout
                    </button>
                </li>

            </ul>
        </nav>
               
    </>
    )
}

export default Navbar;