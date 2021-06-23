import { AlignJustify, Maximize, Mail, Bell, User } from 'react-feather';
import React, { useState } from "react"
import reqWithToken from '../helper/Auth';
import Cookies from "js-cookie"
import Router from 'next/router'


export default function Nav_bar() {
    const [userData, setUserData] = useState("")

    React.useEffect(() => {
        if (!userData) {
            const userName = Cookies.get("userName")
            const instituteName = Cookies.get("instituteName")

            setUserData({
                userName,
                instituteName
            })
        }
    }, [])
    const handleLogout = async () => {
        const url = process.env.NEXT_PUBLIC_USER_LOGOUT
        console.log("URL", url)
        const resp = await reqWithToken(url, "POST")
        console.log("LOGOUT RESPONSE", resp)
        Cookies.remove(['accessToken', "userName", "instituteName"])
        Router.push("/login")
    }
    return (
        <div>
            <div className="navbar-bg"></div>
            <nav className="navbar navbar-expand-lg main-navbar sticky">
                <div className="form-inline mr-auto">
                    <ul className="navbar-nav mr-3">
                        <li><a href="#" data-toggle="sidebar" className="nav-link nav-link-lg
                                            collapse-btn"> <AlignJustify style={{ width: '20px', height: '20px', color: '#555556' }} ></AlignJustify></a></li>
                        {/* <li><a href="#" className="nav-link nav-link-lg fullscreen-btn">
                        <Maximize style={{width: '20px', height : '20px',color:'#555556'}}></Maximize>
                    </a></li> */}
                        <li>
                            {/* <form className="form-inline mr-auto">
                        <div className="search-element">
                        <input className="form-control" type="search" placeholder="Search" aria-label="Search" data-width="200"/>
                        <button className="btn" type="submit">
                            <i className="fas fa-search"></i>
                        </button>
                        </div>
                    </form> */}
                        </li>
                    </ul>
                </div>
                <ul className="navbar-nav navbar-right">
                    <li className="dropdown dropdown-list-toggle">
                        <div className="dropdown-menu dropdown-list dropdown-menu-right pullDown">
                            <div className="dropdown-header">
                                Messages
                    <div className="float-right">
                                    <a href="#">Mark All As Read</a>
                                </div>
                            </div>
                            <div className="dropdown-list-content dropdown-list-message">
                                <a href="#" className="dropdown-item"> <span className="dropdown-item-avatar
                                            text-white">
                                    {/* <img alt="image" src="img/users/user-1.png" className="rounded-circle"/> */}
                                </span> <span className="dropdown-item-desc"> <span className="message-user">John
                    Deo</span>
                                        <span className="time messege-text">Please check your mail !!</span>
                                        <span className="time">2 Min Ago</span>
                                    </span>
                                </a> <a href="#" className="dropdown-item"> <span className="dropdown-item-avatar text-white">
                                    {/* <img alt="image" src="img/users/user-2.png" className="rounded-circle"/> */}
                                </span> <span className="dropdown-item-desc"> <span className="message-user">Sarah
                    Smith</span> <span className="time messege-text">Request for leave
                    application</span>
                                        <span className="time">5 Min Ago</span>
                                    </span>
                                </a> <a href="#" className="dropdown-item"> <span className="dropdown-item-avatar text-white">
                                    {/* <img alt="image" src="img/users/user-5.png" className="rounded-circle"/> */}
                                </span> <span className="dropdown-item-desc"> <span className="message-user">Jacob
                    Ryan</span> <span className="time messege-text">Your payment invoice is
                    generated.</span> <span className="time">12 Min Ago</span>
                                    </span>
                                </a> <a href="#" className="dropdown-item"> <span className="dropdown-item-avatar text-white">
                                    {/* <img alt="image" src="img/users/user-4.png" className="rounded-circle"/> */}
                                </span> <span className="dropdown-item-desc"> <span className="message-user">Lina
                    Smith</span> <span className="time messege-text">hii John, I have upload
                                        doc
                    related to task.</span> <span className="time">30
                    Min Ago</span>
                                    </span>
                                </a> <a href="#" className="dropdown-item"> <span className="dropdown-item-avatar text-white">
                                    {/* <img alt="image" src="img/users/user-3.png" className="rounded-circle"/> */}
                                </span> <span className="dropdown-item-desc"> <span className="message-user">Jalpa
                    Joshi</span> <span className="time messege-text">Please do as specify.
                                        Let me
                    know if you have any query.</span> <span className="time">1
                    Days Ago</span>
                                    </span>
                                </a> <a href="#" className="dropdown-item"> <span className="dropdown-item-avatar text-white">
                                    {/* <img alt="image" src="img/users/user-2.png" className="rounded-circle"/> */}
                                </span> <span className="dropdown-item-desc"> <span className="message-user">Sarah
                    Smith</span> <span className="time messege-text">Client Requirements</span>
                                        <span className="time">2 Days Ago</span>
                                    </span>
                                </a>
                            </div>
                            <div className="dropdown-footer text-center">
                                <a href="#">View All <i className="fas fa-chevron-right"></i></a>
                            </div>
                        </div>
                    </li>
                    <li className="dropdown dropdown-list-toggle"><a href="#" data-toggle="dropdown"
                        className="nav-link notification-toggle nav-link-lg"><i><Bell style={{ width: '24px', height: '24px', color: '#555556' }} className="bell"></Bell></i>
                    </a>
                        <div className="dropdown-menu dropdown-list dropdown-menu-right pullDown">
                            <div className="dropdown-header">
                                Notifications
                             <div className="float-right">
                                    <a href="#">Mark All As Read</a>
                                </div>
                            </div>
                            <div className="dropdown-list-content dropdown-list-icons">
                                <a href="#" className="dropdown-item dropdown-item-unread"> <span
                                    className="dropdown-item-icon bg-primary text-white"> <i className="fas
                                                fa-code"></i>
                                </span> <span className="dropdown-item-desc"> Template update is
                    available now! <span className="time">2 Min
                    Ago</span>
                                    </span>
                                </a> <a href="#" className="dropdown-item"> <span className="dropdown-item-icon bg-info text-white"> <i className="far
                                                fa-user"></i>
                                </span> <span className="dropdown-item-desc"> <b>You</b> and <b>Dedik
                    Sugiharto</b> are now friends <span className="time">10 Hours
                    Ago</span>
                                    </span>
                                </a> <a href="#" className="dropdown-item"> <span className="dropdown-item-icon bg-success text-white">
                                    <a href="#" className="dropdown-item has-icon"> <i className="fas fa-bolt"></i>
                                 Activities
                             </a>
                                </span> <span className="dropdown-item-desc"> <b>Kusnaedi</b> has
                    moved task <b>Fix bug header</b> to <b>Done</b> <span className="time">12
                                        Hours
                    Ago</span>
                                    </span>
                                </a> <a href="#" className="dropdown-item"> <span className="dropdown-item-icon bg-danger text-white"> <i
                                    className="fas fa-exclamation-triangle"></i>
                                </span> <span className="dropdown-item-desc"> Low disk space. Let's
                    clean it! <span className="time">17 Hours Ago</span>
                                    </span>
                                </a> <a href="#" className="dropdown-item"> <span className="dropdown-item-icon bg-info text-white"> <i className="fas
                                                fa-bell"></i>
                                </span> <span className="dropdown-item-desc"> Welcome to
                    template! <span className="time">Yesterday</span>
                                    </span>
                                </a>
                            </div>
                            <div className="dropdown-footer text-center">
                                <a href="#">View All <i className="fas fa-chevron-right"></i></a>
                            </div>
                        </div>
                    </li>

                    {/* USER DROPDOWN START!~~~~~~~~~~~~~~~~~~~~~ */}

                    <li className="dropdown dropdown-list-toggle"><a href="#" data-toggle="dropdown"
                        className="nav-link notification-toggle nav-link-lg"><i><User style={{ width: '24px', height: '24px', color: '#555556' }} className="user" /></i>
                    </a>
                        <div className="dropdown-menu dropdown-list dropdown-menu-right pullDown">
                            <div className="dropdown-header">
                                Hello {userData ? userData.userName : "No user "}

                            </div>
                            <div className="dropdown-list-content dropdown-list-icons">
                                <a href="#" className="dropdown-item dropdown-item-unread"> <span
                                    className="dropdown-item-icon bg-primary text-white"> <i className="far
                                    fa-user"></i>
                                </span> <span className="dropdown-item-desc"> Profile
                                    </span>
                                </a>
                                <a href="#" className="dropdown-item"> <span className="dropdown-item-icon bg-success text-white">
                                    <i className="fas fa-bolt"></i>
                                </span> <span className="dropdown-item-desc">Activities
                                    </span>
                                </a> <a href="#" className="dropdown-item"> <span className="dropdown-item-icon bg-info text-white">
                                    <i className="fas fa-cog"></i>
                                </span> <span className="dropdown-item-desc"> Settings
                                    </span>
                                </a> <a onClick={handleLogout} className="dropdown-item "> <span className="dropdown-item-icon has-icon text-danger">
                                    <i className="fas fa-sign-out-alt"></i>
                                </span> <span className="dropdown-item-desc "> Logout
                                    </span>
                                </a>
                            </div>
                        </div>
                    </li>







                    {/* USER DROPDOWN CLOSE~~~~~~~~~~~~~~~~~~~~~ */}
                    {/* <li className="dropdown dropdown-list-toggle">
                        <a href="#" data-toggle="dropdown" className="nav-link dropdown-toggle nav-link-lg nav-link-user">
                            <span onClick={e => console.log("CLICKED")} className="d-sm-none d-lg-inline-block">
                                <i><User style={{ width: '24px', height: '24px', color: '#555556' }} className="user"></User></i>
                            </span>

                        </a>
                        <div className="dropdown-menu dropdown-menu-right pullDown">
                            <div className="dropdown-title">Hello {userData ? userData.userName : "No user "}</div>
                            <a href="#" className="dropdown-item has-icon"> <i className="far
                                        fa-user"></i> Profile
                             </a> <a href="#" className="dropdown-item has-icon"> <i className="fas fa-bolt"></i>
                                 Activities
                             </a> <a href="#" className="dropdown-item has-ic    on"> <i className="fas fa-cog"></i>
                                 Settings
                             </a>
                            <div className="dropdown-divider"></div>
                            <a onClick={handleLogout} className="dropdown-item has-icon text-danger"> <i className="fas fa-sign-out-alt"></i>
                                 Logout
                             </a>
                        </div>
                    </li> */}
                </ul>
            </nav>
        </div>
    )
}

