import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import Button from "../../Components/Button";
import { useEffect, useState } from "react";
import Room from "./Components/Room";
import UpsertRoomModal from "./Components/UpsertRoomModal";
import Loader from "../../Components/Loader";
import { TbRefresh } from "react-icons/tb";

interface Room {
  id: number;
  name: string;
  temperature: number;
  humidity: number;
  icon_id: number;
}

export default function Rooms() {
  const isPresent = useIsPresent();
  const [isUserUpsertingRoom, setIsUserUpsertingRoom] =
    useState<boolean>(false);
  const [editingRoomIndex, setEditingRoomIndex] = useState<number>(-1);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [rooms, setRooms] = useState<Array<Room>>([]);

  async function fetchRooms() {
    try {
      setIsFetching(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/room`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const fetchData = await res.json();
      if (fetchData.code >= 400) {
        return;
      } else {
        setRooms(fetchData);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    fetchRooms();
    let interval = setInterval(() => {
      fetchRooms();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [isUserUpsertingRoom]);

  return (
    <div className="flex-1 relative">
      {isUserUpsertingRoom && (
        <UpsertRoomModal
          setIsUserUpsertingRoom={setIsUserUpsertingRoom}
          data={editingRoomIndex !== -1 ? rooms[editingRoomIndex] : undefined}
          setEditingRoomIndex={setEditingRoomIndex}
        />
      )}
      <div className="w-full flex items-center justify-center flex-wrap gap-8 my-16 px-8">
        <TbRefresh className="absolute top-7 right-60 text-gray-100 text-4xl cursor-pointer" onClick={fetchRooms} />
        <Button
          type="alt"
          className="absolute right-8 top-4 !w-48"
          onClick={() => setIsUserUpsertingRoom(true)}
        >
          Add Room
        </Button>
        <h2 className="text-center text-4xl roboto md:py-4 pb-4 py-20">
          Rooms
        </h2>
        <div className="w-full flex items-center justify-center flex-wrap gap-8 my-16 px-8">
          {isFetching ? <Loader width="150" /> : rooms.length ? (
            <AnimatePresence>
              {rooms.map((room: Room, i: number) => {
                return (
                  <Room
                    room={room}
                    i={i}
                    key={room.name}
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
