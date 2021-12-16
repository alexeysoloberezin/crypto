import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import store from "@/store";
import { Mutations, Actions } from "@/store/enums/StoreEnums";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/components/page-layouts/Auth.vue"),
    children: [
      {
        path: "/login",
        name: "login",
        component: () =>
          import(
            "@/views/crafted/authentication/basic-flow-subscriber/loginSubsciber.vue"
          ),
      },
      {
        path: "/sign-in",
        name: "sign-in",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
      },
      {
        path: "/new-subscriber",
        name: "newSubscriber",
        component: () =>
          import(
            "@/views/crafted/authentication/basic-flow-subscriber/newSubscriber.vue"
          ),
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignUp.vue"),
      },
      {
        path: "/password-reset",
        name: "password-reset",
        component: () =>
          import(
            "@/views/crafted/authentication/basic-flow-subscriber/PasswordResetSub.vue"
          ),
      },
      {
        path: "/password-reset-admin",
        name: "password-reset-admin",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
      },
    ],
  },
  {
    // the 404 route, when none of the above matches
    path: "/404",
    name: "404",
    component: () => import("@/views/crafted/authentication/Error404.vue"),
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/views/crafted/authentication/Error500.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // store.dispatch(Actions.VERIFY_AUTH);
  if (store.getters.isUserRole) {
    if (store.getters.isUserRole === "administrator") {
      if (store.getters.isUserRole === to.meta.permission) {
        next();
      } else {
        // Base redirect for admin
        next({ name: "dashboard" });
      }
    } else {
      if (store.getters.isUserRole === to.meta.permission) {
        next();
      } else {
        // Base redirect for subscriber
        next({ name: "account" });
      }
    }
  } else {
    if (
      // Exception routes
      to.name === "sign-up" ||
      to.name === "sign-in" ||
      to.name === "newSubscriber" ||
      to.name === "password-reset-admin" ||
      to.name === "password-reset"
    ) {
      next();
    } else {
      // The others routes redirect to login
      if (to.name !== "login") {
        next({ name: "login" });
      } else {
        next();
      }
    }
  }

  // Scroll page to top on every route change
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

export default router;
