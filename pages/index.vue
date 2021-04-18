<template>
  <div>
    <div class="main-txt wrapper">
      <br />
      <div class="div-header">
        <h1 class="typewrite-header">
          <span class="typewrite"></span> <span class="typewrite-border"></span>
        </h1>
      </div>
      <div class="intro-div">
        <p>
          <span class="t_success">FUOYE360</span> is your favourite
          <span class="t_success">problem SOLVING community</span> created to
          provide solutions to some of the prevailing Educational, Social,
          Entrepreneurship challenges we face in our everyday lives.
        </p>
      </div>
    </div>
    <div class="wrapper">
      <h3 class="sb-text"><i class="fas fa-user"></i> Awesome Developer!</h3>
      <br />
      <div class="about-inspiration">
        <div class="about-avi">
          <img
            loading="lazy"
            :src="require('@/assets/images/about.jpg')"
            alt="about-image"
            style="margin: 0 auto"
          />
        </div>
        <div>
          <div class="goals">
            <span class="content">Words That Inspire Me:</span><br />"Think
            Differently. <br />Innovate Differently. <br />
            Provide Solutions rather than discuss problems. <br />
            And while you do these things, remember than your greatest strength
            lies in doing things in your own uniqueness. <br />THESE ARE THE
            WORDS I LIVE AND BREATHE BY"
          </div>
          <p>
            Ayomide Daniel is a 400 Level Mechanical Engineering student of
            FUOYE. FUOYE360 is his first website to be launched.
          </p>
        </div>
      </div>
    </div>
    <div class="form-container lg-container" style="background: none">
      <div style="padding: 1rem" class="form-img-div">
        <img
          loading="lazy"
          :src="require('@/assets/illustrations/messenger-animate.svg')"
          alt=""
        />
        <div class="div-header" style="text-align: left">
          <h3 class="div-meta">
            Kindly drop your suggestions on how we might improve.
          </h3>
          <span class="hr-line"></span>
        </div>
      </div>
      <form action="" method="" @submit.prevent="sendFeedback($event)">
        <div class="input-div">
          <label for="text"><i class="fas fa-user"></i> Name</label>
          <input
            id="feedbackName"
            v-model="feedback.name"
            type="text"
            name="username"
            value=""
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
        <input type="hidden" name="redirect" value="shop-link" />
        <div class="input-div">
          <label for="email"><i class="fas fa-envelope"></i> Email</label>
          <input
            id="feedbackEmail"
            v-model="feedback.email"
            type="email"
            name="email"
            value=""
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
          <label for="feedback"
            ><i class="fas fa-question-circle"></i> Feedback</label
          >
          <textarea
            id="feedbackMsg"
            v-model="feedback.message"
            name="feedback"
            rows="10"
          ></textarea>
        </div>
        <button
          type="submit"
          name="feedback-btn"
          class="send-feeback-btn"
          :disabled="
            [validEmail, validUsername].includes(false) ||
            feedback.message.length <= 0 ||
            authing
          "
          :style="
            [validEmail, validUsername].includes(false) ||
            feedback.message.length <= 0 ||
            authing
              ? 'opacity:.75;'
              : ''
          "
        >
          <span v-if="authing"
            ><v-progress-circular
              indeterminate
              color="white"
              width="3"
              size="20"
            ></v-progress-circular
          ></span>
          <span v-else
            ><i class="fas fa-paper-plane"></i>
            SEND FEEDBACK
          </span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Action from '@/assets/js/api/Action'
import regex from '@/assets/js/regex'

