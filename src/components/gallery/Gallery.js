import React, { useEffect, useState } from "react"
import "./Gallery.css"
import { UserName } from "./Users"
import { MaterialChoices } from "./MaterialChoices"





export const ShowWorks = () => {
    const [works, showWorks] = useState([])
    const [userShown, showUserShown] = useState([])
    const [showMaterialChoice, setMaterialChoice] = useState([])






    useEffect(
        // *LISTENING FOR STATE CHANGES AND REACTS*
        // takes a function and array as arguments & runs code when state changes (event listener)
        () => {
            // Query string parameter
            fetch("http://localhost:8088/works?_embed=worksMaterials")
                // fetching data from the API and parsing into application state
                .then(res => res.json())

                // you have final array of products defined in line 9
                .then(
                    (submittedWork) => {
                        showWorks(submittedWork)
                    }
                )
        },
        // leave DEPENDANCY ARRAY empty, or infinite loop
        []
    )




    return (
        //  <> Fragment - putting all return elements into one JXS element 
        <>



            <center> <div class="galleryTitle">GALLERY</div> </center>
            {
                works.map(
                    (finishedWork) => {
                        return <center>
                            <div class="gallery"><div key={`finishedWorks-${finishedWork.id}`}>
                                <p>
                                <img class="galleryPhoto" src={finishedWork.imageUrl} />
                                </p><div class="galleryInfo">
                               
                                    <p>Title: {finishedWork.title}</p>
                              
                                    <p>Description: {finishedWork.description}</p>
                                    
                                  
                                    <p>
                                        <UserName user={userShown} showUser={showUserShown} finishedWork={finishedWork} /> </p>
                                        
                                       <p> Vinny Van Go Materials Used:<MaterialChoices materialChoices={showMaterialChoice}
                                        setMaterialChoices={setMaterialChoice} finishedWork={finishedWork}/>
                                        




                                    </p>


                                </div>



                            </div>
                            </div>
                        </center>
                    }
                )


            }


        </>
    )
}

