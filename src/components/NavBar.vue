<template>
  <nav>
    <ul>
      <li class="logo">
        <img src="../assets/images/logosinescrito.png" alt="Small Logo" class="logo-small">
      </li>
      <li class="title">Crypto Page</li> <!-- El título se mueve junto al logo -->
      <li><router-link to="/">Inicio</router-link></li>
      <li><router-link to="/comprar">Comprar</router-link></li>
      <li><router-link to="/vender">Vender</router-link></li>
      <li><router-link to="/historial">Historial</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
};
</script>

<style scoped>
nav {
  background-color: transparent;
  padding: 15px 30px; /* Añadí un padding mayor a los lados */
}

nav ul {
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Alinea todo a la izquierda */
  gap: 20px;
  margin: 0;
  padding: 0;
}

nav li {
  list-style: none;
}

.logo {
  margin-right: 10px; /* Añadí un pequeño margen entre el logo y el título */
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
  border-bottom: 2px solid #5CF2F2;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #034AA6;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-right: auto; /* Empuja los otros enlaces hacia la derecha */
}
</style>