import type { Event } from "../../entities/event/model";
import { api } from "./base";

export const eventsApi = {
    getEvents: async (): Promise<Event[]> => {
        const response = await api.get("/events");
        return response.data;
    },

    getEventById: async (id: number): Promise<Event> => {
        const response = await api.get(`/events/${id}`);
        return response.data;
    },
};
