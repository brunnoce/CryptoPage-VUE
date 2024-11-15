<template>
  <div class="home">
    <section class="crypto-table">
      <CryptoTable />
    </section>

    <section class="logo-section">
      <img alt="Crypto Logo" src="@/assets/images/logo.png" class="logo-large">
    </section>

    <section class="presentation">
      <h2>Bienvenido a CryptoPage</h2>
      <p>
        Somos una plataforma confiable para el comercio de criptomonedas. Nuestro objetivo es brindarte una 
        experiencia segura, rápida y sencilla para manejar tus inversiones.
      </p>
      <p>
        ¿Por qué elegirnos? Contamos con:
      </p>
      <ul>
        <li>Transacciones seguras y encriptadas.</li>
        <li>Actualizaciones en tiempo real de precios de criptomonedas.</li>
        <li>Soporte 24/7 para resolver tus dudas.</li>
      </ul>
    </section>
  </div>
</template>

<script>
import CryptoTable from '@/components/CryptoTable.vue'; 

export default {
  name: 'HomeView',
  components: {
    CryptoTable
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap'); 

.home {
  padding: 30px 20px;
  font-family: 'Poppins', sans-serif;
}

.crypto-table {
  margin-bottom: 50px;
}

.logo-section {
  display: flex;
  justify-content: center;
  margin: 30px 0;
}

.logo-large {
  width: 300px;
  height: auto;
}

.presentation {
  background-color: rgba(3, 74, 166, 0.1);
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
}

.presentation h2 {
  color: #034AA6;
  margin-bottom: 20px;
  font-size: 32px;
  font-weight: 600;
}

.presentation p {
  color: #5CF2F2;
  margin: 12px 0;
  line-height: 1.7;
  font-size: 18px;
}

.presentation ul {
  list-style-type: disc;
  padding-left: 30px;
  text-align: left;
  margin-top: 20px;
}

.presentation ul li {
  color: white;
  font-size: 18px;
  margin: 10px 0;
}

.presentation ul li::marker {
  color: #5CF2F2; 
}
</style>