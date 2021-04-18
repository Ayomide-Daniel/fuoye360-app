<template>
  <div>
    <v-app id="app-wrapper">
      <v-main>
        <NavbarComponent
          v-if="
            ![
              'auth-login',
              'auth-register',
              'auth-password-reset',
              'auth-password-email',
            ].includes($route.name)
          "
        />
        <AlertComponent /><ProfileComponent />
        <v-container id="app-container">
          <router-view></router-view>
          <div
            v-if="showImage"
            id="view-image"
            class="vs-wrapper"
            @click="closeImage($event)"
          >
            <div class="vs-container">
              <div class="vs-content">
                <img loading="lazy" :src="imageSrc" alt="" class="" />
              </div>
            </div>
          </div>
          <div class="back-btn-div">
            <button type="button" @click="goBack">
              <i class="fas fa-arrow-left"></i>
            </button>
          </div>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent'
import AlertComponent from '@/components/AlertComponent'
import ProfileComponent from '@/components/ProfileComponent'
import $ from 'jquery'
export default {
  components: {
    NavbarComponent,
    AlertComponent,
    ProfileComponent,
  },
  data() {
    return {
      imageSrc: '',
      showImage: false,
    }
  },
  mounted() {
    this.$root.$on('viewImage', (src) => {
      this.imageSrc = src
      this.showImage = true
    })
  },
  methods: {
    closeImage(e) {
      if ($(e.target).closest('img').length === 0) {
        this.showImage = false
      }
    },
    goBack() {
      history.back()
    },
  },
}
</script>

<style>
#app-wrapper {
  background: var(--bg-color);
}
#app-container {
  padding: 0;
}
#view-image .vs-content {
  background: none;
}
#view-image img {
  width: 100%;
  height: 50%;
  border-radius: 1rem;
}
.back-btn-div {
  position: fixed;
  width: 50px;
  height: 50px;
  z-index: 4;
  bottom: 15px;
  left: 15px;
}
.back-btn-div button {
  border-radius: 50%;
  box-shadow: 0 0 14px 0 var(--brand-color-bg);
  border: none;
  width: inherit;
  height: inherit;
  background: var(--white-color);
  color: var(--brand-color);
  font-size: inherit;
}
</style>
