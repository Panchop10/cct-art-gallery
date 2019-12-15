import React from "react";

// API
import { SIGNUP } from "constants/api";

import { withRouter } from 'react-router-dom';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import AddAlert from "@material-ui/icons/AddAlert";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import User from "@material-ui/icons/AccountCircle";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Snackbar from "components/Snackbar/Snackbar.js";

import styles from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";

const useStyles = makeStyles(styles);

function RegisterPage(props) {
  // register form
  const [username, setusername] = React.useState("");
  const [usernameState, setusernameState] = React.useState("");
  const [usernameExists, setUsernameExists] = React.useState(false);
  const [firstname, setfirstname] = React.useState("");
  const [firstnameState, setfirstnameState] = React.useState("");
  const [lastname, setlastname] = React.useState("");
  const [lastnameState, setlastnameState] = React.useState("");
  const [email, setemail] = React.useState("");
  const [emailState, setemailState] = React.useState("");
  const [emailExists, setEmailExists] = React.useState(false);
  const [password, setpassword] = React.useState("");
  const [passwordState, setpasswordState] = React.useState("");
  const [confirmPassword, setconfirmPassword] = React.useState("");
  const [confirmPasswordState, setconfirmPasswordState] = React.useState("");

  // notification alert
  const [notification, setNotification] = React.useState(false);
  const [message, setMessage] = React.useState("");

  // fetch code
  var code = 0;

  // function that returns true if value is email, false otherwise
  const verifyEmail = value => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  };
  // function that verifies if a string has a given length or not
  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };

  const submitRegister = () => {
    if (usernameState === "") {
      setusernameState("error");
    }
    if (firstnameState === "") {
      setfirstnameState("error");
    }
    if (lastnameState === "") {
      setlastnameState("error");
    }
    if (emailState === "") {
      setemailState("error");
    }
    if (passwordState === "") {
      setpasswordState("error");
    }
    if (confirmPasswordState === "") {
      setconfirmPasswordState("error");
    }

    //check all values are correct
    var c1 = usernameState === firstnameState;
    var c2 = lastnameState === emailState;
    var c3 = passwordState === confirmPasswordState;
    var c4 = usernameState === emailState;
    var c5 = emailState === confirmPasswordState;
    var c6 = confirmPasswordState === "success"
    if(c1 && c2 && c3 && c4 && c5 && c6){
      handleRegister()
    }
  };

  const handleRegister = () => {
    setUsernameExists(false);
    setEmailExists(false);

    var data = {
      username: username,
      first_name: firstname,
      last_name: lastname,
      email: email,
      password: password,
      password_confirmation: confirmPassword
    };

    fetch(SIGNUP, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      //console.log(response)
      code = response.status
      return response.json()
    })
    .then(data => {
      //console.log(data)
      if(code === 201){
        props.history.push({
          pathname: '/auth/login',
          state: { completed: true }
        })
      }

      if(data.username!==undefined){
        setMessage(data.username);
        setUsernameExists(true)
        showNotification()
      }
      if(data.email!==undefined){
        setMessage(data.email);
        setEmailExists(true)
        showNotification()
      }

      //}
    }).catch( err => {
      setMessage("The website encountered an unexpected error. Please try again later.");
      showNotification()
      console.log(err);
    });

  };

  const showNotification = () => {
    if (!notification) {
      setNotification(true);
      setTimeout(function() {
        setNotification(false);
      }, 6000);
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={7}>
          <Card className={classes.cardSignup}>
            <h2 className={classes.cardTitle}>Register</h2>
            <CardBody>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={12}>
                  <Snackbar
                        place="tc"
                        color="danger"
                        icon={AddAlert}
                        message={message}
                        open={notification}
                        closeNotification={() => setNotification(false)}
                        close
                      />
                  <form className={classes.form}>
                    <CustomInput
                      success={usernameState === "success"}
                      error={usernameState === "error" || usernameExists}
                      {...(usernameState==="error" ? {helperText: 'This field is required.'} : {})}
                      {...(usernameExists ? {helperText: 'A user with that username already exists.'} : {})}
                      id="username"
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses
                      }}
                      inputProps={{
                        onChange: event => {
                          if (verifyLength(event.target.value, 0)) {
                            setusernameState("success");
                          } else {
                            setusernameState("error");
                          }
                          setusername(event.target.value);
                        },
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.inputAdornment}
                          >
                            <User className={classes.inputAdornmentIcon} />
                          </InputAdornment>
                        ),
                        placeholder: "Username",
                        type: "text"
                      }}
                    />
                    <CustomInput
                      success={firstnameState === "success"}
                      error={firstnameState === "error"}
                      {...(firstnameState==="error" ? {helperText: 'This field is required.'} : {})}
                      id="firstname"
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses
                      }}
                      inputProps={{
                        onChange: event => {
                          if (verifyLength(event.target.value, 0)) {
                            setfirstnameState("success");
                          } else {
                            setfirstnameState("error");
                          }
                          setfirstname(event.target.value);
                        },
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.inputAdornment}
                          >
                            <Face className={classes.inputAdornmentIcon} />
                          </InputAdornment>
                        ),
                        placeholder: "First Name"
                      }}
                    />
                    <CustomInput
                      success={lastnameState === "success"}
                      error={lastnameState === "error"}
                      {...(lastnameState==="error" ? {helperText: 'This field is required.'} : {})}
                      id="lastname"
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses
                      }}
                      inputProps={{
                        onChange: event => {
                          if (verifyLength(event.target.value, 0)) {
                            setlastnameState("success");
                          } else {
                            setlastnameState("error");
                          }
                          setlastname(event.target.value);
                        },
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.inputAdornment}
                          >
                            <Face className={classes.inputAdornmentIcon} />
                          </InputAdornment>
                        ),
                        placeholder: "Last Name"
                      }}
                    />
                    <CustomInput
                      success={emailState === "success"}
                      error={emailState === "error" || emailExists}
                      {...(emailState==="error" ? {helperText: 'Invalid email address.'} : {})}
                      {...(emailExists ? {helperText: 'A user with that email already exists.'} : {})}
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses
                      }}
                      inputProps={{
                        onChange: event => {
                          if (verifyEmail(event.target.value)) {
                            setemailState("success");
                          } else {
                            setemailState("error");
                          }
                          setemail(event.target.value);
                        },
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.inputAdornment}
                          >
                            <Email className={classes.inputAdornmentIcon} />
                          </InputAdornment>
                        ),
                        type: "email",
                        placeholder: "Email"
                      }}
                    />
                    <CustomInput
                      success={passwordState === "success"}
                      error={passwordState === "error"}
                      {...(passwordState==="error" ? {helperText: 'This field is required and it has to be at least 8 characters.'} : {})}
                      id="password"
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses
                      }}
                      inputProps={{
                        onChange: event => {
                          if (verifyLength(event.target.value, 8)) {
                            setpasswordState("success");
                          } else {
                            setpasswordState("error");
                          }

                          if (event.target.value===confirmPassword) {
                            setconfirmPasswordState("success");
                          } else {
                            setconfirmPasswordState("error");
                          }
                          setpassword(event.target.value);
                        },
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.inputAdornment}
                          >
                            <Icon className={classes.inputAdornmentIcon}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        type: "password",
                        placeholder: "Password"
                      }}
                    />
                    <CustomInput
                      success={confirmPasswordState === "success"}
                      error={confirmPasswordState === "error"}
                      {...(confirmPasswordState==="error" ? {helperText: 'Password does not match.'} : {})}
                      id="confirmPassword"
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses
                      }}
                      inputProps={{
                        onChange: event => {
                          if (event.target.value===password) {
                            setconfirmPasswordState("success");
                          } else {
                            setconfirmPasswordState("error");
                          }
                          setconfirmPassword(event.target.value);
                        },
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.inputAdornment}
                          >
                            <Icon className={classes.inputAdornmentIcon}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        type: "password",
                        placeholder: "Confirm Password"
                      }}
                    />
                    <div className={classes.mTopCenter}>
                      <Button onClick={submitRegister} round color="info">
                        Submit
                      </Button>
                    </div>
                  </form>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default withRouter(RegisterPage);
