import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../../shared/api/events";
import type { Event } from "../../shared/api/events";

export default function EventPage() {
    const { id } = useParams();
    const [event, setEvent] = useState<Event | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchEvent = async () => {
            const data = await getEventById(Number(id));
            setEvent(data);
        };
        fetchEvent();
    }, [id]);

    if (!event) {
        return <div>Загрузка...</div>;
    }

    return (
        <div>
            <h1>{event.title}</h1>
            <p><b>Тип:</b> {event.type}</p>
            <p><b>Дата начала:</b> {event.startDate}</p>
            <p><b>Дата окончания:</b> {event.endDate}</p>
            <p><b>Стек:</b> {event.stack.join(", ")}</p>
        </div>
    );
};