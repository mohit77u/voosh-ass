import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios' 

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({})
    const [error, setError] = useState([])

    // handle change
    const handleChange = (e) => {
        e.preventDefault();
        setFormData({...formData, [e.target.name] : e.target.value});
    }

    // handle submit 
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/login-user', formData)
        .then((res) => {
            const token = res.data.token
            sessionStorage.setItem('token', token)
            navigate('/dashboard')
        }).catch((err) => {
            setError(err.response.data)
        })
    }
    return (
        <>
            <div className="login min-h-screen py-12 flex items-center justify-center">
                <div className="h-full md:h-auto mx-auto">
                    <div className="form p-4 mb-5 bg-white shadow-lg border border-gray-300 rounded-lg min-w-[380px]">
                        <p className="text-center font-bold text-2xl pb-5">Sign In</p>
                            <form onSubmit={handleSubmit} method="POST" id="loginForm">
                                <div className="form-group mb-4">
                                    <input type="text" placeholder="Phone Number" className="text-lg border border-gray-200 focus:outline-none focus:border-blue-500 block p-3 rounded w-full" name="phone_number" onChange={(e) => {handleChange(e)}} />

                                    {error.phone_number && (
                                        <span className='text-red-500 text-sm my-2'>{error.phone_number}</span>
                                    )}
                                </div>
                                <div className="form-group mb-4">
                                    <input type="password" placeholder="Password" className="text-lg border border-gray-200 p-3 focus:outline-none block focus:border-blue-500 rounded w-full" name="password" onChange={(e) => {handleChange(e)}} />
                                    {error.password && (
                                        <span className='text-red-500 text-sm my-2'>{error.password}</span>
                                    )}
                                </div>
                                <div className="form-group mb-4">
                                    <button className="w-full rounded p-3 bg-blue-500 text-white text-xl font-bold" type="submit">Log In</button>
                                </div>
                            </form>
                            <p className="text-center my-5">
                                <Link to="/add-user" className="text-blue-500 font-bold text-sm">Sign Up</Link>
                            </p>                 
                        </div>
                </div>
            </div>
        </>
    )
}
