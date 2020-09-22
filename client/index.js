import Vue from 'vue';
import axios from 'axios';

const randomPlayerNum = max => {
  const num1 = Math.floor(Math.random() * max);
  let num2 = Math.floor(Math.random() * (max - 1));
  if (num2 >= num1) num2 += 1;
  return (
    [num1, num2]
  );
};

const randomPlayerStat = (min, max) => (Math.floor(Math.random() * (max - min)) + min + 1);

const app = new Vue({
  el: '#app',
  data () {
    return {
      player: null,
      title: 'Laughing Contest',
      pic1: null,
      pic2: null,
      playerNum: [0, 1],
      hp1: null,
      hp2: null,
      dps1: null,
      dps2: null,
      winner: null
    }
  },
  methods: {
    randomizePlayer: function (max) {
      const requestOne = axios.get('https://api.thecatapi.com/v1/images/search');
      const requestTwo = axios.get('https://api.thecatapi.com/v1/images/search');
      axios
        .all([requestOne, requestTwo])
        .then(axios.spread(
          (...responses) => {
            this.pic1 = responses[0];
            this.pic2 = responses[1];
            this.playerNum = randomPlayerNum(10);
            this.hp1 = randomPlayerStat(50, 200) * -1;
            this.hp2 = randomPlayerStat(50, 200) * -1;
            this.dps1 = randomPlayerStat(10, 30);
            this.dps2 = randomPlayerStat(10, 30);
          }
        ));
    },
    compete: function () {
      const cheerUp = () => {
        if (this.hp1 <= 0) {
          this.hp1 += this.dps1;
        }
        if (this.hp2 <= 0) {
          this.hp2 += this.dps2;
        }
        if (this.hp1 > 0 || this.hp2 > 0) {
          findWinner();
        }
      };

      const laugh = setInterval(cheerUp, 1000);

      const findWinner = () => {
        clearInterval(laugh);
        if (this.hp1 > 0 && this.hp2 <= 0) {
          this.winner = 1;
        } else if (this.hp2 > 0 && this.hp1 <=0) {
          this.winner = 2;
        } else {
          this.winner = 3;
        }
      };
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
          this.player = responses[0];
          this.pic1 = responses[1];
          this.pic2 = responses[2];
          this.playerNum = randomPlayerNum(10);
          this.hp1 = randomPlayerStat(50, 200) * -1;
          this.hp2 = randomPlayerStat(50, 200) * -1;
          this.dps1 = randomPlayerStat(10, 30);
          this.dps2 = randomPlayerStat(10, 30);
          this.winner = null;
        }
      ));
  }
});

Vue.component('buttons', {
  template: `
    <div class="action">
      <button v-on:click="$emit('compete')">
        Compete
      </button>
      <button v-on:click="$emit('randomize')">
        Randomize
      </button>
    </div>
  `
});