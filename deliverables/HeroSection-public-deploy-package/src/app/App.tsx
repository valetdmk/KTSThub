import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actions as authActions } from "../features/auth";
import { AUTH_SESSION_EXPIRED_EVENT } from "../shared/lib/auth";
import './App.scss'
import { AppRouter } from './routes/AppRouter'

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleSessionExpired = () => dispatch(authActions.logout());
    window.addEventListener(AUTH_SESSION_EXPIRED_EVENT, handleSessionExpired);

    return () => window.removeEventListener(AUTH_SESSION_EXPIRED_EVENT, handleSessionExpired);
  }, [dispatch]);

  return (
    <div className="app">
      <AppRouter />
    </div>
  );
}
