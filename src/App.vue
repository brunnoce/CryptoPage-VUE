<template>
  <div id="app">
    <NavBar v-if="isUserLoggedIn" /> 
    <router-view /> 
    <PageFooter v-if="isUserLoggedIn" />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import PageFooter from '@/components/PageFooter.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    NavBar,
    PageFooter, 
  },
  computed: {
    ...mapGetters(['isUserLoggedIn']),
  },
};
</script>

<style>
  @import '@/assets/styles.css';
</style>