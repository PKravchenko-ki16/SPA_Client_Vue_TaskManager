<template>
  <div class="container"> 
    <h3 class="center">Todoist</h3>
    <a v-if="seebuttonlogin" href="#" class="btn-large red logcenter" v-on:click="logintodoist()" >Login</a>
       <div v-if="seebuttonlogin === false" v-for="(TodoistProject) in TodoistProjects" :key="TodoistProject.id">
        <div class="card">
            <div class="card-action">
                <span class="card-title">{{ TodoistProject.name }}</span>
                <a href="#" class="acenter btn red" v-on:click="goimport(TodoistProject.id,TodoistProject.name)">Import</a>          
            </div>
         </div>
       </div>
  </div>
</template>
<script>
import {worktocookie} from '@/components/mixins/worktocookie.js';

  export default {
      mixins: [worktocookie],
     name: 'App',
    data() {
      return {
        TodoistProjects: [],
        TodoistItems: [],
        Send: [],
        Idprofile: worktocookie.methods.getCookie("profileId"),
        code: '',
        seebuttonlogin: true,
      }
    },
    created ()
    {
        this.getparamurl();
    },
    watch:
    {
        '$route': 'getparamurl'
    },
    methods:
    {
        getparamurl()
        {
            var vm = this;
            var regexp = /state=([^&]+)/i;
            var state = '';
            if (!!regexp.exec(document.location.search)) 
            state = regexp.exec(document.location.search)[1];
            if (state === 'secretstring')
            {
                var regexp = /code=([^&]+)/i;
                if (!!regexp.exec(document.location.search)) 
                vm.code = regexp.exec(document.location.search)[1];
                vm.regtodoist();
            }
        },
        logintodoist()
        {
          const xhr = new XMLHttpRequest();
          xhr.open('GET', `http://localhost:5000/api/logintodoist`, true);
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
                var stringURL = response;
                window.location.replace(stringURL);
              }
            }
          }
          xhr.send();
        },
        regtodoist()
        {
            if (this.code != '') 
            {
                var param ="code=" + this.code;

                const xhr = new XMLHttpRequest();
                xhr.open('POST', `http://localhost:5000/api/gettokentodoist`, true);
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
                        const response = JSON.parse(xhr.responseText);
                        var values = response.substr(17,40);
                        worktocookie.methods.set_cookie("todoisttoken",values,3600*2);
                        vm.getproject();
                        vm.getitems();
                    } 
                    else
                    {
                    alert(xhr.statusText);
                    }
                    }
                }
                xhr.send(param);
            }
        },
        getproject() {
          var param ="token=" + worktocookie.methods.getCookie("todoisttoken") +
          '&sync_token=*' +
          '&resource_types=["projects"]';

          const xhr = new XMLHttpRequest();
          xhr.open('POST', `https://todoist.com/api/v8/sync`, true);
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
                const response = JSON.parse(xhr.responseText);
                vm.seebuttonlogin = false;
                vm.TodoistProjects=response.projects;  
              }
            }
          }
          xhr.send(param);
      },
      getitems() {
          var param ="token=" + worktocookie.methods.getCookie("todoisttoken") +
          '&sync_token=*' +
          '&resource_types=["items"]';

          const xhr = new XMLHttpRequest();
          xhr.open('POST', `https://todoist.com/api/v8/sync`, true);
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
                const response = JSON.parse(xhr.responseText);
                vm.TodoistItems = response.items;
              }
            }
          }
          xhr.send(param);
      },
      goimport(id,name) { 
         var params = 'Title=' + name + 
        '&Id_Profile='  + this.Idprofile;
        //   var oneproject = {
        //     id: id,
        //     name: name,
        //     items: this.Send
        //    };
        //   var json = JSON.stringify(this.Send);
          
           const xhr = new XMLHttpRequest();
          xhr.open('POST', `http://localhost:5000/api/Projects/setprojecttodoist`, true);
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            // xhr.setRequestHeader("Content-type", "application/json")
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
            //   vm.Send = [];
              }
              if (status != 200 && status != 201) 
              {
                  alert("Ошибка импорта " + status);
              }
            }
          }
          xhr.send(params);
      },
      Search(id,name)
      {
           var isproj = id;
          var vm = this;
        function sq(value,index,array) {
          if (value.project_id == isproj) {
            vm.Send.push(value);
          }
        }
        this.TodoistItems.forEach(sq);
        this.goimport(id,name);
      },
    }
  }
</script>
<style scoped>
.acenter{
  margin-left: 90%;
}
.logcenter{
  margin-left: 46%;
  margin-top: 10%;
}
</style>

