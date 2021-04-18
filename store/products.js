import Shop from '@/assets/js/api/Shop'

const state = () => ({
  products: [],
})

const getters = {
  products: (state) => state.products,
}

const actions = {
  async getProducts({ commit }, page) {
    let response
    if (page === 'index') {
      response = await Shop.getIndex()
    }
    if (page === 'buy') {
      response = await Shop.getProducts()
    }
    if (page === 'wishlist') {
      response = await Shop.wishlist()
    }
    if (page === 'inventory') {
      response = await Shop.inventory()
    }
    return commit('setProducts', response.data)
  },
  async getProductsIndex({ commit }, page) {
    const response = await Shop.getIndex()
    commit('setProducts', response.data)
    return true
  },
}
const mutations = {
  setProducts: (state, products) => {
    if (![null, undefined].includes(products)) {
      return (state.products = products)
    }
    return false
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
