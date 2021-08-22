import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { auth } from "../../Firebase";
import { toast } from "react-toastify";
import dev from "../../dev.json";
import { useHistory } from "react-router";
import { FaHome } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    padding: "70px 10px",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "400px", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const classes = useStyles();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: dev.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email}. Click the link to complete your registration.`
    );

    //savng mail to local Storage

    window.localStorage.setItem("Email", email);

    setEmail("");
  };

  return (
    <div>
      <div className={classes.paper}>
        {/* <img
            src={Med}
            alt="med"
            style={{ height: "200px", borderRadius: "50%" }}
          /> */}
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              //   fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="back-register"
              style={{
                // fontSize: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                backgroundColor: "#031956",
              }}
              onClick={(e) => history.push("/")}
            >
              <FaHome />{" "}
              <span style={{ paddingLeft: "10px" }}>Back to Home</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
