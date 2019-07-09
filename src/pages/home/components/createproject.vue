 <template>
 <div>
    <a href="#" v-if="seennewbuttonproject" class="btn-floating red" v-on:click="seenbuttoncreatenewproject()" ><i class="material-icons">add</i></a>
     <div v-if="seennewproject === true" class="card">
      <div class="card-content">
        <span class="card-title">New Title</span>
          <span class="card-title"><input autofocus v-model="titlenewproject" placeholder="введите название проекта..."></span>
          <span class="card-title">NEW Description</span>
          <vue-editor v-model="descriptionnewproject"></vue-editor>
        </div>
        <div class="card-action">
          <a href="#" v-on:click="createproject()">Сохранить</a>
          <a href="#" v-on:click="returnbeck()" >Отменить</a>
        </div>
      </div>
 </div>
 </template>
 <script>
import {inputfilter} from '@/components/mixins/inputfilter.js';
import {worktocookie} from '/Users/Павел/source/repos/SPA_Client_Vue_TaskManager/src/components/mixins/worktocookie';
import { VueEditor } from 'vue2-editor';

 export default {
   name: 'CreateProject',
    mixins: 
   [inputfilter]
   [worktocookie],
  props: {
      Idprofile: String,
  },
  data() {
    return {
        seennewbuttonproject: true,
        seennewproject: false,
        titlenewproject: "",
        descriptionnewproject: "",
      }
  },
  components: {
      VueEditor,
   },
  methods: {
          returnbeck()
          {
            this.titlenewproject="",
            this.descriptionnewproject="",
            this.seennewbuttonproject= true;
            this.seennewproject= false;
          },
          createproject() {
          var params = 'Title=' + inputfilter.methods.filter(this.titlenewproject) + 					
          '&Description=' + this.descriptionnewproject +
          '&Id_Profile='  + this.Idprofile;

          const xhr = new XMLHttpRequest();
          xhr.open('POST', `http://localhost:5000/api/Projects/createproject`, true);
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.setRequestHeader('Authorization', worktocookie.methods.getCookie("token"));
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
                 var createproject1 = {
                  id:  response,
                  title : inputfilter.methods.filter(vm.titlenewproject),
                  description : vm.descriptionnewproject
                }
                vm.$emit('savenewproject',createproject1);
                vm.returnbeck();
              }
              if (status != 200 && status != 201) 
              {
                alert("Error");
              }
            }
          }
          xhr.send(params);
      },
      seenbuttoncreatenewproject()
      {
        this.seennewbuttonproject= false;
        this.seennewproject= true;
      },
  },
 };
 </script>
 <style scoped>

 </style>
 