export interface RawHoliday {
    title: string;
    date: string;
    notes: string;
    bunting: boolean;
}

export interface Holiday extends RawHoliday {
    id: string;
    isEdited: boolean;
}