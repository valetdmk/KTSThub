import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventByIdRequest, selectors } from "../../../features/events";

export default function EventPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedEvent, loading } = useSelector(selectors.root);

  useEffect(() => {
    if (id) {
      dispatch(fetchEventByIdRequest(Number(id)));
    }
  }, [id, dispatch]);

  if (loading || !selectedEvent) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <h1>{selectedEvent.title}</h1>
      <p><b>Тип:</b> {selectedEvent.type}</p>
      <p><b>Дата начала:</b> {selectedEvent.startDate}</p>
      <p><b>Дата окончания:</b> {selectedEvent.endDate}</p>
      <p><b>Стек:</b> {selectedEvent.stack.join(", ")}</p>
    </div>
  );
}
