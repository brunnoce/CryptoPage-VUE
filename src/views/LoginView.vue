<template>
  <div class="login-view">
    <div class="login-form-container">
      <form class="login-form" @submit.prevent="inicioSesion">
        <h1>Iniciar sesión</h1>
        <label for="username">Nombre de usuario</label>
        <input v-model="username" type="text" id="username" placeholder="Ingresa tu nombre de usuario" required />

        <label for="password">Contraseña</label>
        <input v-model="password" type="password" id="password" placeholder="Ingresa tu contraseña" required />

        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "LoginView",
  data() {
    return {
      username: "",
    };
  },
  methods: {
    ...mapActions(['loginUser']),
    
    inicioSesion() {
      if (this.username.trim()) {
        localStorage.setItem('userId', this.username);
        this.loginUser(this.username);
        this.$router.push({ name: 'home' });
      } else {
        alert('Por favor, ingresa un ID válido.');
      }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #020b1c; 
  font-family: 'Roboto', sans-serif; 
}

.login-form-container {
  background-color: rgba(3, 74, 166, 0.1); 
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.login-form h1 {
  color: #034AA6;
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 20px;
  font-weight: 700; 
}

.login-form label {
  color: #e0e0e0;
  margin-bottom: 5px;
  font-size: 1rem;
  font-weight: 500;
}

.login-form input {
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #034AA6;
  border-radius: 5px;
  background-color: transparent;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 400;
}

.login-form button {
  background-color: #5CF2F2;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 500;
}

.login-form button:hover {
  background-color: #034AA6;
}
</style>