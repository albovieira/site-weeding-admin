<template>
  <div id="page"  class="row col-xs-12 col-sm-12 col-md-12 col-lg-12"  align="center">
    <loading :active.sync="isLoading"></loading>
    <b-container>
      <b-row style="margin:1rem">
        <b-form @submit="submit">
          <b-form-input v-model="form.username" type="text" placeholder="Username" />
          <br>
          <b-form-input v-model="form.password" type="password" placeholder="Password" />
          <br>
          <b-button type="submit" variant="primary">Login</b-button>
        </b-form>
      </b-row>

    </b-container>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import { http } from '@/services/http';
import { buildQuery } from '@/services/util';
import swal from 'sweetalert';
import moment from 'moment';

export default {
  name: 'Login',
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
      form: {},
      db_username: 'camilaealbo',
      db_pass: '103229'
    };
  },
  async created() {
    if (window.localStorage.getItem('loggedin')) {
      return this.$router.push('home');
    }
  },
  methods: {
    submit(e) {
      e.preventDefault();

      if (
        this.form.username === this.db_username &&
        this.form.password === this.db_pass
      ) {
        window.localStorage.setItem('loggedin', true);
        this.$router.push('home');
      } else {
        swal('Login incorreto', 'Senha ou usuario incorretos', 'error');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/index.scss';
</style>
