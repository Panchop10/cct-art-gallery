import React from "react";

// API
import { LOGIN } from "constants/api";

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import AddAlert from "@material-ui/icons/AddAlert";

// @material-ui/icons
import Email from "@material-ui/icons/Email";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import Snackbar from "components/Snackbar/Snackbar.js";

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";

const useStyles = styles;


class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardAnimaton: "cardHidden",
      registered: false,
      notification: false,
      message: "",
      email: "",
      password: "",

      //form error
      email_err: false,
      email_msg_err: "",
      password_err: false,
      password_msg_err: "",

    };
  }

  componentDidMount() {
    this.checkRegistered()
    this.checkActiveSession()


    this.is_mounted = true;
    setTimeout(
      function() {
          if(this.is_mounted){
            this.setState({cardAnimaton: ""});
          }
      }
      .bind(this),
      200
   );
  }

  componentWillUnmount() {
    this.is_mounted = false;
  }

  submitForm = e => {
    e.preventDefault();

    this.setState({
      email_err: false,
      email_msg_err: "",
      password_err: false,
      password_msg_err: ""
    });
    if(this.state.email !== "" && this.state.password !== ""){
      this.fetchData();
    }
    if(this.state.email === "") {
      this.setState({
        email_err: true,
        email_msg_err: "This field is required."
      });
    }
    if(this.state.password === "") {
      this.setState({
        password_err: true,
        password_msg_err: "This field is required."
      });
    }
  }

  fetchData = () => {
    var data = {
      email: this.state.email,
      password: this.state.password
    };

    fetch(LOGIN, {
      method: "post",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      this.code = response.status;
      return response.json()
    })
    .then(data => {
      if(this.code === 200){
        localStorage.setItem('token', data.access);
        localStorage.setItem('refresh', data.refresh);
        localStorage.setItem('username', data.username);
        localStorage.setItem('admin', data.admin);

        if(data.admin){
          this.props.history.push({
            pathname: '/admin',
            state: { completed: false }
          })
        }
        else{
          this.props.history.push({
            pathname: '/home',
            state: { completed: false }
          })
        }
      }
      else{
        //console.log(data)
        this.setState({message: data.detail})
        this.showNotification("error")
      }
    }).catch( err => {
      this.setState({message: "The website encountered an unexpected error. Please try again later."})
      this.showNotification("error")
      //console.log(err);
    });

  };

  showNotification = type => {
    switch (type) {
      case "error":
        if (!this.state.notification) {
          this.setState({notification: true})
          setTimeout(
            function() {
                this.setState({notification: false});
            }
            .bind(this),
            4000
         );
        }
        break;
      case "success":
        if (!this.state.registered) {
          this.setState({
              message: "You have successfully registered. You can now login",
              registered: true
            })
          setTimeout(
            function() {
                this.setState({registered: false});
            }
            .bind(this),
            4000
         );
        }
        break;
      default:
        break;
    }
  };

  checkRegistered = () => {
    if(this.props.location.state!==undefined){
      if(this.props.location.state.completed===true){
        this.showNotification("success")
      }
    }
  }

  checkActiveSession = () => {
    if(localStorage.getItem("admin") !== null){
      if(localStorage.getItem("admin")==="true"){
        this.props.history.push('/admin');
      }
      if(localStorage.getItem("admin")==="false"){
        this.props.history.push('/home');
      }
    }
  }

  render(){
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <GridContainer justify="center">
            <Snackbar
              place="tc"
              color="danger"
              icon={AddAlert}
              message={this.state.message}
              open={this.state.notification}
              closeNotification={() => this.setState({notification: false})}
              close
            />
            <Snackbar
              place="tc"
              color="success"
              icon={AddAlert}
              message={this.state.message}
              open={this.state.registered}
              closeNotification={() => this.setState({registered: false})}
              close
            />
          <GridItem xs={12} sm={6} md={4}>
            <form onSubmit={this.submitForm}>
              <Card login className={classes[this.state.cardAnimaton]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="info"
                >
                  <h4 className={classes.cardTitle}>Log in</h4>
                </CardHeader>
                <CardBody>
                  <CustomInput
                    labelText="Email"
                    id="email"
                    error={this.state.email_err}
                    helperText={this.state.email_msg_err}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      ),
                      onChange: event => {
                         this.setState({email: event.target.value})
                      },
                      type: "email",
                    }}
                  />
                  <CustomInput
                    labelText="Password"
                    id="password"
                    error={this.state.password_err}
                    helperText={this.state.password_msg_err}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputAdornmentIcon}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      ),
                      onChange: event => {
                         this.setState({password: event.target.value})
                      },
                      type: "password",
                      autoComplete: "off"
                    }}
                  />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button type="submit" color="info" simple size="lg" block>
                    Enter
                  </Button>
                  {/*
                  <NavLink to={"/home"}>
                    <Button color="info" simple size="lg" block>
                      User
                    </Button>
                  </NavLink>
                  <NavLink to={"/admin"}>
                    <Button color="info" simple size="lg" block>
                      Admin
                    </Button>
                  </NavLink>
                  */}
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(useStyles)(LoginPage)
