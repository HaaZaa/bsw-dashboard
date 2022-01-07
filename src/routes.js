import Index from "views/Index.js";
import Categories from "views/Pages/Categories.js";
import Product from "views/Pages/Product.js";
import Orders from "views/Pages/Orders.js";
import User from "views/Pages/User.js";
import Slider from "views/Pages/Slider.js";
import Login from "views/Pages/Loign";
import AccountSetting from "views/Pages/AccountSetting";
import Logout from "views/Pages/Logout";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary font-weight-900",
    component: Index,
    layout: "/admin",
  },

  {
    path: "/categories",
    name: "Categories",
    icon: "ni ni-align-center text-warning font-weight-900",
    component: Categories,
    layout: "/admin",
  },

  {
    path: "/product",
    name: "Products",
    icon: "ni ni-basket text-success font-weight-900",
    component: Product,
    layout: "/admin",
  },

  {
    path: "/orders",
    name: "Orders",
    icon: "ni ni-cart text-muted font-weight-900",
    component: Orders,
    layout: "/admin",
  },

  {
    path: "/user",
    name: "Users",
    icon: "ni ni-circle-08 text-danger font-weight-900",
    component: User,
    layout: "/admin",
  },
  {
    path: "/slider",
    name: "Slider",
    icon: "ni ni-ungroup text-dark font-weight-900",
    component: Slider,
    layout: "/admin",
  },

  {
    path: "/AccountSetting",
    name: "Account Setting",
    icon: "ni ni-settings text-grey-800 font-weight-400",
    component: AccountSetting,
    layout: "/admin",
  },
  {
    path: "/logout",
    name: "Logout",

    icon: "ni ni-button-power text-dark font-weight-900",
    component: Logout,
    layout: "/admin",
  },
  {
    path: "/login",
    component: Login,
    layout: "/auth",
  },
];
export default routes;
