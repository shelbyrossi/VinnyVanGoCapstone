import React, { useEffect, useState } from "react"
import "./Materials.css"

// allows access to values in gallery form - what did user select
export const MaterialsForm = ({mChoice, setmChoice}) => {
    const [materials, updateMaterials] = useState([])
  


    const submitWork = (evt) => {
        evt.preventDefault()
        const newchoice = {

            materialsId: mChoice,



        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newchoice)
        }
        return fetch("http://localhost:8088/worksMaterials", fetchOption)
            .then(() => {

            })
    }


    useEffect(
        () => {
            fetch("http://localhost:8088/materials")
                // function that takes a function and array as arguments & runs code when state changes (event listener)
                .then(res => res.json())

                // you have final array of materials
                .then((materials) =>
                //  // function established in state variable - single argument is new state/API state
                {
                    updateMaterials(materials)
                })
        },
        []
    )



    return (
        //  <> Fragment - putting all return elements into one JXS element 
        <><div class="materialOptions">

            <div class="pleaseCheck">Please Check What <i>Vinny Van-Go</i> Materials Were Used</div>

            {
                // iterate employes array and convert to objects to JXS (converstion = .map())
                materials.map(
                    // // parameter to capture each indivual materialOption as iterates
                    (materialOption) => {
                        // // uniquely identify <h2> with a key, use .id since unique identifier
                        return <h6><div class="materialsList">



                            <div key={`materialCategory-${materialOption.id}`}>
                                {materialOption.type}

                                <input type="checkbox"

                                    onChange={
                                        (evt) => {
                                            setmChoice(materialOption.id)
                                        }
                                    }
                                    type="checkbox" />
                            </div>
                        </div>
                        </h6>



                    }
                )
            }
        </div>


         
        </>
    )
}
