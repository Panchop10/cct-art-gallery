import React from "react";
// API
import { ARTPIECES, ARTISTS, CATEGORIES } from "constants/api";
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
  const [artPieces, setArtPieces] = React.useState([]);
  const [artists, setArtists] = React.useState([]);
  const [categories, setCategories] = React.useState([]);

  //CREATE MODAL
  const [createModal, setCreateModal] = React.useState(false);
  const [createTitle, setCreateTitle] = React.useState("");
  const [createPrice, setCreatePrice] = React.useState("");
  const [createDesc, setCreateDesc] = React.useState("");
  //multiselect
  const [artistSelect, setArtistSelect] = React.useState("");
  const [categorySelect, setCategorySelect] = React.useState("");

  //EDIT MODAL
  const [editModal, setEditModal] = React.useState(false);
  const [editSlugName, setEditSlugName] = React.useState("");
  const [editTitle, setEditTitle] = React.useState("");
  const [editPrice, setEditPrice] = React.useState("");
  const [editDesc, setEditDesc] = React.useState("");
  //multiselect
  const [editArtistSelect, setEditArtistSelect] = React.useState("");
  const [editCategorySelect, setEditCategorySelect] = React.useState("");

  //DETAIL MODAL
  const [detailModal, setDetailModal] = React.useState(false);
  const [detailArtPiece, setdetailArtPiece] = React.useState([]);

  //Alert
  const [alert, setAlert] = React.useState(null);

  // notification alert
  const [notification, setNotification] = React.useState(false);
  const [notificationSuccess, setNotificationSuccess] = React.useState(false);
  const [message, setMessage] = React.useState("");

  // fetch code
  var codefetchArtPieces = 0;
  var codedeleteArtPiece = 0;
  var codefetchArtists = 0;
  var codefetchCategories = 0;
  var codecreateArtPiece = 0;
  var codeeditArtPiece = 0;

  const getImage = file => {
    setImageFile(file);
  }

  React.useEffect(() => {
    fetchArtPieces();
    fetchArtists();
    fetchCategories();
  }, []);

  const fetchArtPieces = () => {
    fetch(ARTPIECES, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        //console.log(response)
        codefetchArtPieces = response.status
        return response.json()
      })
      .then(data => {
        //console.log(data)
        if (codefetchArtPieces === 200) {
          setArtPieces(data);
        }

        //}
      }).catch(err => {
        setMessage("The website encountered an unexpected error. Please try again later.");
        showNotification()
        //console.log(err);
      });
  };

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

  const fetchCategories = () => {
    fetch(CATEGORIES, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        //console.log(response)
        codefetchCategories = response.status
        return response.json()
      })
      .then(data => {
        //console.log(data)
        if (codefetchCategories === 200) {
          setCategories(data);
        }

        //}
      }).catch(err => {
        setMessage("The website encountered an unexpected error. Please try again later.");
        showNotification()
        //console.log(err);
      });
  };

  const deleteArtPiece = artPiece => {
    hideAlert();
    const endpoint = ARTPIECES + artPiece.slug_name + "/";
    fetch(endpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+localStorage.getItem('token')
        }
      })
      .then(response => {
        //console.log(response)
        codedeleteArtPiece = response.status
        return response
      })
      .then(data => {
        //console.log(data)
        if (codedeleteArtPiece === 204) {
          setMessage("Art Piece successfully deleted.");
          showNotification("success");
          fetchArtPieces();
        }

      }).catch(err => {
        setMessage("The website encountered an unexpected error. Please try again later.");
        showNotification("error")
        //console.log(err);
      });
  };

  const createArtPiece = (e) => {
    e.preventDefault();

    if (localStorage.getItem('username') === undefined) {
      setMessage("You must login to perform this action.");
      showNotification("error");
    }
    else if (createTitle==="" || createPrice==="" || createDesc==="" || artistSelect==="" || categorySelect===""){
      setMessage("You must fill all the fields.");
      showNotification("error");
    }
    else {
      var data = {
        name: createTitle,
        description: createDesc,
        price: createPrice,
        category: categorySelect,
        artist: artistSelect,
        details: [],
        tags: []
      };

      const formData  = new FormData();
      formData.append("data", JSON.stringify(data));
      if(imageFile!=""){
        formData.append("photo", imageFile);
      }

      fetch(ARTPIECES, {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
          },
          body: formData
        })
        .then(response => {
          //console.log(response)
          codecreateArtPiece = response.status
          return response.json()
        })
        .then(data => {
          //console.log(data)
          if (codecreateArtPiece === 201) {
            fetchArtPieces();            
            setMessage("Art Piece created successfully.");
            showNotification("success")
          }
          hideCreateModal();
        }).catch(err => {
          setMessage("The website encountered an unexpected error. Please try again later.");
          showNotification("error")
          //console.log(err);
        });
    }
  }

  const updateArtPiece = (e) => {
    e.preventDefault();

    if (localStorage.getItem('username') === undefined) {
      setMessage("You must login to perform this action.");
      showNotification("error");
    }
    else if (editTitle==="" || editPrice==="" || editDesc==="" || editArtistSelect==="" || editCategorySelect===""){
      setMessage("You must fill all the fields.");
      showNotification("error");
    }
    else {
      var data = {
        name: editTitle,
        description: editDesc,
        price: editPrice,
        category: editCategorySelect,
        artist: editArtistSelect,
        details: [],
        tags: []
      };

      const formData  = new FormData();
      formData.append("data", JSON.stringify(data));

      const endpoint = ARTPIECES + editSlugName + "/";

      fetch(endpoint, {
          method: "PUT",
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
          },
          body: formData
        })
        .then(response => {
          //console.log(response)
          codeeditArtPiece = response.status
          return response.json()
        })
        .then(data => {
          //console.log(data)
          if (codeeditArtPiece === 200) {
            fetchArtPieces();
            hideEditModal();
            setMessage("Art Piece updated successfully.");
            showNotification("success")
          }
        }).catch(err => {
          setMessage("The website encountered an unexpected error. Please try again later.");
          showNotification("error")
          //console.log(err);
        });
    }
  }

  const handleEditModal = artPiece => {
    setEditTitle(artPiece.name);
    setEditPrice(artPiece.price);
    setEditDesc(artPiece.description);
    setEditArtistSelect(artPiece.artist.slug_name);
    setEditCategorySelect(artPiece.category.slug_name);
    setEditSlugName(artPiece.slug_name);
    setImageFile(artPiece.photo);
    setEditModal(true);
  }

  const handleDetailModal = artPiece => {
    setdetailArtPiece(artPiece);
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

  const getArtPieces = () =>
    artPieces.map((artPiece, i) => {
      const { name, category, artist, price } = artPiece;
      const category_name = category.name
      const artist_name = artist.first_name + " " + artist.last_name

      return {
        name,
        category_name,
        artist_name,
        price,
        actions: (
          <div className="actions-right">
          {/* use this button to show details */}
          <Button
            justIcon
            round
            simple
            onClick={() => handleDetailModal(artPiece)}
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
              onClick={() => handleEditModal(artPiece)}
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
              onClick={() => alertDeleteElement(artPiece)}
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

  const alertDeleteElement = artPiece => {
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title="Are you sure?"
        onConfirm={() => deleteArtPiece(artPiece)}
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
    setCreateTitle("");
    setCreatePrice("");
    setCreateDesc("");
    setArtistSelect("");
    setCategorySelect("");
    setImageFile("");
    setCreateModal(false);
  };

  const hideEditModal = () => {
    setEditTitle("");
    setEditPrice("");
    setEditDesc("");
    setEditArtistSelect("");
    setEditCategorySelect("");
    setEditSlugName("");
    setImageFile("");
    setEditModal(false);
  };

  const hideDetailModal = () => {
    setDetailModal(false);
    setdetailArtPiece([]);
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
            <h4 className={classes.cardIconTitle}><strong>Pieces of Art</strong></h4>
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
              data={getArtPieces()}
              filterable
              columns={[
                {
                  Header: "Name",
                  accessor: "name"
                },
                {
                  Header: "Category",
                  accessor: "category_name"
                },
                {
                  Header: "Artist",
                  accessor: "artist_name",
                },
                {
                  Header: "Price",
                  accessor: "price",
                  Cell: props => <div style={{textAlign:"right"}}>€{props.original.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</div>
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
          <h4 className={classes.modalTitle}>Create Art Piece</h4>
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
                          <FormControl
                            fullWidth
                            className={classes.selectFormControl}
                          >
                            <InputLabel
                              htmlFor="simple-select"
                              className={classes.selectLabel}
                            >
                              Choose Category
                            </InputLabel>
                            <Select
                              MenuProps={{
                                className: classes.selectMenu
                              }}
                              classes={{
                                select: classes.select
                              }}
                              value={categorySelect}
                              onChange={(e) => setCategorySelect(e.target.value)}
                              inputProps={{
                                name: "simpleSelect",
                                id: "simple-select"
                              }}
                            >
                              <MenuItem
                                disabled
                                classes={{
                                  root: classes.selectMenuItem
                                }}
                              >
                                Choose Category
                              </MenuItem>
                              {
                          			categories.map((category, index) => (
                                  <MenuItem
                                    key={index}
                                    classes={{
                                      root: classes.selectMenuItem,
                                      selected: classes.selectMenuItemSelected
                                    }}
                                    value={category.slug_name}
                                  >
                                    {category.name}
                                  </MenuItem>
                                ))
                              }
                            </Select>
                          </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <FormControl
                            fullWidth
                            className={classes.selectFormControl}
                          >
                            <InputLabel
                              htmlFor="simple-select"
                              className={classes.selectLabel}
                            >
                              Choose Artist
                            </InputLabel>
                            <Select
                              MenuProps={{
                                className: classes.selectMenu
                              }}
                              classes={{
                                select: classes.select
                              }}
                              value={artistSelect}
                              onChange={(e) => setArtistSelect(e.target.value)}
                              inputProps={{
                                name: "simpleSelect",
                                id: "simple-select"
                              }}
                            >
                              <MenuItem
                                disabled
                                classes={{
                                  root: classes.selectMenuItem
                                }}
                              >
                                Choose Artist
                              </MenuItem>
                              {
                                artists.map((artist, index) => (
                                  <MenuItem
                                    key={index}
                                    classes={{
                                      root: classes.selectMenuItem,
                                      selected: classes.selectMenuItemSelected
                                    }}
                                    value={artist.slug_name}
                                  >
                                    {artist.first_name + " " +artist.last_name}
                                  </MenuItem>
                                ))
                              }
                            </Select>
                          </FormControl>
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <CustomInput
                            labelText="Title"
                            id="title"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              onChange: event => {
                                setCreateTitle(event.target.value);
                              },
                              value: createTitle
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <CustomInput
                            labelText="Price"
                            id="price"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              onChange: event => {
                                setCreatePrice(event.target.value);
                              },
                              value: createPrice
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <CustomInput
                            labelText="Description"
                            id="description"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              onChange: event => {
                                setCreateDesc(event.target.value);
                              },
                              value: createDesc,
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
            onClick={(e) => createArtPiece(e)}
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
                          <FormControl
                            fullWidth
                            className={classes.selectFormControl}
                          >
                            <InputLabel
                              htmlFor="simple-select"
                              className={classes.selectLabel}
                            >
                              Choose Category
                            </InputLabel>
                            <Select
                              MenuProps={{
                                className: classes.selectMenu
                              }}
                              classes={{
                                select: classes.select
                              }}
                              value={editCategorySelect}
                              onChange={(e) => setEditCategorySelect(e.target.value)}
                              inputProps={{
                                name: "simpleSelect",
                                id: "simple-select"
                              }}
                            >
                              <MenuItem
                                disabled
                                classes={{
                                  root: classes.selectMenuItem
                                }}
                              >
                                Choose Category
                              </MenuItem>
                              {
                          			categories.map((category, index) => (
                                  <MenuItem
                                    key={index}
                                    classes={{
                                      root: classes.selectMenuItem,
                                      selected: classes.selectMenuItemSelected
                                    }}
                                    value={category.slug_name}
                                  >
                                    {category.name}
                                  </MenuItem>
                                ))
                              }
                            </Select>
                          </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <FormControl
                            fullWidth
                            className={classes.selectFormControl}
                          >
                            <InputLabel
                              htmlFor="simple-select"
                              className={classes.selectLabel}
                            >
                              Choose Artist
                            </InputLabel>
                            <Select
                              MenuProps={{
                                className: classes.selectMenu
                              }}
                              classes={{
                                select: classes.select
                              }}
                              value={editArtistSelect}
                              onChange={(e) => setEditArtistSelect(e.target.value)}
                              inputProps={{
                                name: "simpleSelect",
                                id: "simple-select"
                              }}
                            >
                              <MenuItem
                                disabled
                                classes={{
                                  root: classes.selectMenuItem
                                }}
                              >
                                Choose Artist
                              </MenuItem>
                              {
                                artists.map((artist, index) => (
                                  <MenuItem
                                    key={index}
                                    classes={{
                                      root: classes.selectMenuItem,
                                      selected: classes.selectMenuItemSelected
                                    }}
                                    value={artist.slug_name}
                                  >
                                    {artist.first_name + " " +artist.last_name}
                                  </MenuItem>
                                ))
                              }
                            </Select>
                          </FormControl>
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <CustomInput
                            labelText="Title"
                            id="title_edit"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              onChange: event => {
                                setEditTitle(event.target.value);
                              },
                              value: editTitle
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <CustomInput
                            labelText="Price"
                            id="price_edit"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              onChange: event => {
                                setEditPrice(event.target.value);
                              },
                              value: editPrice
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <CustomInput
                            labelText="Description"
                            id="description_edit"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              onChange: event => {
                                setEditDesc(event.target.value);
                              },
                              value: editDesc,
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
            onClick={(e) => updateArtPiece(e)}
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
          <h4 className={classes.modalTitle}>{detailArtPiece.name}</h4>
        </DialogTitle>
        <DialogContent
          id="notice-modal-slide-description"
          className={classes.modalBody}
        >
        <GridContainer>
          <GridItem md={12} sm={12}>
              <CardHeader image style={{marginTop: "10px"}} >
                <img src={detailArtPiece.photo} alt={detailArtPiece.slug_name}/>
              </CardHeader>
          </GridItem>
          <GridItem md={12} sm={12}>
            <Accordion active = {0}
              activeColor = "rose"
              collapses = {
                [{
                    title: "Description",
                    content: (
                      <p>
                      {detailArtPiece.description}
                      </p>
                    )
                  },
                  {
                    title: "Artist Information",
                    content: (
                      <div>
                        <p style={{textAlign: "left"}}>Name: {detailArtPiece.artist!==undefined && detailArtPiece.artist.first_name + " " + detailArtPiece.artist.last_name}</p>
                        <p style={{textAlign: "left"}}>Website: {detailArtPiece.artist!==undefined && detailArtPiece.artist.website}</p>
                        <p style={{textAlign: "left"}}>Email: {detailArtPiece.artist!==undefined && detailArtPiece.artist.email}</p>
                        <p style={{textAlign: "left"}}>Address: {detailArtPiece.artist!==undefined && detailArtPiece.artist.address}</p>
                        <p style={{textAlign: "left"}}>Biography: {detailArtPiece.artist!==undefined && detailArtPiece.artist.biography}</p>

                      </div>
                    )
                  },
                  {
                    title: "Details",
                    content: (
                      <div>
                        <p style={{textAlign: "left"}}>Category: {detailArtPiece.category!==undefined && detailArtPiece.category.name}</p>
                        <p style={{textAlign: "left"}}>Price: €{detailArtPiece.price!==undefined && detailArtPiece.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>

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
