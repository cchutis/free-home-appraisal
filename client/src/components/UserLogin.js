import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from '@material-ui/core/Button';
import UserIcon from '@material-ui/icons/AccountCircleTwoTone';
import SignUp from './SignUp';

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    width: "50%",
    height: "80%",
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none"
  }
}));


export default function UserLogin(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  // Temp logged in state
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUp, setSignUp] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSignUp(false)
  };

  const signOut = () => {
    setLoggedIn(false)
  }

  const resetForm = () => {
    setEmail("")
    setPassword("")
  }

  const signUpForm = (bool) => {
    setSignUp(bool)
  }

 
  function handleSubmit(email, password) {
    // console.log(email, password)
    if(email === 'constantinec84@gmail.com') {
      if(password === '123') {
        setLoggedIn(true)
        resetForm()
        setOpen(false)
        window.location.pathname = '/profile';
      } else {
        alert('Incorrect Password')
      }
    } else {
      alert('Email does not exist. Please create an account')
    }
  }



  return (
    <div id="user-container">
      {loggedIn ? <h2 className="greeting">Welcome, Constantine</h2> : null}
      {loggedIn ? 
      <Button className="user-login" color="secondary" variant="contained" style={{marginLeft: 20}} onClick={signOut} endIcon={<UserIcon />}>Log Out</Button>
      :
      <Button className="user-login" color="secondary" variant="contained" style={{marginLeft: 20}} onClick={handleOpen} endIcon={<UserIcon />}>Log In</Button>
      }
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div id="modal-container" className={classes.paper}>
            {signUp ? <SignUp signUpForm={signUpForm}/> :
            <div className="log-in">
              <h1 id="transition-modal-title">Welcome back!</h1>
              <p id="transition-modal-description">
                  <span><input className="form-item input-field" type="text" placeholder="Email Address" name="email" value={email} onChange={e => setEmail(e.target.value)} /></span>
                  <span><input className="form-item input-field"type="password" placeholder="Password" name="password" value={password} onChange={e => setPassword(e.target.value)} /></span>
                  <span><button className="form-item login-btn" onClick={() => handleSubmit(email, password)}>Log In</button><button className="form-item login-btn" onClick={() => signUpForm(true)}>Create Account</button></span>
              </p>
            </div>
            }
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
