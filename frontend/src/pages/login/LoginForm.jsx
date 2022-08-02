import "../../styles/LoginForm.css";
import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import { userAuthContext } from "../../ContextAPI/isAuth";
import ERROR from "../../components/ERROR/ERROR";
export const LoginForm = () => {
  const [, setIsAuth] = useContext(userAuthContext);
  const [formErrors, setFormErrors] = useState({});
  const navigator = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ currentTarget: input }) => {
    setUser({ ...user, [input.name]: input.value });
  };
  const formValidation = (data) => {
    const error = {};
    const emailRegEx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const { email } = data;

    if (!emailRegEx.test(email)) error.email = "Email non valid";

    return error;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validator = formValidation(user);

    if (Object.keys(validator).length > 0) {
      setFormErrors(validator);
      return;
    }

    await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((result) => {
        // localStorage.setItem('userConnect', JSON.stringify(result));
        // let storage = JSON.parse(localStorage.getItem('userConnect'));
        if (result.token === undefined) {
          alert(
            "Utilisateur non identifié. Tentez de vous connecter à nouveau !"
          );
        } else {
          localStorage.setItem("user", JSON.stringify(result));
          navigator("/posts");
          setIsAuth(true);
        }
      });
  };
  return (
    <div className="login_form card">
      <h2 className="card-title">Login</h2>
      <form>
        {Object.keys(formErrors).length ? (
          <ERROR errorObject={formErrors} />
        ) : null}
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            name="email"
            onChange={handleChange}
            value={user.email}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
            value={user.password}
            required
          />
        </div>

        <div className="bottom_flex">
          <button
            type="submit"
            className="btn btn-primary px-5 mt-3"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
