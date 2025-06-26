<template>
  <div>
    <h2>📚 Bücher aus dem Harry Potter Universum</h2>

    <div v-if="filteredBooks.length === 0">Keine Bücher gefunden ...</div>

    <div class="character-grid">
      <div v-for="book in filteredBooks" :key="book.id" class="character-card fade-in magic-border">
        <img :src="book.image" alt="Buchcover" class="book-image" />
        <h2 class="character-name">{{ book.title }}</h2>
        <p>Autor: {{ book.author }}</p>
        <p>Veröffentlicht: {{ book.releaseDate }}</p>
        <button class="fav-button" @click="saveFavorite(book)">
          Als Favorit speichern
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookList',
  props: {
    searchQuery: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      books: []
    }
  },
  computed: {
    filteredBooks() {
      const query = this.searchQuery.toLowerCase()
      return this.books.filter(book =>
          book.title.toLowerCase().includes(query)
      )
    }
  },
  methods: {
    async fetchBooks() {
      try {
        const res = await fetch('https://api.potterdb.com/v1/books')
        const data = await res.json()
        this.books = data.data.map(b => ({
          id: b.id,
          title: b.attributes.title,
          releaseDate: b.attributes.release_date,
          author: b.attributes.author || 'unbekannt',
          image: b.attributes.cover
        }))
        this.$emit('names-loaded', this.books.map(b => b.title))
      } catch (err) {
        console.error('Fehler beim Laden der Bücher:', err)
      }
    },
    async saveFavorite(book) {
      try {
        const response = await fetch('https://harrypotterwebtech.onrender.com/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: book.title,
            image: book.image,
            house: '📖 Buch'
          })
        })
        if (!response.ok) throw new Error()
        const saved = await response.json()
        alert(`🎉 Buch gespeichert: ${saved.name}`)
      } catch (error) {
        console.error('Fehler beim Speichern:', error)
        alert('❌ Fehler beim Speichern des Buches.')
      }
    }
  },
  mounted() {
    this.fetchBooks()
  }
}
</script>

<style scoped>
.book-image {
  width: 150px;
  height: auto;
  border-radius: 8px;
  border: 2px solid #aaa;
  margin-bottom: 10px;
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
.fade-in {
  animation: fadeIn 0.6s ease forwards;
}
@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
.magic-border {
  box-shadow: 0 0 15px 2px rgba(255, 255, 150, 0.4);
}
</style>
