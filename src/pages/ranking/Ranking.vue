<template>
  <div id="page"  class="row col-xs-12 col-sm-12 col-md-12 col-lg-12"  align="center">
    <loading :active.sync="isLoading"></loading>
    <b-container>
      <b-row style="margin:1rem">
        <b-col>
          <b-form-input v-model="filter.name" type="text" placeholder="Filtre pelo nome" @change="fetchData"></b-form-input>
        </b-col>
      </b-row>
      <b-row>
        <b-table  :items="ranking.docs" :fields="fields">
        </b-table>
        <b-pagination @input="fetchData($event)" size="sm" :total-rows="ranking.total" v-model="page" :per-page="ranking.limit">
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
  name: 'Ranking',
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
      page: 1,
      filter: {},
      ranking: [],
      fields: ['name', 'music', 'total']
    };
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    async fetchData(pageFromPagination) {
      try {
        let page = 1;
        let url = 'ranking/all';
        if (pageFromPagination) {
          page = pageFromPagination;
        }
        url = `${url}?limit=10${buildQuery({ page: pageFromPagination })}`;

        if (this.filter.name) {
          url = `${url}&name=${this.filter.name}`;
        }

        this.isLoading = true;
        const { data } = await http.get(url);
        this.ranking = data;
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
