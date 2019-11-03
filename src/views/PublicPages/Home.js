/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react component used to create nice image meadia player
import ImageGallery from "react-image-gallery";
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
import Accordion from "components/Accordion/Accordion.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Tooltip from "@material-ui/core/Tooltip";

import productStyle from "assets/jss/material-kit-pro-react/views/productStyle.js";

// images
import cardProduct1 from "assets/img/examples/ga_1.jpg";
import cardProduct3 from "assets/img/examples/ga_2.jpg";
import cardProduct4 from "assets/img/examples/ga_3.jpg";
import cardProduct2 from "assets/img/examples/ga_4.jpg";
import product1 from "assets/img/examples/ga_1.jpg";

const useStyles = makeStyles(productStyle);

export default function ProductPage() {
  const classes = useStyles();
  const images = [
    {
      original: product1,
      thumbnail: product1
    }
  ];
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
            <GridContainer>
              <GridItem md={4} sm={4}>
                <ImageGallery
                  showFullscreenButton={false}
                  showPlayButton={false}
                  startIndex={0}
                  items={images}
                />
              </GridItem>
              <GridItem md={8} sm={8}>
                <h2 className={classes.title}>Selfie in Lisbon</h2>
                <h3 className={classes.mainPrice}>€382</h3>
                <Accordion
                  active={0}
                  activeColor="rose"
                  collapses={[
                    {
                      title: "Description",
                      content: (
                        <p>
                          This picture is from a couple who did tourism in
                          Lisbon. The light was so strong that there were many
                          contrasts of light and shadow among the walkers.
                          Pictorially, these strong contrasts give a lot of
                          play.
                        </p>
                      )
                    },
                    {
                      title: "Artist Information",
                      content: (
                        <p>
                          437/5000 In recent years I have worked mainly on two
                          lines: the first shows the experience of diving, it is
                          a study of the reflections of the sun in the water, of
                          the intense colors, of marine life ... The second
                          shows the experience of the day day, fruit of the
                          observation of how people move through their city,
                          their gestures when walking, their clothes ... In both
                          lines there is usually a common element: The human
                          figure as the main protagonist.
                        </p>
                      )
                    },
                    {
                      title: "Details",
                      content: (
                        <ul>
                          <li>Country Spain</li>
                          <li>Category: Painting</li>
                          <li>Theme: Figure</li>
                          <li>Technique: Acrylic</li>
                          <li>Support: Table</li>
                          <li>Measures: 24 x 19 cm</li>
                          <li>In Artelista since: November 2, 2019</li>
                        </ul>
                      )
                    }
                  ]}
                />
                <GridContainer className={classes.pullRight}>
                  <Button round color="rose">
                    Add to Favourites &nbsp; <Favorite />
                  </Button>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </div>
          <div className={classes.relatedProducts}>
            <h3 className={classNames(classes.title, classes.textCenter)}>
              You may also be interested in:
            </h3>
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
