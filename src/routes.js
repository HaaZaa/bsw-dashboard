import Index from "views/Index.js";
import Categories from "views/Pages/Categories.js";
import Product from "views/Pages/Product.js";
import Orders from "views/Pages/Orders.js";
import User from "views/Pages/User.js";
import Slider from "views/Pages/Slider.js";
import Logout from "views/Pages/Logout.js";
import Tables from "views/examples/Tables.js";
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
    icon: "ni ni-align-center",
    component: Categories,
    layout: "/admin",
  },

  {
    path: "/product",
    name: "Products",
    icon: "ni ni-basket",
    component: Product,
    layout: "/admin",
  },

  {
    path: "/orders",
    name: "Orders",
    icon: "ni ni-bullet-list-67",
    component: Orders,
    layout: "/admin",
  },

  {
    path: "/user",
    name: "Users",
    icon: "ni ni-circle-08",
    component: User,
    layout: "/admin",
  },
  {
    path: "/slider",
    name: "Slider",
    icon: "ni ni-ungroup",
    component: Slider,
    layout: "/admin",
  },
  {
    path: "/logout",
    name: "Logout",
    icon: "ni ni-button-power",
    component: Logout,
    layout: "/admin",
  },
  // {
  //   path: "/temTables",
  //   name: "Table",
  //   component: Tables,
  //   layout: "/admin",
  // },
];
export default routes;
