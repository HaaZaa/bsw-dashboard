
import Index from "views/Index.js";
import Categories from "views/Pages/Categories.js";
import Product from "views/Pages/Product.js";
import Orders from "views/Pages/Orders.js";
import User from "views/Pages/User.js";
import Slider from "views/Pages/Slider.js";
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
    icon: "ni ni-planet text-blue",
    component: Categories,
    layout: "/admin",
  },

  {
    path: "/product",
    name: "Products",
    icon: "ni ni-bullet-list-67",
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
    icon: "ni ni-bullet-list-67",
    component: User,
    layout: "/admin",
  },
  {
    path: "/slider",
    name: "Slider",
    icon: "ni ni-bullet-list-67",
    component: Slider,
    layout: "/admin",
  }
];
export default routes;
