 <template>
 <div>
             <a href="#" v-if="addtask" v-on:click="addtasknull()" class="btn-floating red"><i class="material-icons">add</i></a>

                  <div v-if="seenaddtask" class="card ">
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
                    <a href="#" v-on:click="Createnewtasktoproject()">Сохранить</a>
                    <a href="#" v-on:click="returnaddtask()">Отменить</a>
                  </div>
                </div>
 </div>
 </template>
 <script>
import {inputfilter} from '@/components/mixins/inputfilter.js';
import {worktocookie} from '@/components/mixins/worktocookie.js';
import Datepicker from 'vuejs-datepicker';

 export default {
   name: '',
   mixins: [inputfilter] [worktocookie],
  props: {
    idproject: Number,
  },
  data() {
    return {
        addtask: true,
        seenaddtask: false,
        titlenewtask: "",
        picked: "Middle",
        datepick: new Date(),
      }
  },
   components: {
    Datepicker,
  },
  methods: {
      addtasknull()
      {
        this.addtask = false;
        this.seenaddtask = true;
      },
      returnaddtask()
      {
        this.idproject= this.$route.params.id,
        this.titlenewtask= "";
        this.datepick= new Date();
        this.picked = "Middle";
        this.seenaddtask = false;
        this.addtask = true;
      },
      Createnewtasktoproject()
      {
        var n = 0;
        var params = 'Title=' + inputfilter.methods.filter(this.titlenewtask) + 
          '&Deadline=' + this.datepick.toISOString() +
          '&projectId=' + this.idproject +
          '&Priority=' + inputfilter.methods.filter(this.picked);

          const xhr = new XMLHttpRequest();
          xhr.open('POST', `http://localhost:5000/api/Tasks/createtoproject`, true);
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
               var createtasktoproject = {
                  title : inputfilter.methods.filter(vm.titlenewtask),
                  deadline : vm.datepick,
                  priority: inputfilter.methods.filter(vm.picked),
                  complite: "no",
                }
                vm.$parent.$emit('savetasktoproject', createtasktoproject);
                vm.returnaddtask();                     
              } 
            else
             {
              alert("Error " + xhr.statusText);
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
 