import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import Button from "../../Components/Button";
import { useState } from "react";
import Room from "./Components/Room";
import UpsertRoomModal from "./Components/UpsertRoomModal";

interface Room {
  id: number;
  name: string;
  temperature: number;
  humidity: number;
  imageId: number;
  deviceCode: string;
}

export default function Rooms() {
  const isPresent = useIsPresent();
  const [isUserUpsertingRoom, setIsUserUpsertingRoom] =
    useState<boolean>(false);
  const [editingRoomIndex, setEditingRoomIndex] = useState<number>(-1);
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: 0,
      name: "Living room",
      temperature: 23,
      humidity: 50,
      imageId: 1,
      deviceCode: "123456789",
    },
    {
      id: 1,
      name: "Bedroom",
      temperature: 22,
      humidity: 45,
      imageId: 4,
      deviceCode: "123456789",
    },
    {
      id: 2,
      name: "Kitchen",
      temperature: 24,
      humidity: 55,
      imageId: 6,
      deviceCode: "123456789",
    },
  ]);

  return (
    <div className="flex-1 relative">
      {isUserUpsertingRoom && (
        <UpsertRoomModal
          setIsUserUpsertingRoom={setIsUserUpsertingRoom}
          data={rooms[editingRoomIndex] || null}
          setEditingRoomIndex={setEditingRoomIndex}
        />
      )}
      <Button
        type="alt"
        className="absolute right-8 top-4 !w-48"
        onClick={() => setIsUserUpsertingRoom(true)}
      >
        Add Room
      </Button>
      <h2 className="text-center text-4xl roboto md:py-4 pb-4 py-20">Rooms</h2>
      <div className="w-full flex items-center justify-center flex-wrap gap-8 my-16 px-8">
        {rooms.length ? (
          <AnimatePresence>
            {rooms.map((room: Room, i: number) => {
              return (
                <Room
                  room={room}
                  i={i}
                  key={room.id}
                  setIsUserUpsertingRoom={setIsUserUpsertingRoom}
                  setEditingRoomIndex={setEditingRoomIndex}
                />
              );
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
