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
        ventaSeleccionada: "",
        cantidad: 0,
        monto: 0,
        mensajeUsuario: "",
      };
    },
    computed: {
      ...mapGetters(["getUserId"]),
    },
    watch: {
      cantidad(newCantidad) {
        if (this.ventaSeleccionada && this.cryptos[this.ventaSeleccionada]) {
          this.monto = (newCantidad * this.cryptos[this.ventaSeleccionada].bid).toFixed(2);
        }
      },
      ventaSeleccionada() {
        this.actualizarMonto();
      },
    },
    methods: {
      async actualizarMonto() {
        if (this.ventaSeleccionada) {
          const crypto = this.ventaSeleccionada;
          const response = await this.$axios.get(`https://criptoya.com/api/satoshitango/${crypto}/ars`);
          this.cryptos[crypto].bid = response.data.totalBid;
          this.monto = (this.cantidad * this.cryptos[crypto].bid).toFixed(2);
        }
      },
      async realizarVenta() {
    const ahora = new Date();

    if (
      this.ventaSeleccionada &&
      this.cantidad > 0 &&
      this.monto > 0 
    ) {
      const datos = {
        user_id: this.getUserId,
        action: "sale",
        crypto_code: this.ventaSeleccionada.toLowerCase(),
        crypto_amount: this.cantidad,
        money: this.monto.toFixed(2),
        datetime: ahora,
      };
      try {
        await this.$axios.post("transactions", datos);
        this.mensajeUsuario = "Venta registrada correctamente.";
        this.limpiarFormulario();
      } catch (error) {
        console.error("Error al registrar venta:", error);
        this.mensajeUsuario = "Error al registrar la venta.";
      }
    } else {
      this.mensajeUsuario = "Por favor, complete todos los campos correctamente.";
    }
  },
    limpiarFormulario() {
        this.ventaSeleccionada = "";
        this.cantidad = 0;
        this.monto = 0;
        this.fechaHora = "";
        setTimeout(() => {
        this.mensajeUsuario = "";
        }, 3000);
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
  
  select,
  input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
  }
  
  button {
      width: 100%;
      padding: 12px;
      color: white;
      background-color: #034aa6;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      margin-top: 10px;
  }
  
  button:hover {
      background-color: #0274a6;
  }
  
  .container-mensajeUsuario {
      display: flex;
      justify-content: center;
      margin-top: 10px;
  }
  
  .mensajeUsuario {
      color: #5CF2F2;
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      padding: 10px;
      background-color: rgba(3, 74, 166, 0.1);
      border: 1px solid #034aa6;
      border-radius: 4px;
      width: 100%;
      max-width: 400px;
  }

  .readonly-input {
      background-color: #f9f9f9;
      border: 1px solid #ccc;
      color: #666;
      cursor: not-allowed;
  }
</style>