<template>
  <div>
    <form
      v-if="$route.name == 'search'"
      class="search-form"
      @submit.prevent="searchQuery"
    >
      <div class="input-div">
        <input
          v-model="query"
          type="text"
          placeholder="Type search here..."
          @change="checkQueryStatus"
        />
        <button type="submit">
          <span v-if="searching" class="loading-circle"></span>
          <span v-else><i class="fas fa-search"></i></span>
        </button>
      </div>
      <div class="search-query-div">
        <i class="fas fa-filter"></i>
        <select id="" v-model="filter" name="" @change="searchQuery">
          <option value="users">Users</option>
          <option value="products">Shop</option>
          <option value="broadcasts">Broadcast</option>
        </select>
      </div>
    </form>
    <header v-if="$route.name != 'search'" @click="toggleProfileState">
      <div class="container header-content" style="padding: 0">
        <h1 v-if="$route.name == 'index'"><i class="fas fa-home"></i></h1>
        <h1
          v-else-if="
            ['shop', 'shop-buy', 'shop-inventory', 'shop-wishlist'].includes(
              $route.name
            )
          "
        >
          <i class="fas fa-shopping-cart"></i>
        </h1>
        <h1
          v-else-if="
            [
              'broadcast',
              'broadcast-trending',
              'broadcast-bookmarks',
              'broadcast-status-id',
            ].includes($route.name)
          "
        >
          <i class="fas fa-bullhorn"></i>
        </h1>
        <h1 v-else-if="['search', 'visit', 'username'].includes($route.name)">
          <i class="fas fa-search"></i>
        </h1>
        <h1 v-else-if="$route.name == 'dashboard-notifications'">
          <i class="fas fa-bell"></i>
        </h1>
        <h1 v-else-if="$route.name == 'ad'">
          <i class="fas fa-ad"></i>
        </h1>
      </div>
    </header>
    <!-- Side Nav -->
    <aside class="aside-nav">
      <div class="nav-block" style="z-index: 2">
        <div class="toggle">
          <div class="nav-b">
            <div class="nav-b-2">
              <nav>
                <div v-if="$route.name === 'index'" class="l-block">
                  <nuxt-link
                    to="/"
                    class="links link-1"
                    :class="$route.name == 'index' ? 'active-l' : ''"
                    ><i class="fas fa-home"></i
                  ></nuxt-link>
                  <nuxt-link to="/shop" class="links link-2"
                    ><i class="fas fa-shopping-cart"></i
                  ></nuxt-link>
                  <nuxt-link to="/broadcast" class="links link-3"
                    ><i class="fas fa-bullhorn"></i
                  ></nuxt-link>
                  <nuxt-link to="/search" class="links link-4"
                    ><i class="fas fa-search"></i
                  ></nuxt-link>
                </div>
                <div
                  v-else-if="
                    [
                      'shop',
                      'shop-buy',
                      'shop-inventory',
                      'shop-wishlist',
                    ].includes($route.name)
                  "
                  class="l-block"
                >
                  <nuxt-link to="/" class="links link-4"
                    ><i class="fas fa-home"></i
                  ></nuxt-link>
                  <nuxt-link
                    to="/shop"
                    class="links link-1"
                    :class="
                      [
                        'shop',
                        'shop-buy',
                        'shop-inventory',
                        'shop-wishlist',
                      ].includes($route.name)
                        ? 'active-l'
                        : ''
                    "
                    ><i class="fas fa-shopping-cart"></i
                  ></nuxt-link>
                  <nuxt-link to="/broadcast" class="links link-2"
                    ><i class="fas fa-bullhorn"></i
                  ></nuxt-link>
                  <nuxt-link to="/search" class="links link-3"
                    ><i class="fas fa-search"></i
                  ></nuxt-link>
                </div>
                <div
                  v-else-if="
                    [
                      'broadcast',
                      'broadcast-trending',
                      'broadcast-bookmarks',
                      'broadcast-status-id',
                    ].includes($route.name)
                  "
                  class="l-block"
                >
                  <nuxt-link to="/" class="links link-3"
                    ><i class="fas fa-home"></i
                  ></nuxt-link>
                  <nuxt-link to="/shop" class="links link-4"
                    ><i class="fas fa-shopping-cart"></i
                  ></nuxt-link>
                  <nuxt-link
                    to="/broadcast"
                    class="links link-1"
                    :class="
                      [
                        'broadcast',
                        'broadcast-trending',
                        'broadcast-bookmarks',
                        'broadcast-status-id',
                      ].includes($route.name)
                        ? 'active-l'
                        : ''
                    "
                    ><i class="fas fa-bullhorn"></i
                  ></nuxt-link>
                  <nuxt-link to="/search" class="links link-2"
                    ><i class="fas fa-search"></i
                  ></nuxt-link>
                </div>
                <div
                  v-else-if="
                    ['search', 'visit', 'username'].includes($route.name)
                  "
                  class="l-block"
                >
                  <nuxt-link to="/" class="links link-2"
                    ><i class="fas fa-home"></i
                  ></nuxt-link>
                  <nuxt-link to="/shop" class="links link-3"
                    ><i class="fas fa-shopping-cart"></i
                  ></nuxt-link>
                  <nuxt-link to="/broadcast" class="links link-4"
                    ><i class="fas fa-bullhorn"></i
                  ></nuxt-link>
                  <nuxt-link
                    to="/search"
                    class="links link-1"
                    :class="
                      ['search', 'visit', 'username'].includes($route.name)
                        ? 'active-l'
                        : ''
                    "
                    ><i class="fas fa-search"></i
                  ></nuxt-link>
                </div>
                <div v-else class="l-block">
                  <nuxt-link to="/" class="links link-1"
                    ><i class="fas fa-home"></i
                  ></nuxt-link>
                  <nuxt-link to="/shop" class="links link-2"
                    ><i class="fas fa-shopping-cart"></i
                  ></nuxt-link>
                  <nuxt-link to="/broadcast" class="links link-3"
                    ><i class="fas fa-bullhorn"></i
                  ></nuxt-link>
                  <nuxt-link to="/search" class="links link-4"
                    ><i class="fas fa-search"></i
                  ></nuxt-link>
                </div>
              </nav>
            </div>
          </div>
          <div class="t-block">
            <span class="s-1"></span>
            <span class="s-2"></span>
            <span class="s-3"></span>
          </div>
        </div>
      </div>
      <div v-if="user" class="fast-link-container">
        <span style="position: relative">
          <nuxt-link
            to="/dashboard/notifications"
            class="fast-router router-notification-div"
            ><i class="fas fa-bell"></i
          ></nuxt-link>
          <span
            class="notification-count"
            :style="notification_count <= 0 ? 'transform:scale(0)' : ''"
            >{{ notification_count }}</span
          >
        </span>
        <button
          v-if="$route.name == 'broadcast' && user"
          class="fast-router router-broadcast-div"
          @click="newBroadcast"
        >
          <i class="fas fa-bullhorn"></i>
        </button>
      </div>
    </aside>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data() {
    return {
      navStatus: [],
      currentPage: '',
      st: 0,
      lastScrollTop: 0,
      query: '',
      notification_count: 0,
      filter: 'users',
      searching: false,
    }
  },
  computed: {
    user() {
      return this.$store.state.user.user
    },
  },
  mounted() {
    this.$root.$on('newNotification', () => {
      $('.notification-count').addClass('animate-notification')
      setTimeout(() => {
        $('.notification-count').removeClass('animate-notification')
      }, 1500)
    })
    this.$root.$on('hideProfileCard', () => {
      $('header').css('transform', 'scale(1)')
    })

    this.$root.$on('authenticated', () => {
      this.guest = !this.guest
    })
    this.$root.$on('unauthenticated', () => {
      this.guest = !this.guest
    })
    window.addEventListener('scroll', function () {
      this.st = $(this).scrollTop()
      if (this.st > this.lastScrollTop) {
        $('header').hide()
        $('aside').hide()
      } else {
        // up
        $('header').show()
        $('aside').show()
      }
      this.lastScrollTop = this.st
    })

    let btnStatus = false

    $('.t-block').click(function (e) {
      e.preventDefault()
      let deg = 0
      let degg = 0
      if (btnStatus === false) {
        document.querySelector('.nav-block .s-1').style.transform =
          'rotate(35deg) translateY(4px) translateX(3px)'
        document.querySelector('.nav-block .s-1').style.width = '35px'
        document.querySelector('.nav-block .s-2').style.transform = 'scale(0)'
        document.querySelector('.nav-block .s-3').style.width = '35px'
        document.querySelector('.nav-block .s-3').style.transform =
          'rotate(-35deg) translateY(-4px) translateX(3px)'

        btnStatus = true

        $(document).on('keydown', function (e) {
          setTimeout(() => {
            if (e.keyCode === '39') {
              deg += 90
              degg -= 90
              // right arrow key
              $('.nav-block nav').css('transform', 'rotate(' + deg + 'deg)')
              $('.nav-block .toggle nav .l-block .links').css(
                'transform',
                'rotate(' + degg + 'deg)'
              )
            } else if (e.keyCode === '37') {
              deg -= 90
              degg += 90
              // left arrow key
              $('.nav-block nav').css('transform', 'rotate(' + deg + 'deg)')
              $('.nav-block .toggle nav .l-block .links').css(
                'transform',
                'rotate(' + degg + 'deg)'
              )
            }
          }, 500)
          if (e.keyCode === '27') {
            closeAsideNav()
            $('.nav-block .nav-b').fadeOut()
            $('.nav-block nav').css('transform', 'rotate(0deg')
            $('.nav-block .toggle nav .l-block .links').css(
              'transform',
              'rotate(0deg)'
            )
          }
        })
        // rotate();

        $(document).on('swiped-left', function () {
          deg -= 90
          degg += 90
          $('.nav-block nav').css('transform', 'rotate(' + deg + 'deg)')
          $('.nav-block .toggle nav .l-block .links').css(
            'transform',
            'rotate(' + degg + 'deg)'
          )
        })
        $(document).on('swiped-right', function () {
          deg += 90
          degg -= 90
          $('.nav-block nav').css('transform', 'rotate(' + deg + 'deg)')
          $('.nav-block .toggle nav .l-block .links').css(
            'transform',
            'rotate(' + degg + 'deg)'
          )
        })
        $('.nav-block nav').css('transform', 'rotate(0deg')
        $('.nav-block .toggle nav .l-block .links').css(
          'transform',
          'rotate(0deg)'
        )
      } else {
        closeAsideNav()
      }
      $('.nav-block .nav-b').fadeToggle()
      $('.nav-block nav').css('transform', 'rotate(0deg')
      $('.nav-block .toggle nav .l-block .links').css(
        'transform',
        'rotate(0deg)'
      )
    })
    function closeAsideNav() {
      document.querySelector('.nav-block .s-1').style.transform = 'rotate(0deg)'
      document.querySelector('.nav-block .s-1').style.width = '35px'
      document.querySelector('.nav-block .s-2').style.transform = 'scale(1)'
      document.querySelector('.nav-block .s-3').style.width = '25px'
      document.querySelector('.nav-block .s-3').style.transform = 'rotate(0deg)'
      btnStatus = false
    }
    this.$root.$on('searchResultsReady', () => {
      this.searching = false
    })
  },
  methods: {
    searchQuery() {
      if (this.query !== '') {
        this.searching = true
        this.$root.$emit('searchQuery', {
          query: this.query,
          filter: this.filter,
        })
      }
    },
    checkQueryStatus() {
      if (this.query === '') {
        this.$root.$emit('emptysearchQuery')
      }
    },
    resetNavStatus(page) {
      this.navStatus.forEach((element) => {
        element = false
        // eslint-disable-next-line no-console
        console.log(element)
      })
      if (page === 'home') {
        this.navStatus.home = true
        this.currentPage = '<i class="fas fa-home"></i> Home'
      } else if (page === 'search') {
        this.navStatus.search = true
        this.currentPage = '<i class="fas fa-search"></i> search'
      } else if (page === 'shop') {
        this.navStatus.shop = true
        this.currentPage = '<i class="fas fa-shopping-cart"></i> Shop'
      } else if (page === 'broadcast') {
        this.navStatus.broadcast = true
        this.currentPage = '<i class="fas fa-bullhorn"></i> Broadcast'
      } else {
        // this.navStatus['home'] = true;
        // this.currentPage = '<i class="fas fa-home"></i> Home';
      }
    },
    logout() {
      this.$root.$emit('logout')
    },
    toggleProfileState() {
      $('header').css('transform', 'scale(1.15)')
      return this.$root.$emit('profileCardShow', true)
      // if (this.$route.meta.authOnly) {
      // }
    },
    newBroadcast() {
      this.$root.$emit('showModal', { tweet: '', type: '', modal: 'broadcast' })
    },
  },
}
</script>
<style scoped>
header {
  z-index: 3;
  background: var(--brand-color);
  width: 150px;
  border-radius: 50%;
  height: 150px;
  position: fixed;
  top: -75px;
  margin: 0 auto;
  left: -75px;
  box-shadow: 0 0 14px var(--brand-color-bg);
  transition: all ease-in-out 0.5s;
}
.header-content {
  position: relative;
  width: inherit;
  height: inherit;
}
.header-content h1 {
  position: absolute;
  margin: 0;
  right: 37px;
  bottom: 35px;
  color: var(--white-color);
  font-size: 1rem;
  text-transform: uppercase;
}
header .h-wrap {
  width: 100vw;
  display: inline-block;
}

