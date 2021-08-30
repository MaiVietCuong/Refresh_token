import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Globalstate } from '../../../GlobalState'

export default function AccommodationDetail(props) {
    const state = useContext(Globalstate)
    const [accoms] = state.accommodationAPI.accommodations
    const [accom, setAccom] = useState([])
    const param = useParams()

    useEffect(() => {
        if (param.id) {
            accoms.forEach(data => {
                if (data.id == param.id) {
                    setAccom(data)
                }
            })
        }
    }, [param.id, accoms])

    return (
        <>

        </>
    )
}
