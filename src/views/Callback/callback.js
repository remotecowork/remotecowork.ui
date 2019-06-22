import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'callback',
  components: {},
  props: [],
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([

    ])
  },
  mounted () {
    console.log(this.$route.query)
    var data = this.$route.query
    data.data = JSON.parse(data.data)
    this.loginWith3BotFinished(data).then(() => {
      this.setLocalJanusLocation(window.localStorage.getItem('JanusLocation'))
      if (this.$route.query.redirect) {
        const redirectTo = this.$route.query.redirect
        const teamName = redirectTo.substr(redirectTo.lastIndexOf('/') + 1, redirectTo.length)
        this.$router.push({ name: 'join', query: { team: teamName } })
      } else {
        this.$router.push({
          name: 'teams'
        })
      }
    })

    // window.opener.postMessage({ data: this.$route.query, type: '3botlogin-finished' })
    // window.close()
  },
  methods: {
    ...mapActions([
      'loginWith3BotFinished',
      'setLocalJanusLocation'
    ])
  }
}
