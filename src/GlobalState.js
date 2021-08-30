import React, { createContext, useEffect, useState } from 'react'
import HaNoiPlaceAPI from "./components/api/HaNoiPlaceAPI";
import AccommodationAPI from './components/api/AccommodationAPI';
import TripAPI from './components/api/TripAPI';
import UserInfoAPI from './components/api/UserInfoAPI';
import axios from 'axios';
import CuisinesAPI from './components/api/CuisinesAPI';
import InterestAPI from './components/api/InterestAPI';

export const Globalstate = createContext()

const API = 'https://capstone-tripplanner-back.herokuapp.com'

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false)

    // const refreshToken = async () => {
    //     const res = await fetch(`${API}/users/refresh_token`, {
    //         credentials: 'include'
    //     })
    //     const data = await res.json()
    //     console.log(data);
    // }

    // useEffect(() => {
    //     const isLogin = localStorage.getItem('isLogin')
    //     if (isLogin) {
    //         refreshToken()
    //     }
    // }, [])

    useEffect(() => {
        const isLogin = localStorage.getItem('isLogin')
        const localtoken = localStorage.getItem('token')
        const expiry = localStorage.getItem('expiry')

        if (isLogin && localtoken && expiry) {
            const now = new Date()
            if (now.getTime() > expiry) {
                const logout = async () => {
                    await axios.get(`${API}/users/logout`)
                    localStorage.clear()
                    sessionStorage.clear()
                    window.location.replace('/login')
                    alert('Your login session has expired')
                }
                logout()
            }
            else setToken(localtoken)
        }
    }, [])

    const state = {
        token: [token, setToken],
        haNoiPlaceAPI: HaNoiPlaceAPI(),
        accommodationAPI: AccommodationAPI(),
        tripAPI: TripAPI(),
        cuisinesAPI: CuisinesAPI(),
        userInfoAPI: UserInfoAPI(token),
        interestAPI: InterestAPI()
    }

    return (
        <Globalstate.Provider value={state}>
            {children}
        </Globalstate.Provider>
    )
}
