import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth";
import { AUTH } from '../../constants/actionTypes';

const initialState = { firstName: '', lastName: '', email: '', password:'', confirmPassword:'' }

const Auth = () => {
  const classes = useStyles();
  const user = false;
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isSignup){
        dispatch(signup(formData, navigate));

    }else {
        dispatch(signin(formData, navigate))

    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };


  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setIsSignup((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    console.log(res);
    navigate('/');

    try {
      dispatch({ type: AUTH, data: res });
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessful. Try Again Later");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />

                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          {user ? (
            <div className={classes.profile}>
              <Avatar
                className={classes.purple}
                alt={user.result?.name}
                src={user.result?.imageUrl}
              >
                {user.result?.name.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">
                {user.result?.name}
              </Typography>
              <Button
                variant="contained"
                className={classes.logout}
                color="secondary"
              >
                Logout
              </Button>
            </div>
          ) : (
            //<Button component={Link} to="/auth" variant="contained" color="primary" >Sign In</Button>
            <div className={classes.googleButton}>
                <GoogleLogin
                onSuccess={(response) => googleSuccess(response)}
                onError={(error) => googleFailure(error)}
            />
            </div>
          )}
          <Grid container justifyContent="center">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
