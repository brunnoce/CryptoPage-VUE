<template>
    <div>
      <h2>Detalles de la Transacción</h2>
      <ActionsForm :movimientoId="id" />
    </div>
  </template>
  
  <script>
  import ActionsForm from '@/components/ActionsForm.vue';
  
  export default {
    components: {
      ActionsForm,
    },
    props: {
      id: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  