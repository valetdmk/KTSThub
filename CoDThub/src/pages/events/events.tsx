import { useEffect, useState } from "react";
import { getEvents } from "../../shared/api/events";
import type { Event } from "../../shared/api/events";
import EventCard from "../../entities/event/ui/EventCard";

export default function Events() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
          try {
            const data = await getEvents();
            setEvents(data);
          } catch (err) {
            setError("Не удалось загрузить события");
          } finally {
            setLoading(false);
          }
        };

        fetchEvents();
    }, []);

    if (loading) {
      return <div>Загрузка событий...</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    if (events.length === 0) {
      return <div>Событий пока нет</div>;
    }

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