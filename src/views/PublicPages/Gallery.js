/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react component used to create nice image meadia player
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Tooltip from "@material-ui/core/Tooltip";
import CustomInputSearchBar from "components/CustomInputSearchBar/CustomInputSearchBar.js";

import productStyle from "assets/jss/material-kit-pro-react/views/productStyle.js";

// images
import cardProduct1 from "assets/img/examples/ga_1.jpg";
import cardProduct3 from "assets/img/examples/ga_2.jpg";
import cardProduct4 from "assets/img/examples/ga_3.jpg";
import cardProduct2 from "assets/img/examples/ga_4.jpg";

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
                placeholder: "Search title, type or artist",
                autoFocus: true
              }}
            />
          </div>
          <div className={classes.relatedProducts}>
            <GridContainer>
              <GridItem sm={6} md={3}>
                <Card product>
                  <CardHeader image>
                    <a href="#top">
                      <img src={cardProduct1} alt="cardProduct" />
                    </a>
                  </CardHeader>
                  <CardBody>
                    <h6
                      className={classNames(
                        classes.cardCategory,
                        classes.textRose
                      )}
                    >
                      Trending
                    </h6>
                    <h4 className={classes.cardTitle}>Selfie in Lisbon</h4>
                    <div className={classes.cardDescription}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Cras vitae eros quis tellus congue malesuada at sagittis
                      sapien.
                    </div>
                  </CardBody>
                  <CardFooter className={classes.justifyContentBetween}>
                    <div className={classes.price}>
                      <h4>€1,459</h4>
                    </div>
                    <div className={classes.stats}>
                      <Tooltip
                        id="tooltip-top"
                        title="Save to Wishlist"
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <Button justIcon color="rose" simple>
                          <Favorite />
                        </Button>
                      </Tooltip>
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem sm={6} md={3}>
                <Card product>
                  <CardHeader image>
                    <a href="#top">
                      <img src={cardProduct3} alt="cardProduct3" />
                    </a>
                  </CardHeader>
                  <CardBody>
                    <h6 className={classes.cardCategory}>Popular</h6>
                    <h4 className={classes.cardTitle}>Spiritual Care</h4>
                    <div className={classes.cardDescription}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Cras vitae eros quis tellus congue malesuada at sagittis
                      sapien.
                    </div>
                  </CardBody>
                  <CardFooter className={classes.justifyContentBetween}>
                    <div className={classes.price}>
                      <h4>€459</h4>
                    </div>
                    <div className={classes.stats}>
                      <Tooltip
                        id="tooltip-top"
                        title="Save to Wishlist"
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <Button justIcon link>
                          <Favorite />
                        </Button>
                      </Tooltip>
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem sm={6} md={3}>
                <Card product>
                  <CardHeader image>
                    <a href="#top">
                      <img src={cardProduct4} alt="cardProduct4" />
                    </a>
                  </CardHeader>
                  <CardBody>
                    <h6 className={classes.cardCategory}>Popular</h6>
                    <h4 className={classes.cardTitle}>Abstract</h4>
                    <div className={classes.cardDescription}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Cras vitae eros quis tellus congue malesuada at sagittis
                      sapien.
                    </div>
                  </CardBody>
                  <CardFooter className={classes.justifyContentBetween}>
                    <div className={classes.price}>
                      <h4>€590</h4>
                    </div>
                    <div className={classes.stats}>
                      <Tooltip
                        id="tooltip-top"
                        title="Save to Wishlist"
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <Button justIcon color="rose" simple>
                          <Favorite />
                        </Button>
                      </Tooltip>
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem sm={6} md={3}>
                <Card product>
                  <CardHeader image>
                    <a href="#top">
                      <img src={cardProduct2} alt="cardProduct2" />
                    </a>
                  </CardHeader>
                  <CardBody>
                    <h6
                      className={classNames(
                        classes.cardCategory,
                        classes.textRose
                      )}
                    >
                      Trending
                    </h6>
                    <h4 className={classes.cardTitle}>
                      I like all the colours
                    </h4>
                    <div className={classes.cardDescription}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Cras vitae eros quis tellus congue malesuada at sagittis
                      sapien.
                    </div>
                  </CardBody>
                  <CardFooter className={classes.justifyContentBetween}>
                    <div className={classes.price}>
                      <h4>€1,459</h4>
                    </div>
                    <div className={classes.stats}>
                      <Tooltip
                        id="tooltip-top"
                        title="Save to Wishlist"
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <Button justIcon link>
                          <Favorite />
                        </Button>
                      </Tooltip>
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem sm={6} md={3}>
                <Card product>
                  <CardHeader image>
                    <a href="#top">
                      <img src={cardProduct1} alt="cardProduct" />
                    </a>
                  </CardHeader>
                  <CardBody>
                    <h6
                      className={classNames(
                        classes.cardCategory,
                        classes.textRose
                      )}
                    >
                      Trending
                    </h6>
                    <h4 className={classes.cardTitle}>Selfie in Lisbon</h4>
                    <div className={classes.cardDescription}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Cras vitae eros quis tellus congue malesuada at sagittis
                      sapien.
                    </div>
                  </CardBody>
                  <CardFooter className={classes.justifyContentBetween}>
                    <div className={classes.price}>
                      <h4>€1,459</h4>
                    </div>
                    <div className={classes.stats}>
                      <Tooltip
                        id="tooltip-top"
                        title="Save to Wishlist"
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <Button justIcon color="rose" simple>
                          <Favorite />
                        </Button>
                      </Tooltip>
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem sm={6} md={3}>
                <Card product>
                  <CardHeader image>
                    <a href="#top">
                      <img src={cardProduct3} alt="cardProduct3" />
                    </a>
                  </CardHeader>
                  <CardBody>
                    <h6 className={classes.cardCategory}>Popular</h6>
                    <h4 className={classes.cardTitle}>Spiritual Care</h4>
                    <div className={classes.cardDescription}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Cras vitae eros quis tellus congue malesuada at sagittis
                      sapien.
                    </div>
                  </CardBody>
                  <CardFooter className={classes.justifyContentBetween}>
                    <div className={classes.price}>
                      <h4>€459</h4>
                    </div>
                    <div className={classes.stats}>
                      <Tooltip
                        id="tooltip-top"
                        title="Save to Wishlist"
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <Button justIcon link>
                          <Favorite />
                        </Button>
                      </Tooltip>
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem sm={6} md={3}>
                <Card product>
                  <CardHeader image>
                    <a href="#top">
                      <img src={cardProduct4} alt="cardProduct4" />
                    </a>
                  </CardHeader>
                  <CardBody>
                    <h6 className={classes.cardCategory}>Popular</h6>
                    <h4 className={classes.cardTitle}>Abstract</h4>
                    <div className={classes.cardDescription}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Cras vitae eros quis tellus congue malesuada at sagittis
                      sapien.
                    </div>
                  </CardBody>
                  <CardFooter className={classes.justifyContentBetween}>
                    <div className={classes.price}>
                      <h4>€590</h4>
                    </div>
                    <div className={classes.stats}>
                      <Tooltip
                        id="tooltip-top"
                        title="Save to Wishlist"
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <Button justIcon color="rose" simple>
                          <Favorite />
                        </Button>
                      </Tooltip>
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem sm={6} md={3}>
                <Card product>
                  <CardHeader image>
                    <a href="#top">
                      <img src={cardProduct2} alt="cardProduct2" />
                    </a>
                  </CardHeader>
                  <CardBody>
                    <h6
                      className={classNames(
                        classes.cardCategory,
                        classes.textRose
                      )}
                    >
                      Trending
                    </h6>
                    <h4 className={classes.cardTitle}>
                      I like all the colours
                    </h4>
                    <div className={classes.cardDescription}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Cras vitae eros quis tellus congue malesuada at sagittis
                      sapien.
                    </div>
                  </CardBody>
                  <CardFooter className={classes.justifyContentBetween}>
                    <div className={classes.price}>
                      <h4>€1,459</h4>
                    </div>
                    <div className={classes.stats}>
                      <Tooltip
                        id="tooltip-top"
                        title="Save to Wishlist"
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <Button justIcon link>
                          <Favorite />
                        </Button>
                      </Tooltip>
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