header .h-block {
  opacity: 1;
  background: var(--dark-color);
  display: flex;
  align-items: center;
  box-shadow: 0 0 14px var(--brand-color-bg);
  padding: 0.5rem;
}

.h-block .h-link {
  flex: 2;
}

.h-block .h-link img {
  width: 80px;
  height: auto;
}

.h-block .current-pg {
  max-width: 425px;
  padding: 0.5rem;
  border-radius: 0.5rem;
  justify-items: center;
  text-align: center;
  background: var(--brand-color);
  color: var(--white-color);
  -webkit-border-radius: 0.5rem;
  -moz-border-radius: 0.5rem;
  -ms-border-radius: 0.5rem;
  -o-border-radius: 0.5rem;
}

@media screen and (min-width: 1024px) {
  .h-block .h-link img {
    width: 125px;
    height: auto;
  }
}

header a {
  text-decoration: none;
  color: var(--white-color);
}

.profile-status {
  flex: 2;
  justify-self: flex-end;
  width: auto;
  display: flex;
  justify-content: flex-end;
}

header .login {
  margin-right: 0.2rem;
  font-size: 0.85rem;
  border-radius: 0.3rem;
  border: 2px solid var(--brand-color);
  padding: 0.2rem 0.4rem;
  -webkit-transition: all ease-in-out 0.5s;
  -o-transition: all ease-in-out 0.5s;
  transition: all ease-in-out 0.5s;
}

