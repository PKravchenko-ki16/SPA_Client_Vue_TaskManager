<template>
  <div class="container">
    <h3 class="center">Список всех закрытых проектов:</h3>

  <div v-for="(Eroject) in Erojects" :key="Eroject.id">
    <div class="card">
      <div class="card-content">
          <span class="card-title"><router-link :to="{ name: 'project', params: { id: Eroject.id }}">{{ Eroject.title }}</router-link></span>
          <p v-html="Eroject.description"></p>
        </div>
        <div class="card-action">
          <router-link :to="{ name: 'project', params: { id: Eroject.id }}">Открыть</router-link>
          <a href="#" v-on:click="returnfromarchive(Eroject.id)">Восстановить</a>
        </div>
      </div>
  </div>

  </div>
</template>
<script>
import {worktocookie} from '/Users/Павел/source/repos/SPA_Client_Vue_TaskManager/src/components/mixins/worktocookie';

export default {
     name: 'App',
     mixins:
   [worktocookie],
    data() {
      return {
        idproj: 0,
        Erojects: [],
        Idprofile: worktocookie.methods.getCookie("profileId"),
      }
    },
    created () {
    this.getprojectlistarhiveasync()
  },
  watch:
  {
     '$route': 'getprojectlistarhiveasync'
  },
    methods: {
      removeptoj()
      {
        var vm = this;
        vm.Erojects.splice(vm.idproj,1);
        vm.idproj = 0;
        vm.getprojectlistarhiveasync();
      },
      getprojectlistarhiveasync() {
          var params = 'Id_Profile=' + this.Idprofile;
          const xhr = new XMLHttpRequest();
          xhr.open('POST', `http://localhost:5000/api/Projects/getprojectlistarhiveasync`, true);
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
            else
             {
              alert(xhr.statusText);
             }
            }
          }
          xhr.send(params);
      },
      returnfromarchive(id) {
          this.idproj = id;
          var params = 'Id=' + id;

          const xhr = new XMLHttpRequest();
          xhr.open('POST', `http://localhost:5000/api/Projects/returnfromarchive`, true);
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
            else
             {
              alert("Error " + xhr.statusText);
             }
            }
          }
          xhr.send(params);
      },

    }
  }
</script>
