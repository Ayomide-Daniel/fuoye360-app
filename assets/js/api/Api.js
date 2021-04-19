import axios from 'axios'
const Api = axios.create({
  baseURL: 'https://fuoye360.com/api',
})
Api.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
Api.defaults.withCredentials = true
export default Api
