<template>
  <div id="app">
    <main>
      <Header  />
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
  name: 'app'
};
</script>

<style>
</style>
