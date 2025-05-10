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
body, html {
  margin: 0;
  padding: 0;
  text-align: left;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 1.5rem 2rem;
  max-width: 800px;
}

header h1 {
  font-size: 2rem;
  margin: 0;
  padding: 0;
}

hr {
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
}
</style>

