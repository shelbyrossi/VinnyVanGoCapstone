import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { MaterialsForm } from "./MaterialsForm";
import "./Form.css"



export const GalleryForm = () => {
    // creating hook for transient state of works and choices of materials
    const [mChoice, setmChoice] = useState({
        chosenMaterials: new Set()
    })
    const [works, newWork] = useState({
        title: "",
        userId: parseInt(localStorage.getItem("vango_customer")),
        imageUrl: "",
        description: ""



    });


    const history = useHistory()


    const setMaterials = (id) => {
        // Does the set contain the id?
        // Ternary statement
           mChoice.chosenMaterials.has(id)
            ?mChoice.chosenMaterials.delete(id)  // Yes? Remove it
            :mChoice.chosenMaterials.add(id)     // No? Add it
    }


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
            body: JSON.stringify(newSubmission)
        }



    
        return fetch("http://localhost:8088/works", fetchOption)
            .then(response => {
                return response.json();
                // returning response of fetch - new state object with id
            })
            // pass above data through createMaterialChoice function
            .then((data) => {
            createMaterialChoice(data)
            })

            .then(() => {
                history.push("/Gallery")
                // programmatically changing url to bring user back to tickets
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
                        // remove all choices
                        mChoice.chosenMaterials.clear()
                    }
                    )
                    
                }
            
        )
            }


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
                    <fieldset>
                        <div class="form-group">
                            <label htmlFor="text"></label>
                            <input
                                required autoFocus
                                type="text"
                                class="form-control"

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