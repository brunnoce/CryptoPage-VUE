<template>
  <div class="comprar-view">
    <PurchaseForm />
    <CryptoTable />
    <div class="logo-container">
      <img src="@/assets/images/logo.png" alt="Logo" class="logo" />
    </div>
  </div>
</template>

<script>
import PurchaseForm from "@/components/PurchaseForm.vue";
import CryptoTable from "@/components/CryptoTable.vue";

export default {
  components: {
    PurchaseForm,
    CryptoTable
  },
  methods: {
  getCryptoPrice(cryptoCode) {
    return this.$root.$data.cryptos[cryptoCode]?.ask || "N/A";
  },
}
};
</script>

<style scoped>
  .logo-container {
    margin-top: 20px;
    text-align: center;
  }

  .logo {
    width: 139px; 
  }
</style>