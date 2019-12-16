import React from "react";
// API
import { ARTISTS } from "constants/api";
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

  // IMAGE
  const [imageFile, setImageFile] = React.useState("");

  //API DATA
  const [artists, setArtists] = React.useState([]);

  //CREATE MODAL
  const [createModal, setCreateModal] = React.useState(false);
  const [createFirstName, setCreateFirstName] = React.useState("");
  const [createLastName, setCreateLastName] = React.useState("");
  const [createWebsite, setCreateWebsite] = React.useState("");
  const [createEmail, setCreateEmail] = React.useState("");
  const [createAddress, setCreateAddress] = React.useState("");
  const [createBio, setCreateBio] = React.useState("");

  //EDIT MODAL
  const [editModal, setEditModal] = React.useState(false);
  const [editSlugName, setEditSlugName] = React.useState("");
  const [editFirstName, setEditFirstName] = React.useState("");
  const [editLastName, setEditLastName] = React.useState("");
  const [editWebsite, setEditWebsite] = React.useState("");
  const [editEmail, setEditEmail] = React.useState("");
  const [editAddress, setEditAddress] = React.useState("");
  const [editBio, setEditBio] = React.useState("");

  //DETAIL MODAL
  const [detailModal, setDetailModal] = React.useState(false);
  const [detailArtist, setdetailArtist] = React.useState([]);

  //Alert
  const [alert, setAlert] = React.useState(null);

  // notification alert
  const [notification, setNotification] = React.useState(false);
  const [notificationSuccess, setNotificationSuccess] = React.useState(false);
  const [message, setMessage] = React.useState("");

  // fetch code
  var codefetchArtists = 0;
  var codedeleteArtists = 0;
  var codecreateArtist = 0;
  var codeeditArtist = 0;

  const getImage = file => {
    setImageFile(file);
  }

  React.useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = () => {
    fetch(ARTISTS, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        //console.log(response)
        codefetchArtists = response.status
        return response.json()
      })
      .then(data => {
        //console.log(data)
        if (codefetchArtists === 200) {
          setArtists(data);
        }

        //}
      }).catch(err => {
        setMessage("The website encountered an unexpected error. Please try again later.");
        showNotification()
        //console.log(err);
      });
  };

  const deleteArtist = artist => {
    hideAlert();
    const endpoint = ARTISTS + artist.slug_name + "/";
    fetch(endpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+localStorage.getItem('token')
        }
      })
      .then(response => {
        //console.log(response)
        codedeleteArtists = response.status
        return response
      })
      .then(data => {
        //console.log(data)
        if (codedeleteArtists === 204) {
          setMessage("Artist successfully deleted.");
          showNotification("success");
          fetchArtists();
        }
        else{
          setMessage("Error: "+ codedeleteArtists +". Please try again later.");
          showNotification("error")
        }

      }).catch(err => {
        setMessage("The website encountered an unexpected error. Please try again later.");
        showNotification("error")
        //console.log(err);
      });
  };

  const createArtist = (e) => {
    e.preventDefault();

    if (localStorage.getItem('username') === undefined) {
      setMessage("You must login to perform this action.");
      showNotification("error");
    }
    else if (createFirstName==="" || createLastName==="" || createWebsite==="" || createEmail==="" || createAddress==="" || createBio===""){
      setMessage("You must fill all the fields.");
      showNotification("error");
    }
    else {
      var data = {
        first_name: createFirstName,
        last_name: createLastName,
        website: createWebsite,
        email: createEmail,
        address: createAddress,
        biography: createBio
      };

      const formData  = new FormData();
      formData.append("data", JSON.stringify(data));
      if(imageFile!=""){
        formData.append("photo", imageFile);
      }

      fetch(ARTISTS, {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
          },
          body: formData
        })
        .then(response => {
          //console.log(response)
          codecreateArtist = response.status
          return response.json()
        })
        .then(data => {
          //console.log(data)
          if (codecreateArtist === 201) {
            fetchArtists();
            setMessage("Artist created successfully.");
            showNotification("success")
          }
          else{
            setMessage("Error: "+ codecreateArtist +". Please try again later.");
            showNotification("error")
          }
          hideCreateModal();
        }).catch(err => {
          setMessage("The website encountered an unexpected error. Please try again later.");
          showNotification("error")
          hideCreateModal();
          //console.log(err);
        });
    }
  }

  const updateArtist= (e) => {
    e.preventDefault();

    if (localStorage.getItem('username') === undefined) {
      setMessage("You must login to perform this action.");
      showNotification("error");
    }
    else if (editFirstName==="" || editLastName==="" || editWebsite==="" || editEmail==="" || editAddress==="" || editBio===""){
      setMessage("You must fill all the fields.");
      showNotification("error");
    }
    else {
      var data = {
        first_name: editFirstName,
        last_name: editLastName,
        website: editWebsite,
        email: editEmail,
        address: editAddress,
        biography: editBio
      };

      const formData  = new FormData();
      formData.append("data", JSON.stringify(data));

      const endpoint = ARTISTS + editSlugName + "/";

      fetch(endpoint, {
          method: "PUT",
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
          },
          body: formData
        })
        .then(response => {
          //console.log(response)
          codeeditArtist = response.status
          return response.json()
        })
        .then(data => {
          //console.log(data)
          if (codeeditArtist === 200) {
            fetchArtists();
            setMessage("Artist updated successfully.");
            showNotification("success")
          }
          else{
            setMessage("Error: "+ codeeditArtist +". Please try again later.");
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

  const handleEditModal = artist => {
    setEditFirstName(artist.first_name);
    setEditLastName(artist.last_name);
    setEditWebsite(artist.website);
    setEditEmail(artist.email);
    setEditAddress(artist.address);
    setEditBio(artist.biography);
    setEditSlugName(artist.slug_name);
    setImageFile(artist.photo);
    setEditModal(true);
  }

  const handleDetailModal = artist => {
    setdetailArtist(artist);
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

  const getArtists = () =>
    artists.map((artist, i) => {
      const { website, email } = artist;
      const artist_name = artist.first_name + " " + artist.last_name

      return {
        artist_name,
        website,
        email,
        actions: (
          <div className="actions-right">
          {/* use this button to show details */}
          <Button
            justIcon
            round
            simple
            onClick={() => handleDetailModal(artist)}
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
              onClick={() => handleEditModal(artist)}
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
              onClick={() => alertDeleteElement(artist)}
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

  const alertDeleteElement = artist => {
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title="Are you sure?"
        onConfirm={() => deleteArtist(artist)}
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
    setCreateFirstName("");
    setCreateLastName("");
    setCreateWebsite("");
    setCreateEmail("");
    setCreateAddress("");
    setCreateBio("");
    setImageFile("");
    setCreateModal(false);
  };

  const hideEditModal = () => {
    setEditFirstName("");
    setEditLastName("");
    setEditWebsite("");
    setEditEmail("");
    setEditAddress("");
    setEditBio("");
    setEditSlugName("");
    setImageFile("");
    setEditModal(false);
  };

  const hideDetailModal = () => {
    setDetailModal(false);
    setdetailArtist([]);
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
            <h4 className={classes.cardIconTitle}><strong>Artists</strong></h4>
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
              data={getArtists()}
              filterable
              columns={[
                {
                  Header: "Name",
                  accessor: "artist_name"
                },
                {
                  Header: "Website",
                  accessor: "website"
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
          <h4 className={classes.modalTitle}>Create Artist</h4>
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
                  <GridItem xs={12} sm={12} md={3}>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
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
                            labelText="Website"
                            id="website"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              onChange: event => {
                                setCreateWebsite(event.target.value);
                              },
                              value: createWebsite
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
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <CustomInput
                            labelText="Biography"
                            id="biography"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              onChange: event => {
                                setCreateBio(event.target.value);
                              },
                              value: createBio,
                              multiline: true,
                      				rows: 3
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
            onClick={(e) => createArtist(e)}
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
          <h4 className={classes.modalTitle}>Update Art Piece</h4>
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
                  <GridItem xs={12} sm={12} md={3}>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
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
                      preview
                      previewImage={imageFile}
                    />
                  </GridItem>
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
                            labelText="Website"
                            id="website_edit"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              onChange: event => {
                                setEditWebsite(event.target.value);
                              },
                              value: editWebsite
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
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <CustomInput
                            labelText="Biography"
                            id="biography_edit"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              onChange: event => {
                                setEditBio(event.target.value);
                              },
                              value: editBio,
                              multiline: true,
                      				rows: 3
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
            onClick={(e) => updateArtist(e)}
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
          <h4 className={classes.modalTitle}>{detailArtist.first_name + " " + detailArtist.last_name}</h4>
        </DialogTitle>
        <DialogContent
          id="notice-modal-slide-description"
          className={classes.modalBody}
        >
        <GridContainer>
          <GridItem md={12} sm={12}>
              <CardHeader image style={{marginTop: "10px"}} >
                <img src={detailArtist.photo} alt={detailArtist.slug_name}/>
              </CardHeader>
          </GridItem>
          <GridItem md={12} sm={12}>
            <Accordion active = {0}
              activeColor = "rose"
              collapses = {
                [{
                    title: "Biography",
                    content: (
                      <p>
                      {detailArtist.biography}
                      </p>
                    )
                  },
                  {
                    title: "Details",
                    content: (
                      <div>
                        <p style={{textAlign: "left"}}>Website: {detailArtist.website}</p>
                        <p style={{textAlign: "left"}}>Email: {detailArtist.email}</p>
                        <p style={{textAlign: "left"}}>Address: {detailArtist.address}</p>

                      </div>
                    )
                  }
                ]
              }
            />
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
