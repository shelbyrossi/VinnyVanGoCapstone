import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";

export const VanGo = () => (
  <>
  {/* custom function with logic on which comp. should render 
  if there is something in local storage- render nav bar */}
    <Route
      render={() => {
        if (localStorage.getItem("vango_customer")) {
          return (
            <>
              <NavBar />
              <ApplicationViews />
              
            </>
          );
        //   user not logged in, redirect to login URL 
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

{/* renderes login component from previous else statement */}
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
);