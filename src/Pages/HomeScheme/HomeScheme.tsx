import {useState} from "react";
import {motion, useIsPresent} from "framer-motion";
import RoomBox from "./Components/RoomBox.tsx";
import GridSquare from "./Components/GridSquare.tsx";
import GridRoom from "./Components/GridRoom.tsx";

interface SelectedRoom {
    id: number;
    title: string;
}

interface Square {
    id: number;
    posX: number;
    posY: number;
    room: SelectedRoom | null;
}

export default function HomeScheme() {

    const isPresent = useIsPresent();

    let selectedRoom: SelectedRoom = {
        id: 1,
        title: "Single Room",
    }

    const staticSquares: Square[] = []
    for (let i = 0; i < 60; i++) {
        staticSquares.push({
            id: i,
            posX: i % 10,
            posY: Math.floor(i / 10),
            room: null
        })
    }

    const [squares, setSquares] = useState<Square[]>([...staticSquares])

    return (
        <div className="w-full flex h-full">
            <div className="w-[25%] bg-gray-500 h-full px-4 py-4">
                <h2>Select room</h2>
                <div className="grid grid-cols-2 gap-4 py-6">
                    <RoomBox title="Single Room"/>
                </div>
            </div>
            <div className="w-[75%] bg-green-800 grid grid-cols-10">
                {squares.length && squares.map(square => {
                    return (
                        square.room ? <GridRoom id={square.room.id} title={square.room.title}/> :
                            <GridSquare key={square.id} posX={square.posX} posY={square.posY} onClick={() => {
                                setSquares(prevState => {
                                    const newSquares = [...prevState]
                                    const index = square.posX + square.posY * 10
                                    newSquares[index].room = selectedRoom
                                    return newSquares
                                })
                            }}/>
                    )
                })}
            </div>
            <motion.div
                initial={{scaleX: 1}}
                animate={{
                    scaleX: 0,
                    transition: {duration: 0.6, ease: "circOut"},
                }}
                exit={{scaleX: 1, transition: {duration: 0.6, ease: "circIn"}}}
                style={{originX: isPresent ? 0 : 1}}
                className="privacy-screen bg-indigo-400 z-50"
            />
        </div>
    )
}