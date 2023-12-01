import {cloneElement} from "react";
import {useLocation, useRoutes} from "react-router-dom";
import {AnimatePresence} from "framer-motion";
import ToasterComponent from "./Components/ToasterComponent";
import Header from "./Layout/Header";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Home from "./Pages/Home/Home";

export default function App() {
    const element = useRoutes([
        {
            path: "/",
            element: <Header/>,
            children: [
                {
                    path: "/",
                    element: <Home/>,
                },
            ],
        },
        {
            path: "/login",
            element: <Login/>,
        },
        {
            path: "/register",
            element: <Register/>,
        },
    ]);

    const location = useLocation();

    if (!element) return null;

    return (
        <AnimatePresence mode="wait" initial={false}>
            <ToasterComponent/>
            {cloneElement(element, {key: location.pathname})}
        </AnimatePresence>
    );
}
