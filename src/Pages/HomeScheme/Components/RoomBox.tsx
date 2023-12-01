interface RoomBoxProps {
    title: string;
}

export default function RoomBox({title}: RoomBoxProps) {

    return (
        <div className="flex flex-col items-center bg-gray-700 py-2 rounded shadow-lg hover:cursor-pointer">
            <div className="p-4 w-full">
                <div className=" mx-auto border-2 border-gray-900 w-8 h-8"></div>
            </div>
            <p className="text-white">{title}</p>
        </div>
    )
}