import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { auth } from "../../Firebase";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
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

export default function Registercomplete() {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    setEmail(window.localStorage.getItem("Email"));
  }, []);

  const classes = useStyles();
  const handleSubmit = async (e) => {
    e.preventDefault();
    //Validating

    if (!email || !password) {
      toast.error("Email and Password is Required");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at leaast 8 characters long ");
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      //   console.log("RESULT", result);
      if (result.user.emailVerified) {
        //removing mail from localStorage
        window.localStorage.removeItem("Email");
        //receiving user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        //redux store

        //redirect
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
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
          Complete Registration
        </Typography>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email Address"
                  disabled
                  value={email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              Registration Complete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
