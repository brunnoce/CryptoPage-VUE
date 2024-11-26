<template>
  <div class="crypto-table">
    <table>
      <thead>
        <tr>
          <th>Criptomoneda</th>
          <th>Precio de Compra (ARS)</th>
          <th>Precio de Venta (ARS)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(crypto, key) in cryptos" :key="key">
          <td>{{ crypto.name }}</td>
          <td v-if="typeof crypto.ask === 'number'">{{ numeroConSeparadorDecimales(crypto.ask) }}</td>
          <td v-if="typeof crypto.bid === 'number'">{{ numeroConSeparadorDecimales(crypto.bid) }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="cargando" class="loading">Cargando...</div>
  </div>
</template>

<script>
import cryptoConfig from "@/cryptoConfig";

export default {
  data() {
    return {
      cryptos: {
        btc: { name: 'Bitcoin', ask: 0, bid: 0, time: '' },
        eth: { name: 'Ethereum', ask: 0, bid: 0, time: '' },
        dai: { name: 'DAI', ask: 0, bid: 0, time: '' },
        usdt: { name: 'USDT', ask: 0, bid: 0, time: '' },
        doge: { name: 'Dogecoin', ask: 0, bid: 0, time: ''},
        ada: { name: 'Cardano', ask: 0, bid: 0, time: '' },
        sol: { name: 'Solana', ask: 0, bid: 0, time: ''},
        dot: { name: 'Polkadot', ask: 0, bid: 0, time: ''},
        ltc: { name: 'Litecoin', ask: 0, bid: 0, time: ''},
      },
      cargando: false,
    };
  },
  methods: {
    numeroConSeparadorDecimales(numero) {
      return new Intl.NumberFormat('es-AR').format(numero);
    },

    async obtenerPrecios() {
      try {
        this.cargando = true;
        for (let crypto in this.cryptos) {
          const response = await cryptoConfig.get(`satoshitango/${crypto}/ars`);
          this.cryptos[crypto].ask = response.data.totalAsk;
          this.cryptos[crypto].bid = response.data.totalBid;
          this.cryptos[crypto].time = response.data.time;  
        }
      } catch (error) {
        console.error('Error al obtener precios:', error);
      } finally {
        this.cargando = false;
      }
    },
  },
  created() {
    this.obtenerPrecios();
  },
};
</script>

<style scoped>
  .crypto-table {
    margin: 20px auto;
    padding: 20px;
    background-color: rgba(3, 74, 166, 0.1);
    border-radius: 10px;
    width: 80%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .crypto-table h2 {
    text-align: center;
    color: #034AA6;
    margin-bottom: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #034AA6;
    color: white;
  }
  
  tr:hover {
    background-color: #5CF2F2;
    color: black;
  }
  
</style>  