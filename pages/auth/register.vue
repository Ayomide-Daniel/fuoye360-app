<template>
  <div class="wrapper">
    <div class="return-home">
      <nuxt-link to="/"><i class="fas fa-home"></i> GO BACK HOME</nuxt-link>
    </div>
    <br /><br />
    <div class="form-container lg-container" style="background: none">
      <div style="padding: 1rem" class="form-img-div">
        <img
          loading="lazy"
          :src="require('@/assets/illustrations/group-chat-animate.svg')"
          alt=""
        />
        <div class="div-header">
          <h3 class="div-meta">
            New to FUOYE360 uhn? Create an account to connect with other awesome
            users
          </h3>
          <span class="hr-line"></span>
        </div>
      </div>
      <form @submit.prevent="register">
        <div class="input-div">
          <label for="uName"><i class="fas fa-user"></i> Username</label>
          <input
            id="uName"
            v-model="form.username"
            type="text"
            name="username"
            value=""
            required
            @input="validateForm($event)"
          />
          <div
            v-if="validUsername !== ''"
            class="form-validation"
            :class="validUsername ? 'valid' : 'invalid'"
          >
            <span v-if="validUsername">&check;</span><span v-else>&times;</span>
          </div>
        </div>
        <div class="input-div">
          <label for="email"><i class="fas fa-envelope"></i> Email</label>
          <input
            v-model="form.email"
            required
            type="email"
            name="email"
            value=""
            autocomplete="email"
            @input="validateForm($event)"
          />
          <div
            v-if="validEmail !== ''"
            class="form-validation"
            :class="validEmail ? 'valid' : 'invalid'"
          >
            <span v-if="validEmail">&check;</span><span v-else>&times;</span>
          </div>
        </div>
        <div class="input-div">
          <label for="mobile_number"
            ><i class="fas fa-phone-alt"></i> Mobile number</label
          >
          <input
            v-model="form.mobile_number"
            required
            type="text"
            name="mobile_number"
            maxlength="11"
            value=""
            @input="validateForm($event)"
          />
          <div
            v-if="validTelephone !== ''"
            class="form-validation"
            :class="validTelephone ? 'valid' : 'invalid'"
          >
            <span v-if="validTelephone">&check;</span
            ><span v-else>&times;</span>
          </div>
        </div>
        <div class="input-div">
          <label for="password"><i class="fas fa-lock"></i> Password</label>
          <input
            id="password"
            v-model="form.password"
            required
            :type="!showPassword ? 'password' : 'text'"
            name="password"
            autocomplete="new-password"
          />
          <button
            id="show-password"
            type="button"
            @click="showPassword = !showPassword"
          >
            <span v-if="!showPassword"><i class="fas fa-eye"></i></span
            ><span v-else><i class="fas fa-eye-slash"></i></span>
          </button>
          <small
            v-if="!validPassword"
            style="position: absolute; bottom: -20px; color: red"
            >*Password must be more than 8 characters</small
          >
        </div>
        <button
          :class="loading ? 'loading-btn' : ''"
          type="submit"
          name="signup-btn"
          style="margin-top: 0.25rem"
          :style="
            loading ||
            [validUsername, validTelephone, validEmail].includes(false)
              ? 'opcaity:.75'
              : ''
          "
          :disabled="
            loading ||
            [validUsername, validTelephone, validEmail].includes(false)
          "
        >
          <span v-if="loading"
            ><v-progress-circular
              indeterminate
              color="white"
              width="3"
              size="20"
            ></v-progress-circular
          ></span>
          <span v-else>Signup </span>
        </button>
        <div>
          <p>
            By signing up, you agree to our
            <a href="/terms" target="_blank">terms and conditons</a>
          </p>
          <nuxt-link
            :to="{
              name: 'auth-login',
              query: { redirect: $route.query.redirect },
            }"
            >Already have an account?</nuxt-link
          >
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import User from '@/assets/js/api/User'
import regex from '@/assets/js/regex'

export default {
  middleware: ['auth'],
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        mobile_number: '',
        device_name: 'fuoye360_webapp',
      },
      showPassword: false,
      loading: false,

      validUsername: '',
      validTelephone: '',
      validEmail: '',
      validPassword: '',
    }
  },
  head() {
    return {
      title: 'FUOYE360 REGISTER | Join other awesome users',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'FUOYE360 REGISTER | Join other awesome users',
        },
      ],
    }
  },
  mounted() {
    $('.form-container input, .form-container textarea').on(
      'focusin',
      function () {
        $(this).parent().find('label').addClass('active')
      }
    )
    $('.form-container input, .form-container textarea').on(
      'focusout',
      function () {
        if (!this.value) {
          $(this).parent().find('label').removeClass('active')
        }
      }
    )
    $('#uName').keyup(function () {
      this.value = this.value.replace(/ /g, '_')
    })
    $('.form-container label').click(function () {
      $(this).parent().find('input').focus()
    })
  },
  created() {
    this.currentPage = '<i class="fas fa-lock"> Login'
  },

  methods: {
    validateForm(e) {
      const formInput = e.target.name
      if (formInput === 'username') {
        if (regex.username(e.target.value)) {
          return (this.validUsername = false)
        }
        return (this.validUsername = true)
      } else if (formInput === 'mobile_number') {
        if (regex.telephone(e.target.value)) {
          return (this.validTelephone = true)
        }
        return (this.validTelephone = false)
      } else if (formInput === 'email') {
        if (regex.email(e.target.value)) {
          return (this.validEmail = true)
        }
        return (this.validEmail = false)
      } else if (formInput === 'location') {
        if (regex.location(e.target.value)) {
          return (this.validLocation = false)
        }
        return (this.validLocation = true)
      } else if (formInput === 'password') {
        if (regex.password(e.target.value)) {
          return (this.validPassword = false)
        }
        return (this.validPassword = true)
      } else if (formInput === 'password_confirmation') {
        regex.confirmPassword()
      }
    },
    async register() {
      this.loading = true

      await User.register(this.form)
        .then(() => {
          localStorage.setItem('auth', 'true')
          if (this.$route.query.redirect !== undefined) {
            this.$router.push(this.$route.query.redirect)
          } else {
            this.$router.push('/shop')
          }
        })
        .catch((err) => {
          this.$root.$emit('alertNotification', {
            status: err.response.status,
            errors: err.response.data,
          })
        })
      this.loading = false
    },
  },
}
</script>
