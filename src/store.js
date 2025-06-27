import { reactive } from 'vue';

const store = reactive({
  username: undefined,
  // server_domain: "http://localhost:3000",
  
  //remote
  server_domain: 'https://noa-yaki.cs.bgu.ac.il',

  login(username) {
    localStorage.setItem('username', username);
    this.username = username;
    console.log("login", this.username);
  },

  logout() {
    console.log('logout');
    localStorage.removeItem('username');
    this.username = undefined;
  },
});

export default store;
