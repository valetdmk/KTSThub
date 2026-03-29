import { Link } from "react-router-dom";

export const Navigation = () => {
    return (
        <nav>
            <Link to={"/"}>Главная</Link> |{" "}
            <Link to={"/events"}>События</Link> |{" "}
            <Link to={"/participants"}>Участники</Link> |{" "}
            <Link to={"/schedule"}>Расписание</Link> |{" "}
            <Link to={"/profile"}>Личный кабинет</Link> |{" "}
            <Link to={"/admin"}>Админ</Link> |{" "}
        </nav>
    );
};