import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventsRequest, selectors } from "../../../features/events";
import EventCard from "../../../entities/event/ui/EventCard";

export default function Events() {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector(selectors.root);

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
