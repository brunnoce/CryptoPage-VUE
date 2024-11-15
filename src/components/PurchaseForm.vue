<template>
  <div class="purchase-form-container">
    <div class="purchase-form">
      <h2>Compra de criptomonedas</h2>
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
          <input type="number" v-model="monto" placeholder="Ingrese monto" />
        </div>
        <div class="form-group">
          <label for="fecha">Fecha y Hora:</label>
          <input type="datetime-local" v-model="fechaHora" />
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

export default {
  data() {
    return {
      cryptos: {
        btc: { name: "Bitcoin" },
        eth: { name: "Ethereum" },
        dai: { name: "DAI" },
        usdt: { name: "USDT" },
        doge: { name: "Dogecoin" },
        ada: { name: "Cardano" },
        sol: { name: "Solana" },
        dot: { name: "Polkadot" },
        ltc: { name: "Litecoin" },
      },
      compraSeleccionada: "",
      cantidad: 0,
      monto: 0,
      fechaHora: "",
      mensajeUsuario: "", 
    };
  },
  computed: {
    ...mapGetters(["getUserId"]),
  },
  methods: {
  async realizarCompra() {
    const ahora = new Date();
    const fechaSeleccionada = new Date(this.fechaHora);

    if (
      this.compraSeleccionada &&
      this.cantidad > 0 &&
      this.monto > 0 &&
      fechaSeleccionada <= ahora
    ) {
      const datos = {
        user_id: this.getUserId,
        action: "purchase",
        crypto_code: this.compraSeleccionada.toLowerCase(),
        crypto_amount: this.cantidad.toString(),
        money: this.monto.toFixed(2),
        datetime: this.fechaHora,
      };
      try {
        await this.$axios.post("transactions", datos);
        console.log("Compra registrada correctamente");
        this.mensajeUsuario = "Compra registrada correctamente.";
      } catch (error) {
        console.error("Error al registrar compra:", error);
        this.mensajeUsuario = "Error al registrar la compra.";
      }
    } else {
      this.mensajeUsuario = "Por favor, complete todos los campos correctamente o ingrese una fecha y hora válida.";
    }
  },
}

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
  background-color: #034aa6;
  color: white;
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
  color: #034aa6;
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
</style>