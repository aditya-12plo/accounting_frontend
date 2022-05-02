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
import ContactUs from "@/components/support/ContactUs.vue";

import Users from "@/components/administration/Users.vue";
import UsersAdd from "@/components/administration/UsersAdd.vue";
import UsersEdit from "@/components/administration/UsersEdit.vue";
import UsersDetail from "@/components/administration/UsersDetail.vue";

import Company from "@/components/administration/Company.vue";
import CompanyAdd from "@/components/administration/CompanyAdd.vue";
import CompanyDetail from "@/components/administration/CompanyDetail.vue";
import CompanyEdit from "@/components/administration/CompanyEdit.vue";
import CompanyUpload from "@/components/administration/CompanyUpload.vue";

import Role from "@/components/administration/Role.vue";
import RoleAdd from "@/components/administration/RoleAdd.vue";
import RoleDetail from "@/components/administration/RoleDetail.vue";
import RoleEdit from "@/components/administration/RoleEdit.vue";
import RoleUpload from "@/components/administration/RoleUpload.vue";


import Permission from "@/components/administration/Permission.vue";
import PermissionAdd from "@/components/administration/PermissionAdd.vue";
import PermissionDetail from "@/components/administration/PermissionDetail.vue";
import PermissionEdit from "@/components/administration/PermissionEdit.vue";
import PermissionUpload from "@/components/administration/PermissionUpload.vue";



import PermissionRole from "@/components/administration/PermissionRole.vue";


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
   * Support
   */
  {
    path:'/contact-us', 
    meta: {
      title: "Accounting & Budgeting System",
    },
    name: "ContactUs",
    component: ContactUs
  }, 


  /**
   * Administration/Users
   */
  {
    path:'/users', 
    meta: {
      title: "Accounting & Budgeting System",
    },
    name: "Users",
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
    name: "Company",
    component:Company
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
    path:'/company/edit/:id', 
    meta: {
      title: "Accounting & Budgeting System",
    },
    name: "CompanyEdit",
    component:CompanyEdit
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
    path:'/company/upload', 
    meta: {
      title: "Accounting & Budgeting System",
    },
    name: "CompanyUpload",
    component:CompanyUpload
  }, 

  /**
   * Administration/Role
   */
  {
    path:'/role', 
    meta: {
      title: "Accounting & Budgeting System",
    },
    name: "Role",
    component:Role
  }, 


  {
    path:'/role/add', 
    meta: {
      title: "Accounting & Budgeting System",
    },
    name: "RoleAdd",
    component:RoleAdd
  }, 
  
  {
    path:'/role/edit/:id', 
    meta: {
      title: "Accounting & Budgeting System",
    },
    name: "RoleEdit",
    component:RoleEdit
  }, 

  {
    path:'/role/detail/:id', 
    meta: {
      title: "Accounting & Budgeting System",
    },
    name: "RoleDetail",
    component:RoleDetail
  }, 


  {
    path:'/role/upload', 
    meta: {
      title: "Accounting & Budgeting System",
    },
    name: "RoleUpload",
    component:RoleUpload
  }, 





  /**
   * Administration/Permission
   */
   {
    path:'/permission', 
    meta: {
      title: "Accounting & Budgeting System",
    },
    name: "Permission",
    component:Permission
  }, 

  {
    path:'/permission/add', 
    meta: {
      title: "Accounting & Budgeting System",
    },
    name: "PermissionAdd",
    component:PermissionAdd
  }, 
  
  {
    path:'/permission/edit/:id', 
    meta: {
      title: "Accounting & Budgeting System",
    },
    name: "PermissionEdit",
    component:PermissionEdit
  }, 

  {
    path:'/permission/detail/:id', 
    meta: {
      title: "Accounting & Budgeting System",
    },
    name: "PermissionDetail",
    component:PermissionDetail
  }, 


  {
    path:'/permission/upload', 
    meta: {
      title: "Accounting & Budgeting System",
    },
    name: "PermissionUpload",
    component:PermissionUpload
  }, 




  /**
   * Administration/Permission
   */
   {
    path:'/permission-role', 
    meta: {
      title: "Accounting & Budgeting System",
    },
    name: "Permission Role",
    component:PermissionRole
  }, 

  // {
  //   path:'/permission/add', 
  //   meta: {
  //     title: "Accounting & Budgeting System",
  //   },
  //   name: "PermissionAdd",
  //   component:PermissionAdd
  // }, 
  
  // {
  //   path:'/permission/edit/:id', 
  //   meta: {
  //     title: "Accounting & Budgeting System",
  //   },
  //   name: "PermissionEdit",
  //   component:PermissionEdit
  // }, 

  // {
  //   path:'/permission/detail/:id', 
  //   meta: {
  //     title: "Accounting & Budgeting System",
  //   },
  //   name: "PermissionDetail",
  //   component:PermissionDetail
  // }, 


  // {
  //   path:'/permission/upload', 
  //   meta: {
  //     title: "Accounting & Budgeting System",
  //   },
  //   name: "PermissionUpload",
  //   component:PermissionUpload
  // }, 

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
