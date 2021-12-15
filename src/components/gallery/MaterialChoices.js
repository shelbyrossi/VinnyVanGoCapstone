import React, { useEffect, useState } from "react"

// passing props to Gallery.js // allows access to values in gallery form - what did user select?
export const MaterialChoices = ({showMaterialChoice, setMaterialChoice, finishedWork}) => {

 // declaring "materialChoices" that defines state
    // declaring "setMaterialChoices" that defines function that will modify state/set value of materialChoices
    // useState passes a value as argument and returnes ARRAY WHEN INVOKED

    const [materialChoices, setMaterialChoices] = useState([])
    const [works, showWorks] = useState([])
 



    useEffect(
        // *LISTENING FOR STATE CHANGES AND REACTS*
        // takes a function and array as arguments & runs code when state changes (event listener)
        () => {
            // Query string parameter
            fetch("http://localhost:8088/worksMaterials?_expand=materials")
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
           showWorks(
               finishedWork
           )
        },
        // leave DEPENDANCY ARRAY empty, or infinite loop
        []
    )



    // if the workId off of Workmaterials === id off of Works 
 const foundMaterial = materialChoices.filter(m=> m.workId === finishedWork.id) 

    return (
        <>
        {
      
        foundMaterial.map(
            (material) => {
                             
                <div key={`foundMaterial-${foundMaterial.id}`}></div>
                return foundMaterial ? <div>{material.materials.type} </div>
           
        //   returning none if id & userId do not match
          : <div>"none"</div>
                           
        }

        )
    }
    
        </>
    
        )
}