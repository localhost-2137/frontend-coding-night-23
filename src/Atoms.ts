import { atom } from "jotai";
import getUserObject from "./lib/getUser";
import {SelectedRoom} from "./lib/interfaces.ts";

const userAtom = atom(getUserObject());
const selectedRoomAtom = atom<SelectedRoom| null>(null);

export { userAtom, selectedRoomAtom };
