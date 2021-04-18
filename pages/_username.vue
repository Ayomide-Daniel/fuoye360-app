<template>
  <div>
    <div class="div-title">
      <div class="title-container">
        <h3 class=""><i class="fas fa-search"></i> Search</h3>
      </div>
    </div>
    <br /><br />

    <div class="wrapper">
      <MetaComponent :visited="visited" />
    </div>
    <ViewComponent :visited="visited" />
  </div>
</template>

<script>
import User from '@/assets/js/api/User'
import MetaComponent from '@/components/account/MetaComponent'
import ViewComponent from '@/components/account/ViewComponent'
export default {
  name: 'Username',
  components: {
    MetaComponent,
    ViewComponent,
  },
  middleware: ['auth'],
  data() {
    return {
      visited: '',
      current_visited: '',
    }
  },
  watch: {
    $route() {
      if (this.visited.name !== this.$route.params.username) {
        this.getThisUser()
      }
    },
  },
  mounted() {
    this.$root.$on('updateInfluenceCount', (data) => {
      this.visited.followers = data.receiver_count
    })
    this.getThisUser()
  },
  methods: {
    getThisUser() {
      this.visited = ''
      User.getThisUser(this.$route.params.username)
        .then((res) => {
          this.visited = res.data.data
          this.$root.$emit('visitedDataGotten')
        })
        .catch(() => {})
    },
  },
}
</script>

<style scoped></style>
