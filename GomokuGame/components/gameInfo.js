export default {
  props: ['turn'],
  computed: {
    ...Vuex.mapGetters([
      'isEnd'
    ])
  },
  template: `
    <div>
      <p v-if="this.isEnd"> end! </p>
      <p> current turn : {{ this.turn ? "hogeRed" : "piyoBlue" }} </p>
    </div>
  `
}
