import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Login from "../views/Login";
import Carousel from "../views/Carousel";
import Goods from "../views/Goods";
import ManageGoods from "../views/ManageGoods";
import Order from "../views/Order";
import User from "../views/User";

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/carousel",
        name: "Carousel",
        component: Carousel,
      },
      {
        path: "/goods",
        name: "Goods",
        component: Goods,
      },
      {
        path: "/managegoods",
        name: "ManageGoods",
        component: ManageGoods,
      },
      {
        path: "/order",
        name: "Order",
        component: Order,
      },
      {
        path: "/user",
        name: "User",
        component: User,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requireAuth: true },
  },

  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  if (
    !to.meta.requireAuth &&
    (localStorage.token == "" || localStorage.token == undefined)
  ) {
    next({ path: "/login" });
  } else {
    next();
  }
});

export default router;
