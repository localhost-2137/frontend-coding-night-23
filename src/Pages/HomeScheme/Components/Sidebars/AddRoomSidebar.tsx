import RoomBox from "../RoomBox.tsx";
import {useLocation} from "react-router-dom";
import Button from "../../../../Components/Button.tsx";
import {Room} from "../../../../lib/interfaces.ts";
import {selectedRoomAtom, roomsAtom} from "../../../../Atoms.ts";
import {useAtom} from "jotai";
import {useEffect} from "react";

// DUMMY DATA
let DUMMY_ROOMS: Room[] = [
    {
        id: 1,
        title: "Living Room",
        isLocked: false,
    },
    {
        id: 2,
        title: "Kitchen",
        isLocked: false
    },
    {
        id: 3,
        title: "Bedroom",
        isLocked: false,
    },
]

export default function AddRoomSidebar() {

    const location = useLocation()
    const [selectedRoom, setSelectedRoom] = useAtom(selectedRoomAtom)
    const [rooms, setRooms] = useAtom(roomsAtom)

    useEffect(() => {
        setRooms([...DUMMY_ROOMS])
    }, []);

    return (
        <div className="md:w-[25%] w-full bg-gray-800 md:h-full h-[30%] overflow-auto px-6 py-4 text-white md:border-r-2 md:border-r-amber-600
        border-b-2 border-b-amber-600">
            <div className="w-full flex-col px-4 xl:flex-row flex gap-4 justify-center items-center py-6">
                <Button
                    type={location.pathname === "/home-scheme/room" ? "default" : "alt"} isLink={true}
                    className={`px-3 py-1.5 rounded`} width={"w-full"}
                    to="/home-scheme/room">Setup rooms</Button>
                <Button
                    type={location.pathname === "/home-scheme/stats" ? "default" : "alt"} isLink={true}
                    className={`px-3 py-1.5 rounded`} width={"w-full"}
                    to="/home-scheme/stats">Show stats</Button>
            </div>
            <h2 className="text-2xl pt-4">Select room</h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 py-6">
                {rooms.map((room) => (
                    <RoomBox isLocked={room.isLocked} active={selectedRoom && selectedRoom.id === room.id || false}
                             key={room.id}
                             title={room.title}
                             onClick={() => {
                                 if (room.isLocked) return
                                 setSelectedRoom(room)
                             }}/>
                ))}
            </div>
        </div>
    )
}