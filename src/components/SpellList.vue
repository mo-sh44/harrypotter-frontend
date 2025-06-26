<template>
  <div class="spells-container">
    <h2>✨ Liste der wichtigsten Zaubersprüche im Universum.</h2>
    <div v-if="filteredSpells.length === 0">Keine Zauber gefunden ...</div>
    <div class="spell-grid">
      <div v-for="spell in filteredSpells" :key="spell.name" class="spell-card fade-in magic-border">
        <h3>{{ spell.name }}</h3>
        <p><strong>Effekt:</strong> {{ spell.description }}</p>
        <button class="fav-button" @click="saveFavorite(spell)">Als Favorit speichern</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpellList',
  props: ['searchQuery'],
  data() {
    return {
      spells: [],
      userId: null
    }
  },
  computed: {
    filteredSpells() {
      if (!this.searchQuery) return this.spells
      const q = this.searchQuery.toLowerCase()
      return this.spells.filter(spell =>
          spell.name.toLowerCase().includes(q) ||
          spell.description.toLowerCase().includes(q)
      )
    }
  },
  async mounted() {
    this.userId = localStorage.getItem('userId') || crypto.randomUUID()
    localStorage.setItem('userId', this.userId)

    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://harrypotterwebtech.onrender.com'
    try {
      const res = await fetch(`${baseUrl}/api/external/spells`)
      if (!res.ok) throw new Error(`Fehler beim Abruf: ${res.status}`)
      const data = await res.json()
      this.spells = data
      this.$emit('names-loaded', data.map(s => s.name))
    } catch (err) {
      console.error('❌ Fehler beim Laden der Zauber:', err)
      this.spells = []
    }
  },
  methods: {
    async saveFavorite(spell) {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://harrypotterwebtech.onrender.com'
      try {
        const response = await fetch(`${baseUrl}/api/favorites`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: spell.name,
            image: null,
            house: '✨ Zauber',
            userId: this.userId
          })
        })

        if (!response.ok) throw new Error(`Fehler beim Speichern: ${response.status}`)
        const saved = await response.json()
        alert(`✨ Zauber gespeichert: ${saved.name}`)
      } catch (err) {
        console.error('❌ Fehler beim Speichern des Zaubers:', err)
        alert('❌ Fehler beim Speichern.')
      }
    }
  }
}
</script>

<style scoped>
.spells-container {
  padding: 20px;
  text-align: center;
}

h2 {
  color: #42e0f2;
  font-size: 28px;
  font-family: 'Oswald', sans-serif;
  margin-bottom: 20px;
}

.spell-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  padding: 20px;
}

.spell-card {
  background-color: #2c2c2c;
  border-radius: 12px;
  padding: 20px;
  color: #f0e6d2;
  text-align: center;
  border: 2px solid #f9e76b;
  box-shadow: 0 0 10px rgba(255, 255, 180, 0.3);
  transition: transform 0.3s ease;
}

.spell-card:hover {
  transform: scale(1.03);
}

.fav-button {
  margin-top: 12px;
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
  animation: fadeIn 0.7s ease forwards;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.magic-border {
  box-shadow: 0 0 15px 2px rgba(255, 255, 150, 0.4);
}
.magic-border:hover {
  box-shadow: 0 0 25px 4px rgba(255, 255, 180, 0.8);
}
</style>
