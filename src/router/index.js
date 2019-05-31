import Vue from 'vue'
import Router from 'vue-router'
import {worktocookie} from 'C:/Users/Павел/source/repos/SPA_Client_Vue_TaskManager/src/components/mixins/worktocookie.js';
import {postrefresh} from 'C:/Users/Павел/source/repos/SPA_Client_Vue_TaskManager/src/components/mixins/postrefresh.js';
import apphome from '@/pages/home/home_index';
import apparhive from '@/pages/arhive/arhive_index';
import applogin from '@/pages/login/login_index';
import appproject from '@/pages/project/project_index';
import appregistration from '@/pages/registration/registration_index';
import todoist from '@/pages/todoist/todoist';

Vue.use(Router)

export default new Router({
  mixins: [worktocookie] [postrefresh],
  routes: [
     {
      path: '/',
      name: 'home',
      component: apphome,
      beforeEnter: (to, from, next) => {
        var vm = this;
        if (worktocookie.methods.getCookie("token") === undefined && worktocookie.methods.getCookie("refresh") != undefined) {
          var path = "/"; 
           postrefresh.methods.refreshtoken(path);
        } 
        if (worktocookie.methods.getCookie("token") === undefined) {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        }
        if (worktocookie.methods.getCookie("token") != undefined) {
          next();
        }
      }
    }, 
    {
      path: '/arhive',
      name: 'arhive',
      component: apparhive,
      beforeEnter: (to, from, next) => {
        var vm = this;
        if (worktocookie.methods.getCookie("token") === undefined && worktocookie.methods.getCookie("refresh") != undefined) {
          var path = "/arhive"; 
           postrefresh.methods.refreshtoken(path);
        } 
        if (worktocookie.methods.getCookie("token") === undefined) {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        }
        if (worktocookie.methods.getCookie("token") != undefined) {
          next();
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: applogin,
      meta: { requiresAuth: false }
    }, {
      path: '/registration',
      name: 'registration',
      component: appregistration,
      meta: { requiresAuth: false }
    }, 
    {
        path: '/project/:id',
        name: 'project',
        component: appproject,
        beforeEnter: (to, from, next) => {
          var vm = this;
          var p = to;
          if (worktocookie.methods.getCookie("token") === undefined && worktocookie.methods.getCookie("refresh") != undefined) {
             var path = "/project/" + p;  
             postrefresh.methods.refreshtoken(path);
          } 
          if (worktocookie.methods.getCookie("token") === undefined) {
            next({
              path: '/login',
              query: { redirect: to.fullPath }
            })
          }
          if (worktocookie.methods.getCookie("token") != undefined) {
            next();
          }
        }
      },
      {
        path: '/todoist',
        name: 'todoist',
        component: todoist,
        beforeEnter: (to, from, next) => {
          var vm = this;
          if (worktocookie.methods.getCookie("token") === undefined && worktocookie.methods.getCookie("refresh") != undefined) {
              
             postrefresh.methods.refreshtoken("todoist");
          } 
          if (worktocookie.methods.getCookie("token") === undefined) {
            next({
              path: '/login',
              query: { redirect: to.fullPath }
            })
          }
          if (worktocookie.methods.getCookie("token") != undefined) {
            next();
          }
        }
      }
  ]
})
