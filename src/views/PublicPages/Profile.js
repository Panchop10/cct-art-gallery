/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import InputLabel from "@material-ui/core/InputLabel";
// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";

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

import styles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";

// images
import avatar from "assets/img/faces/marc.jpg";

const useStyles = makeStyles(styles);

export default function GalleryPage() {
  const classes = useStyles();
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
                  <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                      labelText="Username"
                      id="username"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={7}>
                    <CustomInput
                      labelText="Email address"
                      id="email-address"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Full Name"
                      id="full-name"
                      formControlProps={{
                        fullWidth: true
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
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: "#AAAAAA", marginTop: "30px" }}>
                      About me
                    </InputLabel>
                    <CustomInput
                      labelText="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
                      id="about-me"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <Button color="warning" className={classes.updateProfileButton}>
                  Update Profile
                </Button>
                <Clearfix />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={avatar} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h4 className={classes.cardTitle}>Alec Thompson</h4>
                <p className={classes.description}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  tincidunt consequat lacus, quis facilisis quam cursus ut.
                  Nulla ut feugiat mauris. Etiam luctus ullamcorper hendrerit.
                  Pellentesque nec justo eu eros iaculis bibendum a non felis.
                  Duis convallis, enim id condimentum condimentum, ipsum ante
                  tristique dui, in maximus libero mi commodo sapien. Cras
                  rhoncus, erat vel tempor sagittis, quam erat ultricies elit,
                  sed fermentum est purus at purus. Curabitur feugiat ligula
                  odio, vitae vulputate ipsum egestas sit amet. Class aptent
                  taciti sociosqu ad litora torquent per conubia nostra, per
                  inceptos himenaeos.
                </p>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
