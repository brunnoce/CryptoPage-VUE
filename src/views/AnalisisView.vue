<template>
    <div>
      <h1>Análisis del Estado Actual</h1>
      <table>
        <thead>
          <tr>
            <th>Criptomoneda</th>
            <th>Cantidad</th>
            <th>Dinero</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(saldo, cryptoCode) in saldoCalculado" :key="cryptoCode">
            <td>{{ cryptoCode.toUpperCase() }}</td>
            <td>{{ saldo.cantidad }}</td>
            <td>${{ saldo.dinero.toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
      <div class="container-total">
        <h3>Total (AR$)</h3>
        <p class="total">${{ totalDinero.toFixed(2) }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import apiClient from '@/axiosConfig';
  import cryptoConfig from '@/cryptoConfig';
  
  export default {
    name: 'AnalisisView',
    data() {
      return {
        transacciones: [],  
        saldoCalculado: {}, 
        totalDinero: 0,     
      };
    },
    async created() {
      await this.cargarTransacciones();
      await this.calcularSaldo();
    },
    methods: {
      async cargarTransacciones() {
        try {
          const response = await apiClient.get(`transactions?q={"user_id": "${this.$store.state.userId}"}`);
          this.transacciones = response.data;
        } catch (error) {
          console.error('Error cargando las transacciones', error);
        }
      },
  
      async calcularSaldo() {
        const saldo = {};
        const cryptoPrices = {}; 
    
        this.transacciones.forEach(transaccion => {
          if (!saldo[transaccion.crypto_code]) saldo[transaccion.crypto_code] = 0;
    
          if (transaccion.action === 'purchase') {
            saldo[transaccion.crypto_code] += parseFloat(transaccion.crypto_amount);
          } else if (transaccion.action === 'sale') {
            saldo[transaccion.crypto_code] -= parseFloat(transaccion.crypto_amount);
          }
        });
    
        for (const cryptoCode in saldo) {
          if (saldo[cryptoCode] > 0) {
            await this.obtenerPrecioCrypto(cryptoCode, saldo[cryptoCode], cryptoPrices);
          }
        }
  
        let total = 0;
        for (const cryptoCode in saldo) {
          if (saldo[cryptoCode] > 0) {
            const cantidad = saldo[cryptoCode];
            const precio = cryptoPrices[cryptoCode];
            
            if (precio && !isNaN(precio)) {
              const dinero = cantidad * precio;
              this.saldoCalculado[cryptoCode] = { cantidad, dinero };
              total += dinero;
            } else {
              console.warn(`Precio no disponible para ${cryptoCode}`);
              this.saldoCalculado[cryptoCode] = { cantidad, dinero: 0 };
            }
          }
        }
  
        this.totalDinero = total;
      },
  
      async obtenerPrecioCrypto(cryptoCode, cantidad, cryptoPrices) {
        try {
          const response = await cryptoConfig.get(`satoshitango/${cryptoCode}/ars`);
          const precio = parseFloat(response.data.totalAsk); // Ajuste de la clave
          if (!isNaN(precio) && precio > 0) {
            cryptoPrices[cryptoCode] = precio;
          } else {
            console.error(`Precio inválido para ${cryptoCode}`);
            cryptoPrices[cryptoCode] = 0;
          }
        } catch (error) {
          console.error(`Error obteniendo el precio de ${cryptoCode}`, error);
          cryptoPrices[cryptoCode] = 0;
        }
      }
    },
  };
  </script>
  
  <style scoped>
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
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
    
    h1 {
      text-align: center;
      color: #034AA6;
      margin-bottom: 20px;
    }
    
    .container-total {
      margin-top: 20px;
      padding: 15px;
      background-color: rgba(3, 74, 166, 0.1);
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    
    .container-total h3 {
      margin: 0;
      font-size: 18px;
      color: #034AA6;
    }
    
    .total {
      font-size: 24px;
      font-weight: bold;
      color: #00C853;
      margin-top: 10px;
    }
  </style> 