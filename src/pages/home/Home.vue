<template>
  <div id="page"  class="row col-xs-12 col-sm-12 col-md-12 col-lg-12"  align="center">
    <loading :active.sync="isLoading"></loading>
    <b-container>
      <b-row>
        <b-col style="padding:1rem">
          <h5 class="text-left">Total: <strong >{{total}}</strong></h5>
          <h5 class="text-left">Confirmados: <strong class="text-success">{{totalConfirmed}}</strong></h5>
          <h5 class="text-left">Pendentes: <strong class="text-danger">{{totalUnconfirmed}}</strong></h5>
        </b-col>
      </b-row>
      <b-row style="margin:1rem">
        <b-col>
          <b-form-input v-model="filter.name" type="text" placeholder="Filtre pelo nome" @change="fetchData"></b-form-input>
        </b-col>
        <b-col>
           <b-form-select v-model="filter.invitedBy" class="mb-3" @input="fetchData">
                <option :value="null" disabled>Selecione</option>
                <option value="Albo">Albo</option>
                <option value="Camila">Camila</option>
            </b-form-select>
        </b-col>

        <b-col>
          <b-form-select v-model="filter.confirmed" class="mb-3" @input="fetchData">
            <option :value="null" disabled>Selecione</option>
            <option value="yes">Confirmado</option>
            <option value="no">Nao Confirmado</option>
          </b-form-select>
        </b-col>
        <b-col>
          <b-button @click="showModal" variant="success">Novo</b-button>
        </b-col>
        <b-col>
            <b-button @click="removeFilters" size="sm" variant="danger">
              Limpar Filtros
            </b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-table  :items="guests.docs" :fields="fields">
          <template slot="actions" slot-scope="row">
            <b-button @click="setStatus(row.item)" title="Confirmacao" size="sm" :variant="row.item.confirmed ? 'success' : 'info'">
              <icon v-if="row.item.confirmed" name="check-square"></icon>
              <icon v-if="!row.item.confirmed" name="square"></icon>
            </b-button>
            <b-button @click="deleteMessage(row.item)" title="Confirmacao" size="sm" variant="danger">
              <icon  name="trash"></icon>
            </b-button>
          </template>
        </b-table>
        <b-pagination @input="fetchData($event)" size="sm" :total-rows="guests.total" v-model="page" :per-page="guests.limit">
        </b-pagination>
      </b-row>


      <b-modal centered id="modalCreate" @ok="submit" ref="modalCreate" title="Criar Usuario" size="lg" >
        <b-container >
          <b-row style="margin-top:1rem">
            <b-col cols="12" style="margin-top:1rem">
                <b-form-input v-model="form.name"
                    type="text" style="margin-bottom:1rem"
                    placeholder="Nome"></b-form-input>
            </b-col>
            <b-col>
               <b-form-select v-model="form.invitedBy" class="mb-3">
                <option :value="null" disabled>Selecione</option>
                <option value="Albo">Albo</option>
                <option value="Camila">Camila</option>
              </b-form-select>
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
import moment from 'moment';

export default {
  name: 'Home',
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
      total: 0,
      totalConfirmed: 0,
      totalUnconfirmed: 0,
      page: 1,
      filter: { confirmed: null, invitedBy: '' },
      guests: [],
      fields: [
        'name',
        'email',
        'confirmed',
        'invitedBy',
        'date_confirmation',
        'actions'
      ],
      fields: [
        {
          key: 'name',
          label: 'Nome'
        },
        {
          key: 'email',
          label: 'Email'
        },
        {
          key: 'phone',
          label: 'Telefone'
        },
        {
          key: 'confirmed',
          label: 'Confirmado',
          formatter: value => {
            return value === true ? 'Sim' : 'Nao';
          }
        },
        {
          key: 'invitedBy',
          label: 'Convidado Por'
        },
        {
          key: 'date_confirmation',
          label: 'Data Alteracao Status',
          formatter: value => {
            return value ? moment(value).format('D/M/Y HH:mm') : '';
          }
        },
        {
          key: 'actions',
          label: 'Ações'
        }
      ],
      form: { name: '', invitedBy: null }
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
    showModal() {
      this.$refs.modalCreate.show();
    },
    async submit() {
      try {
        this.isLoading = true;
        const { data } = await http.post('guests', this.form);
        swal('Convidado criado', '', 'success');
        await this.fetchData();
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
    },
    async fetchData(pageFromPagination) {
      let page = 1;
      let url = 'guests/all';
      if (parseInt(pageFromPagination)) {
        page = pageFromPagination;
      }
      url = `${url}?limit=10${buildQuery({ page })}`;

      if (this.filter.name) {
        url = `${url}&name=${this.filter.name}`;
      }
      if (this.filter.invitedBy) {
        url = `${url}&invitedBy=${this.filter.invitedBy}`;
      }
      if (this.filter.confirmed) {
        url = `${url}&confirmed=${this.filter.confirmed}`;
      }

      this.isLoading = true;
      const { data } = await http.get(url);
      this.guests = data;
      this.totalConfirmed = data.confirmed;
      this.totalUnconfirmed = data.unconfirmed;
      this.total = data.totalGuests;
      this.isLoading = false;
    },
    async setStatus(guest) {
      try {
        const willConfirm = await swal({
          title: 'Confirma o RSVP do convidado?',
          icon: 'warning',
          buttons: true,
          dangerMode: true
        });

        if (willConfirm) {
          this.isLoading = true;

          const payload = {
            _id: guest._id,
            confirmed: !guest.confirmed
          };
          const res = await http.patch('guests', payload);
          swal('Tudo certo!', 'Presença desmarcada, obrigado!', 'success');
          await this.fetchData();
          this.isLoading = false;
        }
      } catch (error) {
        swal('Error', 'Falha ao atualizar convidado', 'error');
        this.isLoading = false;

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
          await http.delete(`guests/${item._id}`);
          this.isLoading = false;
          await this.fetchData();
        }
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
    },
    removeFilters() {
      this.filter = { confirmed: null, invitedBy: '' };
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/index.scss';
</style>
