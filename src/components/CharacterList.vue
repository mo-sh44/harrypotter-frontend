هيك صح
<template>
  <div class="characters-container">
    <p class="category-description">{{ categoryDescriptions[props.category] }}</p>

    <!-- 🏠 فلاتر المنازل -->
    <div v-if="props.category === 'students'" class="house-filter">
      <button
          v-for="house in availableHouses"
          :key="house"
          @click="selectedHouse = house"
          :class="{ active: selectedHouse === house }"
      >
        <template v-if="house === 'all'">🏰 Alle Häuser ({{ characters.length }})</template>
        <template v-else>{{ houseEmojis[house] }} {{ house }} ({{ houseCounts[house] || 0 }})</template>
      </button>
    </div>

    <!-- 📚 Bücher -->
    <div v-if="props.category === 'books'" class="character-grid">
      <div v-for="book in filteredCharacters" :key="book.id" class="character-card fade-in magic-border">
        <img :src="book.attributes.cover" class="character-image" />
        <h2 class="character-name">{{ book.attributes.title }}</h2>
        <p>Autor: {{ book.attributes.author }}</p>
        <p>Veröffentlicht: {{ book.attributes.release_date }}</p>
      </div>
    </div>

    <!-- 🎬 Filme -->
    <div v-else-if="props.category === 'movies'" class="character-grid">
      <div v-for="movie in filteredCharacters" :key="movie.id" class="character-card fade-in magic-border">
        <img :src="movie.attributes.poster" class="character-image" />
        <h2 class="character-name">{{ movie.attributes.title }}</h2>
        <p>Regisseur: {{ movie.attributes.director || 'unbekannt' }}</p>
        <p>Veröffentlicht: {{ movie.attributes.release_date }}</p>
      </div>
    </div>

    <!-- 👤 Charaktere -->
    <div v-else-if="filteredCharacters.length" class="character-grid">
      <div
          v-for="item in filteredCharacters"
          :key="item.id || item.name"
          class="character-card fade-in magic-border"
          @click="openModal(item)"
      >
        <img
            v-if="item.image && props.category !== 'spells'"
            :src="item.image"
            :alt="item.name"
            class="character-image"
        />
        <img
            v-else-if="props.category !== 'spells'"
            src="/images/placeholder.png"
            alt="Kein Bild"
            class="character-image"
        />
        <h2 class="character-name">{{ item.name }}</h2>

        <!-- ✅ زر الحفظ -->
        <button class="fav-button" @click.stop="saveFavorite(item)">
          Als Favorit speichern
        </button>
      </div>
    </div>

    <p v-else>Keine Charaktere gefunden ...</p>

    <!-- 🔮 Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h2>{{ selectedCharacter.name }}</h2>
        <img v-if="selectedCharacter.image" :src="selectedCharacter.image" class="modal-image" />
        <p v-if="selectedCharacter.house">Haus: {{ selectedCharacter.house }}</p>
        <p v-if="selectedCharacter.actor">Schauspieler: {{ selectedCharacter.actor }}</p>
        <p v-if="selectedCharacter.wand?.wood">
          Zauberstab: {{ selectedCharacter.wand.wood }} / {{ selectedCharacter.wand.core }}
        </p>
        <button class="close-button" @click="closeModal">Schließen</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'

const props = defineProps({
  category: {
    type: String,
    default: 'all'
  },
  searchQuery: String
})

const characters = ref([])
const selectedHouse = ref('all')
const availableHouses = ref([])
const selectedCharacter = ref(null)
const showModal = ref(false)

const categoryDescriptions = {
  all: '🧙 Alle bekannten Charaktere aus der Welt von Harry Potter.',
  students: '🎓 Nur Hogwarts-Schüler mit Zauberstäben, Häusern und mehr.',
  staff: '🧑‍🏫 Lehrkräfte und Mitarbeiter von Hogwarts.',
  spells: '✨ Liste der wichtigsten Zaubersprüche im Universum.',
  books: '📚 Alle offiziellen Bücher im Harry-Potter-Universum.',
  movies: '🎬 Filme aus der Harry-Potter- und Fantastic-Beasts-Reihe.'
}

