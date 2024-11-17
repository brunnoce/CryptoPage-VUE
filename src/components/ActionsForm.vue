<template>
    <div>
      <h3>Acciones</h3>
      <!-- agg eliminar y editar -->
      <button @click="editarTransaccion">Editar</button>
      <button @click="eliminarTransaccion">Eliminar</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      movimientoId: {
        type: String,
        required: true,
      },
    },
    methods: {
      editarTransaccion() {
        // editar
      },
      eliminarTransaccion() {
        // eliminar
        console.log(`Eliminando transacción con ID: ${this.movimientoId}`);
      },
    },
  };
  </script>
  