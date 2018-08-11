<template>
  <div id="app">
    <Manu Title="Gestión de dinero - AHORROS Y DEUDAS"/>
    <Body/>
  </div>
</template>

<script>
import Manu from './components/menu.vue'
import Body from './components/body.vue'

export default {
  name: 'app',
  components: {
    Body,
    Manu
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
