import React from "react"
import { Route } from "react-router-dom"
import { BookingForm } from "./booking/BookingForm"
import { BookingList } from "./booking/Booking"
import {SingleBooking} from "./booking/SingleBooking"
import { MaterialsCatList } from "./theEar/TheEar"
import { GalleryForm } from "./gallery/GalleryForm"
import { ShowWorks } from "./gallery/Gallery"
import {MaterialsForm} from "./gallery/MaterialsForm"
import { ShowMaterials } from "./theEar/Materials"
import {MainPage} from './Main.js'
import { MaterialChoices } from "./gallery/MaterialChoices"


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

            <Route exact path="/theEar">
                {/* child */}
                <MaterialsCatList/>
            </Route>

            <Route exact path="/GalleryForm">
                {/* child */}
                <GalleryForm/>
            </Route>

            <Route exact path="/Gallery">
                {/* child */}
                <ShowWorks/>
            </Route>

            <Route exact path="/materialCategory/:materialsId(\d+)">
                {/* child */}
                <ShowMaterials/>
            </Route>
            <Route exact path="/materialChoices">
                {/* child */}
                <MaterialChoices/>
            </Route>

            <Route exact path="/main">
                {/* child */}
                <MainPage/>
            </Route>
            
            
         

            {/* when the url is bookings, display bookingsId- capturing after : and storing */}
            {/* bookingsId is the key bookings component! */}
            <Route exact path="/MaterialsForm">
                {/* child */}
                <MaterialsForm/>
            </Route>  
         
           


        </>
    )
}

