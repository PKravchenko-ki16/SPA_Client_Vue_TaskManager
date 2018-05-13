<template>
<div class="container">
         <div class="row mainty">
            <div class="col s12 m12 l12">
              <div class="card-panel">
                <div class="row">
                <form class="col s12 m12 l12">
                  <h4 class="header2">Пожалуйста введите свои данные, чтобы продолжить.</h4>
                  <div class="row">
                    <div class="input-field col s4 m4 l5">
                      <span>E-mail</span>
                      <input autofocus type="text" v-model="Login">
                    </div>
                    <div class="input-field col s4 m4 l5">
                       <span>Password</span>
                      <input  type="password" v-model="Password">
                    </div>
                    <div class="input-field col s4 m4 l2">
                      <br>
                      <div class="input-field col s6 m6 l6">
                        <button class="btn blue waves-effect waves-light" v-on:click="loginAsync" type="submit" name="action"><i class="mdi-action-lock-open"></i> Login</button>
                      </div>
                      <div class="input-field col s6 m6 l6">
                        <router-link to="/registration">
                        <a class="btn-floating waves-effect waves-light red"><i class="material-icons">person_add</i></a>
                        </router-link>
                      </div>
                    </div>
                  </div>
                </form>
                </div>
              </div>
            </div>
          </div>
</div>
</template>

<script>
import {worktocookie} from '@/components/mixins/worktocookie.js';
import router from '@/router/index.js'
import {inputfilter} from '@/components/mixins/inputfilter.js'

  export default {
    mixins: [worktocookie],
    data: function() {
      return{
      Login: '',
      Password: ''
      }
    },
    methods: {
      Getidprofile()
      {
          var param2 = 
          'Login=' + inputfilter.methods.filter(this.Login) +
          '&Password=' + inputfilter.methods.filter(this.Password);

          const xhr2 = new XMLHttpRequest();
          xhr2.open('POST', `http://localhost:5000/api/getprofileid`, true);
          xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr2.onload  = responceLoads;
          function responceLoads() 
          {
            if (xhr2.readyState == 4) 
            {
                var status = xhr2.status;
                if (status == 200) {
                const response = JSON.parse(xhr2.responseText);
                worktocookie.methods.set_cookie("profileId",response,3600*12);
                router.push('/');
                } 
                else 
                {
                 alert(xhr2.statusText);
                }
            }
          }
          xhr2.send(param2);
      },
      loginAsync() {
          var params = 'grant_type=client_credentials' + 
					'&client_id=console' + 
          '&client_secret=388D45FA-B36B-4988-BA59-B187D329C207'  +
          '&Login=' + inputfilter.methods.filter(this.Login) +
          '&Password=' + inputfilter.methods.filter(this.Password);

          const xhr = new XMLHttpRequest();
          xhr.open('POST', `http://localhost:5000/connect/token`, true);
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          var vm = this;
          xhr.onload  = responceLoad;
          function responceLoad() 
          {
          if (xhr.readyState == 4) 
            {
                var status = xhr.status;
                if (status == 200) 
              {
                const response = JSON.parse(xhr.responseText);
                var Tok = response.access_token;
                var timeTok = response.expires_in;
                var values = "Bearer " + Tok;
                var refresh = response.refresh_token;
                worktocookie.methods.set_cookie("token",values,timeTok * 12);
                worktocookie.methods.set_cookie("refresh",refresh, timeTok * 24);
                vm.Getidprofile();
              } 
              else 
              {
                alert(xhr.statusText);
              }
            }
          }
          xhr.send(params);
      },
    }
  }
 </script>
<style scoped>
.mainty{
  padding-top: 200px;
}
</style>

