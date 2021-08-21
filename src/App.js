import React, { useEffect } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./component/home/Home";
import Nav from "./component/nav/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import Registercomplete from "./component/auth/Registercomplete";

import { auth } from "./Firebase";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
      }
    });
    //cleanup
    return () => unsuscribe();
  }, []);
  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <Switch>
          <Route path="/" exact>
            <Nav />
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/register/complete">
            <Registercomplete />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
