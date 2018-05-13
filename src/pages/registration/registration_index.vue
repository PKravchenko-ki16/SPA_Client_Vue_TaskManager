<template>
  <div class="container">
             <div class="row mainty">
            <div class="col s12 m12 l12">
              <div class="card-panel">
                <div class="row">
                <form class="col s12">
                  <h4 class="header2">Пожалуйста введите свои данные, чтобы продолжить.</h4>
                  <div class="row">
                    <div class="input-field col s6">
                      <span>Name</span>
                      <input autofocus type="text" class="autocomplete" v-model="Name">
                    </div>
                    <div class="input-field col s6">
                       <span>Login</span>
                      <input type="text"  v-model="Login">
                    </div>
                  </div>
                    <div class="row">
                    <div class="input-field col s5">
                      <span>Password</span>
                      <input type="text" class="autocomplete" v-model="Password">
                    </div>
                    <div class="input-field col s5">
                       <span>Confirm Password</span>
                      <input  type="password" v-model="ConfirmPassword">
                    </div>
                    <div class="input-field col s2">
                      <br>
                      <div class="input-field">
                        <button class="btn cyan waves-effect waves-light" @click='registration()' type="submit" name="action"><i class="mdi-action-lock-open"></i>Reg</button>
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
import {inputfilter} from '@/components/mixins/inputfilter.js'
import router from '@/router/index.js'

export default {
     name: 'App',
     mixins: [inputfilter],
    data() {
      return {
        Name: "",
        Login: "",
        Password: "",
        ConfirmPassword: ""
      }
    },
    methods: {
      registration() {
        
      if (this.Password === this.ConfirmPassword) 
      {
          var params = 'Name=' + inputfilter.methods.filter(this.Name) + 
          '&Login=' + inputfilter.methods.filter(this.Login) +
          '&Password=' + inputfilter.methods.filter(this.Password) ;

          const xhr = new XMLHttpRequest();
          xhr.open('POST', `http://localhost:5000/api/registration`, true);
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.onload  = responceLoad;
          var vm = this;
          function responceLoad()
          {
           if (xhr.readyState == 4) 
           {
             var status = xhr.status;
             if (status == 200)
              {
               router.push('/login');
              } 
            else
             {
              alert(xhr.statusText);
              //добавление валидации сюда
             }
            }
          }
          xhr.send(params);
        }
      }
    }
  }
</script>
<style scoped>

</style>