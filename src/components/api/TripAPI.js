import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'https://capstone-tripplanner-back.herokuapp.com'

function TripAPI() {
    const [trips, setTrip] = useState([])
    const [callback, setCallBack] = useState(false)
    const [placeParam, setPlaceParam] = useState([])
    const [placeLimit, setPlaceLimit] = useState(0)
    const [cuisineLimit, setCuisineLimit] = useState(0)


    const getTrip = async () => {
        if (placeLimit !== 0 && placeParam.length > 0 && cuisineLimit !== 0) {
            let placesArray = '?'
            for (let i = 0; i < placeParam.length; i++) {
                placesArray += `places=${placeParam[i]}&`
            }
            const res = await axios.get(`${API}/itineraries${placesArray}placeLimit=${placeLimit}&accommodations=isHomestay&accommodationLimit=10&cuisines=isVietnamese&cuisines=isWestern&cuisineLimit=${cuisineLimit}`)
            setTrip(res.data.data);
            // console.log(res);
        }
    }

    useEffect(() => {
        getTrip()

        if (JSON.parse(window.sessionStorage.getItem('placeParam'))) {
            setPlaceParam(JSON.parse(window.sessionStorage.getItem('placeParam').toString()))
        }
        if (JSON.parse(window.sessionStorage.getItem('placeLimit'))) {
            setPlaceLimit(window.sessionStorage.getItem('placeLimit'))
        }
        if (JSON.parse(window.sessionStorage.getItem('cuisineLimit'))) {
            setCuisineLimit(window.sessionStorage.getItem('cuisineLimit'))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [callback, placeLimit, cuisineLimit])

    return {
        trips: [trips, setTrip],
        callback: [callback, setCallBack],
        placeLimit: [placeLimit, setPlaceLimit],
        placeParam: [placeParam, setPlaceParam],
        cuisineLimit: [cuisineLimit, setCuisineLimit]
    }
}

export default TripAPI