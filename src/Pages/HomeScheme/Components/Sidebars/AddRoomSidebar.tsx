import RoomBox from "../RoomBox.tsx";
import {useLocation} from "react-router-dom";
import Button from "../../../../Components/Button.tsx";
import {SelectedRoom} from "../../../../lib/interfaces.ts";
import {selectedRoomAtom} from "../../../../Atoms.ts";
import {useAtom} from "jotai";

// DUMMY DATA
let rooms: SelectedRoom[] = [
    {
        id: 1,
        title: "Living Room",
    },
    {
        id: 2,
        title: "Kitchen",
    },
    {
        id: 3,
        title: "Bedroom",
    },
]

export default function AddRoomSidebar() {

    const location = useLocation()
    const [, setSelectedRoom] = useAtom(selectedRoomAtom)

    return (
        <div className="w-[25%] bg-gray-800 h-full px-6 py-4 border-r-2 border-r-amber-600">
            <div className="w-full flex gap-4 justify-center items-center py-6">
                <Button
                    type={location.pathname === "/home-scheme/room" ? "default" : "alt"} isLink={true}
                    className={`px-3 py-1.5 rounded`}
                    to="/home-scheme/room">Setup rooms</Button>
                <Button
                    type={location.pathname === "/home-scheme/stats" ? "default" : "alt"} isLink={true}
                    className={`px-3 py-1.5 rounded`}
                    to="/home-scheme/stats">Show stats</Button>
            </div>
            <h2 className="text-2xl pt-4">Select room</h2>
            <div className="grid grid-cols-2 gap-4 py-6">
                {rooms.map((room) => (
                    <RoomBox key={room.id} title={room.title} onClick={() => {
                        setSelectedRoom(room)
                    }}/>
                ))}
            </div>
        </div>
    )
}