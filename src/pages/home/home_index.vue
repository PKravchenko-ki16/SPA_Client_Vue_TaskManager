<template>
  <div class="container"> 
    <h3 class="center">Список всех открытых проектов:</h3>

    <ViewOwnProject :Idprofile="this.Idprofile"></ViewOwnProject>

    <h3 class="center">Проекты в которых вы участник:</h3>

    <ViewYouProject :Idprofile="this.Idprofile"></ViewYouProject>

  </div>
</template>
<script>
import ViewYouProject from './components/viewyouproject.vue';
import ViewOwnProject from './components/viewownproject.vue';
import {worktocookie} from '../../components/mixins/worktocookie.js';


  export default {
     name: 'App',
      mixins: 
   [worktocookie],
  components: {
    ViewYouProject,
    ViewOwnProject
  },
    data() {
      return {
        Idprofile: worktocookie.methods.getCookie("profileId"),
      }
    },
  }
</script>
<style scoped>

</style>

