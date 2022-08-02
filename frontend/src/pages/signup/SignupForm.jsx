import { useState } from "react";
import ERROR from "../../components/ERROR/ERROR";
import { useNavigate } from "react-router-dom";
import "../../styles/SignupForm.css";
function SignupForm() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const navigator = useNavigate();
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const formValidation = (data) => {
    const error = {};
    const emailRegEx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const { firstName, lastName, userName, email, password, confirmPassword } =
      data;

    if (firstName.length < 4 || firstName.length > 10)
      error.firstName = "Nom non valid";
    if (lastName.length < 4 || lastName.length > 10)
      error.lastName = "Prénom non valid";
    if (userName.length < 4 || userName.length > 18)
      error.userName = "Username non valid";
    if (!emailRegEx.test(email)) error.email = "Email non valid";
    if (password.length < 8 || password.length > 40)
      error.password = "Veuillez entrer une mot de passe supérieur à 8";
    if (confirmPassword !== password)
      error.confirmPassword = "Veuillez confirmer le mot de passe";

    return error;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validator = formValidation(data);

    if (Object.keys(validator).length > 0) {
      setFormErrors(validator);
      return;
    }

    await fetch("http://localhost:8080/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch((error) => {
      window.alert(error);
      return;
    });
    navigator("/login");
  };

  return (
    <div className="signup_form card">
      <h2>New Account</h2>

      <form onSubmit={handleSubmit}>
        {Object.keys(formErrors).length ? (
          <ERROR errorObject={formErrors} />
        ) : null}
        <div className="first_last_name">
          <div className="mb-3">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="mb-3">
          <label>User Name</label>
          <input
            type="text"
            name="userName"
            onChange={handleChange}
            value={data.userName}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={data.email}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={data.password}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            value={data.confirmPassword}
            required
            className="form-control"
          />
        </div>

        <div className="bottom_flex">
          <button type="submit" className="btn btn-primary px-4 mt-3">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
