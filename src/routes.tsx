import React from "react";
import {
    BrowserRouter,
    Redirect,
    Route,
    RouteProps,
    Switch,
} from "react-router-dom";
import { useAuth } from "./hooks/Auth";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

interface AppRouteProps extends RouteProps {
    isPrivate?: boolean;
}

function AppRoute(props: AppRouteProps): React.ReactElement {
    const { isPrivate = false, component: Component, ...rest } = props;
    const { isAuthenticated } = useAuth();

    if (isPrivate && !isAuthenticated) {
        return <Redirect to="/" />;
    }

    if (!isPrivate && isAuthenticated) {
        return <Redirect to="/chat" />;
    }

    return <Route component={Component} {...rest} />;
}

const Routes: React.FC = () => {
    const { hasLoaded } = useAuth();

    if (!hasLoaded) {
        return <p style={{ width: "100vw", textAlign: "center" }}>Loading</p>;
    }

    return (
        <BrowserRouter>
            <Switch>
                <AppRoute exact path="/" component={Login}></AppRoute>
                <AppRoute path="/signup" component={SignUp}></AppRoute>
                <AppRoute isPrivate path="/chat" component={Chat} />
            </Switch>
        </BrowserRouter>
    );
};
export default Routes;
