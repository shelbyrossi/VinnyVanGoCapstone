import React, { useEffect, useState } from "react"
import "./Materials.css"




// allows access to values in gallery form - what did user select
export const MaterialsForm = ({ mChoice, setmChoice }) => {
    // declaring materials that defines state
    // declaring updateWorkMaterials that defines function that will modify state/set value of materials
    // useState passes a value as argument and returnes ARRAY WHEN INVOKED
    const [materials, updateWorkMaterials] = useState([])



    useEffect(
        () => {
            fetch("http://localhost:8088/materials")
                // fetching data from the API and parsing into application state
                .then(res => res.json())

                // you have final array of materials
                .then((materials) =>
                // materials = response from the fetch, setting that response with updateWorkMaterials
                {
                    updateWorkMaterials(materials)
                })
        },
        []
    )



    return (
        //  <> Fragment - putting all return elements into one JXS element 
        <><div className="materialOptions">

            <div className="pleaseCheck">Please Check What <i>Vinny Van-Go</i> Materials Were Used</div>

            {
                // iterate employes array and convert to objects to JXS (converstion = .map())
                materials.map(
                    // // parameter to capture each indivual materialOption as iterates
                    (materialOption) => {
                        // // uniquely identify <h2> with a key, use .id since unique identifier
                        return <div className="materialsList"> <div> <div key={`materialOption--${materialOption.id}`}>{materialOption.type}</div>
                            <input type="checkbox"

                                // Has that id already been chosen? If so, delete if not add - set choice
                                onChange={
                                    (evt) => {
                                        const copy = { ...mChoice }
                                        copy.chosenMaterials.has(materialOption.id)
                                            ? copy.chosenMaterials.delete(materialOption.id)

                                            : copy.chosenMaterials.add(materialOption.id)
                                        setmChoice(copy)
                                    }
                                }
                                type="checkbox" />

                        </div>
                        </div>


                    }
                )
            }
        </div>



        </>
    )
}