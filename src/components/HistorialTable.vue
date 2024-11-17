<template>
  <div class="historial-table">
    <h2>{{ titulo }}</h2>
    <table>
      <thead>
        <tr>
          <th>Criptomoneda</th>
          <th>Cantidad</th>
          <th>Monto (AR$)</th>
          <th>Fecha y Hora</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="movimiento in movimientos" :key="movimiento._id">
          <td>{{ cryptoNames[movimiento.crypto_code] || movimiento.crypto_code }}</td>
          <td>{{ movimiento.crypto_amount }}</td>
          <td>{{ movimiento.money }}</td>
          <td>{{ new Date(movimiento.datetime).toString() }}</td>
          <td>
            <button @click="verDetalles(movimiento)">Detalles</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    movimientos: {
      type: Array,
      required: true,
    },
    titulo: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      cryptoNames: {
        btc: "Bitcoin",
        eth: "Ethereum",
        dai: "DAI",
        usdt: "Tether",
        doge: "Dogecoin",
        ada: "Cardano",
        sol: "Solana",
        dot: "Polkadot",
        ltc: "Litecoin",
      },
    };
  },
  methods: {
    verDetalles(movimiento) {
      this.$router.push({
        name: 'DetailsView',
        params: { id: movimiento._id },
      });
    },
  },
};
</script>

<style scoped>
  .historial-table-container {
    display: flex; /* Usamos flexbox para alinear las tablas horizontalmente */
    gap: 20px; /* Espacio entre las tablas */
    flex-wrap: wrap; /* Permite que las tablas se acomoden si hay poco espacio */
  }

  .historial-table {
    background-color: rgba(3, 74, 166, 0.1);
    padding: 10px; /* Reducir el padding */
    border-radius: 8px;
    width: 48%; /* Establecer un tamaño más pequeño para cada tabla */
    box-sizing: border-box; /* Asegura que el padding no afecte al tamaño total */
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem; /* Reducir el tamaño de la fuente */
  }

  th, td {
    padding: 8px; /* Reducir el padding en las celdas */
    border: 1px solid #ddd;
    text-align: center;
  }

  button {
    background-color: #034aa6;
    color: white;
    border: none;
    padding: 6px 12px; /* Reducir el padding del botón */
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.8rem;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #0274a6;
  }
</style>
