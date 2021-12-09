import Index from "views/Index.js";
import Categories from "views/Pages/Categories.js";
import Product from "views/Pages/Product.js";
import Orders from "views/Pages/Orders.js";
import User from "views/Pages/User.js";
import Slider from "views/Pages/Slider.js";
import Login from "views/Pages/Loign";
import AccountSetting from "views/Pages/AccountSetting";

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
    path: "/AccountSetting",
    name: "Account Setting",
    icon: "ni ni-button-power text-primary font-weight-900",
    component: AccountSetting,
    layout: "/admin",
  },
  {
    path: "/logout",
    name: "Logout",

    icon: "ni ni-button-power text-primary",
    component: Login,
    layout: "/auth",
  },
];
export default routes;
