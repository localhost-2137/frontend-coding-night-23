import {useState} from "react";
import {motion, useIsPresent} from "framer-motion";
import GridSquare from "./Components/GridSquare.tsx";
import GridRoom from "./Components/GridRoom.tsx";
import {Outlet} from "react-router-dom";
import {Square} from "../../lib/interfaces.ts";
import {selectedRoomAtom} from "../../Atoms.ts";
import {useAtom} from "jotai";


export default function HomeScheme() {

    const isPresent = useIsPresent();
    const [selectedRoom,] = useAtom(selectedRoomAtom)

    console.log(selectedRoom)

    const staticSquares: Square[] = []
    for (let i = 0; i < 30; i++) {
        staticSquares.push({
            id: Date.now() + i,
            posX: i % 10,
            posY: Math.floor(i / 10),
            room: null
        })
    }

    const [squares, setSquares] = useState<Square[]>([...staticSquares])

    return (
        <div className="w-full flex h-full">
            <Outlet/>
            <div className="w-[75%] bg-gray-700 grid grid-cols-6">
                {squares.length && squares.map(square => {
                    return (
                        square.room ? <GridRoom key={square.room.id} id={square.room.id} title={square.room.title}/> :
                            <GridSquare key={square.id} posX={square.posX} posY={square.posY} onClick={() => {
                                if (selectedRoom) {
                                    setSquares(prevState => {
                                        const newSquares = [...prevState]
                                        const index = square.posX + square.posY * 10
                                        newSquares[index].room = selectedRoom
                                        return newSquares
                                    })
                                } else {
                                    console.error("No room selected")
                                }
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