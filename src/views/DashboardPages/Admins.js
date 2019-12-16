import React from "react";
// API
import { USERS } from "constants/api";
// react component used to create sweet alerts
import SweetAlert from "react-bootstrap-sweetalert";
// react component for creating dynamic tables
import ReactTable from "react-table";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// material-ui icons
import Assignment from "@material-ui/icons/Assignment";
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import AddAlert from "@material-ui/icons/AddAlert";
import Add from "@material-ui/icons/Add";
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import Search from "@material-ui/icons/Search";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import Snackbar from "components/Snackbar/Snackbar.js";
import ImageUpload from "components/CustomUpload/ImageUpload.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Accordion from "components/Accordion/Accordion.js";

import product1 from "assets/img/examples/ga_1.jpg";

import styles from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(styles);

export default function GalleryAdmin() {
  const classes = useStyles();

  //API DATA
  const [users, setUsers] = React.useState([]);

  //CREATE MODAL
  const [createModal, setCreateModal] = React.useState(false);
  const [createUsername, setCreateUsernamee] = React.useState("");
  const [createFirstName, setCreateFirstName] = React.useState("");
  const [createLastName, setCreateLastName] = React.useState("");
  const [createEmail, setCreateEmail] = React.useState("");
  const [createAddress, setCreateAddress] = React.useState("");
  const [createPassword, setCreatePassword] = React.useState("");
  const [createPasswordConf, setCreatePasswordConf] = React.useState("");

  //EDIT MODAL
  const [editModal, setEditModal] = React.useState(false);
  const [editSlugName, setEditSlugName] = React.useState("");
  const [editFirstName, setEditFirstName] = React.useState("");
  const [editLastName, setEditLastName] = React.useState("");
  const [editEmail, setEditEmail] = React.useState("");
  const [editAddress, setEditAddress] = React.useState("");

  //DETAIL MODAL
  const [detailModal, setDetailModal] = React.useState(false);
  const [detailUser, setdetailUser] = React.useState([]);

  //Alert
  const [alert, setAlert] = React.useState(null);

  // notification alert
  const [notification, setNotification] = React.useState(false);
  const [notificationSuccess, setNotificationSuccess] = React.useState(false);
  const [message, setMessage] = React.useState("");

  // fetch code
  var codefetchUsers = 0;
  var codedeleteUsers = 0;
  var codecreateUser = 0;
  var codeeditUser = 0;

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    const endpoint = USERS + "?is_admin=true"

    fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem('token')
        }
      })
      .then(response => {
        //console.log(response)
        codefetchUsers = response.status
        return response.json()
      })
      .then(data => {
        //console.log(data)
        if (codefetchUsers === 200) {
          setUsers(data);
        }
      }).catch(err => {
        setMessage("The website encountered an unexpected error. Please try again later.");
        showNotification()
        //console.log(err);
      });
  };

  const deleteUser = user => {
    hideAlert();
    const endpoint = USERS + user.username + "/";
    fetch(endpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+localStorage.getItem('token')
        }
      })
      .then(response => {
        //console.log(response)
        codedeleteUsers = response.status
        return response
      })
      .then(data => {
        //console.log(data)
        if (codedeleteUsers === 204) {
          setMessage("User successfully deleted.");
          showNotification("success");
          fetchUsers();
        }
        else{
          setMessage("Error: "+ codedeleteUsers +". Please try again later.");
          showNotification("error")
        }

      }).catch(err => {
        setMessage("The website encountered an unexpected error. Please try again later.");
        showNotification("error")
        //console.log(err);
      });
  };

  const createUser = (e) => {
    e.preventDefault();

    if (localStorage.getItem('username') === undefined) {
      setMessage("You must login to perform this action.");
      showNotification("error");
    }
    else if (createFirstName==="" || createLastName==="" || createEmail==="" || createAddress===""){
      setMessage("You must fill all the fields.");
      showNotification("error");
    }
    else {
      var data = {
        username: createUsername,
        first_name: createFirstName,
        last_name: createLastName,
        email: createEmail,
        address: createAddress,
        password: createPassword,
        password_confirmation: createPasswordConf
      };

      fetch(USERS+"admin/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')
          },
					body: JSON.stringify(data)
        })
        .then(response => {
          console.log(response)
          codecreateUser = response.status
          return response.json()
        })
        .then(data => {
          console.log(data)
          if (codecreateUser === 201) {
            fetchUsers();
            setMessage("User created successfully.");
            showNotification("success")
          }
          else{
            setMessage("Error: "+ codecreateUser +". Please try again later.");
            showNotification("error")
          }
          hideCreateModal();
        }).catch(err => {
          setMessage("The website encountered an unexpected error. Please try again later.");
          showNotification("error")
          hideCreateModal();
          console.log(err);
        });
    }
  }

  const updateUser = (e) => {
    e.preventDefault();

    if (localStorage.getItem('username') === undefined) {
      setMessage("You must login to perform this action.");
      showNotification("error");
    }
    else if (editFirstName==="" || editLastName==="" || editEmail==="" || editAddress===""){
      setMessage("You must fill all the fields.");
      showNotification("error");
    }
    else {
      var data = {
        username: editSlugName,
        first_name: editFirstName,
        last_name: editLastName,
        email: editEmail,
        address: editAddress
      };

      const formData  = new FormData();
      formData.append("data", JSON.stringify(data));

      const endpoint = USERS + editSlugName + "/";

      fetch(endpoint, {
          method: "PUT",
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
          },
          body: formData
        })
        .then(response => {
          //console.log(response)
          codeeditUser = response.status
          return response.json()
        })
        .then(data => {
          //console.log(data)
          if (codeeditUser === 200) {
            fetchUsers();
            setMessage("User updated successfully.");
            showNotification("success")
          }
          else{
            setMessage("Error: "+ codeeditUser +". Please try again later.");
            showNotification("error")
          }
          hideEditModal();

        }).catch(err => {
          setMessage("The website encountered an unexpected error. Please try again later.");
          showNotification("error")
          hideEditModal();
          //console.log(err);
        });
    }
  }

  const handleEditModal = user => {
    setEditFirstName(user.first_name!=null ? user.first_name : "");
    setEditLastName(user.last_name!=null ? user.last_name : "");
    setEditEmail(user.email);
    setEditAddress(user.address!=null ? user.address : "");
    setEditSlugName(user.username);
    setEditModal(true);
  }

  const handleDetailModal = user => {
    setdetailUser(user);
    setDetailModal(true);
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

  const getUsers = () =>
    users.map((user, i) => {
      const { email } = user;
      const user_name = user.first_name + " " + user.last_name

      return {
        user_name,
        email,
        actions: (
          <div className="actions-right">
          {/* use this button to show details */}
          <Button
            justIcon
            round
            simple
            onClick={() => handleDetailModal(user)}
            color="info"
            className="edit"
          >
            <Search />
          </Button>{" "}
            {/* use this button to add a edit kind of action */}
            <Button
              justIcon
              round
              simple
              onClick={() => handleEditModal(user)}
              color="warning"
              className="edit"
            >
              <Edit />
            </Button>{" "}
            {/* use this button to remove the data row */}
            <Button
              justIcon
              round
              simple
              onClick={() => alertDeleteElement(user)}
              color="danger"
              className="remove"
            >
              <Close />
            </Button>{" "}
          </div>
        )
      };
    }
  );

  const alertDeleteElement = user => {
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title="Are you sure?"
        onConfirm={() => deleteUser(user)}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classes.button + " " + classes.success}
        cancelBtnCssClass={classes.button + " " + classes.danger}
        confirmBtnText="Yes, delete it!"
        cancelBtnText="Cancel"
        showCancel
      >
        You will not be able to recover this element!
      </SweetAlert>
    );
  };

  const hideAlert = () => {
    setAlert(null);
  };

  const hideCreateModal = () => {
    setCreateUsernamee("");
    setCreateFirstName("");
    setCreateLastName("");
    setCreateEmail("");
    setCreateAddress("");
    setCreatePassword("");
    setCreatePasswordConf("");
    setCreateModal(false);
  };

  const hideEditModal = () => {
    setEditFirstName("");
    setEditLastName("");
    setEditEmail("");
    setEditAddress("");
    setEditSlugName("");
    setEditModal(false);
  };

  const hideDetailModal = () => {
    setDetailModal(false);
    setdetailUser([]);
  }

  return (
    <GridContainer>
      {alert}
      <Snackbar
          place="tc"
          color="danger"
          icon={AddAlert}
          message={message}
          open={notification}
          closeNotification={() => setNotification(false)}
          close
      />
      <Snackbar
          place="tc"
          color="success"
          icon={AddAlert}
          message={message}
          open={notificationSuccess}
          closeNotification={() => setNotificationSuccess(false)}
          close
      />
      <GridItem xs={12}>
        <Card>
          <CardHeader color="warning" icon>
            <CardIcon color="success">
              <Assignment />
            </CardIcon>
            <h4 className={classes.cardIconTitle}><strong>Admins</strong></h4>
          </CardHeader>

          <GridContainer>
            <GridItem md={11}>
            </GridItem>
            <GridItem md={1} style={{textAlign:"center", marginTop:"10px"}}>
              <Button
                justIcon
                round
                fullWidth
                size="lg"
                color="success"
                onClick={() => setCreateModal(true)}
              >
                < Add / >
              </Button>
            </GridItem>
          </GridContainer>

          <CardBody>
            <ReactTable
              data={getUsers()}
              filterable
              columns={[
                {
                  Header: "Name",
                  accessor: "user_name"
                },
                {
                  Header: "Email",
                  accessor: "email",
                },
                {
                  Header: "Actions",
                  accessor: "actions",
                  sortable: false,
                  filterable: false
                }
              ]}
              defaultPageSize={10}
              showPaginationBottom={true}
              className="-striped -highlight"
            />
          </CardBody>
        </Card>
      </GridItem>
      <Dialog
        classes={{
          root: classes.center + " " + classes.modalRoot,
          paper: classes.modal
        }}
        open={createModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => hideCreateModal()}
        aria-labelledby="notice-modal-slide-title"
        aria-describedby="notice-modal-slide-description"
      >
        <DialogTitle
          id="notice-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <Button
            justIcon
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            color="transparent"
            onClick={() => hideCreateModal()}
          >
            <Close className={classes.modalClose} />
          </Button>
          <h4 className={classes.modalTitle}>Create User</h4>
        </DialogTitle>
        <DialogContent
          id="notice-modal-slide-description"
          className={classes.modalBody}
        >
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardBody>
                  <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                          <CustomInput
                            labelText="First Name"
                            id="first_name"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              onChange: event => {
                                setCreateFirstName(event.target.value);
                              },
                              value: createFirstName
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <CustomInput
                            labelText="Last Name"
                            id="last_name"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              onChange: event => {
                                setCreateLastName(event.target.value);
                              },
                              value: createLastName
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <CustomInput
                            labelText="Username"
                            id="username"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              onChange: event => {
                                setCreateUsernamee(event.target.value);
                              },
                              value: createUsername
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <CustomInput
                            labelText="Email"
                            id="email"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              onChange: event => {
                                setCreateEmail(event.target.value);
                              },
                              value: createEmail
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                          <CustomInput
                            labelText="Password"
                            id="password"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              onChange: event => {
                                setCreatePassword(event.target.value);
                              },
                              value: createPassword,
                              type: "password"
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <CustomInput
                            labelText="Password Confirmation"
                            id="password_confirmation"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              onChange: event => {
                                setCreatePasswordConf(event.target.value);
                              },
                              value: createPasswordConf,
                              type: "password"
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
                                setCreateAddress(event.target.value);
                              },
                              value: createAddress
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                    </GridContainer>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        </DialogContent>
        <DialogActions
          className={
            classes.modalFooter + " " + classes.modalFooterCenter
          }
        >
          <Button
            onClick={(e) => createUser(e)}
            color="success"
            round
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        classes={{
          root: classes.center + " " + classes.modalRoot,
          paper: classes.modal
        }}
        open={editModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => hideEditModal()}
        aria-labelledby="notice-modal-slide-title"
        aria-describedby="notice-modal-slide-description"
      >
        <DialogTitle
          id="notice-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <Button
            justIcon
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            color="transparent"
            onClick={() => hideEditModal()}
          >
            <Close className={classes.modalClose} />
          </Button>
          <h4 className={classes.modalTitle}>Update Admin User</h4>
        </DialogTitle>
        <DialogContent
          id="notice-modal-slide-description"
          className={classes.modalBody}
        >
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardBody>
                  <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                          <CustomInput
                            labelText="First Name"
                            id="first_name_edit"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              onChange: event => {
                                setEditFirstName(event.target.value);
                              },
                              value: editFirstName
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <CustomInput
                            labelText="Last Name"
                            id="last_name_edit"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              onChange: event => {
                                setEditLastName(event.target.value);
                              },
                              value: editLastName
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <CustomInput
                            labelText="Email"
                            id="email_edit"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              onChange: event => {
                                setEditEmail(event.target.value);
                              },
                              value: editEmail
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <CustomInput
                            labelText="Address"
                            id="address_edit"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              onChange: event => {
                                setEditAddress(event.target.value);
                              },
                              value: editAddress
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                    </GridContainer>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        </DialogContent>
        <DialogActions
          className={
            classes.modalFooter + " " + classes.modalFooterCenter
          }
        >
          <Button
            onClick={(e) => updateUser(e)}
            color="success"
            round
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        classes={{
          root: classes.center + " " + classes.modalRoot,
          paper: classes.modal
        }}
        open={detailModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => hideDetailModal()}
        aria-labelledby="notice-modal-slide-title"
        aria-describedby="notice-modal-slide-description"
      >
        <DialogTitle
          id="notice-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <Button
            justIcon
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            color="transparent"
            onClick={() => hideDetailModal()}
          >
            <Close className={classes.modalClose} />
          </Button>
          <h4 className={classes.modalTitle}>{detailUser.first_name + " " + detailUser.last_name}</h4>
        </DialogTitle>
        <DialogContent
          id="notice-modal-slide-description"
          className={classes.modalBody}
        >
        <GridContainer>
          <GridItem md={12} sm={12}>
            <div>
              <p style={{textAlign: "left"}}>Email: {detailUser.email}</p>
              <p style={{textAlign: "left"}}>Address: {detailUser.address}</p>
            </div>
          </GridItem>
        </GridContainer>
        </DialogContent>
        <DialogActions
          className={
            classes.modalFooter + " " + classes.modalFooterCenter
          }
        >
          <Button
            onClick={() => hideDetailModal()}
            color="danger"
            round
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </GridContainer>
  );
}
