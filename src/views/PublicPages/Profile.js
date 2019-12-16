/*eslint-disable*/
import React from "react";

// API
import { USERS } from "constants/api";

// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import InputLabel from "@material-ui/core/InputLabel";
// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";
import AddAlert from "@material-ui/icons/AddAlert";

// core components
import Header from "components/Header/Header.js";

import Clearfix from "components/Clearfix/Clearfix.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Snackbar from "components/Snackbar/Snackbar.js";
import ImageUpload from "components/CustomUpload/ImageUpload.js";

import styles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";

// images
import avatar from "assets/img/default-avatar.png";

const useStyles = makeStyles(styles);

export default function GalleryPage() {
  const classes = useStyles();

  // IMAGE
  const [imageFile, setImageFile] = React.useState("");

  // form values
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [user, setUser] = React.useState([]);

  // notification alert
  const [notification, setNotification] = React.useState(false);
  const [notificationSuccess, setNotificationSuccess] = React.useState(false);
  const [message, setMessage] = React.useState("");

  // fetch code
  var codefetchUser = 0;
  var codeupdateUser = 0;

  const getImage = file => {
    setImageFile(file);
  }

  React.useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    if(localStorage.getItem('username')==undefined){
      setMessage("You must login to perform this action.");
      showNotification("error");
    }
    else{
      var endpoint = USERS+localStorage.getItem('username')+"/";

      fetch(endpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+localStorage.getItem('token')
        }
      })
      .then(response => {
        //console.log(response)
        codefetchUser = response.status
        return response.json()
      })
      .then(data => {
        //console.log(data)
        if(codefetchUser === 200){
          setEmail(data.email)
          setFirstName(data.first_name)
          setLastName(data.last_name)
          if(data.address!==null){
            setAddress(data.address)
          }
          setUser(data)
          //console.log(data)
        }
      }).catch( err => {
        setMessage("The website encountered an unexpected error. Please try again later.");
        showNotification("error")
        //console.log(err);
      });
    }
  };

  const updateUser = () => {
    if(localStorage.getItem('username')==undefined){
      setMessage("You must login to perform this action.");
      showNotification("error");
    }
    else{
      var data = {
        username: localStorage.getItem('username'),
        email: email,
        first_name: firstName,
        last_name: lastName,
        address: address
        // password: password,
        // password_confirmation: confirmPassword
      };

      const formData  = new FormData();
      formData.append("data", JSON.stringify(data));
      if(imageFile!=""){
        formData.append("photo", imageFile);
      }

      var endpoint = USERS+localStorage.getItem('username')+"/";

      fetch(endpoint, {
        method: "PUT",
        headers: {
            "Authorization": "Bearer "+localStorage.getItem('token')
        },
        body: formData
      })
      .then(response => {
        console.log(response)
        codeupdateUser = response.status
        return response.json()
      })
      .then(data => {
        console.log(data)
        if(codeupdateUser === 200){
          fetchUser();
          setMessage("User updated successfully.");
          showNotification("success")
        }
      }).catch( err => {
        setMessage("The website encountered an unexpected error. Please try again later.");
        showNotification("error")
        console.log(err);
      });
    }
  }

  const showNotification = type => {
    switch (type) {
      case "error":
        if (!notification) {
          setNotification(true);
          setTimeout(function() {
            setNotification(false);
          }, 4000);
        }
        break;
      case "success":
        if (!notificationSuccess) {
          setNotificationSuccess(true);
          setTimeout(function() {
            setNotificationSuccess(false);
          }, 4000);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className={classes.productPage}>
      <Header
        brand="CCT Art Gallery"
        links={<HeaderLinks dropdownHoverColor="warning" />}
        fixed
        color="warning"
      />
      <div className={classes.profileContent}>
        <GridContainer>
          <Snackbar
              place="bc"
              color="danger"
              icon={AddAlert}
              message={message}
              open={notification}
              closeNotification={() => setNotification(false)}
              close
          />
          <Snackbar
              place="bc"
              color="success"
              icon={AddAlert}
              message={message}
              open={notificationSuccess}
              closeNotification={() => setNotificationSuccess(false)}
              close
          />
          <GridItem xs={12} sm={12} md={2}>
            <Card profile>
              <CardAvatar profile>
                  <img src={user.photo===null ? avatar : user.photo} alt={user.username} />
              </CardAvatar>
              <CardBody profile>
                <h4 className={classes.cardTitle}>{user.first_name + " " + user.last_name}</h4>
                <h6
                  className={classNames(
                    classes.cardCategory,
                    classes.textRose
                  )}
                >
                  {user.username}
                </h6>
                <h6
                  className={classNames(
                    classes.cardCategory,
                    classes.textRose
                  )}
                >
                  {user.email}
                </h6>
                <p className={classes.description}>
                  {user.address}
                </p>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="warning" icon>
                <CardIcon color="warning">
                  <PermIdentity />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Edit Profile</h4>
              </CardHeader>
              <CardBody>
                  <GridContainer>
                  <GridItem xs={12} sm={12} md={2}>
                    <legend></legend>
                    <ImageUpload
                      avatar
                      addButtonProps={{
                        color: "info",
                        round: true
                      }}
                      changeButtonProps={{
                        color: "warning",
                        round: true
                      }}
                      removeButtonProps={{
                        color: "danger",
                        round: true
                      }}
                      parentImage={getImage}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={10}>
                    <GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <CustomInput
                            labelText="Email address"
                            id="email-address"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              onChange: event => {
                                setEmail(event.target.value);
                              },
                              value: email
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                          <CustomInput
                            labelText="First Name"
                            id="first-name"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              onChange: event => {
                                setFirstName(event.target.value);
                              },
                              value: firstName
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <CustomInput
                            labelText="Last Name"
                            id="last-name"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              onChange: event => {
                                setLastName(event.target.value);
                              },
                              value: lastName
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <CustomInput
                            labelText="Address"
                            id="address"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              onChange: event => {
                                setAddress(event.target.value);
                              },
                              value: address
                            }}
                          />
                        </GridItem>
                      </GridContainer>

                    </GridContainer>
                  </GridItem>
                </GridContainer>
                <Button
                  color="warning"
                  className={classes.updateProfileButton}
                  onClick={() => updateUser()}
                >
                  Update Profile
                </Button>
                <Clearfix />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
