import React, { useEffect, useState } from "react"
import "./Booking.css"
import { Link } from "react-router-dom"


export const BookingList = () => {
    // declaring "bookings" that defines state
    // declaring "updateBookings" that defines function that will modify state/set value of bookings
    // useState passes a value as argument and returnes ARRAY WHEN INVOKED
    const [bookings, updateBookings] = useState([])



    const fetchBookings = () => {
        return fetch("http://localhost:8088/bookings")
        // after fetching data, invoke function 
           .then(res => res.json())
              //taking json string and parsing into js 
            .then((data) => {
                 // data = bookings converted from string to array, setting that response with updateBookings
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
        
        // *LISTENING FOR STATE CHANGES AND REACTS*
         // takes a function and array as arguments & runs code when state changes (event listener)
        // when the state changes, fetch the bookings 
        useEffect(() => { fetchBookings() }, [])
        



    // iterate through bookings array - if vango_customer value = the value of your userId in the bookings array,
    // return that user's information

    return (
        <>

            <center><div className="bookingTitle"> YOUR BOOKINGS</div>

            <img className="bookIcon" src="https://static.vecteezy.com/system/resources/previews/001/486/411/non_2x/open-book-icon-free-vector.jpg"/>

                {
                    // iterating through bookings - if the logged in user = the userId on booking 
                    
                    bookings.map(
                        (booking) => {
                            return parseInt(localStorage.getItem("vango_customer")) === booking.userId
                                ?

                                <div key={`booking--${booking.id}`} >
                                 
                                        <div className="bookingList">
                                                        {/* setting a link on "new" to route to the individual booking associated with that bookingId */}
                                            You have a  <Link to={`/booking/${booking.id}`}>new</Link> booking for {booking.name} on {booking.date}!
                                        </div>
                                        <button className="button" onClick={() => {
                                            deleteBooking(booking.id)
                                        }}>Cancel My Booking</button>

                               

                                </div>
                                : <div></div>

                        }
                    )
                }
            </center>
        </>
    )
}

