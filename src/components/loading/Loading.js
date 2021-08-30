import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './Loading.scss';

toast.configure()
export default function Loading(props) {
    const [timer, setTimer] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setTimer(!timer)
        }, 1000 * 50)
        return () => clearTimeout(timeout)
    }, [timer])

    return (
        <>
            {timer ? (
                <div className="timer">
                    {toast.error(`REQUEST TIME OUT !!! AUTOMATICALLY RELOAD IN FEW SEC`)}
                </div>
            ) : (
                <div className="position-fixed w-100 h-100 text-center loading">
                    <svg width="205" height='250' viewBox='0 0 40 50'>
                        <polygon strokeWidth='1' stroke='#fff' fill='none'
                            points='20,1 40,40 1,40'></polygon>
                        <text fill='#fff' x='5' y='47'>Loading</text>
                    </svg >
                </div >
            )}

        </>

    )
}
