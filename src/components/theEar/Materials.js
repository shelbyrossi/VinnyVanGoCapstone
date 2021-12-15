import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import "./MaterialsList.css"

export const ShowMaterials = () => {
    // declaring "categories" that defines state
    // declaring "setCategories" that defines function that will modify state/set value of categories
    // useState passes a value as argument and returnes ARRAY WHEN INVOKED
    const [categories, setCategories] = useState([])
    const [ materials, syncMaterials] = useState([])
    const {materialsCatId} = useParams()
    



    useEffect(
        // *LISTENING FOR STATE CHANGES AND REACTS*
        // takes a function and array as arguments & runs code when state changes (event listener)
        () => {
            // Query string parameter
            // Fetch the individual materials when the parameter value changes to id of specific material category
            fetch(`http://localhost:8088/materialCategory/${materialsCatId}`)
                // fetching data from the API and parsing into application state
                .then(res => res.json())           
                // you have final array of products defined in line 9
                .then(
                    (products) => {
                        setCategories(products)
                    }
                )
        },
        []
      
    )
    

    useEffect(
        () => {
            fetch(`http://localhost:8088/materials`)
                .then(res => res.json())
                .then(syncMaterials)
        },
        []  // Empty dependency array only reacts to JSX initial rendering
    )


        

    return (
        //  <> Fragment - putting all return elements into one JXS element 
        <>
            <center><div class="mTitle">CURRENTLY ON VINNY VAN GO</div>

            <div class="mList">
            {
               materials.map(
                    (option) => {
                        return option.materialCategoryId === categories.id
                            ?
                           

                            <div key={`option--${option.id}`} >
                                <p className={option.id}>

                                    {option.type} - $
                                    {option.price}


                                </p>
                                </div>
                            
                            : <div></div>

                    }
                )
            }
            </div>
            <div class="stock">Have a question or suggestion about materials? Shoot us an email at VinnyVanGo@gmail.com!</div>
            </center>

        </>

    )

}

