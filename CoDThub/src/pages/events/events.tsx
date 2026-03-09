import { useEffect, useState } from "react";
import { getEvents } from "../../api/events";
import type { Event } from "../../api/events";
import EventCard from "../../components/EventCard";

export default function Events() {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const data = await getEvents();
            setEvents(data);
        };

        fetchEvents();
    }, []);

    return (
    <div>
      <h1>События</h1>

      <div className="events-list">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}