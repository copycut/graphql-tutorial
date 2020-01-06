import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { apolloClient } from './apolloClient'
import App from './components/app.vue'

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

new Vue({
  el: '#root',
  apolloProvider,
  render: h => h(App),
})
