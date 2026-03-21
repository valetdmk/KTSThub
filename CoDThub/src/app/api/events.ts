import axios from "axios";

export interface Event {
    id: number;
    title: string;
    type: string;
    startDate: string;
    endDate: string;
    stack: string[];
}

export const getEvents = async (): Promise<Event[]> => {
    const response = await axios.get("http://10.3.25.106:8080/events");
    return response.data;
}

export const getEventById = async (id: number): Promise<Event> => {
    const response = await axios.get(`http://10.3.25.106:8080/events/${id}`);
    return response.data;
};