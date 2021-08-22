import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { auth } from "../../Firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { FaHome } from "react-icons/fa";

const useStyles = makeStyles(() => ({
  paper: {
    display: "flex",
    alignItems: "center",
    // height: "100vh",
    justifyContent: "center",
    padding: "70px 10px",
    flexDirection: "column",
    backgroundColor: "white",
    // border: "1px solid black",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    width: "400px", // Fix IE 11 issue.
  },
  submit: {
    margin: "20px",
  },
}));

export default function SignIn() {
  let dispatch = useDispatch();
  let history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    // setLoading(true);
    e.preventDefault();
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      console.log("User:", user.email);
      const idTokenResult = await user.getIdTokenResult();
      console.log("id: ", idTokenResult, user);
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      toast.dark(`Welcome ${user.email}`);
      history.push("/");
    } catch (error) {
      toast.error(error.message);
      //   setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className={classes.paper}>
        {/* <img
            src={Med}
            alt="med"
            style={{
              height: "200px",
            }}
          /> */}
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} id="login-form">
          <TextField
            variant="outlined"
            margin="normal"
            required
            label="Email Address"
            name="email"
            type="email"
            className="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            required
            name="password"
            label="Password"
            type="password"
            id="filled-password-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="200"
            className={classes.submit}
            disabled={!email || password.length < 8}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="back"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              width: "200px",
              backgroundColor: "#031956",
            }}
            onClick={(e) => history.push("/")}
          >
            <FaHome /> <span style={{ paddingLeft: "10px" }}>Back to Home</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
