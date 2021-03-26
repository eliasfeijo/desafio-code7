<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ labelTitle }}</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <b-field label="Valor">
          <b-input
            type="number"
            :value="value"
            placeholder="Valor da Dívida"
            required
          >
          </b-input>
        </b-field>

        <b-field label="Razão">
          <b-input
            type="text"
            :value="reason"
            placeholder="Razão da Dívida"
            required
          >
          </b-input>
        </b-field>

        <b-field label="Data">
          <b-input
            type="text"
            :value="dueDate"
            placeholder="Data de vencimento"
            required
          >
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <b-button label="Fechar" @click="$emit('close')" />
        <b-button label="Cadastrar" type="is-primary" />
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  name: 'ModalForm',
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    debt: {
      type: Object,
      default: () => {
        return {
          reason: '',
          dueDate: '',
          value: '',
        }
      },
    },
  },
  data() {
    return {
      reason: this.debt.reason,
      dueDate: this.debt.dueDate,
      value: this.debt.value,
    }
  },
  computed: {
    labelTitle() {
      return this.isEdit ? 'Editar Dívida' : 'Cadastrar Dívida'
    },
  },
}
</script>
