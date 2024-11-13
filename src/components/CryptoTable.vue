<template>
    <div class="crypto-table">
      <h2>Lista de Criptomonedas</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="crypto in cryptos" :key="crypto.id">
            <td>{{ crypto.name }}</td>
            <td>{{ formatPrice(crypto.price) }}</td>
            <td>{{ formatMarketCap(crypto.marketCap) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import apiClient from '@/axiosConfig';
  
  export default {
    name: 'CryptoTable',
    data() {
      return {
        cryptos: [] 
      };
    },
    methods: {
      async fetchCryptos() {
        try {
          const response = await apiClient.get('/cryptos'); 
          this.cryptos = response.data;
        } catch (error) {
          console.error('Error al cargar las criptomonedas:', error);
        }
      },
      formatPrice(value) {
        return `$${value.toFixed(2)}`;
      },
      formatMarketCap(value) {
        return `$${(value / 1e9).toFixed(2)}B`; 
      }
    },
    mounted() {
      this.fetchCryptos();
    }
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
  }
  
  </style>  