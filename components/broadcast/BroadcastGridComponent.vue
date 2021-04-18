<template>
  <div id="broadcast-component" class="wrapper">
    <div style="padding: 0.5rem">
      <h3 v-if="$route.name === 'broadcast-status-id'">COMMENTS</h3>
    </div>
    <div v-if="loading">
      <div class="skeleton-loader">
        <v-skeleton-loader type="avatar"></v-skeleton-loader>
        <v-skeleton-loader
          min-width="120"
          type="heading, heading, heading"
          class="heading-loading"
        ></v-skeleton-loader>
      </div>
      <div class="skeleton-loader">
        <v-skeleton-loader type="avatar"></v-skeleton-loader>
        <v-skeleton-loader
          min-width="120"
          type="heading, heading, heading"
          class="heading-loading"
        ></v-skeleton-loader>
      </div>
      <div class="skeleton-loader">
        <v-skeleton-loader type="avatar"></v-skeleton-loader>
        <v-skeleton-loader
          min-width="120"
          type="heading, heading, heading"
          class="heading-loading"
        ></v-skeleton-loader>
      </div>
      <div class="skeleton-loader">
        <v-skeleton-loader type="avatar"></v-skeleton-loader>
        <v-skeleton-loader
          min-width="120"
          type="heading, heading, heading"
          class="heading-loading"
        ></v-skeleton-loader>
      </div>
      <div class="skeleton-loader">
        <v-skeleton-loader type="avatar"></v-skeleton-loader>
        <v-skeleton-loader
          min-width="120"
          type="heading, heading, heading"
          class="heading-loading"
        ></v-skeleton-loader>
      </div>
      <div class="skeleton-loader">
        <v-skeleton-loader type="avatar"></v-skeleton-loader>
        <v-skeleton-loader
          min-width="120"
          type="heading, heading, heading"
          class="heading-loading"
        ></v-skeleton-loader>
      </div>
      <div class="skeleton-loader">
        <v-skeleton-loader type="avatar"></v-skeleton-loader>
        <v-skeleton-loader
          min-width="120"
          type="heading, heading, heading"
          class="heading-loading"
        ></v-skeleton-loader>
      </div>
    </div>
    <div v-if="broadcasts.length > 0">
      <div v-for="broadcast in broadcasts" :key="broadcast.id">
        <div v-if="broadcast.is_comment && !broadcast.is_thread">
          <BroadcastComponent
            :broadcast="broadcast.original_post"
            :origin="true"
          />
        </div>
        <BroadcastComponent :broadcast="broadcast" :origin="false" />
      </div>
    </div>
    <div v-else-if="!loading && broadcasts.length <= 0">
      <div v-if="$route.name === 'username'">
        <div class="shop-empty-col">
          <img
            loading="lazy"
            :src="require('~/assets/illustrations/broadcast-animate.svg')"
            alt="Empty-Broadcasts"
          />
          <div>
            <p>Oops! {{ visited.name }} has no broadcasts yet.</p>
            Broadcasts sent by {{ visited.name }} will appear here
            <router-link :to="{ name: 'broadcast-trending' }"
              ><i class="fas fa-search"></i> Find other exciting
              broadcasts</router-link
            >
          </div>
        </div>
      </div>
      <div v-if="$route.name === 'broadcast-status'">
        <div class="shop-empty-col">
          <img
            loading="lazy"
            :src="require('~/assets/illustrations/broadcast-animate.svg')"
            alt="Empty-Broadcasts"
          />
          <div>
            <p>Oops! No comments on this Broadcast at the moment</p>
          </div>
        </div>
      </div>
    </div>
    <ModalComponent />
    <infinite-loading
      v-if="!loading"
      @infinite="infiniteHandler"
    ></infinite-loading>
  </div>
</template>

<script>
import Action from '@/assets/js/api/Action'
import InfiniteLoading from 'vue-infinite-loading'
// import ThreadComponent from '@/components/broadcast/ThreadComponent'
import BroadcastComponent from '@/components/broadcast/BroadcastComponent'
import ModalComponent from '@/components/broadcast/ModalComponent'

export default {
  name: 'BroadcastGridComponent',
  components: {
    InfiniteLoading,
    // ThreadComponent,
    BroadcastComponent,
    ModalComponent,
  },
  props: ['visited'],
  data() {
    return {
      broadcasts: [],
      tweet: {},
      showComment: false,
      showShare: false,
      showOption: false,
      type: '',
      createdThreadStatus: '',
      api: '',
      page: 1,
      push_broadcasts: [],
      broadcast_pushed: false,
      loading: true,
    }
  },
  computed: {
    user() {
      return this.$store.state.user.user
    },
  },
  watch: {
    $route() {
      this.getBroadcasts()
    },
  },
  mounted() {
    this.getBroadcasts()
    this.$root.$emit('visitedDataGotten', () => {
      this.getBroadcasts()
    })
  },
  methods: {
    getBroadcasts() {
      this.page = 1
      this.broadcasts = []
      this.loading = true
      if (this.$route.name === 'broadcast') {
        this.api = '/broadcast'
        return this.infiniteHandler()
      }
      if (this.$route.name === 'broadcast-bookmark') {
        this.api = '/broadcast/bookmarks'
        return this.infiniteHandler()
      }
      if (this.$route.name === 'broadacast-trending') {
        this.api = '/broadcast/trending'
        return this.infiniteHandler()
      }
      if (this.$route.name === 'broadcast-status-id') {
        this.api = '/broadcast/' + this.$route.params.id + '/comments'
        return this.infiniteHandler()
      }
      if (this.$route.name === 'username') {
        if (this.visited !== '') {
          this.api = '/broadcast/' + this.visited.id
          return this.infiniteHandler()
        }
      }
    },
    infiniteHandler($state) {
      Action.infiniteLoading(this.api, this.page)
        .then((res) => {
          if (res.data.data.length) {
            this.page += 1
            this.broadcasts.push(...res.data.data)
            this.loading = false
            $state.loaded()
          } else {
            this.loading = false
            $state.complete()
          }
        })
        .catch((err) => {
          this.$root.$emit('alertNotification', { status: err.response.status })
        })
    },
  },
}
</script>

<style scoped>
.new-tweets-available {
  position: fixed;
  z-index: 5;
  margin: 0 auto;
  left: 0;
  right: 0;
  width: max-content;
  display: block;
  top: -100%;
  background: var(--brand-color);
  padding: 0.5rem;
  color: var(--white-color);
  border-radius: 1rem;
  box-shadow: 0 4px 4px 0 rgba(50, 205, 50, 0.25);
  text-decoration: none;
  font-size: 0.75rem;
  transition: all alternate-reverse 1500ms;
}
</style>
