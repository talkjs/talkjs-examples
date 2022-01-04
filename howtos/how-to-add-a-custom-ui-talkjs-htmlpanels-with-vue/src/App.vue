<template>
  <div id="app">
    <HtmlPanel/>
  </div>
</template>

<script>
import HtmlPanel from './components/HtmlPanel.vue'

export default {
  name: 'App',
  components: {
    HtmlPanel
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
