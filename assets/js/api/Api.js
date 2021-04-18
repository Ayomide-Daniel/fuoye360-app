import axios from 'axios'
import $ from 'jquery'
const Api = axios.create({
  baseURL: 'https://fuoye360.com/api',
})
Api.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
Api.defaults.withCredentials = true
Api.get('/csrf-cookie').then(() => {
  Api.defaults.headers.common['X-CSRF-TOKEN'] = $(
    'meta[name="csrf-token"]'
  ).attr('content')
})
export default Api
