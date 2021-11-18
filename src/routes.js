import Index from "views/Index.js";
import Categories from "views/Pages/Categories.js";
import Product from "views/Pages/Product.js";
import Orders from "views/Pages/Orders.js";
import User from "views/Pages/User.js";
import Slider from "views/Pages/Slider.js";
import Logout from "views/Pages/Logout.js";
import Maps from "views/examples/Maps";
import Profile from "views/examples/Profile";
import Login from "components/Footers/AuthFooter";
import Register from "views/examples/Register";
// import Tables from "views/examples/Tables.js";
var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",

    component: Index,
    layout: "/admin",
  },
  {
    path: "/categories",
    name: "Categories",
    icon: "ni ni-align-center text-primary",
    component: Categories,
    layout: "/admin",
  },

  {
    path: "/product",
    name: "Products",
    icon: "ni ni-basket text-primary",
    component: Product,
    layout: "/admin",
  },

  {
    path: "/orders",
    name: "Orders",
    icon: "ni ni-bullet-list-67 text-primary",
    component: Orders,
    layout: "/admin",
  },

  {
    path: "/user",
    name: "Users",
    icon: "ni ni-circle-08 text-primary",
    component: User,
    layout: "/admin",
  },
  {
    path: "/slider",
    name: "Slider",
    icon: "ni ni-ungroup text-primary",
    component: Slider,
    layout: "/admin",
  },
  {
    path: "/logout",
    name: "Logout",
    icon: "ni ni-button-power text-primary",
    component: Logout,
    layout: "/admin",
  },
  {
    path: "/Maps",
    name: "Maps",
    icon: "ni ni-button-power text-primary",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "profile",
    icon: "ni ni-button-power text-primary font-weight-900",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-button-power text-primary",
    component: Login,
    layout: "/admin",
  },
  {
    path: "/logout",
    name: "Register",
    icon: "ni ni-button-power text-primary",
    component: Register,
    layout: "/admin",
  },
];
export default routes;
