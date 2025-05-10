<template>
  <div id="app">
    <h1>Harry Potter WebTech</h1>
    <CharacterList />
  </div>
</template>

<script>
import CharacterList from './components/CharacterList.vue'

export default {
  name: 'App',
  components: {
    CharacterList
  }
}
</script>


<style>
/* Optional: kleines Styling */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 1rem;
}
</style>
