import type { Event } from "../../../entities/event/model";

export interface EventsState {
  events: Event[];
  selectedEvent: Event | null;
  loading: boolean;
  error: string | null;
}
