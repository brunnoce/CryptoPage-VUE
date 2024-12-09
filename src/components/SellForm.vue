<template>
  <div class="sell-form-container">
    <div class="sell-form">
      <h2>Venta de Criptomonedas</h2>
      <form @submit.prevent="realizarVenta">
        <div class="form-group">
          <label for="crypto">Criptomoneda:</label>
          <select v-model="ventaSeleccionada">
            <option value="" disabled selected>Seleccionar una opción</option>
            <option v-for="(crypto, key) in cryptos" :key="key" :value="key">
              {{ crypto.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="cantidad">Cantidad:</label>
          <input
            type="number"
            v-model="cantidad"
            min="0.00001"
            step="0.00001"
            placeholder="0.00"
            :max="maxCantidad"
          />
        </div>
        <div class="form-group">
          <label for="monto">Monto (ARS):</label>
          <input 
            type="text" 
            :value="monto" 
            disabled 
            class="readonly-input" 
          />
        </div>
        <button type="submit">Registrar Venta</button>
      </form>
      <div class="container-mensajeUsuario" v-if="mensajeUsuario">
        <p class="mensajeUsuario">{{ mensajeUsuario }}</p>
      </div>
    </div>
  </div>
</template>
  
<script>
  import { mapGetters } from "vuex";
  import apiClient from "@/axiosConfig";
  import cryptoConfig from "@/cryptoConfig";

  export default {
    data() {
      return {
        cryptos: {
          btc: { name: 'Bitcoin', ask: 0, bid: 0, time: '', balance: 0 },
          eth: { name: 'Ethereum', ask: 0, bid: 0, time: '', balance: 0 },
          dai: { name: 'DAI', ask: 0, bid: 0, time: '', balance: 0 },
          usdt: { name: 'USDT', ask: 0, bid: 0, time: '', balance: 0 },
          doge: { name: 'Dogecoin', ask: 0, bid: 0, time: '', balance: 0 },
          ada: { name: 'Cardano', ask: 0, bid: 0, time: '', balance: 0 },
          sol: { name: 'Solana', ask: 0, bid: 0, time: '', balance: 0 },
          dot: { name: 'Polkadot', ask: 0, bid: 0, time: '', balance: 0 },
          ltc: { name: 'Litecoin', ask: 0, bid: 0, time: '', balance: 0 }
        },
        ventaSeleccionada: "",
        cantidad: 0,
        monto: 0,
        mensajeUsuario: "",
        maxCantidad: 0, 
        saldoDisponible: 0, 
      };
    },
    mounted() {
      const cryptoLista = ['btc', 'eth', 'dai', 'usdt', 'doge', 'ada', 'sol', 'dot', 'ltc'];
      cryptoLista.forEach(crypto => {
        console.log(`Saldo para ${crypto}:`, this.$store.getters.getSaldo(crypto));
      });
    },
    computed: {
      ...mapGetters(["getUserId", "getSaldo"]),
    },
    watch: {
      cantidad(newCantidad) {
        if (this.ventaSeleccionada && this.cryptos[this.ventaSeleccionada]) {
          this.monto = (newCantidad * this.cryptos[this.ventaSeleccionada].bid);
        }
      },
      ventaSeleccionada() {
        this.actualizarMonto();
        this.saldoDisponible = this.$store.getters.getSaldo(this.ventaSeleccionada);
        this.maxCantidad = this.saldoDisponible;
      },   
    },
    methods: {
      async actualizarMonto() {
        if (this.ventaSeleccionada) {
          const crypto = this.ventaSeleccionada;
          try {
            const response = await cryptoConfig.get(`satoshitango/${crypto}/ars`);
            console.log("Respuesta de la API para " + crypto + ": ", response.data);
            this.cryptos[crypto].bid = response.data.totalBid;
            this.monto = (this.cantidad * this.cryptos[crypto].bid).toFixed(2);
            
            this.saldoDisponible = this.$store.getters.getSaldo(this.ventaSeleccionada);
            this.maxCantidad = this.saldoDisponible;
          } catch (error) {
            console.error("Error al obtener los datos de la criptomoneda:", error);
          }
        }
      },
      async realizarVenta() { 
        const ahora = new Date();
        if (
          this.cantidad <= 0 || 
          this.monto <= 0 || 
          !this.ventaSeleccionada) {
          this.mensajeUsuario = "Por favor, complete todos los campos correctamente.";
          return;
        }

        if (this.cantidad > this.saldoDisponible) {
          this.mensajeUsuario = "No tienes suficiente saldo para esta venta.";
          return;
        }

        const datos = {
          user_id: this.getUserId,
          action: "sale",
          crypto_code: this.ventaSeleccionada.toLowerCase(),
          crypto_amount: this.cantidad,
          money: this.monto.toFixed(2),
          datetime: ahora,
        };

        try {
          console.log("Datos de venta posteados:", datos);

          await apiClient.post("transactions", datos);
          await this.$store.dispatch("venderCripto", {
            cryptoCode: this.ventaSeleccionada.toLowerCase(),
            cantidad: this.cantidad,
          });
          console.log("Venta registrada correctamente");
          this.mensajeUsuario = "Venta registrada correctamente.";
          this.limpiarFormulario();
        } catch (error) {
          console.error("Error al registrar venta:", error);
          this.mensajeUsuario = "Error al registrar la venta.";
        }
      },
      limpiarFormulario() {
        this.ventaSeleccionada = "";
        this.cantidad = 0;
        this.monto = 0;
        this.maxCantidad = 0;
        setTimeout(() => {
          this.mensajeUsuario = "";
        }, 3000); // 3segundos después se borra el mensaje
      },
    },
  };
</script>

<style scoped>
  .sell-form-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
  }

  .sell-form {
      background-color: rgba(3, 74, 166, 0.1);
      padding: 20px;
      border-radius: 8px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .sell-form h2 {
      text-align: center;
      color: #034aa6;
  }
  
  .form-group {
      margin-bottom: 15px;
  }
  
  label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
  }
  
  select, input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
  }
  
  button {
      width: 100%;
      padding: 12px;
      cursor: pointer;
      margin-top: 10px;
  }

</style>