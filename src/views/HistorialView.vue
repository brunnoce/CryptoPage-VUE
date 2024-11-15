<template>
  <div class="historial-contenedor">
    <HistorialTable :movimientos="compras" titulo="Compras" />
    <HistorialTable :movimientos="ventas" titulo="Ventas" />
  </div>
</template>

<script>
  import HistorialTable from '@/components/HistorialTable.vue';

  export default {
    components: {
      HistorialTable,
    },
    data() {
      return {
        compras: [],  
        ventas: [],  
      };
    },
    async created() {
      const response = await this.$axios.get('transactions?q={"user_id": "brunnoce"}');
      const movimientos = response.data;
      this.compras = movimientos.filter(m => m.action === 'purchase');
      this.ventas = movimientos.filter(m => m.action === 'sale');
    },
  };
</script>

<style scoped>
  .historial-contenedor {
    display: flex;
    gap: 30px;
    justify-content: center;
    padding: 20px;
  }
</style>