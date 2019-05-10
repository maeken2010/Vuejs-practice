export default {
  props: ['color'],
  computed: {
    colorClass: function() {
      return ["white", "red", "blue"][this.color]
    }
  },
  template: '<div :class="this.colorClass"></div>'
}
