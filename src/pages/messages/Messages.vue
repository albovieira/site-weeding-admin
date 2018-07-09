<template>
  <div id="page"  class="row col-xs-12 col-sm-12 col-md-12 col-lg-12"  align="center">
    <loading :active.sync="isLoading"></loading>
    <b-container>
      <b-row style="margin:1rem">
        <b-col>
          <b-form-input v-model="filter.author" type="text" placeholder="Filtre pelo autor" @change="fetchData"></b-form-input>
        </b-col>
      </b-row>
      <b-row>
        <b-table  :items="messages.docs" :fields="fields">
          <template slot="actions" slot-scope="row">
            <b-button @click="showModal(row.item)" title="Atualizar" size="sm" variant="primary">
              <icon name="edit"></icon>
            </b-button>
            <b-button @click="deleteMessage(row.item)" title="Deletar" size="sm" variant="danger">
              <icon name="trash"></icon>
            </b-button>
          </template>
        </b-table>
        <b-pagination @input="fetchData($event)" size="sm" :total-rows="messages.total" v-model="page" :per-page="messages.limit">
        </b-pagination>
      </b-row>

      <b-modal centered id="modalEdit" @ok="update" ref="modalEdit" title="Editar Mensagem" size="lg" >
        <b-container >
          <b-row style="margin-top:1rem">
            <b-col>
              <b-form-textarea id="comment"
                     v-model="form.message"
                     placeholder="Mensagem..."
                     :rows="8"
                     :max-rows="6">
              </b-form-textarea>
            </b-col>
            <b-col cols="12" style="margin-top:1rem">
                <b-form-input v-model="form.author"
                    type="text" style="margin-bottom:1rem"
                    placeholder="Seu nome"></b-form-input>
            </b-col>
            </b-row>
        </b-container>
      </b-modal>

    </b-container>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import { http } from '@/services/http';
import { buildQuery } from '@/services/util';
import swal from 'sweetalert';

export default {
  name: 'Messages',
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
      page: 1,
      filter: {},
      message: {},
      messages: { docs: [], total: 0, limit: 0 },
      fields: ['author', 'message', 'actions'],
      form: {}
    };
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    async showModal(item) {
      try {
        this.$refs.modalEdit.show();
        const { data } = await http.get(`wall-messages/${item._id}`);
        this.form = data;
      } catch (error) {
        console.log(error);
      }
    },
    async update() {
      try {
        await http.patch(`wall-messages/${this.form._id}`, this.form);
        await this.fetchData();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteMessage(item) {
      try {
        const willConfirm = await swal({
          title: 'Confirma delecao?',
          icon: 'warning',
          buttons: true,
          dangerMode: true
        });

        if (willConfirm) {
          this.isLoading = true;
          await http.delete(`wall-messages/${item._id}`);
          this.isLoading = false;
          await this.fetchData();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchData(pageFromPagination) {
      let page = 1;
      let url = 'wall-messages/all';
      if (parseInt(pageFromPagination)) {
        page = pageFromPagination;
      }
      url = `${url}?limit=10${buildQuery({ page })}`;

      if (this.filter.author) {
        url = `${url}&author=${this.filter.author}`;
      }

      this.isLoading = true;
      const { data } = await http.get(url);
      this.messages = data;
      this.isLoading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/index.scss';
</style>
