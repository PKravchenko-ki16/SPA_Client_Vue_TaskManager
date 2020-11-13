import {worktocookie} from '../mixins/worktocookie.js';
import router from '../../router/index.js'


export const postrefresh = {
    mixins: [worktocookie],
    data(){
      return {

      }
    },
    methods: {
        refreshtoken(path) {
            var params = 'client_id=console' + 
           '&client_secret=388D45FA-B36B-4988-BA59-B187D329C207' +
           '&refresh_token=' + worktocookie.methods.getCookie("refresh") +
           '&scope=offline_access' +
           '&username=' + worktocookie.methods.getCookie("profileId") +
           '&grant_type=refresh_token';
 
           const xhr = new XMLHttpRequest();
           xhr.open('POST', `http://localhost:5000/connect/token`, true);
           xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
           xhr.onload  = responceLoad;
           var vm = this;
           function responceLoad()
           {
            if (xhr.readyState == 4) 
            {
              var status = xhr.status;
              if (status == 200||status == 201)
               {
                 const response = JSON.parse(xhr.responseText);
                 var Tok = response.access_token;
                 var timeTok = response.expires_in;
                 var values = "Bearer " + Tok;
                 worktocookie.methods.set_cookie("token",values,timeTok * 2);
                 router.push(path);
               } 
               if (status == 401)
               {
                router.push('/login');
               }
             }
           }
           xhr.send(params);
       },
    
    }
  }
  