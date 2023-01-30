import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'
import axios from 'axios'

export default function AddOrder() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({})
    const [error, setError] = useState(null)
    const [user, setUser] = useState({})

    // handle change
    const handleChange = (e) => {
        e.preventDefault();
        if(e.target.name == 'phone_number') {
            e.target.value =  e.target.value.slice(0, 10)
        }
        setFormData({...formData, [e.target.name] : e.target.value});
    }

    // handle submit 
    const handleSubmit = (e) => {
        e.preventDefault();

        const token = sessionStorage.getItem('token')
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }

        axios.post('/add-order', formData, config)
        .then((res) => {
            navigate('/dashboard')
            setError(null)
        }).catch((err) => {
            setError('Error occurred, please check and try again')
        })
    }

    // get user
    const getUser = () => {
        const token = sessionStorage.getItem('token')
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
        axios.get('/me', config)
        .then((res) => {
            setUser(res.data)
        })
    }

    useEffect(() => {
        getUser();
    }, [])
    return (
        <>
            {/* header */}
            <Header user={user}/>

            {/* main form */}
            <div className="add-order min-h-screen py-12 flex items-center justify-center">
                <div className="h-full md:h-auto mx-auto">
                    <div className="form p-4 mb-5 bg-white shadow-lg border border-gray-300 rounded-lg min-w-[380px]">
                        <p className="text-center font-bold text-2xl pb-5">Add Order</p>
                        {error && (
                            <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                {error}
                            </div>
                        )}
                            <form onSubmit={handleSubmit} method="POST" id="signupForm">
                                <div className="form-group mb-4">
                                    <input type="text" placeholder="Sub Total" className="text-lg border border-gray-200 focus:outline-none focus:border-blue-500 block p-3 rounded w-full" name="sub_total" onChange={(e) => {handleChange(e)}} />
                                </div>
                                <div className="form-group mb-4">
                                    <input type="text" placeholder="Phone Number" className="text-lg border border-gray-200 focus:outline-none focus:border-blue-500 block p-3 rounded w-full" name="phone_number" onChange={(e) => {handleChange(e)}} />
                                </div>
                                <div className="form-group mb-4">
                                    <button className="w-full rounded p-3 bg-blue-500 text-white text-xl font-bold" type="submit">Add Order</button>
                                </div>
                            </form>               
                        </div>
                </div>
            </div>
        </>
    )
}
