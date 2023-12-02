export interface SelectedRoom {
    id: number;
    title: string;
}

export interface Room {
    id: number;
    title: string;
    isLocked: boolean;
    icon_id?: number;
}

export interface Square {
    id: number;
    posX: number;
    posY: number;
    room: SelectedRoom | null;
}