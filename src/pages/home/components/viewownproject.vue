 <template>
 <div>
   <CreateProject :Idprofile="this.Idprofile"  v-on:savenewproject="onSavenewproject"></CreateProject>

   <div v-for="(Eroject) in Erojects" :key="Eroject.id">
    <div class="card">
      <div class="card-content">
          <span class="card-title"><router-link :to="{ name: 'project', params: { id: Eroject.id }}">{{ Eroject.title | InputFilter }}</router-link></span>
          <p v-html="Eroject.description"></p>
        </div>
        <div class="card-action">
          <router-link :to="{ name: 'project', params: { id: Eroject.id }}">Открыть</router-link>
          <a href="#" v-if="seeneditbutton" v-on:click="restEdit(Eroject)" >Редактировать</a>
          <a v-if="seearhive" href="#" v-on:click="seegoarhive(Eroject.id)">В архив</a>
          <a href="#" v-if="seengoarhive === true,ids === Eroject.id" v-on:click="beckgoarhive()">Отменить</a>
          <a href="#" v-if="seengoarhive === true,ids === Eroject.id" v-on:click="goarhive(Eroject.id)">Подтвердить</a>
        </div>
      </div>

     <div v-if="seen === true, it === Eroject.id" class="card">
      <div class="card-content">
        <span class="card-title"><a href="#" >Project Name</a></span>
          <span class="card-title"><input autofocus v-model="Eroject.title"></span>
          <span class="card-title"><a href="#" >Project Description</a></span>
          <vue-editor v-model="Eroject.description"></vue-editor>
        </div>
        <div class="card-action">
          <a href="#" v-on:click="resteditfull(Eroject)">Сохранить</a>     
          <a href="#" v-on:click="restbefo()" >Отменить</a>
        </div>
      </div>

  </div>
 </div>
 </template>
 <script>
 import CreateProject from './createproject.vue';
 import {inputfilter} from '@/components/mixins/inputfilter.js';
 import {worktocookie} from '@/components/mixins/worktocookie';
 import { VueEditor } from 'vue2-editor';
 
 export default {
   name: 'viewownproject',
   mixins: 
   [inputfilter]
   [worktocookie],
  props: {
    Idprofile: String,
  },
  components: {
    CreateProject,
     VueEditor,
  },
  data() {
    return {
        idproj: 0,
        Erojects: [],
        seen: false,
        seearhive: true,
        seengoarhive: false,
        it: 0,
        ids: 0,
        seeneditbutton: true,
        titlebefo:"",
        descriptionbefo: "",
      }
  },
    created () {
    this.allprojectasync();
  },
  watch:
  {
    '$route': 'allprojectasync'
  },
  methods: {
      beckgoarhive()
      {
        this.ids = 0;
        this.seearhive = true;
        this.seengoarhive = false;
      },
      seegoarhive(ids)
      {
        this.seearhive = false;
        this.ids = ids;
        this.seengoarhive = true;
      },
      removeptoj()
      {
        var vm = this;
        vm.Erojects.splice(vm.idproj,1);
        vm.idproj = 0;
        this.seearhive = true;
        this.seengoarhive = false;
        vm.allprojectasync();
      },
      restEdit(Eroject)
      {
        this.it = Eroject.id;
        this.titlebefo=inputfilter.methods.filter(Eroject.title);
        this.descriptionbefo= Eroject.description;
        this.seen=true;
        this.seeneditbutton=false;
      },
      onSavenewproject(createproject1)
      {
        this.Erojects.push(createproject1);
      },
      restbefo()
      {
        var vm = this;
        function sq(value,index,array) {
          if (value.id === vm.it) {
            value.title = vm.titlebefo;
            value.description = vm.descriptionbefo;
          }
        }
        this.Erojects.forEach(sq);
        this.seen=false;
        this.seeneditbutton = true;
        this.it = 0;
      },
      resteditfull(Eroject)
      {
        this.updateproject(Eroject);
        this.it = 0;
      },
      updateproject(Eroject) {
           var params = 'Title=' + inputfilter.methods.filter(Eroject.title) + 
					'&Description=' + Eroject.description +
          '&Id='  +  Eroject.id;
          const xhr = new XMLHttpRequest();
          xhr.open('POST', `http://localhost:5000/api/Projects/editproject`, true);
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.setRequestHeader('Authorization', worktocookie.methods.getCookie("token"));
          xhr.onload  = responceLoad;
          var vm = this;
          function responceLoad()
          {
           if (xhr.readyState == 4) 
           {
             var status = xhr.status;
             if (status == 200)
              {
                vm.seeneditbutton = true;
              }
            else
             {
               vm.restbefo();
             }
            }
          }
          xhr.send(params);
      },
      allprojectasync() {
          var params = 'Id_Profile=' + this.Idprofile;

          const xhr = new XMLHttpRequest();
          xhr.open('POST', `http://localhost:5000/api/Projects/getprojectlistasync`, true);
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.setRequestHeader('Authorization', worktocookie.methods.getCookie("token"));
          xhr.onload  = responceLoad;
          var vm = this;
          function responceLoad()
          {
           if (xhr.readyState == 4) 
           {
             var status = xhr.status;
             if (status == 200)
              {
                const response = JSON.parse(xhr.responseText);
                vm.Erojects=response;
              }
            }
          }
          xhr.send(params);
      },
      goarhive(id) {
          this.idproj = id;
          var params = 'Id=' + id;

          const xhr = new XMLHttpRequest();
          xhr.open('POST', `http://localhost:5000/api/Projects/goarhive`, true);
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.setRequestHeader('Authorization', worktocookie.methods.getCookie("token"));
          xhr.onload  = responceLoad;
          var vm = this;
          function responceLoad()
          {
           if (xhr.readyState == 4) 
           {
             var status = xhr.status;
              if (status == 200)
              {
              vm.removeptoj();
              }
              if (status != 200 && status != 201) 
              {
                alert("Авторизация слитела");
              }
            }
          }
          xhr.send(params);
      },
  },
 };
 </script>
 <style scoped>

 </style>
 