export interface SelectedRoom {
    id: number;
    title: string;
}

export interface Square {
    id: number;
    posX: number;
    posY: number;
    room: SelectedRoom | null;
}