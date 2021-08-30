import React, { useContext, useState } from 'react'
import './Navbar.scss'
import { Link } from "react-router-dom";
import img from "./logo_transparent_1.png"
import { Globalstate } from '../../GlobalState';
import Loading from '../loading/Loading';
import axios from 'axios';

const API = 'https://capstone-tripplanner-back.herokuapp.com'

function Navbar() {
    const state = useContext(Globalstate)
    const [auth, setAuth] = state.userInfoAPI.auth
    const [authAdmin, setAuthAdmin] = state.userInfoAPI.authAdmin
    const [info] = state.userInfoAPI.info
    const [loading, setLoading] = useState(false)

    React.useEffect(() => {

        //Open menu
        const hamburger = document.querySelector(".hamburger");
        const navMenu = document.querySelector(".nav-menu");

        hamburger.addEventListener("click", mobileMenu);

        function mobileMenu() {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        }

        //Close menu
        const navLink = document.querySelectorAll(".nav-link");

        navLink.forEach(n => n.addEventListener("click", closeMenu));

        function closeMenu() {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }
    })

    const logout = async () => {
        setLoading(true)

        await axios.get(`${API}/users/logout`)
        localStorage.clear()
        sessionStorage.clear()
        setAuth(false)
        setAuthAdmin(false)

        setLoading(false)
        window.location.replace('/login')
    }

    return (
        <header className="header">
            {loading && <Loading />}
            <nav className="navbar">
                <Link to={'/'} className="nav-logo" onClick={() => window.location.replace('/')}>
                    <img src={img} alt={img} />
                </Link>

                <ul className="nav-menu">
                    <li className="nav-item">
                        <Link to={'/itinerary'} className="nav-link"
                            onClick={() => window.location.replace('/itinerary')}>
                            Book
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to={'/place'} className="nav-link">
                            Discover
                        </Link>
                    </li>

                    {auth ? (
                        <>
                            {authAdmin ? (
                                <li className="nav-item">
                                    <Link to={'/admin'} className="nav-link">
                                        {info.firstName} {info.lastName}
                                    </Link>
                                </li>
                            ) : (
                                <li className="nav-item">
                                    <Link to={'/profile'} className="nav-link">
                                        {info.firstName} {info.lastName}
                                    </Link>
                                </li>
                            )}


                            <li className="nav-item">
                                <Link to={'/login'} className="nav-link" onClick={logout} >
                                    Logout
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link to={'/login'} className="nav-link">
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/register'} className="nav-link">
                                    Register
                                </Link>
                            </li>
                        </>
                    )}
                </ul>

                <div className="hamburger">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </nav>
        </header>
    )
}

export default Navbar