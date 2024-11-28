<template>
  <div class="purchase-form-container">
    <div class="purchase-form">
      <h2>Compra de Criptomonedas</h2>
      <form @submit.prevent="realizarCompra">
        <div class="form-group">
          <label for="crypto">Criptomoneda:</label>
          <select v-model="compraSeleccionada">
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
        <button type="submit">Registrar Compra</button>
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
      compraSeleccionada: "",
      cantidad: 0,
      monto: 0,
      mensajeUsuario: "",
    };
  },
  mounted() {
      const cryptoLista = ['btc', 'eth', 'dai', 'usdt', 'doge', 'ada', 'sol', 'dot', 'ltc'];
      cryptoLista.forEach(crypto => {
        console.log(`Saldo para ${crypto}:`, this.$store.getters.getSaldo(crypto));
      });
    },
  computed: {
    ...mapGetters(["getUserId"]),
  },
  watch: {
    cantidad(newCantidad) {
      if (this.compraSeleccionada && this.cryptos[this.compraSeleccionada]) {
        this.monto = (newCantidad * this.cryptos[this.compraSeleccionada].ask).toFixed(2);
      }
    },
    compraSeleccionada() {
      this.actualizarMonto();
    },
  },
  methods: {
    async actualizarMonto() {
      try {
        if (this.compraSeleccionada) {
        const crypto = this.compraSeleccionada;
        const response = await cryptoConfig.get(`satoshitango/${crypto}/ars`);
        this.cryptos[crypto].ask = response.data.totalAsk;
        this.monto = (this.cantidad * this.cryptos[crypto].ask).toFixed(2);
        }       
      } catch (error) {
        console.error("Error al obtener los datos de la criptomoneda:", error);
      }
    },
    async realizarCompra() {
      const ahora = new Date();

      if (
        this.compraSeleccionada &&
        this.cantidad > 0 &&
        this.monto > 0 
      ) {
        const datos = {
          user_id: this.getUserId,
          action: "purchase",
          crypto_code: this.compraSeleccionada.toLowerCase(),
          crypto_amount: this.cantidad,
          money: this.monto,
          datetime: ahora,
        };
        try {
          console.log("Datos de compra posteados:", datos);
          await apiClient.post("transactions", datos);
          await this.$store.dispatch('comprarCripto', {
            cryptoCode: this.compraSeleccionada.toLowerCase(),
            cantidad: this.cantidad,
          });
          console.log("Compra registrada correctamente");
          this.mensajeUsuario = "Compra registrada correctamente.";
          this.limpiarFormulario();
        } catch (error) {
          console.error("Error al registrar compra:", error);
          this.mensajeUsuario = "Error al registrar la compra.";
        }
      } else {
        this.mensajeUsuario = "Por favor, complete todos los campos correctamente o ingrese una fecha y hora válida.";
      }
    },
    limpiarFormulario() {
      this.compraSeleccionada = "";
      this.cantidad = 0;
      this.monto = 0;
      setTimeout(() => {
        this.mensajeUsuario = ""; 
      }, 3000); // 3segundos después se borra el mensaje
    },
  },
};
</script>

<style scoped>
  .purchase-form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .purchase-form {
    background-color: rgba(3, 74, 166, 0.1);
    padding: 20px;
    border-radius: 8px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .purchase-form h2 {
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