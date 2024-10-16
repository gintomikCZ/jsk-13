<template>
  <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/employees">employees</RouterLink>
  <form v-if="!loading" autocomplete="off" @submit.prevent="onSubmit">
    <TInput
      v-for="control in controls"
      :control="control"
      :label="formSettings[control].label"
      :inputType="formSettings[control].inputType"
      :error="formErrors[control]"
      :errorMessage="formErrorMessages[control]"
      :initialValue="formInitialValues[control]"
      @blured="validate"
      @has-input="onHasInput"
    />
    <div>
      <button>odeslat</button>
    </div>
  </form>
  <div v-else>... loading ...</div>
</template>

<script>
import axios from 'axios'
import TInput from '@/components/TInput.vue'
import validator from '@/utilities/validator.js'

export default {
  name: 'EmployeeFormView',
  components: { TInput },
  data () {
    return {
      formSettings: {
        firstname: {
          label: 'first name',
          inputType: 'text',
          valRules: [
            { rule: 'required', message: 'first name is required' },
            { rule: 'minLength', par: 2, message: 'enter at least 2 chars' }
          ]
        },
        lastname: {
          label: 'last name',
          inputType: 'text',
          valRules: [
            { rule: 'required', message: 'last name is required' },
            { rule: 'minLength', par: 2, message: 'enter at least 2 chars' }
          ]
        },
        position: {
          label: 'position',
          inputType: 'text',
          valRules: [
            { rule: 'required', message: 'position is required' },
          ]
        },
        dateofbirth: {
          label: 'date of birth',
          inputType: 'date',
          valRules: [
            { rule: 'required', message: 'dateofbirth is required' },
          ]
        },
        salary: {
          label: 'salary',
          inputType: 'number',
          valRules: [
            { rule: 'required', message: 'first name is required' },
            { rule: 'greaterThen', par: 1000, message: 'salary must be more then 1000' }
          ]
        }
      },
      formData: {},
      formErrors: {},
      formErrorMessages: {},
      formInitialValues: {},
      employee: null,
      loading: true
    }
  },
  created () {
    if (this.mode === 'add') {
      this.controls.forEach((control) => {
        this.formData[control] = ''
        this.formErrors[control] = false
        this.formErrorMessages[control] = ''
        this.formInitialValues[control] = ''
      })
      this.loading = false
      return
    }
    axios.get('https://sdaapi.glabazna.eu/employees/' + this.$route.params.id)
      .then((response) => {
        this.employee = response.data.data
        this.controls.forEach((control) => {
          this.formData[control] = this.employee[control]
          this.formInitialValues[control] = this.employee[control]
          this.formErrors[control] = false
          this.formErrorMessages[control] = ''
        })
        this.loading = false
      })
  },
  computed: {
    controls () {
      return Object.keys(this.formSettings)
    },
    mode () {
      // if (this.$route.params.id) {
      //   return 'edit'
      // } else {
      //   return 'add'
      // }
      return this.$route.params.id ? 'edit' : 'add'
    }
  },
  methods: {
    onHasInput (payload) {
      // payload = { control: 'firstname', value: 'Ka' }
      this.formData[payload.control] = payload.value
    },
    onSubmit () {
      this.controls.forEach(this.validate)
      const formIsValid = this.controls.every((control) => {
        return !this.formErrors[control]
      })
      if (formIsValid) {
        const httpConfig = { url: 'https://sdaapi.glabazna.eu/employees' }
        httpConfig.method = this.mode === 'add' ? 'post' : 'put'
        httpConfig.data = this.mode === 'add' ? this.formData : Object.assign({ id: this.$route.params.id }, this.formData)
        axios(httpConfig)
        .then(() => {
          this.$router.back()
        })
      }
    },
    validate (control) {
      let error = false
      this.formSettings[control].valRules.forEach((ruleObject) => {
        if (!error) {
          if (!validator[ruleObject.rule](this.formData[control], ruleObject.par)) {
            this.formErrors[control] = true
            this.formErrorMessages[control] = ruleObject.message
            error = true
          }
        }
      })
      if (!error) {
        this.formErrors[control] = false
        this.formErrorMessages[control] = ''
      }
    }
  }
}

/*

ar.every((item) => {
  return true/false
}) ... pokud cb všude vrací true, pak celá metoda every vrací true
  ... jeden selže - metoda vrací false


Object.Assign(obj, obj2, obj3 ....)


*/


</script>

<style scoped>
form {
  max-width: 300px;
}
</style>