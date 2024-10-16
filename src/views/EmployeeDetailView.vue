<template>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/employees">employees</RouterLink>
    <div v-if="loading">... loading ...</div>
    <ul v-else>
      <li>
        <span>first name: </span>
        <span>{{  employee.firstname }}</span>
      </li>
      <li>
        <span>last name: </span>
        <span>{{  employee.lastname }}</span>
      </li>
      <li>
        <span>position: </span>
        <span>{{  employee.position }}</span>
      </li>
      <li>
        <span>date of birth: </span>
        <span>{{  employee.dateofbirth }}</span>
      </li>
      <li>
        <span>salary: </span>
        <span>{{  employee.salary }}</span>
      </li>
    </ul>
    <div>
      <button @click="onEditClick">edit</button>
      <button @click="onDeleteClick">delete</button>
    </div>

</template>

<script>

import axios from 'axios'

export default {
  name: 'EmployeeDetailView.vue',
  data () {
    return {
      employee: null,
      loading: true
    }
  },
  created () {
    axios.get('https://sdaapi.glabazna.eu/employees/' + this.$route.params.id)
      .then((response) => {
        this.employee = response.data.data
        this.loading = false
      })
  },
  methods: {
    onEditClick () {
      this.$router.push('/employeeform/' + this.$route.params.id)
    },
    onDeleteClick () {
      axios({
        method: 'delete',
        url: 'https://sdaapi.glabazna.eu/employees',
        data: {
          id: this.$route.params.id
        }
      })
      .then(() => {
        this.$router.push('/employees')
      })
    }
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  max-width: 250px;
}
li {
  display: flex;
  justify-content: space-between;
}
li span:nth-child(2) {
  font-weight: bold;
}
</style>