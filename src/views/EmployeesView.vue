<template>
  <RouterLink to="/">Home</RouterLink>
  <div v-if="loading">... loading ...</div>
  <ul v-else>
    <li
      v-for="employee in employees"
      @click="$router.push('/employeedetail/' + employee.id)"
    >
      <!-- <RouterLink :to="'/employeedetail/' + employee.id">{{ employee.firstname + ' ' + employee.lastname }}</RouterLink> -->
    {{ employee.firstname + ' ' + employee.lastname }}
    </li>
  </ul>
</template>

<script>
import axios from 'axios'
export default {
  name: 'EmployeesView',
  data () {
    return {
      employees: null,
      loading: true
    }
  },
  created () {
    axios.get('https://sdaapi.glabazna.eu/employees')
      .then((response) => {
        this.employees = response.data.data
        this.loading = false
      })
  },
  methods: {
    onClick(id) {
      this.$router.push('/employeedetail/' + id)
    }
  }
}

</script>

<style scoped>
ul {
  list-style-type: none;
  border: 1px solid #cdcdcd;
}
li {
  padding: .3em .6em;
  cursor: pointer;
}
li:not(:last-child) {
  border-bottom: 1px solid #cdcdcd;
}
</style>