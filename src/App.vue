<template>
  <div id="app">
    <header>
      <a href="/" class="header-link">
        <img src="/images/hpw.png" alt="Harry Potter World" class="header-image" />
      </a>
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
  background-color: #2c2c2c; /* Set a default background color for the body */
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* Removed max-width to allow header to span full width */
  padding: 0; /* Remove padding from app to allow header to go edge-to-edge */
}

header {
  width: 100%;
  overflow: hidden; /* Hide any overflow from the image */
}

.header-link {
  text-decoration: none;
  color: black;
  display: block; /* Make the link a block element to contain the image */
}

.header-image {
  width: 40%; /* Make image span full width of its container */
  height: auto;
  display: inline-block;
  margin: auto;
  padding: 0;
}

hr {
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  border: none;
  border-top: 1px solid #555; /* A subtle line */
}

/* Styles for CharacterList container, now centered and with padding */
.characters-container {
  padding: 20px;
  text-align: center;
  background-color: #f0f0f0; /* Lighter background for the container */
  max-width: 800px; /* Re-apply max-width to the content area */
  margin: 20px auto; /* Center the content area */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
}

.character-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.character-card {
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.character-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
  border: 2px solid #a0522d;
}

.character-name {
  color: #333;
  margin-bottom: 5px;
}

.character-detail {
  color: #555;
  font-size: 0.9em;
  margin-bottom: 3px;
}
</style>


