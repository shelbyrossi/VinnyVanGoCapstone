
import React, { useEffect, useState } from "react"

// passing props to Gallery.js
export const UserName = ({ userShown, showUserShown, finishedWork }) => {
    const [user, showUser] = useState([])
    const [works, showWorks] = useState([])



    useEffect(
        // *LISTENING FOR STATE CHANGES AND REACTS*
        // takes a function and array as arguments & runs code when state changes (event listener)
        () => {
            // Query string parameter
            fetch("http://localhost:8088/users")
                // fetching data from the API and parsing into application state
                .then(res => res.json())

                // you have final array of users from line 6
                .then(
                    (user) => {
                 
                      showUser(user)
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


    // finding user ids that equal userIds on works and storing it in foundUser
 const foundUser = user.find(u => u.id === finishedWork.works.userId) 

    return (
        
        <>
        {/* calling foundUser in ternary, returning user.name if found */}
        {
          foundUser?.id ? <div>Artist: {foundUser.name} </div>
           
        //   returning none if id & userId do not match
          : <div>"none"</div>
                                
                               
        }

          
        </>
    )
}