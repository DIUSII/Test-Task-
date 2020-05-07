<template>
  <div id="app">
      <main-form></main-form>
  </div>
</template>

<script>
import mainForm from './components/mainForm'
import store from './store/store'
export default {
  name: 'App',
  store,
  components: {
    'main-form': mainForm,
  }
}
</script>

<style>

</style>
