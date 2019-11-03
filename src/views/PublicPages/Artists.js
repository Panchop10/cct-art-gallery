/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
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

import productStyle from "assets/jss/material-kit-pro-react/views/productStyle.js";

// images
import cardProduct1 from "assets/img/examples/artist_1.jpg";
import cardProduct3 from "assets/img/examples/artist_2.jpg";
import cardProduct4 from "assets/img/examples/artist_3.jpg";
import cardProduct2 from "assets/img/examples/artist_4.jpg";

const useStyles = makeStyles(productStyle);

export default function GalleryPage() {
  const classes = useStyles();
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
                placeholder: "Search artist",
                autoFocus: true
              }}
            />
          </div>
          <div className={classes.relatedProducts}>
            <GridContainer>
              <GridItem sm={6} md={3}>
                <Card product>
                  <CardHeader artist>
                    <a href="#top">
                      <img src={cardProduct1} alt="cardProduct" />
                    </a>
                  </CardHeader>
                  <CardBody>
                    <h4 className={classes.cardTitle}>Li Wan</h4>
                    <div className={classes.cardDescription}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Cras vitae eros quis tellus congue malesuada at sagittis
                      sapien.
                    </div>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem sm={6} md={3}>
                <Card product>
                  <CardHeader artist>
                    <a href="#top">
                      <img src={cardProduct2} alt="cardProduct" />
                    </a>
                  </CardHeader>
                  <CardBody>
                    <h4 className={classes.cardTitle}>Mohammed Sulim</h4>
                    <div className={classes.cardDescription}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Cras vitae eros quis tellus congue malesuada at sagittis
                      sapien.
                    </div>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem sm={6} md={3}>
                <Card product>
                  <CardHeader artist>
                    <a href="#top">
                      <img src={cardProduct3} alt="cardProduct" />
                    </a>
                  </CardHeader>
                  <CardBody>
                    <h4 className={classes.cardTitle}>Stephanie Dortmund</h4>
                    <div className={classes.cardDescription}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Cras vitae eros quis tellus congue malesuada at sagittis
                      sapien.
                    </div>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem sm={6} md={3}>
                <Card product>
                  <CardHeader artist>
                    <a href="#top">
                      <img src={cardProduct4} alt="cardProduct" />
                    </a>
                  </CardHeader>
                  <CardBody>
                    <h4 className={classes.cardTitle}>Erick Wolf</h4>
                    <div className={classes.cardDescription}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Cras vitae eros quis tellus congue malesuada at sagittis
                      sapien.
                    </div>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem sm={6} md={3}>
                <Card product>
                  <CardHeader artist>
                    <a href="#top">
                      <img src={cardProduct1} alt="cardProduct" />
                    </a>
                  </CardHeader>
                  <CardBody>
                    <h4 className={classes.cardTitle}>Li Wan</h4>
                    <div className={classes.cardDescription}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Cras vitae eros quis tellus congue malesuada at sagittis
                      sapien.
                    </div>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem sm={6} md={3}>
                <Card product>
                  <CardHeader artist>
                    <a href="#top">
                      <img src={cardProduct2} alt="cardProduct" />
                    </a>
                  </CardHeader>
                  <CardBody>
                    <h4 className={classes.cardTitle}>Mohammed Sulim</h4>
                    <div className={classes.cardDescription}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Cras vitae eros quis tellus congue malesuada at sagittis
                      sapien.
                    </div>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem sm={6} md={3}>
                <Card product>
                  <CardHeader artist>
                    <a href="#top">
                      <img src={cardProduct3} alt="cardProduct" />
                    </a>
                  </CardHeader>
                  <CardBody>
                    <h4 className={classes.cardTitle}>Stephanie Dortmund</h4>
                    <div className={classes.cardDescription}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Cras vitae eros quis tellus congue malesuada at sagittis
                      sapien.
                    </div>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem sm={6} md={3}>
                <Card product>
                  <CardHeader artist>
                    <a href="#top">
                      <img src={cardProduct4} alt="cardProduct" />
                    </a>
                  </CardHeader>
                  <CardBody>
                    <h4 className={classes.cardTitle}>Erick Wolf</h4>
                    <div className={classes.cardDescription}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Cras vitae eros quis tellus congue malesuada at sagittis
                      sapien.
                    </div>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
