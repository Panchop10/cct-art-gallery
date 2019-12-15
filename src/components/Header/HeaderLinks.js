/* eslint-disable */
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react components for routing our app without refresh
import { NavLink } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// core components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-pro-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks() {
  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const classes = useStyles();
  return (
    <List className={classes.list + " " + classes.mlAuto}>
      <ListItem className={classes.listItem}>
        <NavLink to={"/home"}>
          <Button color="white" simple size="lg" block>
            Home
          </Button>
        </NavLink>
      </ListItem>
      <ListItem className={classes.listItem}>
        <NavLink to={"/gallery"}>
          <Button color="white" simple size="lg" block>
            Gallery
          </Button>
        </NavLink>
      </ListItem>
      <ListItem className={classes.listItem}>
        <NavLink to={"/artists"}>
          <Button color="white" simple size="lg" block>
            Artists
          </Button>
        </NavLink>
      </ListItem>
      <ListItem className={classes.listItem}>
        <NavLink to={"/favourites"}>
          <Button color="white" simple size="lg" block>
            Favourites
          </Button>
        </NavLink>
      </ListItem>
      <ListItem className={classes.listItem}>
        <NavLink to={"/contact"}>
          <Button color="white" simple size="lg" block>
            Contact
          </Button>
        </NavLink>
      </ListItem>
      <ListItem className={classes.listItem}>
        <NavLink to={"/profile"}>
          <Button color="white" simple size="lg" block>
            Profile
          </Button>
        </NavLink>
      </ListItem>
      {(() => {
        if (localStorage.getItem('token') === null) {
          return (
              <ListItem className={classes.listItem}>
                <NavLink to={"/auth/login"}>
                  <Button color="white" simple size="lg" block>
                    Login
                  </Button>
                </NavLink>
              </ListItem>
          )
        } else {
          return (
              <ListItem className={classes.listItem}>
                <NavLink to={"/auth/login"}>
                  <Button onClick={handleLogout} color="white" simple size="lg" block>
                    Logout
                  </Button>
                </NavLink>
              </ListItem>
          )
        }
      })()}
    </List>
  );
}

function handleLogout(e) {
  localStorage.clear();
}

HeaderLinks.defaultProps = {
  hoverColor: "primary"
};

HeaderLinks.propTypes = {
  dropdownHoverColor: PropTypes.oneOf([
    "dark",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose"
  ])
};
