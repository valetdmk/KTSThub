import { api } from "."

export interface Event {
    id: number;
    title: string;
    type: string;
    startDate: string;
    endDate: string;
    stack: string[];
}

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
