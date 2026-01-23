export interface RawEvent {
    title: string;
    date: string;
    notes: string;
    bunting: boolean;
}

export interface GovResponse {
    [region: string]: {
        division: string;
        events: RawEvent[];
    };
}

export interface Holiday extends RawEvent {
    id: string;
    region?: string;
}