const houseEmojis = {
  Gryffindor: '🦁',
  Slytherin: '🐍',
  Ravenclaw: '🦅',
  Hufflepuff: '🦡'
}

const houseCounts = computed(() => {
  const counts = {}
  characters.value.forEach(c => {
    if (c.house) {
      counts[c.house] = (counts[c.house] || 0) + 1
    }
  })
  return counts
})

const updateHouses = (data) => {
  const houses = new Set(data.map(c => c.house).filter(Boolean))
  availableHouses.value = ['all', ...houses]
}

const fetchCharacters = async () => {
  try {
    let url = 'https://hp-api.onrender.com/api/characters'

    if (props.category === 'students') {
      url = 'https://hp-api.onrender.com/api/characters/students'
    } else if (props.category === 'staff') {
      url = 'https://hp-api.onrender.com/api/characters/staff'
    } else if (props.category === 'spells') {
      url = 'http://localhost:8080/api/external/spells'
    } else if (props.category === 'books') {
      url = 'https://api.potterdb.com/v1/books'
    } else if (props.category === 'movies') {
      url = 'https://api.potterdb.com/v1/movies'
    }

    const res = await fetch(url)
    const data = await res.json()
    characters.value = data.data || data

    if (props.category === 'students') updateHouses(data)
    else availableHouses.value = []

    selectedHouse.value = 'all'
  } catch (error) {
    console.error('Fehler beim Laden der Daten:', error)
    characters.value = []
  }
}

const filteredCharacters = computed(() => {
  let list = characters.value

  if (props.category === 'students' && selectedHouse.value !== 'all') {
    list = list.filter(c => c.house === selectedHouse.value)
  }

  if (props.searchQuery) {
    const q = props.searchQuery.toLowerCase()
    return list.filter(item =>
        (item.name || item.attributes?.title)?.toLowerCase().includes(q)
    )
  }

  return list
})

const openModal = (character) => {
  selectedCharacter.value = character
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedCharacter.value = null
}

const saveFavorite = async (character) => {
  try {
    const response = await fetch('https://harrypotterwebtech.onrender.com/api/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: character.name,
        image: character.image || null,
        house: character.house || null
      })
    })

    if (!response.ok) throw new Error(`Fehler beim Speichern! Status: ${response.status}`)

    const savedCharacter = await response.json()
    alert(`🎉 Charakter gespeichert: ${savedCharacter.name}`)
  } catch (error) {
    console.error('❌ Fehler beim POST:', error)
    alert('❌ Fehler beim Speichern des Charakters.')
  }
}

onMounted(fetchCharacters)
watch(() => props.category, fetchCharacters)


</script>

<style scoped>
.characters-container {
  padding: 20px;
  text-align: center;
}

.category-description {
  font-size: 20px;
  color: #ccc;
  margin: 0 auto 30px;
  max-width: 800px;
  font-family: 'Crimson Text', serif;
}

.house-filter {
  margin: 20px 0;
}
.house-filter button {
  margin: 4px;
  padding: 6px 12px;
  border-radius: 20px;
  background-color: #2e2e2e;
  color: #eee;
  border: 2px solid transparent;
  font-family: "Oswald", sans-serif;
  cursor: pointer;
}
.house-filter .active {
  background-color: #444;
  border-color: #f9e76b;
}

.character-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 0 20px;
}

.character-card {
  background-color: #2c2c2c;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}
.character-card:hover {
  transform: scale(1.05);
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
  font-size: 20px;
  font-weight: bold;
  font-family: "Oswald", sans-serif;
}

.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.modal {
  background: #1a1a1a;
  padding: 30px;
  border-radius: 10px;
  color: white;
  max-width: 400px;
  text-align: center;
}
.modal-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin: 10px auto;
}
.close-button {
  margin-top: 15px;
  padding: 10px 20px;
  background: #f9e76b;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

/* ✅ زر الحفظ */
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
