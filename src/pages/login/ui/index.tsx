import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { loginRequest } from "../../../features/auth/model/authSlice";
import { useState } from "react";
import type { FormEvent } from "react";

export default function Login() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    dispatch(
      loginRequest({
        username,
        password,
      })
    );
  };

  return (
    <form onSubmit={handleLogin}>
      <input onChange={(e) => setUsername(e.target.value)} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />

      <button disabled={loading}>
        {loading ? "Загрузка..." : "Войти"}
      </button>

      {error && <p>{error}</p>}
    </form>
  );
}