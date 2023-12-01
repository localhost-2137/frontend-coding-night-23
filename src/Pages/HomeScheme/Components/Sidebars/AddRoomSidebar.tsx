import RoomBox from "../RoomBox.tsx";
import {Link, useLocation} from "react-router-dom";
import Button from "../../../../Components/Button.tsx";

export default function AddRoomSidebar() {

    const location = useLocation()

    return (
        <div className="w-[25%] bg-gray-800 h-full px-6 py-4 border-r-2 border-r-amber-600">
            <div className="w-full flex gap-4 justify-center items-center py-6">
                <Button
                    type={"default"} isLink={true}
                    className={`bg-gray-600 px-3 py-1.5 rounded ${location.pathname === "/home-scheme/room" ? "bg-orange-600" : ""}`}
                    to="/home-scheme/room">Add room</Button>
                <Button
                    type={"default"} isLink={true}
                    className={`bg-gray-600 px-3 py-1.5 rounded ${location.pathname === "/home-scheme/stats" ? "bg-orange-600" : ""}`}
                    to="/home-scheme/stats">Show stats</Button>
            </div>
            <h2 className="text-2xl pt-4">Select room</h2>
            <div className="grid grid-cols-2 gap-4 py-6">
                <RoomBox title="Single Room"/>
            </div>
        </div>
    )
}