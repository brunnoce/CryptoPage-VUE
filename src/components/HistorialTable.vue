<template>
    <div class="historial-table">
      <h3>{{ titulo }}</h3>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Criptomoneda</th>
            <th>Cantidad</th>
            <th>Monto (ARS)</th>
            <th></th> 
          </tr>
        </thead>
        <tbody>
          <tr v-for="movimiento in movimientos" :key="movimiento._id">
            <td>{{ formatFecha(movimiento.datetime) }}</td>
            <td>{{ movimiento.crypto_code.toUpperCase() }}</td>
            <td>{{ movimiento.crypto_amount }}</td>
            <td>{{ movimiento.money }}</td>
            <td>
              <button class="detalles-btn">Detalles</button>
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
    methods: {
      formatFecha(fecha) {
        return new Date(fecha).toLocaleString();
      },
    },
  };
</script>
  
<style scoped>
  .historial-table {
    background-color: rgba(3, 74, 166, 0.1);
    padding: 15px;
    border-radius: 8px;
    width: 100%;
    max-width: 800px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    text-align: left;
    padding: 10px;
    border: 1px solid #ddd;
  }
  
  button {
    background-color: #034aa6;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #0274a6;
  }
  
  .detalles-btn {
    margin-top: 5px;
    padding: 8px 16px;
    font-size: 0.9rem;
  }
</style>  