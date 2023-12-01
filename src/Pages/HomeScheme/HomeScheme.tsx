import {motion, useIsPresent} from "framer-motion";
import GridSquare from "./Components/GridSquare.tsx";
import GridRoom from "./Components/GridRoom.tsx";
import {Outlet} from "react-router-dom";
import {selectedRoomAtom, roomsAtom, squaresAtom} from "../../Atoms.ts";
import {useAtom} from "jotai";


export default function HomeScheme() {

    const isPresent = useIsPresent();
    const [selectedRoom, setSelectedRoom,] = useAtom(selectedRoomAtom)
    const [, setRooms] = useAtom(roomsAtom)
    const [squares, setSquares] = useAtom(squaresAtom)

    return (
        <div className="w-full flex flex-col md:flex-row h-full">
            <Outlet/>
            <div className="md:w-[75%] w-full h-full bg-gray-700 grid grid-cols-6">
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
                                    setRooms(prevState => {
                                        const newRooms = [...prevState]
                                        const index = newRooms.findIndex(room => room.id === selectedRoom.id)
                                        newRooms[index].isLocked = true
                                        return newRooms
                                    })
                                    setSelectedRoom(null)
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