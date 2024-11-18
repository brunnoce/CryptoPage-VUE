<template>
  <div class="details-view">
    <h2>Detalles de la Transacción</h2>

    <div v-if="transaccion" class="actions-form">
      <label for="id">ID de Transacción:</label>
      <input type="text" :value="transaccion._id" readonly/>

      <label for="cryptoAmount">Monto de Crypto Comprado:</label>
      <input type="number" v-model="formData.cryptoAmount" class="input-field"/>

      <label for="money">Monto Gastado (ARS):</label>
      <input type="number" v-model="formData.money" class="input-field"/>

      <label for="type">Tipo de Transacción:</label>
      <input type="text" class="input-field" :value="transaccion.action === 'purchase' ? 'Compra' : 'Venta'" readonly />

      <label for="date">Fecha de la Transacción:</label>
      <input type="text" :value="formattedDate" readonly class="input-field"/>

      <div class="buttons">
        <button @click="guardarCambios" class="btn-save">Guardar</button>
        <button @click="eliminarTransaccion" class="btn-delete">Eliminar</button>
        <button @click="volver">Volver</button>
      </div>
    </div>

    <div v-else>
      <p>Cargando detalles de la transacción...</p>
    </div>

    <div class="container-mensajeUsuario" v-if="mensajeUsuario">
        <p class="mensajeUsuario">{{ mensajeUsuario }}</p>
    </div>
  </div>
</template>

<script>
import apiClient from '@/axiosConfig';

export default {
  name: 'DetailsView',
  data() {
    return {
      transaccion: null,
      formData: {
        cryptoAmount: '',
        money: '',
      },
      formattedDate: '',
      mensajeUsuario: ''
    };
  },
  async created() {
    await this.cargarTransaccion();
  },
  methods: {
    async cargarTransaccion() {
      const id = this.$route.params.id;
      try {
        const response = await apiClient.get(`transactions/${id}`);
        this.transaccion = response.data;
        this.formData.money = this.transaccion.money;
        this.formData.cryptoAmount = this.transaccion.crypto_amount;
        this.formattedDate = new Date(this.transaccion.datetime).toLocaleString();
        this.mensajeUsuario = '';
      } catch (error) {
        console.error('Error al cargar la transacción:', error);
        this.mensajeUsuario = 'No se pudo cargar la transacción. Por favor, intente nuevamente.';
      }
    },
    async guardarCambios() {
      const id = this.transaccion._id;
      const cantidadAnterior = this.transaccion.crypto_amount; 
      const cantidadNueva = this.formData.cryptoAmount; 

      try {
        await apiClient.patch(`transactions/${id}`, {
          money: this.formData.money,
          crypto_amount: cantidadNueva,
        });

        this.$store.dispatch('saldoEdicion', {
          cryptoCode: this.transaccion.crypto_code,
          cantidadAnterior,
          cantidadNueva,
          tipoTransaccion: this.transaccion.action,
        });

        this.mensajeUsuario = 'La transacción se actualizó correctamente';
        this.$router.push('/historial');
      } catch (error) {
        console.error('Error al actualizar la transacción:', error);
        this.mensajeUsuario = 'Error al actualizar la transacción. Por favor, intente nuevamente.';
      }
    },
    async eliminarTransaccion() {
      if (!confirm('¿Está seguro de que desea eliminar esta transacción?')) {
        return;
      }

      const id = this.transaccion._id;
      try {
        await apiClient.delete(`transactions/${id}`);

        this.$store.dispatch('saldoEliminacion', {
          cryptoCode: this.transaccion.crypto_code,
          cantidad: this.transaccion.crypto_amount,
          tipoTransaccion: this.transaccion.action,
        });

        this.mensajeUsuario = 'La transacción fue eliminada correctamente';
        setTimeout(() => {
          this.$router.push('/historial');
        }, 1500);
      } catch (error) {
        console.error('Error al eliminar la transacción:', error);
        this.mensajeUsuario = 'Error al eliminar la transacción.';
      }
    },
    async volver() {
      this.$router.push('/historial');
    }
  },
};
</script>

<style scoped>
.details-view {
  padding: 20px;
  background-color: rgba(3, 74, 166, 0.1);
}

.actions-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input-field {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  margin-bottom: 10px;
  font-size: 14px;
}

.input-field:focus {
  outline-color: #5e9ce0;
  border-color: #5e9ce0;
}

.buttons {
  display: flex;
  gap: 10px;
}

.btn-save {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-save:hover {
  background-color: #45a049;
}

.btn-delete {
  background-color: red;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-delete:hover {
  background-color: darkred;
}

.btn-volver {
  background-color: #034AA6;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-volver:hover {
  background-color: #5e9ce0;
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