import React, { useEffect, useState } from "react"
import "./Gallery.css"



export const ShowWorks = () => {
    const [works, showWorks] = useState([])
    
 
    



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
          
      <center> <div class= "galleryTitle">GALLERY</div> </center>
            {
                // iterate employes array and convert to objects to JXS (converstion = .map())
              works.map(
                    // // parameter to capture each indivual employeeObj as iterates
                    (finishedWork) => {
                        // // uniquely identify <h2> with a key, use .id since unique identifier
                     return  <center>
                         
                         <div class="gallery"><div key={`finishedWorks-${finishedWork.id}`}>
                        <img class= "galleryPhoto" src={finishedWork.works?.imageUrl}/><p>
                        </p><div class="galleryInfo">
                        <p>Title: {finishedWork.works?.title}</p>
                        <p>Vinny Van-Go Materials Used: {finishedWork.materials.type}</p>
                        <p>Artist Name: {finishedWork.works?.artist}</p>
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

   