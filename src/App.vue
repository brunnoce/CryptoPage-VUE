<template>
  <div id="app">
    <NavBar />
    <router-view />
    <PageFooter />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import PageFooter from './components/PageFooter.vue';
</script>

<style>
@import '@/assets/styles.css';
</style>
