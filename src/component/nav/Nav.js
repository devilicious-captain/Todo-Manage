import React from "react";
import { auth } from "../../Firebase";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./Nav.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { FcTodoList } from "react-icons/fc";
import { BiUser, BiUserPlus } from "react-icons/bi";
import { HiLogout } from "react-icons/hi";
import { toast } from "react-toastify";

function Nav() {
  let dispatch = useDispatch();
  let history = useHistory();
  const logout = () => {
    auth.signOut();
    dispatch({
      type: "LOGOUT",
      payload: [],
    });
    toast.dark("Logout Successfully!");
    history.push("/");
  };
  const { user } = useSelector((state) => state);
  console.log("users : ", user);

  return (
    <div className="nav">
      <div className="nav-logo">
        <FcTodoList />
      </div>
      <div className="nav-mid" />
      <div className="nav-links">
        {user.user.token ? (
          <>
            <div className="Logout" onClick={logout}>
              <HiLogout size="25px" /> Logout
            </div>
          </>
        ) : (
          <>
            {" "}
            <Link
              to="/login"
              style={{ color: "white", textDecoration: "none" }}
            >
              <div className="Login">
                <BiUser size="30px" />
                Login
              </div>
            </Link>
            <Link
              to="/register"
              style={{ color: "white", textDecoration: "none" }}
            >
              <div className="Signup">
                <BiUserPlus size="30px" />
                Register
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
