<template>
  <div class="vender-view">
    <SellForm />
    <CryptoTable />
    <div class="logo-container">
      <img src="@/assets/images/logo.png" alt="Logo" class="logo" />
    </div>
  </div>
</template>

<script>
import SellForm from "@/components/SellForm.vue";
import CryptoTable from "@/components/CryptoTable.vue";

export default {
  components: {
    SellForm,
    CryptoTable
  },
};
</script>
<style scoped>
.logo-container {
  margin-top: 10px;
  text-align: center;
}

.logo {
  width: 139px; 
}
</style>
