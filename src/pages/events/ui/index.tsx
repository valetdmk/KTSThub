import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventsRequest } from "../../../features/events/Slice";
import EventCard from "../../../entities/event/ui/EventCard";
import type { RootState } from "../../../app/store/store";

export default function Events() {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector(
    (state: RootState) => state.events
  );

    // const [events, setEvents] = useState<Event[]>([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);

    // useEffect(() => {
    //     const fetchEvents = async () => {
    //       try {
    //         const data = await getEvents();
    //         setEvents(data);
    //       } catch (err) {
    //         setError("Не удалось загрузить события");
    //       } finally {
    //         setLoading(false);
    //       }
    //     };

    //     fetchEvents();
    // }, []);

    useEffect(() => {
        dispatch(fetchEventsRequest());
    }, [dispatch]);

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