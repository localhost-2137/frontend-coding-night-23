import { motion } from "framer-motion";
import one from "../Assets/1.svg";
import two from "../Assets/2.svg";
import three from "../Assets/3.svg";
import four from "../Assets/4.svg";
import five from "../Assets/5.svg";
import six from "../Assets/6.svg";
import {
  TbArrowDown,
  TbArrowUp,
  TbDropletHalf2Filled,
  TbEdit,
  TbThermometer,
  TbTrashFilled,
} from "react-icons/tb";
import { useState } from "react";
import Button from "../../../Components/Button";
import toast from "react-hot-toast";

interface Room {
  id: number;
  name: string;
  temperature: number;
  humidity: number;
  icon_id: number;
}

export default function Room({
  room,
  i,
  setIsUserUpsertingRoom,
  setEditingRoomIndex,
}: {
  room: Room;
  i: number;
  setIsUserUpsertingRoom: (arg: boolean) => void;
  setEditingRoomIndex: (arg: number) => void;
}) {
  const [isCelcius, setIsCelcius] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  async function deleteHandler() {
    let res = await fetch(`${import.meta.env.VITE_API_URL}/room/${room.id}`, {
      method: "DELETE",
      credentials: "include",
    });
    let id = toast.loading("Deleting room...");
    if (res.status >= 400) {
      toast.error("Something went wrong!", { id });
      return;
    } else {
      toast.success("Room deleted successfully!", { id });
      setTimeout(() => {
        window.location.reload();
      }, 750);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, bottom: -50 }}
      animate={{
        opacity: 1,
        bottom: 0,
        transition: { duration: 0.5, delay: i * 0.1 },
      }}
      key={room.id}
      style={{
        backgroundImage: `url(${
          room.icon_id === 1
            ? one
            : room.icon_id === 2
            ? two
            : room.icon_id === 3
            ? three
            : room.icon_id === 4
            ? four
            : room.icon_id === 5
            ? five
            : six
        })`,
      }}
      className="group w-[400px] h-[300px] bg-[length:200px_150px] overflow-hidden relative bg-center bg-no-repeat border-4 border-bgLght rounded-xl"
    >
      <div
        className={`${
          isOpen
            ? "bottom-0 border-transparent"
            : "-bottom-[80%] border-amber-500"
        } absolute w-full h-full left-0 md:-bottom-[80%] md:group-hover:!bottom-0 md:group-hover:border-transparent transition-all duration-300 px-4 py-2 bg-[#2e2f30ee] border-t-2 md:border-amber-500`}
      >
        <p
          className="absolute -top-10 md:hidden cursor-pointer text-white flex items-center gap-2 border-bgLght border-2 bg-bgClr px-2 rounded-full"
          onClick={() => setIsOpen(true)}
        >
          <TbArrowUp />
          Open
        </p>
        <p
          className="absolute top-14 right-2 md:hidden cursor-pointer text-white flex items-center gap-2 border-bgLght border-2 bg-bgClr px-2 rounded-full"
          onClick={() => setIsOpen(false)}
        >
          Close
          <TbArrowDown />
        </p>
        <TbTrashFilled
          className="absolute right-10 top-2 text-2xl text-gray-500 hover:text-amber-500 transition-colors cursor-pointer"
          onClick={deleteHandler}
        />
        <TbEdit
          onClick={() => {
            setIsUserUpsertingRoom(true);
            setEditingRoomIndex(i);
          }}
          className="absolute right-2 top-2 text-2xl text-gray-500 hover:text-amber-500 transition-colors cursor-pointer"
        />
        <p className="text-2xl text-white quicksand capitalize font-semibold w-full text-ellipsis overflow-hidden">
          {room.name}
        </p>
        <p className="flex items-center gap-4 text-2xl text-white mt-4">
          <TbThermometer />
          Temperature:{" "}
          {isCelcius
            ? room.temperature.toFixed(1) + "°C"
            : (room.temperature * 1.8 + 32).toFixed(1) + "°F"}
        </p>
        <p className="flex items-center gap-4 text-2xl text-white mt-4">
          <TbDropletHalf2Filled />
          Humidity: {room.humidity.toFixed(1)}%
        </p>
        <div className="w-3/5 mx-auto flex items-center rounded-full overflow-hidden mt-4 text-white border-2 border-bgLght">
          <p
            className={`w-full ${
              isCelcius ? "bg-bgLght" : "bg-bgClr"
            } text-center py-2 cursor-pointer transition-all duration-300`}
            onClick={() => setIsCelcius(true)}
          >
            °C
          </p>
          <p
            className={`w-full ${
              !isCelcius ? "bg-bgLght" : "bg-bgClr"
            } text-center py-2 cursor-pointer transition-all duration-300`}
            onClick={() => setIsCelcius(false)}
          >
            °F
          </p>
        </div>
        <Button
          isLink
          to={`/room/${room.id}`}
          className="mt-4 !w-2/3 mx-auto"
          type="alt"
        >
          More info
        </Button>
      </div>
    </motion.div>
  );
}
