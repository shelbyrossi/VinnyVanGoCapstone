import React from "react"
import { Route } from "react-router-dom"
import { BookingForm } from "./booking/BookingForm"
import { BookingList } from "./booking/Booking"
import {SingleBooking} from "./booking/SingleBooking"


// listens for change (click of hyperlink) and renders appropriate component 
export const ApplicationViews = () => {
    return (
        <>
            {/* when the url is customers, display CustomersList  */}
            <Route exact path="/bookingForm">
                {/* child */}
                <BookingForm />

            </Route>
        
            <Route exact path="/bookingList">
                {/* child */}
                <BookingList/>
            </Route>

            {/* when the url is bookings, display bookingsId- capturing after : and storing */}
            {/* bookingsId is the key bookings component! */}
            <Route exact path="/booking/:bookingId(\d+)">
                {/* child */}
                <SingleBooking/>
            </Route>            
         
           


        </>
    )
}

