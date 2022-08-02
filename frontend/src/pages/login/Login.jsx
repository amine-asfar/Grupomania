import { useContext, useEffect } from "react";
import "../../styles/Login.css";
import HeaderLogin from "./HeaderLogin";
import { LoginForm } from "./LoginForm";
import { userAuthContext } from "../../ContextAPI/isAuth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isAuth] = useContext(userAuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) {
      navigate("/posts");
    }
  }, [isAuth, navigate]);
  return (
    <div>
      <HeaderLogin />
      <div className="login_body">{<LoginForm />}</div>
    </div>
  );
}

export default Login;
