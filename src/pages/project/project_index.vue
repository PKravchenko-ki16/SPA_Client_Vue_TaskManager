<template>
  <div class="container">

    <div v-if="seenifcompliteno" class="card">

        <ProjectAndAddUserToProject :Erojects="this.Erojects" :seenaddprofile="this.seenaddprofile" :idproject="this.idproject"></ProjectAndAddUserToProject>

        <Createtasktoproject :idproject="this.idproject"></Createtasktoproject>

        <div class="card-action">

        <div v-if="seeisnulltasks">
          <h5>Вы пока не создали задач(</h5>
        </div>


           <div v-for="(Etask) in Etasks" :key="Etask.id" class="card-action">
             <div class="card ">
                <div v-bind:class="{green: Etask.complite === 'yes'}" class="card-content">
                <div class="row">
                  <div class="col s11 m11 l11">
                    <h6 v-bind:class="{whitetext: Etask.complite === 'yes'}">Name Task: {{ Etask.title }}</h6>
                  </div>
                  <div class="col s1 m1 l1">
                    <a href="#" v-bind:class="{green: Etask.complite === 'yes'}" class="btn-floating red" v-on:click="taskcomplite(Etask)"><i class="material-icons">done</i></a>
                  </div>
                </div>
                </div>
                <div class="card-action">
                <div class="row">
                  <div class="col s4 m4 l5">
                    <h6 class="green-text">Приоритет: {{Etask.priority}}</h6>
                  </div>
                  <div class="col s4 m5 l5">
                  <h6 class="teal-text">Deadline: {{Etask.deadline}}</h6>
                  </div>
                  <div class="col s4 m3 l2">
                  <h6 class="blue-text">Complite: {{Etask.complite}}</h6>
                  </div>
                </div>
                </div>
                  <div class="card-action">
                    <a href="#" v-if="seencreatetasktotask" v-on:click="createtasktotask(Etask.id)">Создать подзадачу</a>
                    <a href="#" v-if="seeneditbuttask" v-on:click="restedittask(Etask)">Редактировать</a>
                    <a href="#" v-if="seeremove" v-on:click="seenremove(Etask.id)">Удалить</a>
                    <a href="#" v-if="seengoremove === true,ids === Etask.id" v-on:click="beckremove()">Отменить</a>
                    <a href="#" v-if="seengoremove === true,ids === Etask.id" v-on:click="delitetask(Etask.id)" >Подтвердить</a>
                    <div v-if="seenotcomplite, idcomplite === Etask.id">
                     <h6 class="red-text">Ещё не все подзадачи выполнены...</h6> 
                    </div>
                  </div>
                  <div class="card-action">
                      <a  v-if="seeneditbutton" v-on:click="viewtaskshared(Etask)" class="acenter btn-floating Small waves-effect waves-light grey"><i class="material-icons">dehaze</i></a>
                      <a  v-if="notseeneditbutton" v-on:click="nviewtaskshared()" class="acenter btn-floating Small waves-effect waves-light grey"><i class="material-icons">dehaze</i></a>
                  </div>
                </div>



                <div v-if="seenaddtasktotask,ittt === Etask.id" class="card ">
                <div class="card-content">
                <div class="row">
                  <div class="col s12 m12 l12">
                    <span class="card-title">NEW Task Name</span>
                    <span class="card-title"><input  v-model="titlenewtask" autofocus placeholder="введите имя проекта..."></span>
                  </div>
                </div>
                </div>
                <div class="card-action">
                <div class="row">
                  <div class="col s6 m6 l6">
                    <h6 class="green-text">Приоритет: {{ picked }}</h6>
                    <form action="#">
                    <p>
                      <label>
                        <input name="group1" type="radio" value="Esey" v-model="picked"/>
                        <span>Esey</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input name="group1" type="radio" value="Middle" v-model="picked" checked/>
                        <span>Middle</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input name="group1" type="radio"  value="Hard" v-model="picked"/>
                        <span>Hard</span>
                      </label>
                    </p>
                  </form>
                    
                  </div>
                  <div class="col s6 m6 l6">
                  <h6 class="teal-text">Deadline: </h6>
                   <datepicker v-model="datepick"></datepicker>
                  </div>
                </div>
                </div>
                  <div class="card-action">
                    <a href="#" v-on:click="Createnewtasktotask()">Сохранить</a>
                    <a href="#" v-on:click="befotasktotask()">Отменить</a>
                  </div>
                </div>



               <div v-if="seenedittask,itt === Etask.id" class="card ">
                <div class="card-content">
                <div class="row">
                  <div class="col s12 m12 l12">
                    <span class="card-title">Task Name</span>
                    <span class="card-title"><input  v-model="Etask.title" autofocus placeholder="введите имя проекта..."></span>
                  </div>
                </div>
                </div>
                <div class="card-action">
                <div class="row">
                  <div class="col s6 m6 l6">
                    <h6 class="green-text">Приоритет: {{ picked }}</h6>
                    <form action="#">
                    <p>
                      <label>
                        <input name="group1" type="radio" value="Esey" v-model="Etask.priority"/>
                        <span>Esey</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input name="group1" type="radio" value="Middle" v-model="Etask.priority" checked/>
                        <span>Middle</span>
                      </label>
                    </p>
                    <p>
                      <label>
                        <input name="group1" type="radio"  value="Hard" v-model="Etask.priority"/>
                        <span>Hard</span>
                      </label>
                    </p>
                  </form>
                  </div>
                  <div class="col s6 m6 l6">
                  <h6 class="teal-text">Deadline: </h6>
                  <datepicker v-model="Etask.deadline"></datepicker>
                  </div>
                </div>
                </div>
                  <div class="card-action">
                    <a href="#" v-on:click="edittaskfull(Etask)">Сохранить</a>
                    <a href="#" v-on:click="restbefotask()">Отменить</a>
                  </div>
                </div>

               <ol v-if="seen===true,it === Etask.id" class="oimain">
                 <TaskShared :taskid="Etask.id" :seenfalse="true"></TaskShared>
               </ol>
               <ol v-else-if="seen === false">
               </ol>
           </div>
      </div>
  </div>



  <div v-if="seenifcompliteno === false">
    <div class="card">
        <h3 class="center">{{ Erojects.title }}</h3>
        <div class="card-content">
        <h5>{{ Erojects.description }}</h5>
        </div>
        <h4 class="center">Задачи проекта:</h4>
        <div class="card-action">
           <div v-for="(Etask) in Etasks" :key="Etask.id" class="card-action">
             <div class="card ">
                <div v-bind:class="{green: Etask.complite === 'yes'}" class="card-content">
                <div class="row">
                  <div class="col s11 m11 l11">
                    <h6 v-bind:class="{whitetext: Etask.complite === 'yes'}">Name Task: {{ Etask.title }}</h6>
                  </div>
                  <div class="col s1 m1 l1">
                  </div>
                </div>
                </div>
                <div class="card-action">
                <div class="row">
                  <div class="col s4 m4 l5">
                    <h6 class="green-text">Приоритет: {{Etask.priority}}</h6>
                  </div>
                  <div class="col s4 m5 l5">
                  <h6 class="teal-text">Deadline: {{Etask.deadline}}</h6>
                  </div>
                  <div class="col s4 m3 l2">
                  <h6 class="blue-text">Complite: {{Etask.complite}}</h6>
                  </div>
                </div>
                </div>
                  <div class="card-action">
                      <a  v-if="seeneditbutton" v-on:click="viewtaskshared(Etask)" class="acenter btn-floating Small waves-effect waves-light grey"><i class="material-icons">dehaze</i></a>
                      <a  v-if="notseeneditbutton" v-on:click="nviewtaskshared()" class="acenter btn-floating Small waves-effect waves-light grey"><i class="material-icons">dehaze</i></a>
                  </div>
                </div>
                <ol v-if="seen===true,it === Etask.id" class="oimain">
                 <TaskShared :taskid="Etask.id" :seenfalse="false"></TaskShared>
               </ol>
               <ol v-else-if="seen === false">
               </ol> 
           </div>
        </div>
    </div>
  </div>


</div>
</template>
<script>
import TaskShared from './components/taskshared.vue';
import Createtasktoproject from './components/createtasktoproject.vue';
import ProjectAndAddUserToProject from './components/projectandaddusertoproject.vue';
import {inputfilter} from '@/components/mixins/inputfilter.js';
import {worktocookie} from '@/components/mixins/worktocookie.js';
import Datepicker from 'vuejs-datepicker';

export default {
  mixins: [inputfilter] [worktocookie],
  name: 'App',
    data() {
      return {
        Idprofile: worktocookie.methods.getCookie("profileId"),
        seenfalse: true,
        taskid: 0,
        idproject: this.$route.params.id,
        Etasks:[],
        seen: false,
        seeisnulltasks:false,
        seeneditbutton: true,
        notseeneditbutton: false,
        seencreatetasktotask: true,
        picked: 'Middle',
        titlenewtask: '',
        datepick: new Date(),
        seenotcomplite: false,
        idcomplite: 0,
        it: 0,
        itt: 0,
        ittt: 0,
        ids: 0,
        seeneditbuttask: true,
        seenedittask: false,
        seenaddtasktotask: false,
        seenifcompliteno: false,
        titlebefotask: "",
        pickedbefotask: "",
        datepickbefotask: new Date(),
        Erojects: [],
        seenaddprofile: false,
        seeremove: true,
        seengoremove: false,
      }
    },
    mounted() 
    {
      var vm = this;
      this.$on('savetasktoproject', this.savenewtasktoproject);
    },
  components: {
    Datepicker,
    TaskShared,
    Createtasktoproject,
    ProjectAndAddUserToProject,
  },
    created () {
     this.getone();
     this.getnulltasks();
  },
  watch:
  {
     '$route': 'getnulltasks',
     '$route': 'getone',
  },
    methods: {
      beckremove()
      {
        this.ids = 0;
        this.seeremove = true;
        this.seengoremove = false;
      },
      seenremove(ids)
      {
        this.ids = ids;
        this.seengoremove = true,
        this.seeremove = false;
      },
      getone() 
          {
          var params = 'Id=' + this.idproject;

          const xhr = new XMLHttpRequest();
          xhr.open('POST', `http://localhost:5000/api/Projects/getone`, true);
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
                if (response.arсhive === "False")
                {
                    vm.seenifcompliteno = true;
                }
                if (response.id_Profile == vm.Idprofile)
                {
                  vm.seenaddprofile = true;
                }
              } 
            else
             {
              alert(xhr.statusText);
             }
            }
          }
          xhr.send(params);
       },
      savenewtasktoproject(createtasktoproject)
      {
        this.Etasks.push(createtasktoproject);
        this.seeisnulltasks = false;
      },
      Createnewtasktotask()
      {
        var params = 'Title=' + inputfilter.methods.filter(this.titlenewtask) + 
          '&Deadline=' + this.datepick.toISOString() +
          '&projectId=' + this.idproject +
          '&Priority=' + inputfilter.methods.filter(this.picked) +
          '&Id_Task='  + this.ittt;

          const xhr = new XMLHttpRequest();
          xhr.open('POST', `http://localhost:5000/api/Tasks/createtotask`, true);
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
                var createtasktotask = {
                  title : inputfilter.methods.filter(vm.titlenewtask),
                  deadline : vm.datepick,
                  priority: inputfilter.methods.filter(vm.picked),
                  complite: "no",
                }
                vm.befotasktotask();
                vm.getnulltasks();
              } 
            else
             {
              alert("Error " + xhr.statusText);
             }
            }
          }
          xhr.send(params);
      },
      befotasktotask()
      {
        this.titlenewtask = "";
        this.picked = "Middle";
        this.datepick =  new Date();
        this.seencreatetasktotask = true;
        this.seenaddtasktotask = false;
        this.ittt = 0;
      },
      createtasktotask(id)
      {
        this.ittt = id;
        this.seencreatetasktotask = false;
        this.seenaddtasktotask = true;
      },
      edittaskfull(Etask)
      {
        this.updatetask(Etask);
        this.itt = 0;
      },
      restbefotask()
      {
        var vm = this;
        function sq(value,index,array) {
          if (value.id === vm.itt) {
            value.title = vm.titlebefotask;
            value.deadline = vm.datepickbefotask;
            value.priority = vm.pickedbefotask;
          }
        }
        this.Etasks.forEach(sq);
        this.seeneditbuttask = true;
        this.seenedittask = false;
        this.itt = 0;
      },
      restedittask(Etask)
      {
       this.itt = Etask.id;
       this.titlebefotask = inputfilter.methods.filter(Etask.title);
       this.pickedbefotask = inputfilter.methods.filter(Etask.priority);
       this.datepickbefotask = Etask.deadline;
       this.seeneditbuttask = false;
       this.seenedittask = true;
      },
      nviewtaskshared()
      {
        this.it = 0;
        this.seen = false;
        this.seeneditbutton = true;
        this.notseeneditbutton = false;
      },
      viewtaskshared(Etask)
      {
        this.it = Etask.id; 
        this.seen = true;
        this.seeneditbutton = false;
        this.notseeneditbutton = true;
      },
      taskcomplite(Etask)
      {
        if (Etask.complite === "no") 
        {
        this.idcomplite = Etask.id;
        this.gocomplite(Etask.id);
        } 
      },
      vtrue(id)
      {
          function sq(value,index,array) {
          if (value.id === id) {
            value.complite = 'yes';
          }
        }
        this.Etasks.forEach(sq);
      },
      updatetask(Etask)
      {
           var params = 'Title=' + inputfilter.methods.filter(Etask.title) + 
					'&Deadline=' + Etask.deadline +
          '&Priority='  +  inputfilter.methods.filter(Etask.priority) +
          '&Id='  +  Etask.id;

          const xhr = new XMLHttpRequest();
          xhr.open('POST', `http://localhost:5000/api/Tasks/edittask`, true);
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
                vm.seeneditbuttask = true;
              } 
            else
             {
               vm.restbefotask();
              alert("Error " + xhr.statusText);
             }
            }
          }
          xhr.send(params);
      },
      delitetask(id)
      {
          var params = 'Id=' + id;

          const xhr = new XMLHttpRequest();
          xhr.open('POST', `http://localhost:5000/api/Tasks/delitetask`, true);
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
                vm.Etasks.splice(vm.ids,1);
                vm.beckremove();
              } 
            else
             {
              alert(xhr.statusText);
             }
            }
          }
          xhr.send(params);
      },
      gocomplite(id)
      {
          var params = 'Id=' + id;

          const xhr = new XMLHttpRequest();
          xhr.open('POST', `http://localhost:5000/api/Tasks/complite`, true);
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
                vm.vtrue(id);             
              } 
            if(status == 400)
             {
               vm.seenotcomplite = true;
             }
            }
          }
          xhr.send(params);
      },
      getnulltasks()
      {
          var n = 0;
          var params = 'id_task=' + n +
          '&projectId=' + this.idproject;

          const xhr = new XMLHttpRequest();
          xhr.open('POST', `http://localhost:5000/api/Tasks/gettasks`, true);
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
                vm.Etasks = response;
                vm.seeisnulltasks = false;
              } 
            if(status == 400)
            {
              vm.seeisnulltasks = true;
            }
            }
          }
          xhr.send(params);
      },
    }
}
</script>
<style scoped>
.oimain{
  list-style-type: none;
}
.acenter{
  margin-left: 45%;
}
.green{
  
}
.whitetext{
  text-decoration-color: aliceblue;
}
</style>

