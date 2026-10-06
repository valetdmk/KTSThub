import { Link } from "react-router-dom";
import type { Event } from "../model";

interface Props {
  event: Event;
}

export default function EventCard({ event }: Props) {
  return (
    <Link className="event-card" to={`/events/${event.id}`}>
      <span className="event-card__type">{event.type}</span>
      <h2>{event.title}</h2>
      <dl>
        <div><dt>Начало</dt><dd>{event.startDate}</dd></div>
        <div><dt>Окончание</dt><dd>{event.endDate}</dd></div>
      </dl>
      <p className="event-card__stack"><span>Стек</span>{event.stack.join(", ")}</p>
      <span className="event-card__more">Подробнее <span aria-hidden="true">↗</span></span>
    </Link>
  );
}
