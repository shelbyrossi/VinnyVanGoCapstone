import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"



// NEWSLETTER


export const MaterialsCatList = () => {
    // declaring "materialCat" that defines state
    // declaring "setmaterialCat" that defines function that will modify state/set value of materialCategories
    // useState passes a value as argument and returnes ARRAY WHEN INVOKED
    const [materialCat, setMaterialCat] = useState([])


    useEffect(
        () => {
            fetch("http://localhost:8088/materialCategory")
              // fetching data from the API and parsing into application state
                .then(res => res.json())

                // you have final array of materialCategories defined in line 9
                .then((categoriesfromAPI) =>
            //    setting the data that is a response from fetch with setmaterialCat
                {
                    setMaterialCat(categoriesfromAPI)
                })
        },
        []
    )






    return (
        //  <> Fragment - putting all return elements into one JXS element 
        <>
            <center>
            <div>
      <img class="earPhoto" src="https://res.cloudinary.com/dyjahmaif/image/upload/v1641228231/IMG_2083_h1iinn.jpg"/></div>




<div className="newsBlock"><p>  </p><p> We've recently acquired a new van to add to our fleet! We're stocking up products and hittin' the streets. </p>
           


   
        <img className="vanImage" src="https://tractionlife.com/wp-content/uploads/2012/09/359237017_8aa70f07d2_o.jpg" /></div>



    <div className="newsBlock2"> <p>We had a great time at the Nashville Flea Market last Sunday - thanks to all who came out and bought our materials for your projects! We'll be setting up shop again on the last weekend
        of January. Hope to see you then! (Please fill out Booking form if you'd like us to be at your event!)</p>

        <img className="fleaImage" src="https://upload.wikimedia.org/wikipedia/commons/d/db/FLEA_MARKET_BROWSERS_AT_WHITE_CLOUD%2C_KANSAS%2C_NEAR_TROY%2C_IN_THE_NORTHEAST_CORNER_OF_THE_STATE._IT_IS_SPONSORED_BY_THE..._-_NARA_-_557131.jpg"/> </div>


        <div className="newsBlock3"><p>
        Hope everyone had a fun and safe New Year - we did! Thanks to everyone who came out to our staff holiday party. Thank you to all our loyal customers for 
        keeping us going - we can't wait to show you what surprises we have in store for this year! 
        <img className="partyImage" src="https://flashbak.com/wp-content/uploads/2015/12/1961.jpg"/> 
        <img className="partyImage" src="https://flashbak.com/wp-content/uploads/2015/12/5304800879_7742ece071_b.jpg"/>
        </p>


        </div>


      
 
  
                
                
                
        
   <div className="clickCat">Click the categories to see what's in stock this month!
   
   
   </div>
                {
                    // iterate materialCat array and convert to objects to JXS (converstion = .map())
                    materialCat.map(
                        // // parameter to capture each indivual materialOption as iterates
                        (materialOption) => {
                            // // uniquely identify <h2> with a key, use .id since unique identifier

                         return <div className="links"> <h2 key={`materialCategory-${materialOption.id}`}>
                                <Link to={`/materialCategory/${materialOption.id}`}>{materialOption.category}</Link></h2></div>
                        }
                    )
                }
                

            </center>

        </>
    )
}
