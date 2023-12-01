import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import Button from "../../Components/Button";
import { useState } from "react";
import Input from "../../Components/Input";
import { TbDeviceFloppy, TbX } from "react-icons/tb";
import one from "./Assets/1.svg";
import two from "./Assets/2.svg";
import three from "./Assets/3.svg";
import four from "./Assets/4.svg";
import five from "./Assets/5.svg";
import six from "./Assets/6.svg";
import Room from "./Components/Room";

interface Room {
  id: number;
  name: string;
  temperature: number;
  humidity: number;
  imageId: number;
}

export default function Rooms() {
  const isPresent = useIsPresent();
  const [isUserAddingRoom, setIsUserAddingRoom] = useState<boolean>(false);
  const [chosenImage, setChosenImage] = useState<number>(1);
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: 0,
      name: "Living room",
      temperature: 23,
      humidity: 50,
      imageId: 1,
    },
    {
      id: 1,
      name: "Bedroom",
      temperature: 22,
      humidity: 45,
      imageId: 4,
    },
    {
      id: 2,
      name: "Kitchen",
      temperature: 24,
      humidity: 55,
      imageId: 6,
    },
  ]);

  const addRoomModal = (
    <div className="fixed z-20 w-screen h-screen left-0 top-0 bg-[#00000040] flex items-center justify-center">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0.5, bottom: -50 }}
          animate={{ opacity: 1, bottom: 0 }}
          transition={{ duration: 0.2 }}
          className="2xl:w-1/3 xl:w-1/2 w-full xl:h-4/5 h-full xl:border-4 border-bgLght xl:rounded-xl bg-bgClr py-28 px-8 relative flex flex-col gap-4 items-center xl:justify-between justify-center"
        >
          <TbX
            className="text-2xl text-white absolute right-6 top-6 cursor-pointer"
            onClick={() => setIsUserAddingRoom(false)}
          />
          <h3 className="text-6xl text-center text-white roboto mb-4">
            Add Room
          </h3>
          <Input
            placeholder="Room name"
            containerClassName="xl:!w-2/3 lg:w-1/3 sm:w-1/2 w-full"
          />
          <Input
            placeholder="Device code"
            containerClassName="xl:!w-2/3 lg:w-1/3 sm:w-1/2 w-full"
          />
          <div className="flex items-center gap-4 justify-center flex-wrap">
            <input
              type="radio"
              name="image"
              id="image"
              defaultChecked={chosenImage === 1}
              onClick={() => setChosenImage(1)}
              style={{ backgroundImage: `url(${one})` }}
              className="w-12 h-12 appearance-none bg-[length:24px_24px] bg-no-repeat cursor-pointer rounded-full checked:border-amber-500 border-bgLght border-2 bg-center"
            />
            <input
              type="radio"
              name="image"
              id="image"
              defaultChecked={chosenImage === 2}
              onClick={() => setChosenImage(2)}
              style={{ backgroundImage: `url(${two})` }}
              className="w-12 h-12 appearance-none bg-[length:24px_24px] bg-no-repeat cursor-pointer rounded-full checked:border-amber-500 border-bgLght border-2 bg-center"
            />
            <input
              type="radio"
              name="image"
              id="image"
              defaultChecked={chosenImage === 3}
              onClick={() => setChosenImage(3)}
              style={{ backgroundImage: `url(${three})` }}
              className="w-12 h-12 appearance-none bg-[length:24px_24px] bg-no-repeat cursor-pointer rounded-full checked:border-amber-500 border-bgLght border-2 bg-center"
            />
            <input
              type="radio"
              name="image"
              id="image"
              defaultChecked={chosenImage === 4}
              onClick={() => setChosenImage(4)}
              style={{ backgroundImage: `url(${four})` }}
              className="w-12 h-12 appearance-none bg-[length:24px_24px] bg-no-repeat cursor-pointer rounded-full checked:border-amber-500 border-bgLght border-2 bg-center"
            />
            <input
              type="radio"
              name="image"
              id="image"
              defaultChecked={chosenImage === 5}
              onClick={() => setChosenImage(5)}
              style={{ backgroundImage: `url(${five})` }}
              className="w-12 h-12 appearance-none bg-[length:24px_24px] bg-no-repeat cursor-pointer rounded-full checked:border-amber-500 border-bgLght border-2 bg-center"
            />
            <input
              type="radio"
              name="image"
              id="image"
              defaultChecked={chosenImage === 6}
              onClick={() => setChosenImage(6)}
              style={{ backgroundImage: `url(${six})` }}
              className="w-12 h-12 appearance-none bg-[length:24px_24px] bg-no-repeat cursor-pointer rounded-full checked:border-amber-500 border-bgLght border-2 bg-center"
            />
          </div>
          <Button type="default" className="xl:!w-2/3 lg:w-1/3 sm:w-1/2 w-full">
            <TbDeviceFloppy />
            Add Room
          </Button>
          <p className="text-gray-400 xl:!w-2/3 lg:w-1/3 sm:w-1/2 w-full">
            *Room name is arbitrary and depends on the user.
          </p>
          <p className="text-gray-400 xl:!w-2/3 lg:w-1/3 sm:w-1/2 w-full">
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
      <h2 className="text-center text-4xl roboto md:py-4 pb-4 py-20">Rooms</h2>
      <div className="w-full flex items-center justify-center flex-wrap gap-8 my-16 px-8">
        {rooms.length ? (
          <AnimatePresence>
            {rooms.map((room: Room, i: number) => {
              return <Room room={room} i={i} key={room.id} />;
            })}
          </AnimatePresence>
        ) : (
          <p className="text-center text-bgLght text-5xl quicksand font-semibold mt-20">
            No rooms found
          </p>
        )}
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
