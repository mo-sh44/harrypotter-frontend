<template>
  <div class="movie-container">
    <h2>🎬 Alle Harry Potter Filme</h2>
    <p v-if="movies.length === 0">Keine Filme gefunden ...</p>

    <div class="character-grid">
      <div
          v-for="movie in filteredMovies"
          :key="movie.id"
          class="character-card fade-in magic-border"
      >
        <img :src="movie.attributes.poster" class="character-image" />
        <h2 class="character-name">{{ movie.attributes.title }}</h2>
        <p>Regisseur: {{ movie.attributes.director || 'unbekannt' }}</p>
        <p>Veröffentlicht: {{ movie.attributes.release_date }}</p>

        <!-- ✅ زر الحفظ -->
        <button class="fav-button" @click="saveFavorite(movie)">
          Als Favorit speichern
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieList',
  data() {
    return {
      movies: []
    }
  },
  computed: {
    filteredMovies() {
      const q = this.$root.searchQuery?.toLowerCase() || ''
      return this.movies.filter(m =>
          m.attributes.title.toLowerCase().includes(q)
      )
    }
  },
  mounted() {
    fetch('https://api.potterdb.com/v1/movies')
        .then(res => res.json())
        .then(data => {
          this.movies = data.data
          this.$emit('names-loaded', this.movies.map(m => m.attributes.title))
        })
        .catch(err => console.error('Fehler beim Laden der Filme:', err))
  },
  methods: {
    async saveFavorite(movie) {
      try {
        const response = await fetch('https://harrypotterwebtech.onrender.com/api/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: movie.attributes.title,
            image: movie.attributes.poster,
            house: '🎬 Film'
          })
        })

        if (!response.ok) throw new Error(`Fehler beim Speichern! Status: ${response.status}`)
        const saved = await response.json()
        alert(`🎉 Film gespeichert: ${saved.name}`)
      } catch (error) {
        console.error('❌ Fehler beim Speichern:', error)
        alert('❌ Fehler beim Speichern des Films.')
      }
    }
  }
}
</script>

<style scoped>
.movie-container {
  text-align: center;
  padding: 20px;
}

.character-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  padding: 20px;
}

.character-card {
  background-color: #1f1f1f;
  padding: 12px;
  border-radius: 10px;
  color: #f0e6d2;
  text-align: center;
}

.character-image {
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 10px;
  border: none;
}

.fade-in {
  animation: fadeIn 0.7s ease forwards;
}
@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(30px) scale(0.95); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

.magic-border {
  box-shadow: 0 0 15px 2px rgba(255, 255, 150, 0.4);
  transition: box-shadow 0.3s ease-in-out;
}
.magic-border:hover {
  box-shadow: 0 0 25px 4px rgba(255, 255, 180, 0.8);
}

.character-name {
  color: #f9e76b;
  font-size: 18px;
  font-weight: bold;
  font-family: "Oswald", sans-serif;
}


.fav-button {
  margin-top: 10px;
  background-color: #f9e76b;
  color: #111;
  border: none;
  padding: 8px 14px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  font-family: 'Oswald', sans-serif;
  transition: background-color 0.3s ease;
}
.fav-button:hover {
  background-color: #fff176;
}
</style>
