<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ labelTitle }}</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <b-field label="Valor" :type="valueFieldType" :message="valueMessage">
          <b-input
            v-model.lazy="value"
            v-money="moneyConfig"
            placeholder="Valor da Dívida"
            required
          >
          </b-input>
        </b-field>

        <b-field label="Razão" :type="reasonFieldType" :message="reasonMessage">
          <b-input v-model="reason" placeholder="Razão da Dívida" required>
          </b-input>
        </b-field>

        <b-field
          label="Data"
          :type="dueDateFieldType"
          :message="dueDateMessage"
        >
          <b-input
            v-model="dueDate"
            v-mask="'##/##/####'"
            placeholder="Data de vencimento"
            required
          >
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <b-button label="Fechar" @click="$emit('close')" />
        <b-button label="Salvar" type="is-primary" @click="onSubmitForm" />
      </footer>
    </div>
  </form>
</template>

<script>
import { VMoney } from 'v-money'
import { mask } from 'vue-the-mask'

export default {
  name: 'ModalForm',
  directives: {
    money: VMoney,
    mask,
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    debt: {
      type: Object,
      default: () => {
        return {
          _id: '',
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
      reasonFieldType: null,
      reasonMessage: null,
      dueDate: this.debt.dueDate,
      dueDateFieldType: null,
      dueDateMessage: null,
      value: this.debt.value,
      valueFieldType: null,
      valueMessage: null,
      moneyConfig: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
      },
    }
  },
  computed: {
    labelTitle() {
      return this.isEdit ? 'Editar Dívida' : 'Cadastrar Dívida'
    },
    unmaskedValue() {
      const value = Number(
        this.value.replace('R$', '').trim().replace('.', '').replace(',', '.')
      )
      return value
    },
    unmaskedDueDate() {
      const [day, month, year] = this.dueDate.split('/')
      const dueDate = new Date(`${month}/${day}/${year}`)
      return dueDate
    },
  },
  methods: {
    onSubmitForm(e) {
      const isFormValid = this.validateFields()
      if (isFormValid) {
        const debt = {
          value: this.unmaskedValue,
          reason: this.reason,
          dueDate: this.unmaskedDueDate.toISOString(),
        }
        if (this.debt._id) {
          debt._id = this.debt._id
        }
        this.$emit('formSubmitted', debt)
      }
    },
    validateFields() {
      let valid = true
      if (this.unmaskedValue <= 0) {
        valid = false
        this.valueFieldType = 'is-danger'
        this.valueMessage = 'Valor precisa ser maior que zero'
      } else {
        this.valueFieldType = null
        this.valueMessage = null
      }
      if (this.reason.length < 3) {
        valid = false
        this.reasonFieldType = 'is-danger'
        this.reasonMessage = 'Mínimo de 3 caracteres'
      } else {
        this.reasonFieldType = null
        this.reasonMessage = null
      }
      if (
        Object.prototype.toString.call(this.unmaskedDueDate) === '[object Date]'
      ) {
        if (isNaN(this.unmaskedDueDate.getTime())) {
          valid = false
          this.dueDateFieldType = 'is-danger'
          this.dueDateMessage = 'Data inválida'
        } else {
          this.dueDateFieldType = null
          this.dueDateMessage = null
        }
      } else {
        valid = false
        this.dueDateFieldType = 'is-danger'
        this.dueDateMessage = 'Data inválida'
      }
      return valid
    },
  },
}
</script>
