<template>
  <div class="characters-container">
    <p class="category-description">💛 Deine Lieblingscharaktere</p>

    <div v-if="favorites.length" class="character-grid">
      <div
          v-for="item in favorites"
          :key="item.id"
          class="character-card fade-in magic-border"
      >
        <img
            v-if="item.image"
            :src="item.image"
            :alt="item.name"
            class="character-image"
        />
        <img
            v-else
            src="/images/placeholder.png"
            alt="Kein Bild"
            class="character-image"
        />
        <h2 class="character-name">{{ item.name }}</h2>
        <p v-if="item.house">🏰 Haus: {{ item.house }}</p>

        <button class="fav-button delete" @click="deleteFavorite(item.id)">
          ❌ Entfernen
        </button>
      </div>
    </div>

    <p v-else>Keine Favoriten gefunden ...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const favorites = ref([])

const fetchFavorites = async () => {
  try {
    const res = await fetch('https://harrypotterwebtech.onrender.com/api/favorites')
    const data = await res.json()
    favorites.value = data
  } catch (err) {
    console.error('Fehler beim Laden der Favoriten:', err)
  }
}

const deleteFavorite = async (id) => {
  try {
    const res = await fetch(`https://harrypotterwebtech.onrender.com/api/favorites/${id}`, {
      method: 'DELETE'
    })

    if (!res.ok) throw new Error('Löschen fehlgeschlagen')

    favorites.value = favorites.value.filter(f => f.id !== id)
    alert('❌ Favorit entfernt.')
  } catch (err) {
    console.error('Fehler beim Löschen:', err)
    alert('Fehler beim Entfernen des Favoriten.')
  }
}

onMounted(fetchFavorites)
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

.character-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
  max-width: 220px;          /* ⬅️ جديد */
  margin: auto;              /* ⬅️ جديد */
}

.character-image {
  width: 100%;
  height: 280px;
  object-fit: cover;
  object-position: center;
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
.fav-button.delete {
  background-color: #ff4d4d;
  color: white;
}
.fav-button.delete:hover {
  background-color: #e60000;
}
</style>
