import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventByIdRequest, selectors } from "../../../features/events";

export default function EventPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedEvent, loading, error } = useSelector(selectors.root);
  const eventId = Number(id);
  const hasValidEventId = Number.isSafeInteger(eventId) && eventId > 0;

  useEffect(() => {
    if (hasValidEventId) {
      dispatch(fetchEventByIdRequest(eventId));
    }
  }, [dispatch, eventId, hasValidEventId]);

  if (!hasValidEventId) {
    return <main className="event-detail-page"><p className="page-status" role="status">{"\u041C\u0435\u0440\u043E\u043F\u0440\u0438\u044F\u0442\u0438\u0435 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E."}</p></main>;
  }

  if (error) {
    return <main className="event-detail-page"><p className="page-status page-status--error" role="alert">{error}</p></main>;
  }

  if (loading || !selectedEvent || selectedEvent.id !== eventId) {
    return <main className="event-detail-page"><p className="page-status" role="status">{"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..."}</p></main>;
  }

  return (
    <main className="event-detail-page">
      <a className="event-detail-page__back" href="/events">← К мероприятиям</a>
      <p className="page-eyebrow">KTSTHACK · МЕРОПРИЯТИЕ</p>
      <h1>{selectedEvent.title}</h1>
      <dl className="event-detail__facts">
        <div><dt>{"\u0422\u0438\u043F"}</dt><dd>{selectedEvent.type}</dd></div>
        <div><dt>{"\u0414\u0430\u0442\u0430 \u043D\u0430\u0447\u0430\u043B\u0430"}</dt><dd>{selectedEvent.startDate}</dd></div>
        <div><dt>{"\u0414\u0430\u0442\u0430 \u043E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u044F"}</dt><dd>{selectedEvent.endDate}</dd></div>
        <div><dt>{"\u0421\u0442\u0435\u043A"}</dt><dd>{selectedEvent.stack.join(", ")}</dd></div>
      </dl>
    </main>
  );
}
