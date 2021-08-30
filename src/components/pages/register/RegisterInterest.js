import React, { useContext } from 'react'
import { Globalstate } from '../../../GlobalState'
import Navbar from '../../main-navbar/Navbar'
import Loading from '../../loading/Loading'
import axios from 'axios'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './RegisterInterest.scss'

const API = 'https://capstone-tripplanner-back.herokuapp.com'

toast.configure()
export default function RegisterInterest(props) {
    const state = useContext(Globalstate)
    const [token] = state.token
    const [auth] = state.userInfoAPI.auth
    const [interest] = state.interestAPI.interests

    const handleInterest = async (e) => {
        try {
            if (!auth) return toast.warning("Please register.")
            if (!token) return toast.warning("No token provided.")

            if (e.target.checked === true) {
                await axios.post(`${API}/users/interests`, {
                    interests: e.target.value
                }, {
                    headers: { Authorization: token }
                })
            } else {
                await axios.post(`${API}/users/interests/destroyer`, {
                    interests: e.target.value
                }, {
                    headers: { Authorization: token }
                })
            }

        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }

    return (
        <>
            <Navbar />
            <div className="register-interest">
                {interest.length === 0 && <Loading />}
                <div className="section interest">
                    {interest.map(p => (
                        <div className="interest-checkbox" key={p.id}>
                            <label className="image-interest" htmlFor={p.id}>
                                <img src={p.img} alt={p.img} />
                                <div className='toggle' htmlFor={p.id}>
                                    <p className="name">
                                        {p.name && p.name.substr(2)}
                                    </p>
                                    <input type="checkbox" name={p.name} id={p.id}
                                        value={p.id} disabled={!auth}
                                        onChange={handleInterest} />
                                    <div className="slider"></div>
                                </div>
                            </label>
                        </div>
                    ))}
                    <button className='finish-pick' onClick={() => window.location.replace('/')}>finish</button>
                </div>
            </div>
        </>
    )
}
