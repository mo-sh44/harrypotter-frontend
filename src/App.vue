<template>
  <div id="app">

    <header class="modern-header">
      <h1 class="magical-title" @click="resetApp" style="cursor: pointer;">
        ✨ Harry Potter World ✨
      </h1>
    </header>


    <div class="top-bar">
      <div class="filters">
        <button @click="selectedCategory = 'all'" :class="{ active: selectedCategory === 'all' }">Alle</button>
        <button @click="selectedCategory = 'students'" :class="{ active: selectedCategory === 'students' }">Studenten</button>
        <button @click="selectedCategory = 'staff'" :class="{ active: selectedCategory === 'staff' }">Mitarbeiter</button>
        <button @click="selectedCategory = 'spells'" :class="{ active: selectedCategory === 'spells' }">Zauber</button>
        <button @click="selectedCategory = 'books'" :class="{ active: selectedCategory === 'books' }">Bücher</button>
        <button @click="selectedCategory = 'movies'" :class="{ active: selectedCategory === 'movies' }">Filme</button>

      </div>

      <div class="search-box">
        <input
            type="text"
            v-model="searchQuery"
            @input="emitSearch"
            placeholder="🔍 z. B. harry potter"
        />
        <button @click="emitSearch">Suchen</button>
        <ul v-if="searchQuery && suggestions.length" class="suggestions">
          <li
              v-for="name in suggestions"
              :key="name"
              @click="selectSuggestion(name)"
          >
            {{ name }}
          </li>
        </ul>
      </div>
    </div>

    <!-- قائمة الشخصيات -->
    <CharacterList
        :category="selectedCategory"
        :search="searchQuery"
        @names-loaded="updateNames"
    />
  </div>
</template>

<script>
import CharacterList from './components/CharacterList.vue'

export default {
  name: 'App',
  components: { CharacterList },
  data() {
    return {
      selectedCategory: 'all',
      searchQuery: '',
      allNames: [],
      suggestions: []
    }
  },
  methods: {
    emitSearch() {
      if (this.allNames.length) {
        const q = this.searchQuery.toLowerCase()
        this.suggestions = this.allNames
            .filter(n => n.toLowerCase().includes(q))
            .slice(0, 5)
      }
    },
    selectSuggestion(name) {
      this.searchQuery = name
      this.suggestions = []
    },
    updateNames(names) {
      this.allNames = names
    },
    resetApp() {
      this.selectedCategory = 'all'
      this.searchQuery = ''
      this.suggestions = []
    }
  }
}
</script>

<style>
body, html {
  margin: 0;
  padding: 0;
  background: #111;
  color: #f0e6d2;
  font-family: 'Georgia', serif;
  overflow-x: hidden;
}

#app {
  text-align: center;
}

.modern-header {
  width: 100vw;
  background: linear-gradient(to right, #1a1a1a, #2a2a2a);
  padding: 50px 0;
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.modern-header::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 50px;
  background: inherit;
  clip-path: polygon(0 0, 100% 100%, 0 100%);
  z-index: -1;
}

.magical-title {
  font-size: 3rem;
  color: #f9e76b;
  font-family: 'Cinzel', serif;
  text-shadow: 0 0 10px #f9e76b, 0 0 20px #ffd700;
  animation: flicker 2s infinite alternate;
}

@keyframes flicker {
  from {
    opacity: 1;
    text-shadow: 0 0 10px #f9e76b, 0 0 20px #ffd700;
  }
  to {
    opacity: 0.85;
    text-shadow: 0 0 20px #fff4a3, 0 0 30px #fff176;
  }
}

.top-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px 0;
}

.filters {
  display: flex;
  gap: 10px;
}
.filters button {
  background: #2e2e2e;
  color: #f0e6d2;
  border: 2px solid transparent;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  font-family: 'Oswald', sans-serif;
}
.filters button.active {
  border: 2px solid #f9e76b;
  background: #444;
}

.search-box {
  display: flex;
  align-items: center;
  position: relative;
}
.search-box input {
  padding: 8px 14px;
  border-radius: 20px;
  background-color: #1f1f1f;
  color: #fff;
  border: none;
  outline: none;
  min-width: 220px;
  font-size: 14px;
  box-shadow: 0 0 0 1px #888;
  margin-right: 8px;
}
.search-box button {
  padding: 8px 14px;
  border-radius: 20px;
  border: none;
  background-color: #f9e76b;
  color: #000;
  cursor: pointer;
  font-weight: bold;
}

.suggestions {
  position: absolute;
  top: 38px;
  right: 0;
  background-color: #1f1f1f;
  color: #fff;
  border: 1px solid #888;
  border-radius: 6px;
  max-height: 150px;
  overflow-y: auto;
  z-index: 1000;
  list-style: none;
  padding: 0;
  margin: 5px 0 0;
  min-width: 220px;
}
.suggestions li {
  padding: 8px 10px;
  cursor: pointer;
}
.suggestions li:hover {
  background-color: #333;
}
</style>
