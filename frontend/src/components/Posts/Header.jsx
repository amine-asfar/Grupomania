import React, { useContext } from "react";
import "../../styles/Header.css";
import logo from "../../assets/icon-left-font-monochrome-white.png";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { userAuthContext } from "../../ContextAPI/isAuth";
function Header() {
  // const Auth = React.useContext(AuthApi);
  // const handleLogout=()=>{
  //     //localStorage.removeItem("token");
  //     //Auth.setAuth(false)
  // }
  const [, setIsAuth] = useContext(userAuthContext);
  const navigator = useNavigate();
  const handleLogout = () => {
    setIsAuth(false);
    localStorage.removeItem("user");
    navigator("/");
  };
  return (
    <div className="header">
      <div className="container d-flex flex-wrap justify-content-between align-items-center">
        <div className="header__left">
          <img src={logo} alt="logo-Groupomania" className="gm-logo" />
        </div>
        <div className="header__right">
          <button className="btn btn-danger" onClick={handleLogout}>
            <LogoutIcon />
            <span>Logout </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
