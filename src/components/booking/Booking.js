import React, { useEffect, useState } from "react"
import "./Booking.css"
import { Link } from "react-router-dom"


export const BookingList = () => {
    // declaring "bookings" that defines state
    // declaring "updateBookings" that defines function that will modify state/set value of bookings
    // useState passes a value as argument and returnes ARRAY WHEN INVOKED
    const [bookings, updateBookings] = useState([])


   
    useEffect(() => { fetchBookings() }, [])



    const fetchBookings = () => {
        return fetch("http://localhost:8088/bookings")
           // fetching data from the API and parsing into application state
            .then(res => res.json())
            // you have a response of final array of bookings defined in line 10
            .then((data) => {
                 // data = response from the fetch, setting that response with updateBookings
                updateBookings(data)

            })
    }



    const deleteBooking = (id) => {
        fetch(`http://localhost:8088/bookings/${id}`, {
            method: "DELETE"
        })
        // after delete, GET all of the bookings again to render the new state 
            .then(
                () => { fetchBookings() }
            )
    }





    // iterate through bookings array - if vango_customer value = the value of your userId in the bookings array,
    // return that user's information

    return (
        <>

            <center><div class="bookingTitle"> YOUR BOOKINGS</div>

            <img class="bookIcon" src="https://static.vecteezy.com/system/resources/previews/001/486/411/non_2x/open-book-icon-free-vector.jpg"/>

                {
                    
                    bookings.map(
                        (booking) => {
                            return parseInt(localStorage.getItem("vango_customer")) === booking.userId
                                ?

                                <div key={`booking--${booking.id}`} >
                                    <p className={booking.id}>
                                        <div class="bookingList">
                                                        {/* setting a link on "new" to route to the individual booking associated with that bookingId */}
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

