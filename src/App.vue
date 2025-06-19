<template>
  <div id="app">
    <!-- 🔁 شريط التنقل المعدل -->
    <header class="nav-header">
      <div class="logo">✨ Harry Potter World</div>
      <nav class="nav-links">
        <a @click="showLanding = true">Startseite</a>
        <a @click="navigate('students')">Studenten</a>
        <a @click="navigate('staff')">Mitarbeiter</a>
        <a @click="navigate('spells')">Zauber</a>
        <a @click="navigate('books')">Bücher</a>
        <a @click="navigate('movies')">Filme</a>
        <a href="#">Über uns</a>
        <a href="#">Anleitung</a>
        <a href="#">Kontakt</a>
        <input type="text" placeholder="🔍 Suchen..." class="nav-search" />
      </nav>
    </header>

    <!-- باقي الكود كما هو -->
    <LandingPage v-if="showLanding" @enter="showLanding = false" />

    <div v-else>
      <CharacterList
          :category="selectedCategory"
          :search-query="searchQuery"
          @names-loaded="updateNames"
      />
    </div>
  </div>
</template>


<script>
import LandingPage from './components/LandingPage.vue'
import CharacterList from './components/CharacterList.vue'

export default {
  name: 'App',
  components: { LandingPage, CharacterList },
  data() {
    return {
      showLanding: true,
      selectedCategory: 'all',
      searchQuery: '',
      allNames: []
    }
  },
  methods: {
    updateNames(names) {
      this.allNames = names
    },
    navigate(category) {
      this.selectedCategory = category
      this.showLanding = false
    }
  }
}
</script>

<style>
body, html {
  margin: 0;
  padding: 0;
  font-family: 'Georgia', serif;
  background: #111;
  color: #f0e6d2;
}

#app {
  text-align: center;
}

.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1a1a1a;
  padding: 15px 30px;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo {
  font-size: 24px;
  color: #f9e76b;
  font-weight: bold;
  text-shadow: 0 0 10px #ffd700;
}

.nav-links {
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;
}

.nav-links a {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
}

.nav-links a:hover {
  color: #f9e76b;
}

.nav-search {
  padding: 6px 12px;
  border-radius: 20px;
  border: 1px solid #555;
  background-color: #1f1f1f;
  color: white;
  outline: none;
}
</style>
