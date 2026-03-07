import type { Event } from "../api/events";

interface Props {
  event: Event;
}

export default function EventCard({ event }: Props) {
  return (
    <div className="event-card">
      <h3>{event.title}</h3>

      <p><b>Тип:</b> {event.type}</p>

      <p><b>Дата начала:</b> {event.startDate}</p>

      <p><b>Дата окончания:</b> {event.endDate}</p>

      <p>
        <b>Стек:</b> {event.stack.join(", ")}
      </p>
    </div>
  );
}