header .logout {
  margin-right: 0.2rem;
  font-size: 0.85rem;
  border-radius: 0.3rem;
  padding: 0.2rem 0.4rem;
  color: var(--white-color);
  -webkit-transition: all ease-in-out 0.5s;
  -o-transition: all ease-in-out 0.5s;
  transition: all ease-in-out 0.5s;
  border: 2px solid var(--red-color);
}

header .logout:hover {
  color: var(--white-color);
  background: var(--highlight-color) var(--red-color);
}

header .login:hover {
  color: var(--white-color);
  background: var(--brand-color);
  border: 2px solid transparent;
}

.profile-status .profile-display {
  cursor: pointer;
  border-radius: 50%;
  height: 45px;
  width: 45px;
  -o-object-fit: cover;
  object-fit: cover;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
}

.current-pg h3 {
  margin: 0;
  line-height: 0;
  font-size: 1.2rem;
  /* text-transform: uppercase; */
}

/* .search-input {
  outline: none;
  font: inherit;
  border-radius: 0.5rem 0px 0px 0.5rem;
  border: none;
  padding: 0.5rem;
  flex: 10;
}
.search-btn {
  font: inherit;
  border: none;
  border-radius: 0 0.5rem 0.5rem 0;
  background: var(--brand-color);
  color: var(--white-color);
  padding: 0.5rem 0.8rem;
  flex: 2;
} */
.notification-count {
  position: absolute;
  top: -10px;
  right: 0;
  color: var(--white-color);
  background: var(--brand-color);
  font-size: 0.5rem;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 50%;
  box-shadow: 0 0 14px var(--brand-color-bg);
}
.animate-notification {
  animation: notification 1200ms 1 alternate;
}
@keyframes notification {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}

