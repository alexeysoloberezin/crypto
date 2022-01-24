import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import store from "@/store";
import { Paths } from "@/store/enums/MenuEnums";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: Paths.HOME,
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/sign-up",
    name: Paths.SIGN_UP,
    component: () => import("@/views/auth/SignUp.vue"),
  },
  {
    path: "/sign-in",
    name: Paths.SIGN_IN,
    component: () => import("@/views/auth/SignIn.vue"),
  },
  {
    path: "/logout",
    name: Paths.LOGOUT,
    component: () => import("@/views/auth/Logout.vue"),
  },
  {
    path: "/account",
    name: Paths.ACCOUNT,
    component: () => import("@/views/Account/Account.vue"),
  },
  {
    path: "/News",
    name: Paths.NEWS,
    component: () => import("@/views/News/News.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // store.dispatch(Actions.VERIFY_AUTH_SPOTIFY)

  // if (to.meta.permission !== "manager") {
  //   next();
  // }
  //
  // if (to.meta.permission === "manager") {
  //   if (store.getters.isUserAuthenticated) {
  //     next();
  //   } else {
  //     next({ name: "sign-in" });
  //   }
  // }
  next()
  // Scroll page to top on every route change
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

export default router;
