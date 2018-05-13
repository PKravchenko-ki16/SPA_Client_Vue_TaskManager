<template>
  <div id="app">
    <div class="navbar-fixed row">
     <nav>
        <ul class="navbar-center">
          <li class="col s2 m2 l3"></li>
          <li class="col s2 m2 l1"><router-link to="/">Home</router-link></li>
          <li class="col s2 m2 l1"><router-link to="/arhive">Arhive</router-link></li>
          <li class="col s2 m2 l1"><router-link to="/todoist">Todoist</router-link></li>
          <li class="col s2 m3 l3"></li>
        </ul>
      </nav>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
