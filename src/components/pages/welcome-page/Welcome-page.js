import React from 'react'
import { Link } from "react-router-dom";
import './Welcome-page.scss'
import video from "./video-compress-v1.mp4";

// import img from "./logo 4.png"

function WelcomePage() {

    React.useEffect(() => {
        const hamburger = document.querySelector(".hamburger");
        const welcome = document.querySelector(".welcome-page");

        hamburger.addEventListener("click", toggleMenu);

        function toggleMenu() {
            hamburger.classList.toggle("active")
            welcome.classList.toggle("active")
        }
    })
    return (
        <div>
            <section className="welcome-page">
                <header>
                    <h2 className="logo">WeekendGetAway</h2>
                    {/* <img src={img} alt="" /> */}
                    <div className="hamburger">
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </header>

                <video src={video} muted loop autoPlay></video>

                <div className="overlay"></div>

                <div className="text">
                    <h2>Weekend</h2>
                    <h3>Getaway</h3>
                    <p>
                        Don't let your weekends slip, <br />
                        Let WeekendGetaway plan your trip.
                    </p>

                    <button className="explore" onClick={() => window.location.replace('/place')}>
                        explore
                    </button>

                </div>

                <ul className="social-media">
                    <li>
                        <i className="fab fa-facebook-f"></i>
                    </li>

                    <li>
                        <i className="fab fa-instagram"></i>
                    </li>

                    <li>
                        <i className="fab fa-twitter"></i>
                    </li>

                    <li>
                        <i className="fab fa-youtube"></i>
                    </li>
                </ul>
            </section>

            <div className="menu">
                <ul className="menu-menu">
                    <li className="menu-item">
                        <Link to={'/itinerary'} className="menu-link">
                            Book
                        </Link>
                    </li>
                    <li className="menu-item">
                        <Link to={'/login'} className="menu-link">
                            Login
                        </Link>
                    </li>
                    <li className="menu-item">
                        <Link to={'/register'} className="menu-link">
                            Register
                        </Link>
                    </li>
                </ul>
            </div>

        </div>
    )
}
export default WelcomePage;