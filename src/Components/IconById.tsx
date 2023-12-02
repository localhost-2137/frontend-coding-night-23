import one from "../Pages/Rooms/Assets/1.svg";
import two from "../Pages/Rooms/Assets/2.svg";
import three from "../Pages/Rooms/Assets/3.svg";
import four from "../Pages/Rooms/Assets/4.svg";
import five from "../Pages/Rooms/Assets/5.svg";
import six from "../Pages/Rooms/Assets/6.svg";

interface IconByIdProps {
    id?: number;
}

export default function IconById({id}: IconByIdProps) {

    switch (id) {
        case 1:
            return <img className="w-12 h-12" src={one} alt="icon"/>
        case 2:
            return <img className="w-12 h-12" src={two} alt="icon"/>
        case 3:
            return <img className="w-12 h-12" src={three} alt="icon"/>
        case 4:
            return <img className="w-12 h-12" src={four} alt="icon"/>
        case 5:
            return <img className="w-12 h-12" src={five} alt="icon"/>
        case 6:
            return <img className="w-12 h-12" src={six} alt="icon"/>
        default:
            return <img className="w-12 h-12" src={one} alt="icon"/>
    }
}