import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import Button from "../../Components/Button";
import { useState } from "react";
import Input from "../../Components/Input";
import { TbDeviceFloppy, TbX } from "react-icons/tb";

interface Room {
    name: string;
}

export default function Rooms() {
  const isPresent = useIsPresent();
  const [isUserAddingRoom, setIsUserAddingRoom] = useState<boolean>(false);
  const [rooms, setRooms] = useState<Room[]>([]);

  const addRoomModal = (
    <div className="fixed z-20 w-screen h-screen left-0 top-0 bg-[#00000040] flex items-center justify-center">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0.5, bottom: -50 }}
          animate={{ opacity: 1, bottom: 0 }}
          transition={{ duration: 0.2 }}
          className="w-1/3 h-3/5 border-4 border-amber-600 rounded-xl bg-bgClr p-6 relative flex flex-col gap-4 items-center justify-center"
        >
          <TbX
            className="text-2xl text-white absolute right-6 top-6 cursor-pointer"
            onClick={() => setIsUserAddingRoom(false)}
          />
          <h3 className="text-6xl text-center text-white roboto mb-8">
            Add Room
          </h3>
          <Input placeholder="Room name" containerClassName="!w-2/3" />
          <Input placeholder="Device code" containerClassName="!w-2/3" />
          <Button type="default" className="!w-2/3">
            <TbDeviceFloppy />
            Add Room
          </Button>
          <p className="text-white w-2/3">
            *Room name is arbitrary and depends on the user.
          </p>
          <p className="text-white w-2/3">
            **Device code should be written on the sheet of paper included in
            the set.
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );

  return (
    <div className="flex-1 relative">
      {isUserAddingRoom && addRoomModal}
      <Button
        type="alt"
        className="absolute right-8 top-4 !w-48"
        onClick={() => setIsUserAddingRoom(true)}
      >
        Add Room
      </Button>
      <h2 className="text-center text-4xl roboto py-4">Rooms</h2>
      <div className="">
        {rooms.length ? <h1>Pokoje kurwo</h1> : <p className="text-center text-bgLght text-5xl quicksand font-semibold mt-20">No rooms found</p>}
      </div>
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{
          scaleX: 0,
          transition: { duration: 0.6, ease: "circOut" },
        }}
        exit={{ scaleX: 1, transition: { duration: 0.6, ease: "circIn" } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="privacy-screen bg-indigo-400 z-50"
      />
    </div>
  );
}
