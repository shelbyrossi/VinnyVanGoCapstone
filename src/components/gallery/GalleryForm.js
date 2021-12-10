
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { MaterialsForm } from "./MaterialsForm";
import "./Form.css"



export const GalleryForm = () => {
    // creating hook for transient state of Booking info

    const [worksMaterials, setWorksMaterials] = useState([])
    const [mChoice, setmChoice] = useState([])
    const [works, newWork] = useState({
        title: "",
        userId: parseInt(localStorage.getItem("vango_customer")),
        imageUrl: "",
        artist: ""
        
    });
    

    const history = useHistory()


    
    const submitWork = (evt) => {
        // preventing default behavior of submiting ticket
        evt.preventDefault()
        const newSubmission = {
            // from state to send to API
            title: works.title,
            userId: parseInt(localStorage.getItem("vango_customer")),
            imageUrl: works.imageUrl,
            artist: works.artist
         
            
            
        }
        
        // send above object to API
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newSubmission)
        }
       
              
        
        return fetch("http://localhost:8088/works", fetchOption)
            .then(response => {
                return response.json();
                // returning response of fetch - new state object with id
            })
            .then((data)=> {
                const secondId = data.id
                // had here let secondId = data.id but didn't know where to call it ?
                return fetch("http://localhost:8088/worksMaterials", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify( {
                         worksId: secondId,
                         materialsId: mChoice
                     }
                     )
                })
            })
            // ^trying to capture that id from the above response and fetching join table array (worksMaterials) to post
    
                .then(() => {
                    history.push("/Gallery")
                    // programmatically changing url to bring user back to tickets
                    // pushing to browser history
                })
        }
       
            
    
    


    // extract id from response
    // access to checkbox selections



    return (
        <>
            <div class="GalleryForm">


                <form className="GalleryForm"><center>
                    <div class="GalleryForm__title">SUBMIT YOUR ART</div>
                    <fieldset>
                        <div class="form-group">
                            <label htmlFor="name"></label>
                            <input
                                required autoFocus
                                type="text"
                                class="form-control"
                                placeholder="Provide Title"
                                // copying existing state with spread operator
                                // brand new object to modify state 
                                // updated when user interacts 
                                onChange={
                                    (evt) => {

                                        const copy = { ...works }
                                        copy.title = evt.target.value
                                        newWork(copy)

                                    }
                                }

                            />

                        </div>
                    </fieldset>
                    <fieldset>
                        <div class="form-group">
                            <label htmlFor="name"></label>
                            <input
                                required autoFocus
                                type="text"
                                class="form-control"
                                placeholder="Provide Artist Name"
                                // copying existing state with spread operator
                                // brand new object to modify state 
                                // updated when user interacts 
                                onChange={
                                    (evt) => {

                                        const copy = { ...works }
                                        copy.artist= evt.target.value
                                        newWork(copy)

                                    }
                                }

                            />

                        </div>
                    </fieldset>
                    <fieldset>
                        <div class="form-group">
                            <label htmlFor="url"></label>
                            <input
                                required autoFocus
                                type="url"
                                class="form-control"

                                placeholder="Provide Url to Art"
                                // copying existing state for state object that is updated when user interacts
                                onChange={
                                    (evt) => {
                                        const copy = { ...works }
                                        copy.imageUrl = evt.target.value
                                        newWork(copy)
                                    }
                                }

                            />
                        </div>
                    </fieldset>


                    {/* child component of gallery form */}
                    <MaterialsForm mChoice={mChoice} setmChoice={setmChoice} /><p>


                        <button onClick={submitWork} className="button">

                            Post
                        </button></p></center>
                </form>
            </div>
        </>
    )
}