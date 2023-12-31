import {useLocation} from "react-router-dom";
import Button from "../../../../Components/Button.tsx";
import {selectedStatsRoomAtom, actualStatsRoomAtom} from "../../../../Atoms.ts";
import {useAtom} from "jotai";

export default function LiveStatsSidebar() {

    const [selectedStatsRoom,] = useAtom(selectedStatsRoomAtom)
    const [actualStatsRoom,] = useAtom(actualStatsRoomAtom)

    const location = useLocation()

    return (
        <div className="md:w-[25%] w-full bg-gray-800 md:h-full h-[30%] overflow-auto px-6 py-4 text-white md:border-r-2 md:border-r-amber-600
        border-b-2 border-b-amber-600 md:border-b-0">
            <div className="w-full flex flex-col xl:flex-row gap-4 justify-center items-center py-6">
                <Button
                    type={location.pathname === "/home-scheme/room" ? "default" : "alt"} isLink={true}
                    className={`px-3 py-1.5 rounded`} width={"w-full"}
                    to="/home-scheme/room">Setup rooms</Button>
                <Button
                    type={location.pathname === "/home-scheme/stats" ? "default" : "alt"} isLink={true}
                    className={`px-3 py-1.5 rounded`} width={"w-full"}
                    to="/home-scheme/stats">Show stats</Button>
            </div>
            <h2 className="text-2xl pt-4">Live statistics</h2>
            {selectedStatsRoom !== null && actualStatsRoom !== null && <div className="flex flex-col gap-6 py-6">
                <p>Name: {actualStatsRoom.name}</p>
                <p>Device id: {actualStatsRoom.id}</p>
                <p>Temperature: {actualStatsRoom.temperature}°C</p>
                <p>Humidity: {actualStatsRoom.humidity}%</p>
                <p>Watthour: {actualStatsRoom.watthour}Wh</p>
            </div>}
            {selectedStatsRoom === null && <p className="py-6 text-gray-400">Select room from scheme to show.</p>}
        </div>
    )
}