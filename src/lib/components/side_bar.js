import { Layout, Monitor } from 'react-feather';
import React, { useState } from "react"

import Cookies from "js-cookie"

export default function Side_bar() {
    const [instituteName, setInstituteName] = useState("")
    React.useEffect(() => {
        if (!instituteName) {
            setInstituteName(Cookies.get("instituteName"))
        }
    }, [])
    return (
        <div>
            <div className="main-sidebar sidebar-style-2">
                <aside id="sidebar-wrapper">

                    <div className="sidebar-brand pt-1 " style={{ lineHeight: "20px" }}>
                        <a href="/dtrf">
                            <span className="pt-2 "
                                style={{
                                    letterSpacing: "2px",
                                    fontSize: "15px",
                                    lineHeight: "0px",

                                }}
                            >{instituteName ? instituteName : "Institute DTRF"}</span>


                        </a>
                    </div>



                    <ul className="sidebar-menu">

                        <li className="menu-header"></li>
                        {/* <li className="nav-link active">
            <a href="/dashboard" className="nav-link"><i><Monitor></Monitor></i><span>Dashboard</span></a>
            </li> */}
                        <li className="dropdown active"><a className="nav-link" href="/dtrf"><i><Monitor></Monitor></i><span>DTRF Dashboard</span></a></li>

                        <li><a className="nav-link" href="/dtrf_form"><i><Layout></Layout></i><span>DTRF Form</span></a></li>

                    </ul>

                </aside>

            </div>
        </div>
    )
}