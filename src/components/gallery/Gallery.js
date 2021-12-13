import React, { useEffect, useState } from "react"
import "./Gallery.css"
import { UserName } from "./Users"





export const ShowWorks = () => {
    const [works, showWorks] = useState([])
    const [userShown, showUserShown] = useState([])






    useEffect(
        // *LISTENING FOR STATE CHANGES AND REACTS*
        // takes a function and array as arguments & runs code when state changes (event listener)
        () => {
            // Query string parameter
            fetch("http://localhost:8088/worksMaterials?_expand=works&_expand=materials")
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
                                <img class="galleryPhoto" src={finishedWork.works?.imageUrl} />
                                </p><div class="galleryInfo">
                               
                                    <p>Title: {finishedWork.works?.title}</p>
                                    <p>Vinny Van-Go Materials Used: {finishedWork.materials?.type}</p>
                                    <p>Description: {finishedWork.works?.description}</p>
                                  
                                    <p>
                                        <UserName user={userShown} showUser={showUserShown} finishedWork={finishedWork} />
                                        
                                            
                                        




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

