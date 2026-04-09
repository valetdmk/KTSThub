import { useState } from "react";
import { api } from "../../../app/api";

export default function Register() {
    const [form, setform] = useState({
        name: "",
        lastname: "",
        username: "",
        birthday: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setform({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await api.post("/auth/signup", form);

            alert("Регистрация успешна!");
        } catch (err: any) {
            setError(err.response?.data?.message || "Ошибка регистрации");
        }
    };

        return (
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Имя" onChange={handleChange} />
                <input name="lastname" placeholder="Фамилия" onChange={handleChange} />
                <input name="username" placeholder="username" onChange={handleChange} />
                <input name="birthday" type="date" onChange={handleChange} />
                <input name="email" placeholder="Email" onChange={handleChange} />
                <input name="password" type="password" onChange={handleChange} />

                <button>Зарегистрироваться</button>

                {error && <p>{error}</p>}
            </form>
        )
    }