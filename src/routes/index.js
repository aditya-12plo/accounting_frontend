import Vue from "vue";
import VueRouter from "vue-router";
import { isLoggedIn } from '@/middleware/auth'

import UserLogin from "@/components/UserLogin.vue";
import ForgotPassword from "@/components/ForgotPassword.vue";
import ResetPassword from "@/components/ResetUserPassword.vue";
import PageNotFound from "@/components/UserPageNotFound.vue";
import ServerErrorPage from "@/components/UserPageServerError.vue";
import AuthorizedErrorPage from "@/components/UserPageAuthorized.vue";
import UserDashboard from "@/components/UserDashboard.vue";
import UserProfile from "@/components/users/Profile.vue";
import ChangePassword from "@/components/users/ChangePassword.vue";

import Users from "@/components/users/Index.vue";
import UsersAdd from "@/components/users/Add.vue";
import UsersEdit from "@/components/users/Edit.vue";
import UsersDetail from "@/components/users/Detail.vue";


import CompanyIndex from "@/components/company/Index.vue";
import CompanyAdd from "@/components/company/Add.vue";
import CompanyDetail from "@/components/company/Detail.vue";
import CompanyEdit from "@/components/company/Edit.vue";
 

import DivisionIndex from "@/components/division/Index.vue";

import VendorIndex from "@/components/vendor/Index.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    meta: {
      title: "Accounting & Budgeting System",
      allowAnonymous: true
    },
    name: "UserLogin",
    component: UserLogin
  },
  {
    path: "/forgot-password",
    meta: {
      title: "Accounting & Budgeting System",
      allowAnonymous: true
    },
    name: "ForgotPassword",
    component: ForgotPassword
  },
  {
    path: "/reset-password/:email/:token",
    meta: {
      title: "Accounting & Budgeting System",
      allowAnonymous: true
    },
    name: "ResetPassword",
    component: ResetPassword,
    props: true
  },
  {
    path:'/server-error', 
    meta: {
      title: "Accounting & Budgeting System",
      allowAnonymous: true
    },
    name: "ServerErrorPage",
    component: ServerErrorPage
  }, 
  {
    path:'/authorized-error', 
    meta: {
      title: "Accounting & Budgeting System",
      allowAnonymous: true
    },
    name: "AuthorizedErrorPage",
    component: AuthorizedErrorPage
  }, 
  {
    path:'/page-not-found', 
    meta: {
      title: "Accounting & Budgeting System",
      allowAnonymous: true
    },
    name: "PageNotFound",
    component: PageNotFound
  }, 
  {
    path:'*', 
    meta: {
      title: "Accounting & Budgeting System"
    },
    name: "PageNotFoundArea",
    component: PageNotFound
  }, 
  {
    path:'/dashboard', 
    meta: {
      title: "Accounting & Budgeting System",
    },
    name: "UserDashboard",
    component: UserDashboard
  }, 

  /**
   * User
   */
  {
    path:'/profile', 
    meta: {
      title: "Accounting & Budgeting System",
    },
    name: "UserProfile",
    component: UserProfile
  }, 
  {
    path:'/change-password', 
    meta: {
      title: "Accounting & Budgeting System",
    },
    name: "ChangePassword",
    component: ChangePassword
  }, 
 

  /**
   * Administration/Users
   */
  {
    path:'/users', 
    meta: {
      title: "Accounting & Budgeting System",
    },
    name: "UsersIndex",
    component:Users
  }, 
  {
    path:'/users/add', 
    meta: {
      title: "Accounting & Budgeting System",
    },
    name: "UsersAdd",
    component:UsersAdd
  }, 

  {
    path:'/users/edit/:id', 
    meta: {
      title: "Accounting & Budgeting System",
    },
    name: "UsersEdit",
    component:UsersEdit
  }, 


  {
    path:'/users/detail/:id', 
    meta: {
      title: "Accounting & Budgeting System",
    },
    name: "UsersDetail",
    component:UsersDetail
  }, 

  /**
   * Administration/Company
   */
   {
    path:'/company', 
    meta: {
      title: "Accounting & Budgeting System",
    },
    name: "CompanyIndex",
    component:CompanyIndex
  }, 
  {
   path:'/company/add', 
   meta: {
     title: "Accounting & Budgeting System",
   },
   name: "CompanyAdd",
   component:CompanyAdd
 }, 
 {
   path:'/company/detail/:id', 
   meta: {
     title: "Accounting & Budgeting System",
   },
   name: "CompanyDetail",
   component:CompanyDetail
 }, 
 {
   path:'/company/edit/:id', 
   meta: {
     title: "Accounting & Budgeting System",
   },
   name: "CompanyEdit",
   component:CompanyEdit
 }, 
 
  /**
   * Administration/Division
   */
   {
    path:'/division', 
    meta: {
      title: "Accounting & Budgeting System",
    },
    name: "DivisionIndex",
    component:DivisionIndex
  }, 
  
 
  /**
   * Vendor
   */
   {
    path:'/vendor', 
    meta: {
      title: "Accounting & Budgeting System",
    },
    name: "VendorIndex",
    component:VendorIndex
  }, 
  

];

const router = new VueRouter({
  mode: "history",
  routes
});

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
    if (to.name == 'UserLogin' && isLoggedIn() || to.name == 'ForgotPassword' && isLoggedIn() || to.name == 'ResetPassword' && isLoggedIn()) {
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
