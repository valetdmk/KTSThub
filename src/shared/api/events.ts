import type { Event } from "../../entities/event/model";
import { api } from "./base";
import { apiPaths } from "./endpoints";

export const eventsApi = {
    getEvents: async (): Promise<Event[]> => {
        const response = await api.get<Event[]>(apiPaths.events.collection);
        return response.data;
    },

    getEventById: async (id: number): Promise<Event> => {
        const response = await api.get<Event>(apiPaths.events.byId(id));
        return response.data;
    },
};
