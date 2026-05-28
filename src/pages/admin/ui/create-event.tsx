import { useNavigate } from "react-router-dom";
import "./index.scss";

export const AdminCreateEventPage = () => {
  const navigate = useNavigate();

  return (
    <main className="admin-placeholder-page">
      <section className="admin-placeholder-card">
        <h1>Создание мероприятия</h1>
        <p>Пока здесь заглушка. Позже сюда добавим полноценную страницу создания мероприятия.</p>
        <button type="button" className="admin-placeholder-button" onClick={() => navigate("/admin")}>
          Назад на главную администратора
        </button>
      </section>
    </main>
  );
};
