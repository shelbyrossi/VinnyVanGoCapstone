import React, { useEffect, useState } from "react"

// passing props to Gallery.js
export const MaterialChoices = ({showMaterialChoice, setMaterialChoice, finishedWork}) => {
    const [materialChoices, setMaterialChoices] = useState([])
 



    useEffect(
        // *LISTENING FOR STATE CHANGES AND REACTS*
        // takes a function and array as arguments & runs code when state changes (event listener)
        () => {
            // Query string parameter
            fetch("http://localhost:8088/worksMaterials")
                // fetching data from the API and parsing into application state
                .then(res => res.json())

                // you have final array of materials
                .then(
                    (material) => {
                 
                      setMaterialChoices(material)
                    }
                )
        },
        // leave DEPENDANCY ARRAY empty, or infinite loop
        []
    )


    useEffect(
        // prop for title card for individual works on Gallery.js
        () => {
           setMaterialChoices(
               finishedWork
           )
        },
        // leave DEPENDANCY ARRAY empty, or infinite loop
        []
    )



    // finding material.id that equals the materialId on works 
 const foundMaterial = materialChoices.find(m=> m.id === finishedWork?.workId) 

    return (
        
        <>
        {/* calling foundUser in ternary, returning user.name if found */}
        {
         foundMaterial?.id ? <div>Materials Used: {foundMaterial.type}</div>
           
        //   returning none if id & userId do not match
          : <div>"none"</div>
                                
                               
        }

          
        </>
    )
}