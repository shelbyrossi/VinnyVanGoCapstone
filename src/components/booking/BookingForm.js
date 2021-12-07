import React, { useState } from "react"
import { useHistory } from "react-router-dom"


export const BookingForm = () => {
    // creating hook for transient state of Booking info
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
        // preventing default behavior of submiting ticket
        evt.preventDefault()
        const newBooking = {
            // from state to send to API
            name: booking.name,
            attendance: booking.attendance,
            event: booking.event,
            address: booking.address,
            email: booking.email,
            userId: parseInt(localStorage.getItem("vango_customer")),
            date: booking.date


        }

        // send above object to API
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBooking)
        }
        return fetch("http://localhost:8088/bookings", fetchOption)
            .then(() => {
                history.push("/bookingList")
                // programmatically changing url to bring user back to tickets
                // pushing to browser history
            })
    }


    return (
        <form className="BookingForm">
            <h2 className="bookingForm__title">Book Vinny Van-Go</h2>
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
                    <label htmlFor="name">I am planning an event and would like more information via email</label>
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



            <button onClick={submitBooking} className="btn btn-primary">

                Book!
            </button>
        </form>
    )
}