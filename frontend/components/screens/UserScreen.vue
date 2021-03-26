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
      <b-button type="is-primary" class="mt-4" @click="isModalActive = true"
        >Cadastrar Dívida</b-button
      >
    </div>
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <b-table
          v-if="selectedUser.listDebt.length > 0"
          class="cursor-pointer"
          :data="selectedUser.listDebt"
          :columns="tableColumns"
          hoverable
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
        <modal-form :is-edit="isEditModal" @close="props.close"></modal-form>
      </template>
    </b-modal>
  </div>
</template>

<script>
import ModalForm from './ModalForm'

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
    }
  },
  computed: {
    selectedUser() {
      return this.$store.state.selectedUser
    },
  },
}
</script>
