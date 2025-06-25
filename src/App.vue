<template>
  <div id="app">
    <!-- 🔁 شريط التنقل المعدل -->
    <header class="nav-header">
      <div class="logo">✨ Harry Potter World</div>
      <nav class="nav-links">
        <a @click="showLanding = true">Startseite</a>
        <a @click="navigate('students')">Studenten</a>
        <a @click="navigate('staff')">Lehrkräfte</a>
        <a @click="navigate('spells')">Zauber</a>
        <a @click="navigate('books')">Bücher</a>
        <a @click="navigate('movies')">Filme</a>
        <a @click="navigate('favorites')">Favoriten</a>
        <a @click="navigate('about')">Über uns</a>

        <div class="search-wrapper">
          <input type="text" v-model="searchQuery" placeholder="🔍 Suchen..." class="nav-search" />
          <ul v-if="filteredSuggestions.length && searchQuery" class="suggestions">
            <li v-for="name in filteredSuggestions" :key="name" @click="handleSuggestionClick(name)">
              {{ name }}
            </li>
          </ul>
        </div>
      </nav>
    </header>

    <!-- 🏠 الصفحة الرئيسية -->
    <LandingPage v-if="showLanding" @enter="showLanding = false" />

    <!-- 📂 باقي الصفحات -->
    <div v-else>
      <CharacterList
          v-if="selectedCategory !== 'favorites' && selectedCategory !== 'about'"
          :category="selectedCategory"
          :search-query="searchQuery"
          @names-loaded="updateNames"
      />
      <FavoriteList v-else-if="selectedCategory === 'favorites'" />
      <UeberUns v-else-if="selectedCategory === 'about'" />
    </div>
  </div>
</template>

<script>
import LandingPage from './components/LandingPage.vue'
import CharacterList from './components/CharacterList.vue'
import FavoriteList from './components/FavoriteList.vue'
import UeberUns from './components/Uber-uns.vue'

export default {
  name: 'App',
  components: {
    LandingPage,
    CharacterList,
    FavoriteList,
    UeberUns
  },
  data() {
    return {
      showLanding: true,
      selectedCategory: 'all',
      searchQuery: '',
      filteredSuggestions: [],
      allNames: []
    }
  },
  watch: {
    searchQuery() {
      this.filterSuggestions()
    }
  },
  methods: {
    updateNames(names) {
      this.allNames = names
    },
    navigate(category) {
      this.selectedCategory = category
      this.showLanding = false
    },
    handleSuggestionClick(name) {
      this.searchQuery = name
      this.filteredSuggestions = []
    },
    filterSuggestions() {
      const query = this.searchQuery.toLowerCase()
      this.filteredSuggestions = this.allNames.filter(name =>
          name.toLowerCase().includes(query)
      )
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
  position: relative;
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

.search-wrapper {
  position: relative;
}

.suggestions {
  position: absolute;
  top: 40px;
  right: 0;
  width: 200px;
  background-color: #1f1f1f;
  color: white;
  border: 1px solid #555;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 2000;
  font-family: 'Georgia', serif;
  box-shadow: 0 4px 8px rgba(0,0,0,0.4);
}

.suggestions li {
  padding: 8px 12px;
  cursor: pointer;
}

.suggestions li:hover {
  background-color: #333;
}
</style>
