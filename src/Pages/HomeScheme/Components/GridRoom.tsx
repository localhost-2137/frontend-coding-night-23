import { TbCircleFilled, TbX} from "react-icons/tb";
import {useEffect, useState} from "react";
import {roomsAtom, squaresAtom} from "../../../Atoms.ts";
import {useAtom} from "jotai";
import useFetch from "../../../hooks/useFetch.tsx";

interface GridRoomProps {
    id: number;
    title: string;
}

export default function GridRoom({id, title}: GridRoomProps) {

    const [showDelete, setShowDelete] = useState(false)
    const [, setRooms] = useAtom(roomsAtom)
    const [, setSquares] = useAtom(squaresAtom)
    const [data, setData] = useState<any>({
        temperature: 0,
        watthour: 0,
        lastpresence: 0
    })
    const {response} = useFetch(`room?id=${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    }, 5000)

    useEffect(() => {
        if(response) {
            setData(response)
            console.log(response)
        }
    }, [response]);

    return (
        <div onMouseOver={() => {
            setShowDelete(true)
        }} onMouseOut={() => {
            setShowDelete(false)
        }}
             className=" w-full h-full p-2">
            <div
                className="relative shadow w-full h-full bg-gray-800 rounded-xl border-4 border-black flex flex-col justify-center items-center text-white">
                <div className="flex flex-col gap-3">
                    <h3 className="text-xl text-center">{title}</h3>
                    <div className="flex text-green-600 items-center justify-center gap-2">
                       <TbCircleFilled/>
                        <p>online</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <p>{data.temperature} °C</p>
                        <p>{data.watthour} %</p>
                    </div>
                </div>
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
                    className="absolute cursor-pointer top-0 text-center right-0 w-4 h-4 rounded p-3 flex justify-center items-center bg-red-700">
                    <span><TbX/></span>
                </div>}

            </div>
        </div>
    )
}