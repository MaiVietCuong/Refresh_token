import axios from 'axios'
import { useEffect, useState } from 'react'

const API = 'https://capstone-tripplanner-back.herokuapp.com'

export default function CuisinesAPI(props) {
    const [cuisines, setCuisines] = useState([])
    const [callback, setCallback] = useState(false)

    const getCuisines = async () => {
        const res = await axios.get(`${API}/cuisines`)
        setCuisines(res.data.data);
    }

    useEffect(() => {
        getCuisines()
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [callback])
    return {
        cuisines: [cuisines, setCuisines],
        callback: [callback, setCallback]
    }
}
