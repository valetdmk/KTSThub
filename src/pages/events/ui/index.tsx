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

  return (
    <main className="events-page">
      <header className="events-page__header">
        <p className="page-eyebrow">KTSTHACK · СООБЩЕСТВО</p>
        <h1>Мероприятия</h1>
      </header>
      {loading ? <p className="page-status" role="status">Загрузка мероприятий…</p> : null}
      {error ? <p className="page-status page-status--error" role="alert">{error}</p> : null}
      {!loading && !error && events.length === 0 ? <p className="page-status">Пока нет запланированных событий.</p> : null}
      {!loading && !error && events.length > 0 ? (
        <div className="events-list">
          {events.map((event) => <EventCard key={event.id} event={event} />)}
        </div>
      ) : null}
    </main>
  );
}
