<template>
  <div>
    <div class="is-flex is-align-items-center is-flex-direction-column">
      <div>
        <a @click="$store.dispatch('setCurrentScreen', 'HOME')"> Voltar </a>
      </div>
      <h1 class="is-size-3 mt-4">
        {{ selectedUser.name }}
      </h1>
      <p class="is-size-5">
        Dívida Total: {{ selectedUser.formattedDebtTotal }}
      </p>
      <b-button type="is-primary" class="mt-4" @click="openModalCreate"
        >Cadastrar Dívida</b-button
      >
    </div>
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <b-table
          v-if="selectedUser.listDebt.length > 0"
          class="cursor-pointer mt-5"
          :data="selectedUser.listDebt"
          :columns="tableColumns"
          hoverable
          @click="openModalEdit"
        ></b-table>
      </div>
    </div>
    <b-modal
      v-model="isModalActive"
      has-modal-card
      trap-focus
      aria-role="dialog"
      aria-label="Modal Dívida"
      aria-modal
    >
      <template #default="props">
        <modal-form
          :is-edit="isEditModal"
          :debt="debtForEdition"
          @close="props.close"
          @formSubmitted="onFormSubmitted"
        ></modal-form>
      </template>
    </b-modal>
  </div>
</template>

<script>
import ModalForm from './ModalForm'
import { formatDate } from '~/helpers/DateHelper'

export default {
  name: 'UserScreen',
  components: {
    ModalForm,
  },
  data() {
    return {
      tableColumns: [
        {
          field: 'reason',
          label: 'Razão',
        },
        {
          field: 'formattedDueDate',
          label: 'Data',
        },
        {
          field: 'formattedValue',
          label: 'Valor',
        },
      ],
      isModalActive: false,
      isEditModal: false,
      debtForEdition: null,
    }
  },
  computed: {
    selectedUser() {
      return this.$store.state.selectedUser
    },
  },
  methods: {
    openModalCreate() {
      this.debtForEdition = {
        value: '',
        reason: '',
        dueDate: '',
      }
      this.isEditModal = false
      this.isModalActive = true
    },
    openModalEdit(debt) {
      const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
      const formattedValue = formatter.format(debt.value)

      const formattedDate = formatDate(debt.dueDate)

      this.debtForEdition = {
        value: formattedValue,
        reason: debt.reason,
        dueDate: formattedDate,
      }
      this.isEditModal = true
      this.isModalActive = true
    },
    onFormSubmitted(debt) {
      this.isModalActive = false
      debt.user = this.selectedUser._id
      if (this.isEditModal) {
        // TODO: Implement edit
      } else {
        this.createUserDebt(debt)
      }
    },
    createUserDebt(debt) {
      this.$axios
        .post('/api/debts', debt)
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            const newDebt = response.data
            this.$store.dispatch('addSelectedUserDebt', newDebt)
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.err('Error creating user debt', err)
        })
    },
  },
}
</script>
