<template>
  <nav>
    <ul>
      <li class="logo">
        <img src="../assets/images/logosinescrito.png" alt="Small Logo" class="logo-small">
      </li>
      <li class="title">CRYPTO PAGE</li> 
      <li><router-link to="/home">Inicio</router-link></li>
      <li><router-link to="/comprar">Comprar</router-link></li>
      <li><router-link to="/vender">Vender</router-link></li>
      <li><router-link to="/historial">Historial</router-link></li>
      <li v-if="isUserLoggedIn">
        <button @click="logout">Cerrar sesión</button>
      </li>
    </ul>
  </nav>
  <div class="navbar-line"></div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'NavBar',
  computed: {
    ...mapGetters(['isUserLoggedIn']),
  },
  methods: {
    ...mapActions(['logoutUser']),
    
    logout() {
      localStorage.removeItem('userId');
      this.logoutUser(); 
      this.$router.push({ name: 'login' }); 
    },
  },
};
</script>

<style scoped>
.navbar-line {
  width: 100%;
  border-top: 2px solid #034AA6; 
  margin-bottom: 20px;
}

nav {
  background-color: rgba(3, 74, 166, 0.1);
  padding: 15px 30px; 
}

nav ul {
  display: flex;
  align-items: center;
  justify-content: flex-start; 
  gap: 20px;
  margin: 0;
  padding: 0;
}

nav li {
  list-style: none;
}

.logo {
  margin-right: 10px;
}

.logo-small {
  width: 50px;
  height: auto;
}

nav a {
  text-decoration: none;
  color: #034AA6;
  font-weight: bold;
  font-size: 18px;
  transition: color 0.3s ease-in-out;
}

nav a:hover {
  color: #5CF2F2;
}

nav a.router-link-exact-active {
  color: #5CF2F2;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #034AA6;
  letter-spacing: 2px;
  margin-right: auto; 
}
</style>