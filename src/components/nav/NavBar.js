import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

// PRESENTATION COMPONENT - DIRECTLY EXPRESSES HTML

export const NavBar = () => {
    return (
        <ul className="navbar">
            <li className="navbar_item active">
                {/* link component 1 job: generate anchor tags 
               "to" attribute renders hyperlink to your DOM when clicked/change url in browser*/}
                <Link className="navbar_link" to="/bookingForm">Booking Form</Link>

            </li>
               <li className="navbar_item active">
                {/* link component 1 job: generate anchor tags 
               "to" attribute renders hyperlink to your DOM when clicked/change url in browser*/}
                <Link className="navbar_link" to="/bookingList">Your Bookings</Link>

            </li>

           <li className="navbar_item active">
                {/* link component 1 job: generate anchor tags 
               "to" attribute renders hyperlink to your DOM when clicked/change url in browser*/}
                <Link className="navbar_link" to="/theEar">THE EAR Newsletter</Link>

            </li>
            <li className="navbar_item active">
                {/* link component 1 job: generate anchor tags 
               "to" attribute renders hyperlink to your DOM when clicked/change url in browser*/}
                <Link className="navbar_link" to="/theEar">Gallery</Link>

            </li>


            <li className="navbar_item">
                {/* when Logout is clicked, removes key value pair */}
                <Link className="navbar_link" to="#"
                    onClick={
                        () => {
                            localStorage.removeItem("vango_customer")
                        }
                    }>Logout</Link>
            </li>


        </ul>

    )
                }