export default {
  data() {
    return {
      title: "FUOYE360 | FUOYE's Largest Online Community",
      feedback: {
        name: '',
        email: '',
        message: '',
      },
      validUsername: '',
      validEmail: '',
      authing: false,
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: "FUOYE360 | FUOYE's Largest Online Community",
        },
      ],
    }
  },
  mounted() {
    $(document).ready(() => {
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
      $('.form-container label').click(function () {
        $(this).parent().find('input').focus()
      })
      const elements = document.getElementsByClassName('typewrite')
      for (let i = 0; i < elements.length; i++) {
        const toRotate = [
          'Entering the University is HARD',
          'Being a student should be EASY',
          'Stay updated with FUOYE360 Broadcasts',
        ]
        const period = 2000
        if (toRotate) {
          // eslint-disable-next-line no-new
          new TxtType(elements[i], toRotate, period)
        }
      }
    })
    const TxtType = function (el, toRotate, period) {
      this.toRotate = toRotate
      this.el = el
      this.loopNum = 0
      this.period = parseInt(period, 10) || 2000
      this.txt = ''
      this.tick()
      this.isDeleting = false
    }

    TxtType.prototype.tick = function () {
      const i = this.loopNum % this.toRotate.length
      const fullTxt = this.toRotate[i]

      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1)
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1)
      }

      this.el.innerHTML = this.txt

      const that = this
      let delta = 200 - Math.random() * 100

      if (this.isDeleting) {
        delta /= 2
      }

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period
        this.isDeleting = true
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false
        this.loopNum++
        delta = 500
      }

      setTimeout(function () {
        that.tick()
      }, delta)
    }
  },
  methods: {
    validateForm(e) {
      const formInput = e.target.name
      if (formInput === 'email') {
        if (regex.email(e.target.value)) {
          return (this.validEmail = true)
        }
        return (this.validEmail = false)
      } else if (formInput === 'username') {
        if (regex.name(e.target.value)) {
          return (this.validUsername = false)
        }
        return (this.validUsername = true)
      }
    },
    async sendFeedback(e) {
      this.authing = true
      await Action.sendFeedback(this.feedback)
        .then(() => {
          $(e.target)[0].reset()
        })
        .catch(() => {
          this.$root.$emit('alertNotification', {
            errors: {
              Notification: ['Notificaiton not sent! Try again'],
            },
          })
        })
      this.authing = false
    },
  },
}
</script>
<style scoped>
.std-out {
  color: var(--white-color);
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: var(--highlight-color);
}
.std-out-two {
  background: var(--brand-color);
  color: var(--white-color);
  padding: 0.5rem;
  border-radius: 0.5rem;
}
.div-header {
  white-space: normal;
  line-height: 2rem;
  text-align: center;
}
.main-txt {
  height: 75vh;
  padding: 1rem;
  color: var(--brand-color);
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.typewrite-header {
  white-space: normal;
  line-height: 5rem;
  font-size: 50px;
  text-align: left;
}
.typewrite {
  font: inherit;
  transition: all ease-in-out 3s;
}
.typewrite-border {
  transform: skew(5);
  margin-left: 10px;
  animation: typewrite 450ms linear infinite;
}
@keyframes typewrite {
  from {
    border-right: 2px solid transparent;
  }
  to {
    border-right: 2px solid var(--brand-color);
  }
}
.intro-div {
  position: absolute;
  top: 45%;
  left: 0%;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--white-color);
  color: var(--brand-color);
  border-radius: 1rem;
  font-weight: bold;
  padding: 1.5rem;
  margin: 0 auto;
  width: 85%;
  line-height: 2rem;
  max-width: 425px;
  display: none;
}
.how-it-works {
  min-height: 50vh;
  background: var(--white-color);
  color: var(--dark-color);
  text-align: center;
  position: relative;
}
.lg-fig {
  font-size: 150px;
  font-weight: bold;
  font-family: 'Ubuntu', sans-serif;
  color: var(--brand-color);
  color: var(--highlight-color);
}
.i-rows {
  display: flex;
  justify-content: stretch;
  align-items: center;
  min-height: 150px;
  margin: 2rem 0;
}
.i-rows .fig-div {
  height: inherit;
}
.i-rows .text-div {
  align-self: flex-start;
}
.gallery {
  text-align: center;
}
.gallery .div-content {
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.5rem;
}
.gallery .div-content img {
  width: 100%;
  height: auto;
  border-radius: 1rem;
  margin: 0.25rem;
}

.about-avi {
  padding: 0.5rem 0;
}

.about-avi img {
  margin: 0px auto;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: block;
  -o-object-fit: cover;
  object-fit: cover;
  box-shadow: 0 0 4px rgb(0 0 0 / 90%);
}
@media screen and (min-width: 768px) {
  .how-it-works .div-content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0.5rem;
  }
  .gallery .div-content {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
  .how-it-works::after {
    display: none;
    width: inherit;
    min-height: 50vh;
    bottom: -250px;
  }
  p {
    white-space: normal;
  }
}
</style>
