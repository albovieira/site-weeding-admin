<template>
  <div id="header" class="header sticky-top">
    <b-navbar toggleable="md" variant="white">
      <b-collapse id='menu' is-nav class="nav-wrapper">
        <b-navbar-nav class="ml-auto">
          <!-- <b-nav-item right class="user">
            <div class="avatar">
              <img :src="avatar" alt="">
            </div>
            <div>{{ name ? name.split(" ")[0] : ''}}</div>
          </b-nav-item> -->

          <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
          <b-collapse id='menu' is-nav class="nav-wrapper">
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-item right to="/">
                <div>Inicio</div>
              </b-nav-item>
              <b-nav-item right to="/ranking">
                <div>Ranking Musicas</div>
              </b-nav-item>
              <b-nav-item right to="/wished-musics">
                <div>Musicas</div>
              </b-nav-item>
              <b-nav-item right to="/messages">
                <div>Mensagens</div>
              </b-nav-item>
              <b-nav-item right @click="logout">
                <div>Sair</div>
              </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { getInfoByAttr, clearStorage } from '@/services/storage';
import swal from 'sweetalert';
import toastr from 'toastr';

export default {
  name: 'header',
  data() {
    return {
      name: '',
      lastname: '',
      avatar: ''
    };
  },
  created() {},
  methods: {
    logout() {
      window.localStorage.clear();
      this.$router.push('/');
      window.location.reload();
    }
  }
};
</script>

<style lang='scss' scoped>
@import '../assets/scss/index.scss';
.header {
  border-bottom: 1px solid red;
  padding: 1rem;
  background-color: #fff;
}
.navbar {
  img {
    width: 10rem;
  }
  padding: 0;
  .navbar-brand {
    margin: 0;
    display: flex;
    justify-content: center;
    height: 80px;
    align-items: center;
  }
  .nav-wrapper {
    padding: 0 30px;
  }
}
</style>
