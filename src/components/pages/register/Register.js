import axios from 'axios';
import React, { useContext, useState } from 'react'
import Loading from '../../loading/Loading';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './Register.scss'
import Navbar from '../../main-navbar/Navbar';
import { Globalstate } from '../../../GlobalState';

const API = 'https://capstone-tripplanner-back.herokuapp.com'

toast.configure()
export default function Register(props) {
    const state = useContext(Globalstate)
    const [token, setToken] = state.token
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)

    const onChangeValue = e => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const registerSubmit = async e => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post(`${API}/users/register`, { ...user })
            const expiry = new Date()

            localStorage.setItem('isLogin', true)
            localStorage.setItem('token', res.data.accessToken)
            setToken(res.data.accessToken)
            localStorage.setItem('expiry', expiry.getTime() + 25200000)

            window.location.replace('/rInterest')
            setLoading(false)

        } catch (error) {
            toast.error(error.response.data.msg)
            setLoading(false)
        }
    }
    console.log(token);

    return (
        <>
            <Navbar />
            <div className='register-page'>
                {loading && <Loading />}
                <form onSubmit={registerSubmit}>
                    <fieldset autoComplete='on' >
                        <legend>Register</legend>
                        <input type="text" name='firstName' placeholder='First Name'
                            value={user.firstName} onChange={onChangeValue}
                            required />

                        <input type="text" name='lastName' placeholder='Last Name'
                            value={user.lastName} onChange={onChangeValue}
                            required />

                        <input type="email" name='email' placeholder='Email'
                            value={user.email} onChange={onChangeValue}
                            required />

                        <input type="password" name='password' placeholder='Password'
                            value={user.password} onChange={onChangeValue}
                            required />

                        <div className="button">
                            <button type='submit'>Register</button>
                        </div>
                    </fieldset>
                </form>

            </div>
        </>

    )
}
