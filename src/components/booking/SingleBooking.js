import React, { useEffect, useState } from "react"
import { useParams} from "react-router-dom"
import "./Booking.css"

export const SingleBooking = () => {
    // declaring "bookings" that defines state
    // declaring "updateBooking" that defines function that will modify state/set value of bookings
    // useState passes a value as argument and returnes ARRAY WHEN INVOKED
    const [booking, updateBooking] = useState ([])
    const { bookingId } = useParams()  // Variable storing the route parameter
  



    // *LISTENING FOR STATE CHANGES AND REACTS*
     // takes a function and array as arguments & runs code when state changes (event listener)
     // Fetch the individual booking when the parameter value changes
        useEffect(
            () => {
                fetch(`http://localhost:8088/bookings/${bookingId}`)
                  // fetching data from the API and parsing into application state
                    .then(res => res.json())
                    // setting booking state
                    .then(updateBooking)
            },
            [bookingId]  // Above function runs when the value of bookingId changes
        )
    
        return (
            <><center>
      <img class="vanimage" src="https://cdn.icon-icons.com/icons2/2070/PNG/512/van_icon_125866.png" />
            <div class="singleBook">
                <section className="booking">
               
                    <div className="booking__description">{booking.name} has a booking for <i>Vinny Van-Go</i> to arrive at {booking.address} on {booking.date} for a party of {booking.attendance}, see you then!</div>
                </section>
                </div>
                </center>
            </>

        )
    }