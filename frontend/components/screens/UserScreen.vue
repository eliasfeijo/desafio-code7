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
      <b-button type="is-primary" class="mt-4">Cadastrar Dívida</b-button>
    </div>
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <b-table
          class="cursor-pointer"
          :data="selectedUser.listDebt"
          :columns="tableColumns"
          hoverable
        ></b-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserScreen',
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
    }
  },
  computed: {
    selectedUser() {
      return this.$store.state.selectedUser
    },
  },
}
</script>
