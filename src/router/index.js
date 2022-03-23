import Vue from "vue";
import VueRouter from "vue-router";
import { isLoggedIn } from '@/config/auth'

import Login from "@/components/Login.vue";
import ForgotPassword from "@/components/ForgotPassword.vue";
import ResetPassword from "@/components/ResetUserPassword.vue";
import PageNotFound from "@/components/Page404.vue";
import ServerErrorPage from "@/components/Page500.vue";
import Dashboard from "@/components/Dashboard.vue";
import Settings from "@/components/Settings.vue";
import UserIndex from "@/components/User/Index.vue";
import UserDetail from "@/components/User/Detail.vue";
import UserEdit from "@/components/User/Edit.vue";
import UserAdd from "@/components/User/Add.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    meta: {
      title: "Accouting System",
      allowAnonymous: true
    },
    name: "Login",
    component: Login
  },
  {
    path: "/forgot-password",
    meta: {
      title: "Accouting System",
      allowAnonymous: true
    },
    name: "ForgotPassword",
    component: ForgotPassword
  },
  {
    path: "/reset-password/:email/:token",
    meta: {
      title: "Accouting System",
      allowAnonymous: true
    },
    name: "ResetPassword",
    component: ResetPassword,
    props: true
  },
  {
    path:'/server-error', 
    meta: {
      title: "Accouting System",
      allowAnonymous: true
    },
    name: "ServerErrorPage",
    component: ServerErrorPage
  }, 
  {
    path:'/page-not-found', 
    meta: {
      title: "Accouting System",
      allowAnonymous: true
    },
    name: "PageNotFound",
    component: PageNotFound
  }, 
  {
    path:'*', 
    meta: {
      title: "Accouting System"
    },
    name: "PageNotFoundArea",
    component: PageNotFound
  }, 
  {
    path:'/dashboard', 
    meta: {
      title: "Accouting System",
    },
    name: "Dashboard",
    component: Dashboard
  }, 
  {
    path:'/settings', 
    meta: {
      title: "Accouting System",
    },
    name: "Settings",
    component: Settings
  }, 

  /**
   * Users
   */
  {
    path:'/user-access', 
    meta: {
      title: "User | Accouting System",
    },
    name: "UserIndex",
    component: UserIndex
  }, 
  {
    path:'/user-access/detail/:id', 
    meta: {
      title: "Detail User | Accouting System"
    },
    name: "UserDetail",
    component: UserDetail,
    props: false
  }, 
  {
    path:'/user-access/edit/:id', 
    meta: {
      title: "Edit User | Accouting System"
    },
    name: "UserEdit",
    component: UserEdit,
    props: false
  }, 
  {
    path:'/user-access/add', 
    meta: {
      title: "Add New User | Accouting System",
    },
    name: "UserAdd",
    component: UserAdd
  }, 

];

const router = new VueRouter({
  mode: "history",
  routes
});

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
    if (to.name == 'Login' && isLoggedIn() || to.name == 'ForgotPassword' && isLoggedIn() || to.name == 'ResetPassword' && isLoggedIn()) {
        next({ path: '/dashboard' })
    }
    else if (!to.meta.allowAnonymous && !isLoggedIn()) {
        next({
            path: '/',
            query: { redirect: to.fullPath }
        })
    }
    else {
        next()
    }
});


export default router;
