import React, { useEffect, useState } from "react"
import "./Materials.css"

// allows access to values in gallery form - what did user select
export const ImageForm = () => {
    const [images, updateImage] = useState({

        url: "",
        worksId: 1

    });




    const submitImage = (evt) => {
        evt.preventDefault()
        const newImage = {

            url: images,
            worksId: images.worksId,




        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newImage)
        }
        return fetch("http://localhost:8088/images?_expand=works", fetchOption)
            .then(() => {

            })
    }





    return (
        //  <> Fragment - putting all return elements into one JXS element 
        <>
            <fieldset>
                <div class="form-group">
                    <label htmlFor="name"></label>
                    <input
                        required autoFocus
                        type="text"
                        class="form-control"
                        placeholder="Provide Url"
                        // copying existing state with spread operator
                        // brand new object to modify state 
                        // updated when user interacts 
                        onChange={
                            (evt) => {

                                const copy = { ...images }
                                copy.url = evt.target.value
                                updateImage(copy)

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
                        placeholder="Have a Second URL?"
                        // copying existing state with spread operator
                        // brand new object to modify state 
                        // updated when user interacts 
                        onChange={
                            (evt) => {

                                const copy = { ...images }
                                copy.url = evt.target.value
                                updateImage(copy)

                            }
                        }

                    />

                </div>
            </fieldset>

        </>
    )
}
