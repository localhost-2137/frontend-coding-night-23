import {TbUserHexagon, TbX} from "react-icons/tb";
import {useState} from "react";
import {roomsAtom, squaresAtom} from "../../../Atoms.ts";
import {useAtom} from "jotai";

interface GridRoomProps {
    id: number;
    title: string;
}

export default function GridRoom({id, title}: GridRoomProps) {

    const [showDelete, setShowDelete] = useState(false)
    const [, setRooms] = useAtom(roomsAtom)
    const [, setSquares] = useAtom(squaresAtom)

    // TODO: fetch room data from API

    return (
        <div onMouseOver={() => {
            setShowDelete(true)
        }} onMouseOut={() => {
            setShowDelete(false)
        }}
             className=" w-full h-full p-2">
            <div
                className="relative w-full h-full border-4 border-black flex flex-col justify-center items-center text-white">
                <h3>{title}</h3>
                {showDelete && <div
                    onClick={() => {
                        setRooms(prevState => {
                            const newRooms = [...prevState]
                            const index = newRooms.findIndex(room => room.id === id)
                            newRooms[index].isLocked = false
                            return newRooms
                        })
                        setSquares(prevState => {
                            const newSquares = [...prevState]
                            newSquares.forEach(square => {
                                if (square.room?.id === id) {
                                    square.room = null
                                }
                            })
                            return newSquares
                        })
                    }}
                    className="absolute top-0 text-center right-0 w-4 h-4 rounded p-3 flex justify-center items-center bg-red-700">
                    <span><TbX/></span>
                </div>}
                <span className="text-green-700 absolute bottom-8 text-xl"><TbUserHexagon/></span>
            </div>
        </div>
    )
}