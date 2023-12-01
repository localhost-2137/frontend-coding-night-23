export interface SelectedRoom {
    id: number;
    title: string;
}

export interface Room {
    id: number;
    title: string;
    isLocked: boolean;
}

export interface Square {
    id: number;
    posX: number;
    posY: number;
    room: SelectedRoom | null;
}