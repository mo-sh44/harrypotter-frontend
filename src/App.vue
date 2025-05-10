<template>
  <div id="app">
    <header>
      <h1>Harry Potter WebTech</h1>
      <hr />
    </header>

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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 1rem;
}

header h1 {
  text-align: left;
  font-size: 2rem;
  margin: 0;
  padding: 0;
}

hr {
  margin-top: 0.3rem;
  margin-bottom: 1.2rem;
}
</style>

