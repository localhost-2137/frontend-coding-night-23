interface GridSquareProps {
    posX: number;
    posY: number;
    onClick?: () => void;
}

export default function GridSquare({onClick}: GridSquareProps) {
    return (
        <div onClick={onClick} className={"w-full h-full border-2 border-black opacity-10 cursor-pointer"}>

        </div>
    )
}