import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import "./Booking.css"


export const BookingForm = () => {
    // creating hook for transient state object of Booking info
    // defining state as booking and the setter function as makeBooking 
    // storing all in UseState Object
    const [booking, makeBooking] = useState({
        name: "",
        date: parseInt("12/05/21"),
        address: "",
        email: "",
        attendance: 1,
        event: false,
        userId: parseInt(localStorage.getItem("vango_customer"))
    });


    const history = useHistory()

    const submitBooking = (evt) => {
        // preventing default behavior of submiting booking
        evt.preventDefault()
        const newBooking = {
            // using this object from state to send to API
            name: booking.name,
            attendance: booking.attendance,
            event: booking.event,
            address: booking.address,
            email: booking.email,
            userId: parseInt(localStorage.getItem("vango_customer")),
            date: booking.date


        }

        // posting new object to Bookings array in API 
       
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // passing through newBooking object for POST 
            body: JSON.stringify(newBooking)
        }
        // returning updated object and POSTING to API with the fetchOption
        return fetch("http://localhost:8088/bookings", fetchOption)
            .then(() => {
                history.push("/bookingList")
                // programmatically changing url to bring user back to bookingList
                // pushing to browser history
            })
    }


    return (
        <center><form className="BookingForm">
            <h2 className="bookingForm__title">BOOK VINNY VAN-GO</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name"></label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Provide Name"
                        // copying existing state with spread operator
                        // brand new object to modify state 
                        // updated when user interacts 
                        onChange={
                            (evt) => {

                                const copy = { ...booking }
                                copy.name = evt.target.value
                                makeBooking(copy)

                            }
                        }

                    />

                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address"></label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Provide Address"
                        // copying existing state for state object that is updated when user interacts
                        onChange={
                            (evt) => {
                                const copy = { ...booking }
                                copy.address = evt.target.value
                                makeBooking(copy)
                            }
                        }

                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="email"></label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Provide Contact Email"
                        // copying existing state for state object that is updated when user interacts
                        onChange={
                            (evt) => {
                                const copy = { ...booking }
                                copy.email = evt.target.value
                                makeBooking(copy)
                            }
                        }

                    />
                </div>
            </fieldset>
            <fieldset>
            <div className="form-group">
                    <label htmlFor="name"></label>
                    <input type="date"
                   
                    
                        // copying existing state for state object that is updated when user interacts
                        onChange={
                            (evt) => {
                                const copy = { ...booking }
                                copy.date = evt.target.value
                                makeBooking(copy)
                            }
                        }
                        type="date" />
                     
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                   <div className="event" htmlFor="name">I am planning an event and would like more information via email</div>
                    <input type="checkbox"
                        // copying existing state for state object that is updated when user interacts
                        onChange={
                            (evt) => {
                                const copy = { ...booking }
                                copy.event = evt.target.checked
                                makeBooking(copy)
                            }
                        }
                        type="checkbox" />
            <fieldset>
                <div className="form-group">
                    <label htmlFor="attendance"></label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Provide Attendance Count "
                        // copying existing state for state object that is updated when user interacts
                        onChange={
                            (evt) => {
                                // copy object and booking object copying booking state 
                                // booking copy object now has attendance value of input 
                                // setting booking state 
                                const copy = { ...booking }
                                copy.attendance= parseInt(evt.target.value)
                                makeBooking(copy)
                            }
                        }

                    />
                </div>
            </fieldset>

                </div>
            </fieldset>



            <button onClick={submitBooking} className="button">

                Book!
            </button>
        </form>
        </center>
    )
}