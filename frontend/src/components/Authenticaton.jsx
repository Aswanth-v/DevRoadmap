import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Authentication = ({ isAuthenticated, user, isLoading, children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    const isAuthPage = ["/login", "/register"].includes(location.pathname);

    // If user already logged in → redirect away from login/register
    if (isAuthenticated && isAuthPage) {
      navigate(user?.role === "admin" ? "/dashboard" : "/", { replace: true });
    }
  }, [isAuthenticated, isLoading, user, location, navigate]);

  return children;
};

export default Authentication;
