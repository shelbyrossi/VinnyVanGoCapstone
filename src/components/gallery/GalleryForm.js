import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { MaterialsForm } from "./MaterialsForm";
import "./Form.css"



export const GalleryForm = () => {
    // creating hook for transient state of works and choices of materials
    const [mChoice, setmChoice] = useState({
        // capturing the chosen Ids in new Set()
        chosenMaterials: new Set()
    })
    // creating hook for transient state of works info
    const [works, newWork] = useState({
        title: "",
        userId: parseInt(localStorage.getItem("vango_customer")),
        imageUrl: "",
        description: ""



    });


    const history = useHistory()



    const submitWork = (evt) => {
        // preventing default behavior of submiting works
        evt.preventDefault()
        const newSubmission = {
            // from state to send to API
            title: works.title,
            userId: parseInt(localStorage.getItem("vango_customer")),
            imageUrl: works.imageUrl,
            description: works.description



        }


        // send above object to API
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
             // passing through newSubmission object for POST 
            body: JSON.stringify(newSubmission)
        }



    // // returning updated object and POSTING to API with the fetchOption
        return fetch("http://localhost:8088/works", fetchOption)
            .then(response => {
                return response.json();
                // returning response of fetch - new state object
            })
            // pass above data through createMaterialChoice function
            .then((data) => {
            createMaterialChoice(data)
            })

            .then(() => {
                history.push("/Gallery")
                // programmatically changing url to bring user back to Gallery
                // pushing to browser history
            })
    }



    const createMaterialChoice = (work) => {
        const fetchArray = []
        // fetchArray - new array for all promises 
        // posting each choice in the chosenMaterials object in the worksMaterials resource
        mChoice.chosenMaterials.forEach(
            (chosenMaterialsId) => {
                /// pushing a promise to fetchArray
                fetchArray.push(
                    fetch("http://localhost:8088/worksMaterials", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            // chosentMaterialsId - Id in the new set() 
                            materialsId: chosenMaterialsId,
                            workId: work.id
                            
                        })
                        
                    })
                )
            
                
                // This is where all the fetches (Promises) all run and resolve
                Promise.all(fetchArray)
                .then(
                    () => {
                        // remove all choices upon resolve
                        mChoice.chosenMaterials.clear()
                    }
                    )
                    
                }
            
        )
            }


    return (
        <>
            <div className="GalleryForm">


                <form className="GalleryForm"><center>
                    <div className="GalleryForm__title">SUBMIT YOUR ART</div>

                    <img className="paintIcon" src="https://www.svgrepo.com/show/181820/canvas-paint.svg"/>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="name"></label>
                            <input
                                required autoFocus
                                type="text"
                                className="form-control"
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
                        <div className="form-group">
                            <label htmlFor="url"></label>
                            <input
                                required autoFocus
                                type="url"
                                className="form-control"

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
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="text"></label>
                            <input
                                required autoFocus
                                type="text"
                                className="form-control"

                                placeholder="Add a Description"
                                // copying existing state for state object that is updated when user interacts
                                onChange={
                                    (evt) => {
                                        const copy = { ...works }
                                        copy.description = evt.target.value
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