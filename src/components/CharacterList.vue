<template>
  <div class="characters-container">
    <p class="category-description">{{ categoryDescriptions[props.category] }}</p>


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


    <div v-if="filteredCharacters.length" class="character-grid">
      <div
          v-for="item in filteredCharacters"
          :key="item.id || item.name"
          class="character-card fade-in magic-border"
          @click="openModal(item)"
      >
        <img
            :src="getCharacterImage(item)"
            :alt="item.name"
            class="character-image"
        />
        <h2 class="character-name">{{ item.name }}</h2>
        <button class="fav-button" @click.stop="saveFavorite(item)">Als Favorit speichern</button>
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

// 🔁 statisch geladen für beide Ordner
const studentImages = import.meta.glob('/public/images/stu/*', { eager: true })
const staffImages = import.meta.glob('/public/images/profs/*', { eager: true })

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

const userId = localStorage.getItem('userId') || crypto.randomUUID()
localStorage.setItem('userId', userId)

const categoryDescriptions = {
  all: '🧙 Alle bekannten Charaktere aus der Welt von Harry Potter.',
  students: '🎓 Nur Hogwarts-Schüler mit Zauberstäben, Häusern und mehr.',
  staff: '🧑‍🏫 Lehrkräfte und Mitarbeiter von Hogwarts.',
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
    return list.filter(item => item.name?.toLowerCase().includes(q))
  }
  return list
})

// ✅ Lokales Bild suchen, sonst API-Bild oder Platzhalter
const getCharacterImage = (character) => {
  const cleanName = character.name
      .replace(/\s/g, '-')
      .replace(/\./g, '')
      .replace(/[^a-zA-Z0-9\-]/g, '')

  const extensions = ['webp', 'jpg', 'jpeg', 'png']
  const images = props.category === 'students' ? studentImages
      : props.category === 'staff' ? staffImages
          : {}

  for (const ext of extensions) {
    const fileName = `${cleanName}.${ext}`.toLowerCase()
    const match = Object.keys(images).find(path => path.toLowerCase().includes(fileName))
    if (match) return match.replace('/public', '')
  }

  return character.image || '/images/placeholder.png'
}

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
        image: getCharacterImage(character),
        house: character.house || null,
        userId: userId
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
</style>
