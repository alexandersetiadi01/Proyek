import React, {useState} from "react";
import * as FaIcons from "react-icons/fa";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import "./navbar.css";
import {sidebarData} from "./sidebarData";

function Navbar(){ 
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    return(
    <>
        <nav className="navbar sticky-top navbar-expand-xxl navbar-blue bg-dark">
        <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar}/>
        </Link>
        <h1>(Nama Proyek)</h1>

        </nav>
        <nav className={sidebar ? 'nav-menu-active' : 'nav-menu'}>
            <ul classname="nav-menu-items" onClick={showSidebar}>
                {sidebarData.map((item, index) => {
                    return(
                        <li key={index} className={item.classname}>
                            <Link to={item.path}>
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    )
                })}

            </ul>
        </nav>
               
    </>
    )
}

export default Navbar;