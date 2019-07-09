 <template>
 <div>
         <h3 class="center">{{ Erojects.title }}</h3>
      <div class="card-content">
            <h5 v-html="Erojects.description"></h5>
          <br>
          <div v-if="seenaddprofile">
            <h5>Добавте пользователей к проекту:</h5>
            <div class="row">
                  <div class="col s9 m10 l10">
                  <input type="text" placeholder="Впишите имя..." v-model="addprofile">
                  </div>
                   <div class="col s3 m2 l2">
                     <button class="btn red waves-effect waves-light" v-on:click="addprofiletoproject()" type="submit" name="action"><i class="mdi-action-lock-open"></i> add</button>
                  </div>
            </div>
             <span><h5>Добавленно: {{ checkedNames }}</h5></span>
          </div>
          <h4 class="center">Задачи проекта:</h4>
        </div>
 </div>
 </template>
 <script>
import {inputfilter} from '@/components/mixins/inputfilter.js';
import {worktocookie} from '@/components/mixins/worktocookie.js';

 export default {
   name: '',
    mixins: [inputfilter] [worktocookie],
  props: {
    seenaddprofile: Boolean,
    idproject: Number,
    Erojects: Object
  },
  created () {
    this.getboundprofile();
  },
  watch:
  {
     '$route': 'getboundprofile',
  },
  data() {
    return {
        checkedNames: [],
        addprofile: "",
        }
  },
  methods: {
     getboundprofile()
      {
        var params =
          'id_project=' + this.idproject;

          const xhr = new XMLHttpRequest();
          xhr.open('POST', `http://localhost:5000/api/Projects/goboundprofile`, true);
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.setRequestHeader('Authorization', worktocookie.methods.getCookie("token"));
          xhr.onload  = responceLoad;
          var vm = this;
          function responceLoad()
          {
           if (xhr.readyState == 4) 
           {
             var status = xhr.status;
             if (status == 200 || status ==  201)
              {
                 const response = JSON.parse(xhr.responseText);
                 vm.addchecknameprofile(response);
              } 
            else
             {
              alert("Error " + xhr.statusText);
             }
            }
          }
          xhr.send(params);
      },
      addchecknameprofile(response)
      {
        response.forEach(element => {
          this.checkedNames.push(element);
        });

        this.addprofile = "";
      },
      addcheckname()
      {
        this.checkedNames.push(this.addprofile);
        this.addprofile = "";
      },
      addprofiletoproject()
      {
        var params = 'name=' + inputfilter.methods.filter(this.addprofile) + 
          '&id_project=' + this.idproject;

          const xhr = new XMLHttpRequest();
          xhr.open('POST', `http://localhost:5000/api/Projects/gobound`, true);
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.setRequestHeader('Authorization', worktocookie.methods.getCookie("token"));
          xhr.onload  = responceLoad;
          var vm = this;
          function responceLoad()
          {
           if (xhr.readyState == 4) 
           {
             var status = xhr.status;
             if (status == 200 || status ==  201)
              {
                vm.addcheckname();
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
 