interface GridSquareProps {
    posX: number;
    posY: number;
    onClick?: () => void;
}

export default function GridSquare({onClick}: GridSquareProps) {
    return (
        <div onClick={onClick} className={"w-full h-full border-2 border-white opacity-20 cursor-pointer"}>

        </div>
    )
}