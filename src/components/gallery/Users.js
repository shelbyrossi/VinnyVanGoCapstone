
import React, { useEffect, useState } from "react"

// passing props to Gallery.js finishedWork in .map
export const UserName = ({ userShown, showUserShown, finishedWork }) => {

    // declaring "users" that defines state
    // declaring "Showuser" that defines function that will modify state/set value of users
    // useState passes a value as argument and returnes ARRAY WHEN INVOKED
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
        // prop for title card for individual works on Gallery.js, setting with showWorks
        () => {
           showWorks(
               finishedWork
           )
        },
        // leave DEPENDANCY ARRAY empty, or infinite loop
        []
    )


    // finding user ids that equal userIds on works and storing it in foundUser
 const foundUser = user.find(u => u.id === finishedWork?.userId) 

    return (
        
        <>
        {/* calling foundUser in ternary, returning user.name if found */}
        {
          foundUser?.id ? <><div>Artist: {foundUser.name}</div><div>{foundUser.email}</div></>
           
        //   returning none if id & userId do not match
          : <div>"none"</div>
                                
                               
        }

          
        </>
    )
}