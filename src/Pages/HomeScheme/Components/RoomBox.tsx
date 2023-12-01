interface RoomBoxProps {
    title: string;
    onClick?: () => void;
}

export default function RoomBox({title, onClick}: RoomBoxProps) {

    return (
        <div onClick={onClick} className="flex flex-col items-center bg-gray-600 py-2 rounded shadow-lg hover:cursor-pointer">
            <div className="p-4 w-full">
                <div className=" mx-auto border-2 border-white w-8 h-8"></div>
            </div>
            <p className="text-white">{title}</p>
        </div>
    )
}