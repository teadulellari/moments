import React, { useState, useEffect } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography} from '@material-ui/core'
import useStyles from './styles';
import moments from '../../images/moments.png';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import * as actionType from '../../constants/actionTypes';





const Navbar = () => {

  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
   console.log(user);
   const dispatch = useDispatch();
   const location = useLocation();
   const navigate = useNavigate();

   const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    navigate.push('/auth');

    setUser(null);
  };
 
    return(
  <AppBar className={classes.appBar} position="static" color="inherit">
    <div className={classes.brandContainer}>
    <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
      Moments
    </Typography>
    <img className={classes.image} src={moments} alt="moments" height="60" />
    </div>
    <Toolbar className={classes.toolbar}>
    {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
    </Toolbar>

  </AppBar>
    )
}


export default Navbar;