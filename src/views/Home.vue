<template>
  <div class="home">
    <UserCreate />
    <UserList />
  </div>
</template>

<script>
import UserCreate from '../components/UserCreate.vue'
import UserList from '../components/UserList.vue'

export default {
  name: 'Home',
  components: { UserCreate, UserList }
}
</script>
