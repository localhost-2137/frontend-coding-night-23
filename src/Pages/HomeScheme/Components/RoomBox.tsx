interface RoomBoxProps {
    title: string;
    onClick?: () => void;
    active?: boolean;
    isLocked: boolean;
}

export default function RoomBox({title, onClick, active, isLocked}: RoomBoxProps) {

    return (
        <div onClick={onClick}
             className={`flex flex-col relative items-center bg-gray-600 py-2 rounded shadow-lg hover:cursor-pointer 
             ${isLocked ? "opacity-50" : "opacity-100"}
             ${active ? "border-2 border-amber-600"
                 : "border-2 border-gray-600"} transition-all`}>
            <div className="p-4 w-full">
                <div className=" mx-auto border-2 border-white w-8 h-8"></div>
            </div>
            <p className={`${active ? "text-amber-600" : "text-white"}`}>{title}</p>
        </div>
    )
}