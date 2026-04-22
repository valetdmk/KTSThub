import { api } from "../../entities/api"
import type { Event } from "../../entities/event/model"

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
