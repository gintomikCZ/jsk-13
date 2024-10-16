<template>
  <div class="form-control">
    <label :for="control">{{ label }}</label>
    <input
      :id="control"
      :type="inputType"
      v-model="value"
      @input="onInput"
      @change="onChange"
      @blur="onBlur"
    >
    <div v-if="error" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>

export default {
  name: 'TInput',
  props: {
    label: String,
    inputType: {
      type: String,
      default: 'text'
    },
    errorMessage: {
      type: String,
      default: ''
    },
    error: {
      type: Boolean,
      default: false
    },
    control: String,
    initialValue: {
      default: '',
      validator: (v) => typeof v === 'string' || (typeof v === 'number' && !Number.isNaN(v))
    }
  },
  data () {
    return {
      value: ''
    }
  },
  created () {
    this.value = this.initialValue
  },
  methods: {
    onInput (e) {
      this.$emit('has-input', { control: this.control, value: e.target.value })
    },
    onChange (e) {
      this.$emit('changed', { control: this.control, value: e.target.value })
    },
    onBlur () {
      this.$emit('blured', this.control)
    }
  }
}

</script>

<style scoped>
.form-control {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}
input {
  font-size: 1.2rem;
  padding: .3em .7em;
}
.error-message {
  color: red;
  font-size: .9rem;
}
</style>