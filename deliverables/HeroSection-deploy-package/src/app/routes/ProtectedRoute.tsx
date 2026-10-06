import { useEffect, type ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { AuthFeature, actions as authActions } from "../../features/auth";

type ProtectedRouteProps = {
  children: ReactNode;
  requiredRole?: string;
};

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(AuthFeature.selectors.root);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && requiredRole && !user && !loading && !error) {
      dispatch(authActions.fetchProfileRequest());
    }
  }, [dispatch, error, loading, requiredRole, token, user]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole) {
    if (user && user.role !== requiredRole) {
      return <Navigate to="/" replace />;
    }

    if (!user) {
      if (error) {
        return (
          <section role="alert">
            <p>{error}</p>
            <button type="button" onClick={() => dispatch(authActions.fetchProfileRequest())}>
              {"\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0443"}
            </button>
          </section>
        );
      }

      return <div role="status">{"\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u0430..."}</div>;
    }
  }

  return <>{children}</>;
}
