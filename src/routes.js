// @material-ui/icons
import Image from "@material-ui/icons/Image";
import Timeline from "@material-ui/icons/Timeline";
import WidgetsIcon from "@material-ui/icons/Widgets";

//Admins Link
import Gallery from "views/DashboardPages/Gallery.js";
import Artists from "views/DashboardPages/Artists.js";
import Admins from "views/DashboardPages/Admins.js";

//Login and Register
import LoginPage from "views/LoginPages/LoginPage.js";
import RegisterPage from "views/LoginPages/RegisterPage.js";

var dashRoutes = [
  {
    path: "/gallery",
    name: "Pieces of Art",
    icon: Image,
    component: Gallery,
    layout: "/admin"
  },
  {
    path: "/artists",
    name: "Artists",
    icon: WidgetsIcon,
    component: Artists,
    layout: "/admin"
  },
  {
    path: "/users",
    name: "Admin Users",
    icon: Timeline,
    component: Admins,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login Page",
    component: LoginPage,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register Page",
    component: RegisterPage,
    layout: "/auth"
  }
];
export default dashRoutes;
