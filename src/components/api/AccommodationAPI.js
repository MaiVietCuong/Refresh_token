import axios from 'axios'
import { useEffect, useState } from 'react'

const API = 'https://capstone-tripplanner-back.herokuapp.com'

export default function AccommodationAPI(props) {
    const [accommodations, setAccommodations] = useState([])
    const [callback, setCallBack] = useState(false)

    const getAccommodations = async () => {
        const res = await axios.get(`${API}/accommodations`)
        setAccommodations(res.data.data);
    }

    useEffect(() => {
        getAccommodations()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [callback])

    return {
        accommodations: [accommodations, setAccommodations],
        callback: [callback, setCallBack]
    }
}
