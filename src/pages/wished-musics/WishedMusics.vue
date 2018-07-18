<template>
  <div id="page"  class="row col-xs-12 col-sm-12 col-md-12 col-lg-12"  align="center">
    <loading :active.sync="isLoading"></loading>
    <b-container>
      <b-row>
        <b-table  :items="wishedMusic.docs" :fields="fields">
        </b-table>
        <b-pagination @input="fetchData($event)" size="sm" :total-rows="wishedMusic.total" v-model="page" :per-page="wishedMusic.limit">
        </b-pagination>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import { http } from '@/services/http';
import { buildQuery } from '@/services/util';
import swal from 'sweetalert';

export default {
  name: 'WishedMusis',
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
      page: 1,
      filter: {},
      wishedMusic: [],
      fields: [
        {
          key: 'name',
          label: 'Nome'
        },
        {
          key: 'music',
          label: 'Musica'
        },
        {
          key: 'guest',
          label: 'Convidado',
          formatter: guest => {
            return guest.name;
          }
        }
      ]
    };
  },
  async created() {
    if (!window.localStorage.getItem('loggedin')) {
      this.$router.push('/');
    }
    if (!window.localStorage.getItem('loaded')) {
      window.localStorage.setItem('loaded', true);
      console.log(`reloading`);
      window.location.reload();
    }
    await this.fetchData();
  },
  methods: {
    async fetchData(pageFromPagination) {
      try {
        let page = 1;
        let url = 'wished-musics';
        if (pageFromPagination) {
          page = pageFromPagination;
        }
        url = `${url}?limit=10${buildQuery({ page: pageFromPagination })}`;

        if (this.filter.name) {
          url = `${url}&name=${this.filter.name}`;
        }

        this.isLoading = true;
        const { data } = await http.get(url);
        this.wishedMusic = data;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/index.scss';
</style>
