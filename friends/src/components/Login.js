import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    width: "50%",
    margin: "0 auto"
  },
  margin: {
    margin: theme.spacing(1)
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    width: "25ch"
  }
}));

const Login = props => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
      username: '',
      password: ''
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      props.history.push("/dashboard");
    }
  }, []);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const login = e => {
    e.preventDefault();
    setIsLoading(true);
    const user = {
      username: "Lambda School",
      password: "i<3Lambd4"
    };
    axios.post("http://localhost:5000/api/login", user).then(res => {
      console.log(res.data);
      localStorage.setItem("token", res.data.payload);
      setIsLoading(false);
      props.history.push("/dashboard");
    });
  };

  return (
    <form className={classes.root} onSubmit={login}>
      <h1 className={classes.margin}>Login</h1>
      <FormControl className={classes.margin} fullWidth variant="outlined">
        <InputLabel htmlFor="username">Username</InputLabel>
        <OutlinedInput
          onChange={handleChange}
          name="username"
          id="username"
          value={input.username}
        />
      </FormControl>
      <FormControl className={classes.margin} fullWidth variant="outlined">
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          id="password"
          name="password"
          value={input.password}
          type={showPassword ? "text" : "password"}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleShowPassword}
                aria-label="toggle password visibility"
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Button
          className={classes.margin}
          variant="contained"
          color="secondary"
          type="submit"
        >
          Login
        </Button>
      )}
    </form>
  );
};

export default Login;
