<template>
  <div class="login-view">
    <div class="login-form-container">
      <form class="login-form" @submit.prevent="inicioSesion">
        <h1>Iniciar sesión</h1>
        <label for="username">Nombre de usuario</label>
        <input v-model="username" type="text" id="username" placeholder="Ingresa tu nombre de usuario" />

        <label for="password">Contraseña</label>
        <input v-model="password" type="password" id="password" placeholder="Ingresa tu contraseña" />

        <button type="submit">Iniciar sesión</button>

        <div class="container-mensajeUsuario" v-if="mensajeUsuario">
          <p class="mensajeUsuario">{{ mensajeUsuario }}</p>
        </div>
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
      password: "",
      mensajeUsuario: "",
    };
  },
  methods: {
    ...mapActions(['loginUser']), 
    inicioSesion() {
      if (!this.username.trim()) {
        this.mensajeUsuario = "Por favor, ingresa un username";
        return;
      }

      if (!this.validarUser(this.username)) {
        this.mensajeUsuario = "El username debe ser alfanumérico, contener al menos una letra y un número, y tener entre 4 y 15 caracteres.";
        return;
      }

      if (!this.password.trim()) {
        this.mensajeUsuario = "Por favor, ingresa una contraseña";
        return;
      }

      if (this.password.length < 8) {
        this.mensajeUsuario = "La contraseña debe tener al menos 8 caracteres.";
        return;
      }

      localStorage.setItem('userId', this.username);
      this.loginUser(this.username);
      this.$router.push({ name: 'home' });
      console.log("Username guardado: " + this.username)
    },
    validarUser(str) {
      let tieneLetra = false;
      let tieneNumero = false;

      if (str.length < 4 || str.length > 15) {
        return false;
      }

      for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
          tieneLetra = true;
        } else if (char >= '0' && char <= '9') {
          tieneNumero = true;
        } else {
          return false;
        }
        if (tieneLetra && tieneNumero) {
          return true;
        }
      }
      return false;
    }
  }
};
</script>

<style scoped>

.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #020b1c; 
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
</style>