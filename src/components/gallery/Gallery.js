import React, { useEffect, useState } from "react"
import "./Gallery.css"
import { UserName } from "./Users"
import { MaterialChoices } from "./MaterialChoices"



export const ShowWorks = () => {

// declaring "works" that defines state
// declaring "showWorks" that defines function that will modify state/set value of works
// useState passes a value as argument and returnes ARRAY WHEN INVOKED


    const [works, showWorks] = useState([])
    // for props to show user from Users.js
    const [userShown, showUserShown] = useState([])
    // for props to show materials from MaterialChoices.js
    const [showMaterialChoice, setMaterialChoice] = useState([])



    useEffect(
        // *LISTENING FOR STATE CHANGES AND REACTS*
        // takes a function and array as arguments & runs code when state changes (event listener)
        () => {
            // Query string parameter
            fetch("http://localhost:8088/works?_embed=worksMaterials")
                // fetching data from the API and parsing into application state
                .then(res => res.json())

                // you have final array of works & worksMaterials defined in line 15
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



            <center> <div className="galleryTitle">GALLERY</div> </center>
            {
                works.map(
                    (finishedWork) => {
                        
                        return <center>
                            
                            <div className ="gallery"><div key={`finishedWorks-${finishedWork.id}`}>
                              
                                <img className ="galleryPhoto" src={finishedWork.imageUrl} />
                                <div className="galleryInfo">
                               
                                    <div>Title: {finishedWork.title}</div>
                              
                                    <div>Description: {finishedWork.description}</div>
                                    
                                  
                                    <div>
                                        {/* invoking UserName from Users.js and MaterialChoices from MaterialChoices.js  */}
                                        <UserName user={userShown} showUser={showUserShown} finishedWork={finishedWork} /> </div>
                                        
                                       <div>Vinny Van Go Materials Used:<MaterialChoices materialChoices={showMaterialChoice}
                                        setMaterialChoices={setMaterialChoice} finishedWork={finishedWork}/>
                                        




                                    </div>


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

