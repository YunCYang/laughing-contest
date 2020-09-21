import Vue from 'vue';
import axios from 'axios';

const app = new Vue({
  el: '#app',
  data () {
    return {
      info: null
    }
  },
  mounted () {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(response => (this.info = response))
  }
});