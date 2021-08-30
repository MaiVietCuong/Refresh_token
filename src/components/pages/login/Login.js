import axios from 'axios';
import React, { useContext, useState } from 'react'
import Loading from '../../loading/Loading';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './Login.scss'
import Navbar from '../../main-navbar/Navbar';
import { Globalstate } from '../../../GlobalState';
import NotFound from '../NotFound'

const API = 'https://capstone-tripplanner-back.herokuapp.com'

toast.configure()
export default function Login(props) {
    const state = useContext(Globalstate)
    const [token, setToken] = state.token
    const [auth] = state.userInfoAPI.auth
    // const [authAdmin] = state.userInfoAPI.authAdmin

    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)

    const onChangeValue = e => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    // const loginSubmit = async () => {
    //     fetch(`${API}/users/login`, {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ ...user }),
    //         credentials: 'include'
    //     })

    //     localStorage.setItem('isLogin', true)
    //     window.location.reload()
    // }

    const loginSubmit = async e => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post(`${API}/users/login`, { ...user })
            const expiry = new Date()

            localStorage.setItem('isLogin', true)
            localStorage.setItem('token', res.data.accessToken)
            setToken(res.data.accessToken)
            localStorage.setItem('expiry', expiry.getTime() + 25200000)

            setLoading(false)
            window.location.replace('/')

        } catch (error) {
            toast.error(error.response.data.msg)
            setLoading(false)
        }
    }

    return (
        <>
            {auth ? (
                <NotFound />
            ) : (
                <>
                    <Navbar />
                    <div className='login-page'>
                        {loading && <Loading />}

                        <form onSubmit={loginSubmit}>
                            <fieldset autoComplete='on' >
                                <legend>Login</legend>
                                <input type="email" name='email' placeholder='Email'
                                    value={user.email} onChange={onChangeValue}
                                    required />

                                <input type="password" name='password' placeholder='Password'
                                    value={user.password} onChange={onChangeValue}
                                    required />

                                <div className="button">
                                    <button type='submit'>Login</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </>
            )}

        </>

    )
}
