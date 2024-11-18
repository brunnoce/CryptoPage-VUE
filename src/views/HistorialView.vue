<template>
  <div class="saldo-resumen">
    <h2>Saldos Totales</h2>
    <ul>
      <li v-for="(cantidad, crypto) in saldoTotal" :key="crypto">
        {{ cryptoNames[crypto] || crypto.toUpperCase() }}: {{ cantidad }}
      </li>
    </ul>
  </div>
  <div class="historial-contenedor">
    <HistorialTable :movimientos="compras" titulo="Compras" />
    <HistorialTable :movimientos="ventas" titulo="Ventas" />
  </div>
</template>

<script>
import HistorialTable from '@/components/HistorialTable.vue';
import { mapState } from 'vuex';
import apiClient from '@/axiosConfig';

export default {
  components: {
    HistorialTable,
  },
  data() {
    return {
      compras: [],
      ventas: [],
      cryptoNames: {
        btc: "Bitcoin",
        eth: "Ethereum",
        dai: "DAI",
        usdt: "USDT",
        doge: "Dogecoin",
        ada: "Cardano",
        sol: "Solana",
        dot: "Polkadot",
        ltc: "Litecoin",
      },
    };
  },
  computed: {
    ...mapState(['saldo']),
    saldoTotal() {
      return this.saldo;
    },
  },
  async created() {
    try {
      const response = await apiClient.get(
        `transactions?q={"user_id": "${this.$store.getters.getUserId}"}`
      );
      const movimientos = response.data;
      this.compras = movimientos.filter(m => m.action === 'purchase');
      this.ventas = movimientos.filter(m => m.action === 'sale');
    } catch (error) {
      console.error("Error buscando transacciones:", error);
    }
  },
};
</script>

<style scoped>
  .historial-contenedor {
    display: flex;
    flex-direction: row; 
    gap: 20px; 
    padding: 20px;
    flex-wrap: wrap; 
  }

  .saldo-resumen {
    background-color: rgba(3, 74, 166, 0.1);
    padding: 10px;
    border-radius: 8px;
    width: 300px;
    margin: 0 auto; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .saldo-resumen ul {
    list-style-type: none;
    padding: 0;
    text-align: center; 
  }

  .saldo-resumen li {
    font-weight: bold;
    color: #5CF2F2;
  }
</style>