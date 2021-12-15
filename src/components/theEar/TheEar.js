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
            <div class="title"> "THE EAR" NEWSLETTER</div>

<div class="newsBlock"><p>DECEMBER 2021 </p><p> We've recently aquired a new van to add to our fleet! We're stocking up products and hittin' the streets. </p>
           


   
        <img class="vanImage" src="https://tractionlife.com/wp-content/uploads/2012/09/359237017_8aa70f07d2_o.jpg" />



        <p>We had a great time at the Nashville Flea Market last Sunday - thanks to all who came out and bought our materials for your projects! We'll be setting up shop again on the last weekend
        of January. Hope to see you then! (Please fill out Booking form if you'd like us to be at your event!)</p>

        <img class="fleaImage" src="https://upload.wikimedia.org/wikipedia/commons/d/db/FLEA_MARKET_BROWSERS_AT_WHITE_CLOUD%2C_KANSAS%2C_NEAR_TROY%2C_IN_THE_NORTHEAST_CORNER_OF_THE_STATE._IT_IS_SPONSORED_BY_THE..._-_NARA_-_557131.jpg"/>





    <p> STOCK UPDATES: We're running low on our Mineral Spirits due to a back order! Those of you who were asking for Bottled ink - it's in!</p>
   <p> Friendly reminder that Vinny Van Go will be CLOSED for Christmas Eve - New Years Day, Happy Holidays!</p></div>
                
                
                
                <div class="clickCat">Click the categories to see what's in stock this month!</div>
                {
                    // iterate materialCat array and convert to objects to JXS (converstion = .map())
                    materialCat.map(
                        // // parameter to capture each indivual materialOption as iterates
                        (materialOption) => {
                            // // uniquely identify <h2> with a key, use .id since unique identifier

                         return <div class="links"> <h2 key={`materialCategory-${materialOption.id}`}>
                                <Link to={`/materialCategory/${materialOption.id}`}>{materialOption.category}</Link></h2></div>
                        }
                    )
                }

                

            </center>

        </>
    )
}
