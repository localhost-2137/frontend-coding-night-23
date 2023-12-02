import { cloneElement } from "react";
import { Navigate, useLocation, useRoutes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ToasterComponent from "./Components/ToasterComponent";
import Header from "./Layout/Header";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Home from "./Pages/Home/Home";
import HomeScheme from "./Pages/HomeScheme/HomeScheme";
import AddRoomSidebar from "./Pages/HomeScheme/Components/Sidebars/AddRoomSidebar";
import LiveStatsSidebar from "./Pages/HomeScheme/Components/Sidebars/LiveStatsSidebar";
import Rooms from "./Pages/Rooms/Rooms";
import RoomInfo from "./Pages/RoomInfo/RoomInfo";

export default function App() {
  const element = useRoutes([
    {
      path: "/",

      element: <Header />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/home-scheme",
          element: <HomeScheme />,
          children: [
            {
              path: "/home-scheme",
              element: <Navigate to={"/home-scheme/room"} />,
            },
            {
              path: "/home-scheme/room",
              element: <AddRoomSidebar />,
            },
            {
              path: "/home-scheme/stats",
              element: <LiveStatsSidebar />,
            },
          ],
        },
        {
          path: "/rooms",
          element: <Rooms />,
        },
        {
          path: "/room/:roomId",
          element: <RoomInfo />,
        },
        {
          path: "/plan",
          element: (
            <div className="flex-1 flex items-center justify-center">
              <h1 className="text-7xl roboto">Coming Soon</h1>
            </div>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  const location = useLocation();

  if (!element) return null;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <ToasterComponent />
      {cloneElement(element, { key: location.pathname })}
    </AnimatePresence>
  );
}
