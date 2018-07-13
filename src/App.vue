<template>
  <div id="app">
    <main>
      <Header v-if="loggedIn"  />
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Header from './components/Header';

export default {
  components: {
    Header
  },
  data() {
    return {
      loggedIn: null
    };
  },
  name: 'app',
  created() {
    if (window.localStorage.getItem('loggedin')) {
      this.loggedIn = window.localStorage.getItem('loggedin');
    }
  },
  methods: {}
};
</script>

<style>
</style>
