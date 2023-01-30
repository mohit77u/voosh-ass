import React, {useState, useEffect} from 'react'
import Header from '../components/Header'
import axios from 'axios'
import Moment from 'react-moment';


export default function Dashboard() {
    const [user, setUser] = useState({})
    const [orders, setOrders] = useState([])
    // get user
    const token = sessionStorage.getItem('token')
    const config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    const getUser = () => {
        axios.get('/me', config)
        .then((res) => {
            setUser(res.data)
            getOrders(res.data._id)
        })
    }

    // get orders
    const getOrders = (id) => {
        axios.get('/get-order/' + id, config)
        .then((res) => {
            setOrders(res.data.data)
        })
    }


    useEffect(() => {
        getUser();
    }, [])
  return (
    <>
        {/* Header */}
        <Header user={user} />

        {/* main content */}
        
        <section className="orders my-5">
            <div className="container lg:w-10/12 w-full px-2 mx-auto">
                <h2 className="text-slate-800 font-bold mb-5 text-2xl">
                    All Orders
                </h2>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Id
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    User Id
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Sub Total
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Phone Number
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? <>
                                {orders.map((order,index) => (
                                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={index}>
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {order._id}
                                        </th>
                                        <td class="px-6 py-4">
                                            {order.user_id}
                                        </td>
                                        <td class="px-6 py-4">
                                            {order.sub_total}
                                        </td>
                                        <td class="px-6 py-4">
                                            {order.phone_number}
                                        </td>
                                        <td class="px-6 py-4">
                                            <span class="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline">Delete</span>
                                        </td>
                                    </tr>
                                ))}
                            </> : <>
                                <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                    <td class="px-6 py-4 text-center" colSpan="5">
                                        No orders for this user
                                    </td>
                                </tr>
                            </>}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

    </>
  )
}
