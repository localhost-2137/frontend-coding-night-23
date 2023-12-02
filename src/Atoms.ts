import {atom} from "jotai";
import getUserObject from "./lib/getUser";
import {SelectedRoom, Room, Square, RoomStats} from "./lib/interfaces.ts";

const userAtom = atom(getUserObject());

// atoms for home scheme
const selectedRoomAtom = atom<SelectedRoom | null>(null);
const selectedStatsRoomAtom = atom<number | null>(null);
const roomsAtom = atom<Room[]>([]);
const squaresAtom = atom<Square[]>(Array.from({length: 25}, (_v, i) => ({
        id: Date.now() + i,
        posX: i % 10,
        posY: Math.floor(i / 10),
        room: null
    }))
);
const helpModalAtom = atom(false);
const actualStatsRoomAtom = atom<RoomStats | null>(null);

export {userAtom, selectedRoomAtom, roomsAtom, squaresAtom, selectedStatsRoomAtom, helpModalAtom, actualStatsRoomAtom};
