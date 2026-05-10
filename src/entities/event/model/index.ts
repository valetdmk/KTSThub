export interface Event {
    id: number;
    title: string;
    type: string;
    description?: string;
    startDate: string;
    endDate: string;
    stack: string[];
}