.aside-nav {
  z-index: 3;
  position: fixed;
  bottom: 10px;
  right: 10px;
  height: 53px;
  width: 53px;
  border-radius: 50%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.nav-block .toggle {
  position: relative;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--white-color);
  padding: 0.4rem;
  box-shadow: 0 0 14px var(--brand-color-bg);
  text-align: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.nav-block .toggle .nav-b {
  z-index: -1;
  display: none;
  position: absolute;
}

.nav-block .toggle .nav-b .nav-b-2 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  position: relative;
}

.nav-block .toggle .nav-b-2 nav {
  z-index: 2;
  box-shadow: 0 0 14px var(--brand-color-bg);
  position: absolute;
  background: var(--brand-color);
  width: 150px;
  height: 150px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  transition: all ease-in-out 500ms;
  justify-content: center;
  -webkit-transition: all ease-in-out 500ms;
  -o-transition: all ease-in-out 500ms;
  border-radius: 50%;
  -moz-transition: all ease-in-out 500ms;
  -ms-transition: all ease-in-out 500ms;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
}

.nav-block .toggle nav .l-block {
  width: 130px;
  height: 130px;
  position: relative;
  text-align: center;
}

.nav-block a {
  position: absolute;
  font-size: 1.3rem;
  -webkit-transition: color ease-in-out 200ms,
    -webkit-transform ease-in-out 500ms;
  transition: color ease-in-out 200ms, -webkit-transform ease-in-out 500ms;
  -o-transition: color ease-in-out 200ms, transform ease-in-out 500ms;
  transition: color ease-in-out 200ms, transform ease-in-out 500ms;
  transition: color ease-in-out 200ms, transform ease-in-out 500ms,
    -webkit-transform ease-in-out 500ms;
  color: green;
}

