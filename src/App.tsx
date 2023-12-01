import {cloneElement} from "react";
import {Navigate, useLocation, useRoutes} from "react-router-dom";
import {AnimatePresence} from "framer-motion";
import ToasterComponent from "./Components/ToasterComponent";
import Header from "./Layout/Header";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Home from "./Pages/Home/Home";
import HomeScheme from "./Pages/HomeScheme/HomeScheme.tsx";
import AddRoomSidebar from "./Pages/HomeScheme/Components/Sidebars/AddRoomSidebar.tsx";
import LiveStatsSidebar from "./Pages/HomeScheme/Components/Sidebars/LiveStatsSidebar.tsx";


export default function App() {
    const element = useRoutes([
      {
        path: "/",
        element: <Header />,
        children: [
          {
            path: "/",

            element: <Header/>,
            children: [
                {
                    path: "/",
                    element: <Home/>,
                },
                {
                    path: "/home-scheme",
                    element: <HomeScheme/>,
                    children: [
                        {
                            path: "/home-scheme",
                            element: <Navigate to={"/home-scheme/room"}/>,
                        },
                        {
                            path: "/home-scheme/room",
                            element: <AddRoomSidebar/>
                        },
                        {
                            path: "/home-scheme/stats",
                            element: <LiveStatsSidebar/>
                        }
                    ]
                },
                {
                    path: "/devices",
                    element: <h1>Devices</h1>,
                },
                {
                    path: "/plan",
                    element: <h1>Plan</h1>,
                }
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
