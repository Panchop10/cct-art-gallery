/*!

=========================================================
* Material Dashboard PRO React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

//Layouts
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";

//Client Side
import Home from "views/PublicPages/Home.js";
import Gallery from "views/PublicPages/Gallery.js";
import Artists from "views/PublicPages/Artists.js";
import Favourites from "views/PublicPages/Favourites.js";
import Contact from "views/PublicPages/Contact.js";
import Profile from "views/PublicPages/Profile.js";

import "assets/scss/material-dashboard-pro-react.scss?v=1.8.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/auth" component={AuthLayout} />
      <Route path="/admin" component={AdminLayout} />
      <Route path="/home" component={Home} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/artists" component={Artists} />
      <Route path="/favourites" component={Favourites} />
      <Route path="/contact" component={Contact} />
      <Route path="/profile" component={Profile} />
      <Redirect from="/" to="/auth/login" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
