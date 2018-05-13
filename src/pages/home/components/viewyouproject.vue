 <template>
 <div>
    <div v-for="(ErojectB) in EprojectsBound" :key="ErojectB.id">
    <div class="card">
      <div class="card-content">
          <span class="card-title"><router-link :to="{ name: 'project', params: { id: ErojectB.id }}">{{ ErojectB.title }}</router-link></span>
          <p v-html="ErojectB.description"></p>
        </div>
        <div class="card-action">
          <router-link :to="{ name: 'project', params: { id: ErojectB.id }}">Открыть</router-link>
        </div>
      </div>
   </div>
 </div>
 </template>
 <script>
import {worktocookie} from '@/components/mixins/worktocookie.js';

 export default {
    mixins: 
   [worktocookie],
   name: '',
  props: {
      Idprofile: String,
  },
   created () {
    this.getallboundproject();
  },
  watch:
  {
    '$route': 'getallboundproject'
  },
  data() {
    return {
        EprojectsBound: [],
      }
  },
  methods: {
      getallboundproject()
      {
          var params = 'Id_Profile=' + this.Idprofile;
          const xhr = new XMLHttpRequest();
          xhr.open('POST', `http://localhost:5000/api/Projects/getprojectbound`, true);
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
                vm.EprojectsBound=response;
              } 
              if (status == 401) {
               
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
 