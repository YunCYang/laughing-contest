import Vue from 'vue';
import axios from 'axios';

const app = new Vue({
  el: '#app',
  data () {
    return {
      player: null,
      title: 'Laughing Contest',
      pic1: null,
      pic2: null
    }
  },
  mounted () {
    const requestOne = axios.get('https://jsonplaceholder.typicode.com/users');
    const requestTwo = axios.get('https://api.thecatapi.com/v1/images/search');
    const requestThree = axios.get('https://api.thecatapi.com/v1/images/search');
    axios
      .all([requestOne, requestTwo, requestThree])
      .then(axios.spread(
        (...responses) => {
          this.player = responses[0],
          this.pic1 = responses[1],
          this.pic2 = responses[2]
        }
      ));
  }
});