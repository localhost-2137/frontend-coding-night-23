interface GridRoomProps {
    id: number;
    title: string;
}

export default function GridRoom({id, title}: GridRoomProps) {

    // TODO: fetch room data from API

    return (
        <div className="w-full h-full border-4 border-black flex justify-center items-center text-white">
            <h3>{title}</h3>
        </div>
    )
}