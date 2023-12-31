import RoomBox from "../RoomBox.tsx";
import {useLocation} from "react-router-dom";
import Button from "../../../../Components/Button.tsx";
import {Room} from "../../../../lib/interfaces.ts";
import {selectedRoomAtom, roomsAtom, helpModalAtom} from "../../../../Atoms.ts";
import {useAtom} from "jotai";
import {useEffect} from "react";
import useFetch from "../../../../hooks/useFetch.tsx";
import {TbHelp} from "react-icons/tb";

export default function AddRoomSidebar() {

    const location = useLocation()
    const [selectedRoom, setSelectedRoom] = useAtom(selectedRoomAtom)
    const [rooms, setRooms] = useAtom(roomsAtom)
    const [, setShowHelpModal] = useAtom(helpModalAtom)
    const {response, error, loading} = useFetch("room", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    useEffect(() => {

        if (response && response.length > 0) {
            const roomsArr: Room[] = []
            response.forEach((room: any) => {
                roomsArr.push({
                    id: room.id,
                    icon_id: room.icon_id,
                    title: room.name,
                    isLocked: rooms.find((r: Room) => r.id === room.id)?.isLocked || false,
                })
            })

            setRooms([...roomsArr])
        }
    }, [response]);

    return (
        <div className="md:w-[25%] w-full bg-gray-800 md:h-full h-[30%] overflow-auto px-6 py-4 text-white md:border-r-2 md:border-r-amber-600
        border-b-2 border-b-amber-600 md:border-b-0">
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
            <div className="flex justify-between items-center">
                <h2 className="text-2xl pt-4">Select room</h2>
                <span onClick={() => {
                    setShowHelpModal(true)
                }} className="text-2xl text-gray-400 cursor-pointer"><TbHelp/></span>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 py-6">
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-700">{error}</p>}
                {rooms.length === 0 && <p>No rooms found</p>}
                {rooms.map((room) => (
                    <RoomBox isLocked={room.isLocked} active={selectedRoom && selectedRoom.id === room.id || false}
                             iconId={room.icon_id}
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