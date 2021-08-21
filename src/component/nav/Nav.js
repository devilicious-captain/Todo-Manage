import React from "react";
import { auth } from "../../Firebase";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { FaBell } from "react-icons/fa";
import "./Nav.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { FcTodoList } from "react-icons/fc";

function Nav() {
  let dispatch = useDispatch();
  let history = useHistory();
  const logout = () => {
    auth.signOut();
    dispatch({
      type: "LOGOUT",
      payload: [],
    });
    history.push("/login");
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
        {/* {console.log("user-token", user.user.token)} */}
        {user.user.token ? (
          <>
            <div className="Bell">
              <FaBell />
            </div>{" "}
            <div className="Logout" onClick={logout}>
              Logout
            </div>
          </>
        ) : (
          <>
            {" "}
            <Link to="/login">
              <div
                className="Login"
                style={{ color: "white", textDecoration: "none" }}
              >
                Login
              </div>
            </Link>
            <Link
              to="/register"
              style={{ color: "white", textDecoration: "none" }}
            >
              <div className="Signup">Signup</div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
