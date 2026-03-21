import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../features/auth/authSlice";
import { useState } from "react";

export default function Login() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: any) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: any) => {
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