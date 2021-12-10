import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import "./Booking.css"

export const SingleBooking = () => {
    const [booking, updateBooking] = useState ({})
    const { bookingId } = useParams()  // Variable storing the route parameter
  

        useEffect(
            () => {
                fetch(`http://localhost:8088/bookings/${bookingId}`)
                    .then(res => res.json())
                    .then(updateBooking)
            },
            [ bookingId]  // Above function runs when the value of ticketId change
        )
    
        return (
            <><center>
            <div class="singleBook">
                <section className="booking">
                    <h3 className="booking__description">{booking.name} has a booking for <i>Vinny Van-Go</i> to arrive at {booking.address} on {booking.date} for a party of {booking.attendance}, see you then!</h3> 
                </section>
                </div>
                </center>
            </>

        )
    }