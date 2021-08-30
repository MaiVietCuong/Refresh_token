import React, { useContext, useEffect, useState } from 'react'
import { Globalstate } from '../../../GlobalState'
import Loading from '../../loading/Loading'
import Navbar from '../../main-navbar/Navbar';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './GetTrip.scss'
import TripDisplay from './TripDisplay';
import CuisineDisplay from './CuisineDisplay'
import axios from 'axios';
import AccommodationDisplay from './AccommodationDisplay';

const API = "https://capstone-tripplanner-back.herokuapp.com"

toast.configure()
export default function GetTrip({ placeLimit, startDate, endDate }) {
    const state = useContext(Globalstate)
    const [titleTrip, setTitleTrip] = useState('')
    const [loading, setLoading] = useState(false)

    //get date from api
    const [trip] = state.tripAPI.trips
    const [placeDATA] = state.haNoiPlaceAPI.hanoiplaces
    const [accommodationDATA] = state.accommodationAPI.accommodations
    const [cuisinesDATA] = state.cuisinesAPI.cuisines
    const [info] = state.userInfoAPI.info
    const [auth] = state.userInfoAPI.auth

    //fetch data
    const [placeDecrypt, setPlaceDecrypt] = useState([])
    const [lunch, setLunch] = useState([])
    const [dinner, setDinner] = useState([])
    const [accommodationDecrypt, setAccommodationDecrypt] = useState([])

    //calculate date
    const [currentDay, setCurrentDay] = useState(1)
    const [placesPerDay] = useState(3)
    const [cuisinesPerDay] = useState(1)
    const [sDate, setSDate] = useState(startDate)
    const [eDate, setEDate] = useState(endDate)
    const [scroll, setScroll] = useState(false)

    //cuisine
    const indexOfLastDayCuisine = currentDay * cuisinesPerDay
    const indexOfFirstDayCuisine = indexOfLastDayCuisine - cuisinesPerDay

    //day per page
    const indexOfLastDay = currentDay * placesPerDay;
    const indexOfFirstDay = indexOfLastDay - placesPerDay
    const totalDay = Math.ceil(placeDecrypt.length / placesPerDay)
    const gDate = new Date(sDate)

    const nextDay = () => {
        if (currentDay !== totalDay) {
            setCurrentDay(currentDay + 1)
            var i = gDate.valueOf() + 86400000
            setSDate(new Date(i).toLocaleDateString())
        }
    };

    const prevDay = () => {
        if (currentDay !== 1) {
            setCurrentDay(currentDay - 1)
            var i = gDate.valueOf() - 86400000
            setSDate(new Date(i).toLocaleDateString())
        }
    };

    const decrypt = () => {
        try {
            if (trip.length !== 0) {
                if (accommodationDATA && placeDATA) {
                    const tempDATA = [];
                    // const tempCuisine = [];
                    const lunch = []
                    const dinner = []
                    accommodationDATA.forEach(data => {
                        if (data.unique_point === trip.accommodations[0]) {
                            setAccommodationDecrypt(data)
                        }
                    })
                    cuisinesDATA.forEach(data => {
                        for (let i = 0; i < cuisinesDATA.length; i++) {
                            if (data.unique_point === trip.cuisines[i]) {
                                // tempCuisine.push(data)
                                if (data.category === 'lunch') lunch.push(data)
                                if (data.category === 'dinner') dinner.push(data)
                            }
                        }
                    })
                    placeDATA.forEach(data => {
                        for (let i = 0; i < placeLimit; i++) {
                            if (data.unique_point === trip.places[i]) {
                                tempDATA.push(data)
                            }
                        }
                    })
                    setPlaceDecrypt(tempDATA)
                    setLunch(lunch)
                    setDinner(dinner)
                    // setCuisinesDecrypt(tempCuisine)
                }
            }
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }

    const windowReload = () => {
        window.location.reload()
        window.sessionStorage.clear()
    }

    const windowScroll = () => {
        window.addEventListener("scroll", () => {
            if (window.scrollY >= 450) {
                setScroll(true)
            } else {
                setScroll(false)
            }
        })
    }

    const handleAddTrip = async (e, res) => {
        e.preventDefault()
        try {
            setLoading(true)
            await axios.post(`${API}/trips`, {
                title: titleTrip,
                user_id: info.id,
                startDate: new Date(sDate).toISOString(),
                endDate: new Date(eDate).toISOString(),
                accommodations: trip.accommodations,
                cuisines: trip.cuisines,
                places: trip.places,
                totalPrice: trip.totalPrice
            })

            toast.success(`Successfully add ${titleTrip} to user ${info.firstName} ${info.lastName}`)
            setLoading(false)

        } catch (error) {
            toast.error(error.response.data.msg)
            setLoading(false)
        }
    }
    // console.log(trip);

    useEffect(() => {
        //function
        decrypt()
        windowScroll()

        //sessionStorage
        if (JSON.parse(window.sessionStorage.getItem('startDate'))) {
            setSDate(JSON.parse(window.sessionStorage.getItem('startDate')))
        }
        if (JSON.parse(window.sessionStorage.getItem('endDate'))) {
            setEDate(JSON.parse(window.sessionStorage.getItem('endDate')))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trip])

    return (
        <>
            {placeDecrypt.length === 0 ? (
                <Loading />
            ) : (
                <div className="main-places-display">
                    {loading && <Loading />}
                    <div className="row">
                        <div className="column left">
                            <div className="top">
                                <div className="navbar">
                                    <Navbar />
                                </div>
                                <div className="img-text">
                                    <img src="https://news.mogi.vn/wp-content/uploads/2020/05/ban-do-quy-hoach-ha-noi-anh-bia.jpg" alt="accommodation" />
                                    <div className="text">
                                        <div className="tripinfo trip-name">
                                            <label>Trip's Name: </label>
                                            <input type="text" placeholder='Your trip name'
                                                name='titleTrip' required autoComplete='on'
                                                value={titleTrip} onChange={e => setTitleTrip(e.target.value)}
                                            />
                                        </div>

                                        <div className="tripinfo startDate">
                                            <label>Start date: </label>
                                            <p>{sDate}</p>
                                        </div>
                                        <div className="tripinfo endDate">
                                            <label>End date: </label>
                                            <p>{eDate}</p>
                                        </div>
                                        <div className="tripinfo total-price">
                                            <label>Budget:</label>
                                            <p>${trip.totalPrice}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="button">
                                <button className="btn back" onClick={windowReload}>
                                    <i className="fas fa-chevron-left"></i> back
                                </button>

                                {auth ? (
                                    <button className="btn save" onClick={handleAddTrip}>
                                        <i className="fas fa-save"></i> save
                                    </button>
                                ) : (
                                    <button className="btn save" onClick={() => toast.warn('Please Login or Register to save your trip.')}>
                                        <i className="fas fa-save"></i> save
                                    </button>
                                )}

                            </div>

                            <div className="place-display-by-day">
                                <div className={scroll ? "nav-date go-in" : "nav-date go-out"} >
                                    <button onClick={prevDay}>
                                        <i className="fas fa-angle-left"></i>
                                    </button>

                                    <span>{sDate}</span>

                                    <button onClick={nextDay}>
                                        <i className="fas fa-angle-right"></i>
                                    </button>
                                </div>

                                <div className="trip-display">
                                    <div className="t-d accommodation">
                                        <AccommodationDisplay key={accommodationDecrypt.id}
                                            accom={accommodationDecrypt} scroll={scroll} />
                                    </div>

                                    <div className="t-d morning">
                                        <div className={scroll ? "trip-distance active" : "trip-distance"}>
                                            8:30am
                                        </div>
                                        <TripDisplay key={placeDecrypt[indexOfFirstDay].id} place={placeDecrypt[indexOfFirstDay]} />
                                    </div>

                                    <div className="t-d lunch">
                                        <div className={scroll ? "trip-distance active" : "trip-distance"}>
                                            11:30am
                                        </div>
                                        <CuisineDisplay key={lunch[indexOfFirstDayCuisine].id} cuisine={lunch[indexOfFirstDayCuisine]} />
                                    </div>

                                    <div className="t-d afternoon">
                                        <div className={scroll ? "trip-distance active" : "trip-distance"}>
                                            1:30pm
                                        </div>
                                        <TripDisplay key={placeDecrypt[indexOfFirstDay + 1].id} place={placeDecrypt[indexOfFirstDay + 1]} />
                                    </div>

                                    <div className="t-d afternoon">
                                        <div className={scroll ? "trip-distance active" : "trip-distance"}>
                                            4:30pm
                                        </div>
                                        <TripDisplay key={placeDecrypt[indexOfFirstDay + 2].id} place={placeDecrypt[indexOfFirstDay + 2]} />
                                    </div>

                                    <div className="t-d dinner">
                                        <div className={scroll ? "trip-distance active" : "trip-distance"}>
                                            6:30pm
                                        </div>
                                        <CuisineDisplay key={dinner[indexOfFirstDayCuisine].id} cuisine={dinner[indexOfFirstDayCuisine]} />
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div className="column right">
                            map here
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
