/*eslint-disable*/
import React from "react";
// API
import { ARTISTS } from "constants/api";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomInputSearchBar from "components/CustomInputSearchBar/CustomInputSearchBar.js";
import Snackbar from "components/Snackbar/Snackbar.js";

import productStyle from "assets/jss/material-kit-pro-react/views/productStyle.js";

// images
import cardProduct1 from "assets/img/examples/artist_1.jpg";
import cardProduct3 from "assets/img/examples/artist_2.jpg";
import cardProduct4 from "assets/img/examples/artist_3.jpg";
import cardProduct2 from "assets/img/examples/artist_4.jpg";

const useStyles = makeStyles(productStyle);

export default function GalleryPage() {
  const classes = useStyles();

  const [artists, setArtists] = React.useState([]);
  const [filteredArtists, setFilteredArtists] = React.useState([]);

  // notification alert
  const [notification, setNotification] = React.useState(false);
  const [message, setMessage] = React.useState("");

  // fetch code
  var codefetchArtists = 0;

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
      if(codefetchArtists === 200){
        setArtists(data);
        setFilteredArtists(data);
      }

      //}
    }).catch( err => {
      setMessage("The website encountered an unexpected error. Please try again later.");
      showNotification()
      //console.log(err);
    });

  };

  const onSearch = event => {
    const value = event.target.value;
    let request = artists;

    let matches = request.filter(item => {
      return (
        item.first_name.toLowerCase().includes(value.toLowerCase()) ||
        item.last_name.toLowerCase().includes(value.toLowerCase())

      );
    });

    if(value === ""){
      setFilteredArtists(artists);
    }
    else{
      setFilteredArtists(matches)
    }
  };

  return (
    <div className={classes.productPage}>
      <Header
        brand="CCT Art Gallery"
        links={<HeaderLinks dropdownHoverColor="warning" />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 100,
          color: "warning"
        }}
      />
      <Parallax
        image={require("assets/img/bg6.jpg")}
        filter="warning"
        className={classes.pageHeader}
      ></Parallax>
      <div className={classNames(classes.section, classes.sectionGray)}>
        <div className={classes.container}>
          <div className={classNames(classes.main, classes.mainRaised)}>
            <CustomInputSearchBar
              formControlProps={{
                fullWidth: true,
                className: classes.customFormControlClasses
              }}
              className={classes.customTextControlClasses}
              inputProps={{
                onChange: event => {
                  onSearch(event);
                },
                placeholder: "Search artist",
                autoFocus: true
              }}
            />
          </div>
          <div className={classes.relatedProducts}>
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
              {filteredArtists.map((artist, index) => (
                <GridItem key={index} sm={6} md={3}>
                  <Card product>
                    <CardHeader artist>
                      <a href="#top">
                        <img src={artist.photo} alt={artist.slug_name} />
                      </a>
                    </CardHeader>
                    <CardBody>
                      <h4 className={classes.cardTitle}>{artist.first_name + " " + artist.last_name}</h4>
                      <h6
                        className={classNames(
                          classes.cardWebsite
                        )}
                      >
                        {artist.website}
                      </h6>
                      <div className={classes.cardDescription}>
                        {artist.biography!=null && artist.biography.length>50  ? (
                          artist.biography.substring(0, 50)+"..."
                        ) : (
                          artist.biography
                        )}
                      </div>
                    </CardBody>
                  </Card>
                </GridItem>
              ))}
            </GridContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
