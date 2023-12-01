import {useLocation} from "react-router-dom";
import Button from "../../../../Components/Button.tsx";

export default function LiveStatsSidebar() {

    const location = useLocation()

    return (
        <div className="w-[25%] bg-gray-800 h-full px-6 py-4 text-white border-r-2 border-r-amber-600">
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
            <h2 className="text-2xl pt-4">Live statistics</h2>
            <p className="py-6 text-gray-200">Select room from scheme to show.</p>
        </div>
    )
}