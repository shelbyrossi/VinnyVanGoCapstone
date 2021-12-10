import React, { useEffect, useState } from "react"
import "./Booking.css"
import { Link } from "react-router-dom"


export const BookingList = () => {
    // declaring variable "employees" that defines state
    // declaring variable "assignemployees" that defines function that will modify state/set value of employees
    // useState passes a value as argument and returnes ARRAY WHEN INVOKED
    const [bookings, updateBookings] = useState([])


    useEffect(() => { fetchBookings() }, [])

    const fetchBookings = () => {
        return fetch("http://localhost:8088/bookings")
            // function that takes a function and array as arguments & runs code when state changes (event listener)
            .then(res => res.json())

            // you have final array of customers defined in line 7
            .then((data) => {
                //  // function established in state variable - single argument is new state/API state

                updateBookings(data)

            })
    }






    const deleteBooking = (id) => {
        fetch(`http://localhost:8088/bookings/${id}`, {
            method: "DELETE"
        })
            .then(
                () => { fetchBookings() }
            )
    }






    // iterate through bookings array - if vango_customer value = the value of your userId in the bookings array,
    // return that user's information


    return (
        <>

            <center><div class="bookingTitle"> YOUR BOOKINGS</div>
                {

                    bookings.map(
                        (booking) => {
                            return parseInt(localStorage.getItem("vango_customer")) === booking.userId
                                ?

                                <div key={`booking--${booking.id}`} >
                                    <p className={booking.id}>
                                        <div class="bookingList">

                                            You have a  <Link to={`/booking/${booking.id}`}>new</Link> booking for {booking.name} on {booking.date}!
                                        </div>
                                        <button className="button" onClick={() => {
                                            deleteBooking(booking.id)
                                        }}>Cancel My Booking</button>

                                    </p>

                                </div>
                                : <div></div>

                        }
                    )
                }
            </center>
        </>
    )
}