.nav-block .toggle nav .l-block .active-l {
  color: white;
}

.nav-block .toggle nav .l-block .link-1 {
  top: 0;
  right: 0;
  left: 0;
}

.nav-block .toggle nav .l-block .link-2 {
  top: 43%;
  left: 0;
}

.nav-block .toggle nav .l-block .link-3 {
  -webkit-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
  bottom: 0;
  left: 0;
  right: 0;
}

.nav-block .toggle nav .l-block .link-4 {
  -webkit-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
  top: 43%;
  right: 0;
}

.nav-block .toggle nav .l-block .links:hover {
  color: var(--white-color);
}

.toggle .t-block {
  padding: 0.5rem;
  border: none;
  cursor: pointer;
  display: -ms-grid;
  display: grid;
  grid-gap: 0.1rem;
}

.nav-block .toggle span {
  -ms-grid-column-align: center;
  justify-self: center;
  border-radius: 0.5rem;
  display: block;
  height: 4px;
  background: var(--brand-color);
  -webkit-transition: all ease-in-out 400ms;
  -o-transition: all ease-in-out 400ms;
  transition: all ease-in-out 400ms;
}

.nav-block .toggle .s-1 {
  width: 35px;
}

.nav-block .toggle .s-2 {
  width: 30px;
}

.nav-block .toggle .s-3 {
  width: 25px;
}

.fast-link-container {
  display: grid;
  grid-gap: 0.35rem;
  position: fixed;
  bottom: 70px;
  justify-content: center;
  width: 53px;
  z-index: 1;
}

.fast-router {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  box-shadow: 0 0 14px var(--brand-color-bg);
  color: var(--brand-color);
  background: var(--white-color);
  font-size: 1rem;
  border-radius: 50%;
  text-decoration: none;
  border: none;
}

.hide-fast-l-container {
  display: none;
}
.search-form {
  position: fixed;
  background: rgba(225, 225, 225, 0.25);
  backdrop-filter: blur(5px);
  width: 100%;
  top: 0;
  z-index: 3;
}
.search-form .input-div {
  display: flex;
  margin: 0.5rem;
  background: var(--white-color);
  border-radius: 1rem;
  padding: 0.5rem;
}
.search-form input {
  flex: 10;
  padding: 0.5rem;
  outline: none;
}
.search-form button {
  flex: 2;
  padding: 0.5rem;
  background: var(--brand-color);
  border-radius: 0 1rem;
  color: var(--white-color);
}
.search-query-div {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 0.8rem;
  font-weight: bold;
  padding: 0.5rem;
}
.search-query-div select {
  text-align: center;
  border-radius: 0.5rem;
  padding: 0.25rem;
  border: 1px solid var(--brand-color);
  color: var(--brand-color);
  margin: 0;
  margin-left: 0.5rem;
}
</style>
