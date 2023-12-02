import { AnimatePresence, motion } from "framer-motion";
import Button from "../../../Components/Button";
import { TbDeviceFloppy, TbX } from "react-icons/tb";
import one from "../Assets/1.svg";
import two from "../Assets/2.svg";
import three from "../Assets/3.svg";
import four from "../Assets/4.svg";
import five from "../Assets/5.svg";
import six from "../Assets/6.svg";
import Input from "../../../Components/Input";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

interface Room {
  id: number;
  name: string;
  temperature?: number;
  humidity?: number;
  icon_id: number;
}

export default function UpsertRoomModal({
  setIsUserUpsertingRoom,
  data,
  setEditingRoomIndex,
}: {
  setIsUserUpsertingRoom: (arg: boolean) => void;
  data?: Room;
  setEditingRoomIndex: (arg: number) => void;
}) {
  const [chosenImage, setChosenImage] = useState<number>(data?.icon_id || 1);
  const nameRef = useRef<HTMLInputElement>(null);
  const deviceCodeRef = useRef<HTMLInputElement>(null);

  async function updateRoom() {
    let res = await fetch(`${import.meta.env.VITE_API_URL}/room`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: data?.id,
        name: nameRef.current?.value,
        icon_id: chosenImage,
      }),
      credentials: "include",
    });
    let toastId = toast.loading("Editing room...");
    if (res.status >= 400) {
      toast.error("Something went wrong!", { id: toastId });
      return;
    } else {
      toast.success("Room edited successfully!", { id: toastId });
      setIsUserUpsertingRoom(false);
      setEditingRoomIndex(-1);
    }
  }

  async function addRoom() {
    let res = await fetch(`${import.meta.env.VITE_API_URL}/room`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: nameRef.current?.value,
        device_id: +(deviceCodeRef.current?.value || 0),
        icon_id: chosenImage,
      }),
    });
    let toastId = toast.loading("Adding room...");
    let fetchData = await res.json();
    if (fetchData.code >= 400) {
      toast.error("Something went wrong!", { id: toastId });
      return;
    } else {
      toast.success("Room added successfully!", { id: toastId });
      setIsUserUpsertingRoom(false);
      setEditingRoomIndex(-1)
    }
  }

  function saveHandler() {
    if (!nameRef.current?.value || !deviceCodeRef.current?.value) {
      toast.error("Please fill all the fields!");
      return;
    }
    if (data?.name) {
      updateRoom();
    } else {
      addRoom();
    }
  }

  return (
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
            onClick={() => {
              setIsUserUpsertingRoom(false);
              setEditingRoomIndex(-1);
            }}
          />
          <h3 className="text-6xl text-center text-white roboto mb-4">
            {data?.name ? "Edit room" : "Add room"}
          </h3>
          <Input
            placeholder="Room name"
            containerClassName="xl:!w-2/3 lg:w-1/3 sm:w-1/2 w-full"
            value={data?.name || ""}
            ref={nameRef}
          />
          <Input
            placeholder="Device code"
            containerClassName="xl:!w-2/3 lg:w-1/3 sm:w-1/2 w-full"
            value={`${data?.id || ""}`}
            type="number"
            ref={deviceCodeRef}
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
          <Button
            type="default"
            className="xl:!w-2/3 lg:w-1/3 sm:w-1/2 w-full"
            onClick={saveHandler}
          >
            <TbDeviceFloppy />
            {data?.name ? "Save Room" : "Add Room"}
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
}
