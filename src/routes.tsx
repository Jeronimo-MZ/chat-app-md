import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}></Route>
                <Route path="/signup" component={SignUp}></Route>
            </Switch>
        </BrowserRouter>
    );
};
export default Routes;
