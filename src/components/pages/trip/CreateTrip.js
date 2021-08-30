import React, { useContext, useEffect, useState } from 'react'
import { Globalstate } from '../../../GlobalState'
import GetTrip from './GetTrip'
import Navbar from '../../main-navbar/Navbar'
import './CreateTrip.scss'
import Loading from '../../loading/Loading'

const initialState = {
    startDate: '',
    endDate: ''
}

export default function CreateTrip(props) {
    const state = useContext(Globalstate)
    const [callback, setCallBack] = state.tripAPI.callback
    const [placeLimit, setPlaceLimit] = state.tripAPI.placeLimit
    const [placeParam, setPlaceParam] = state.tripAPI.placeParam
    const [cuisineLimit, setCuisineLimit] = state.tripAPI.cuisineLimit
    const [interest] = state.interestAPI.interests
    const [info] = state.userInfoAPI.info
    const [auth] = state.userInfoAPI.auth

    const [modal, setModal] = useState(initialState)

    const [finishCreateTrip, setFinishCreateTrip] = useState(false)
    const [changePage, setChangePage] = useState(false)
    const [toggle, setToggole] = useState(false)

    var currentDateTo_ISO_String = new Date()
    var i = currentDateTo_ISO_String.valueOf() + 86400000
    currentDateTo_ISO_String = new Date(i)

    const calculateDateLength = () => {
        var startDate = new Date(modal.startDate)
        var endDate = new Date(modal.endDate)
        var different_in_time = endDate - startDate// number of days in second
        var different_in_days = different_in_time / (1000 * 3600 * 24) + 1 //number of days in day
        var placeLimit = different_in_days * 3 // three places per day

        setPlaceLimit(placeLimit)
        setCuisineLimit(different_in_days) //because 2 meals per day
        return 0
    }

    const saveSessionStorage = () => {
        if (modal.startDate !== '' && modal.endDate !== '') {
            window.sessionStorage.setItem('startDate', JSON.stringify(modal.startDate))
            window.sessionStorage.setItem('endDate', JSON.stringify(modal.endDate))
        }
        window.sessionStorage.setItem('placeParam', JSON.stringify(placeParam))
        window.sessionStorage.setItem('placeLimit', JSON.stringify(placeLimit))
        window.sessionStorage.setItem('cuisineLimit', JSON.stringify(cuisineLimit))

        setCallBack(!callback)
        setChangePage(true)
    }

    const onChangeValue = e => {
        if (e.target.checked === true) {
            setPlaceParam([...placeParam, e.target.value])
        }
        else {
            const selectedValue = placeParam.filter(a => {
                if (a === e.target.value) return false;
                return true;
            })
            setPlaceParam([...selectedValue])
        }
    }

    const handleChange = e => {
        const { name, value } = e.target
        setModal({ ...modal, [name]: value })
    }

    useEffect(() => {
        //function
        calculateDateLength()

        if (modal.startDate !== '' && modal.endDate !== '') {
            setFinishCreateTrip(true)
        }

        //if login and user already chose the interests then execute func
        if (info.interests && info.interests.length > 0) {
            let tempInterests = []
            for (let i = 0; i < info.interests.length; i++) {
                tempInterests.push(info.interests[i].name)
                setPlaceParam(tempInterests);
            }
        }

        //sessionStorage
        if (JSON.parse(window.sessionStorage.getItem('placeParam')) &&
            JSON.parse(window.sessionStorage.getItem('placeLimit')) &&
            JSON.parse(window.sessionStorage.getItem('startDate'))
        ) {
            setChangePage(true)
            setCallBack(!callback)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modal.startDate, modal.endDate])

    return (
        <div className='trip-page'>
            {changePage ? (
                <div className="get-trip">
                    <GetTrip placeLimit={placeLimit}
                        startDate={modal.startDate}
                        endDate={modal.endDate}
                    />
                </div>
            ) : (
                <>
                    <Navbar />
                    <div className="create-trip">
                        {interest.length === 0 && <Loading />}
                        {!auth && (
                            <div className={toggle ? "section interest active" : "section interest"}>
                                {interest.map(p => (
                                    <div className="interest-checkbox" key={p.id}>
                                        <label className="image-interest" htmlFor={p.id}>
                                            <img src={p.img} alt={p.img} />
                                            <div className='toggle' htmlFor={p.id}>
                                                <p className="name">
                                                    {p.name && p.name.substr(2)}
                                                </p>
                                                <input type="checkbox" name={p.name} id={p.id}
                                                    value={p.name}
                                                    onChange={onChangeValue} />
                                                <div className="slider"></div>
                                            </div>
                                        </label>
                                    </div>
                                ))}
                                <button className='next-to-date' onClick={() => setToggole(true)}>next</button>
                            </div>
                        )}

                        <div className="section other">
                            <input type="date" name="startDate" id="startDate"
                                value={modal.startDate} onChange={handleChange}
                                min={currentDateTo_ISO_String.toISOString().split('T')[0]}
                                required />

                            <input type="date" name="endDate" id="endDate"
                                value={modal.endDate} onChange={handleChange}
                                disabled={!modal.startDate}
                                min={modal.startDate}
                                required />

                            <button type='submit' disabled={!finishCreateTrip} onClick={saveSessionStorage}>ok</button>
                            <button className='next-to-date' onClick={() => setToggole(false)}>back</button>
                        </div>
                    </div>
                </>
            )}
        </div >
    )
}
