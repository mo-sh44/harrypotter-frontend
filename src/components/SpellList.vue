<template>
  <div class="spells-container">
    <h2>✨ Liste der wichtigsten Zaubersprüche im Universum.</h2>
    <div v-if="filteredSpells.length === 0">Keine Zauber gefunden ...</div>
    <div class="spell-grid">
      <div v-for="spell in filteredSpells" :key="spell.name" class="spell-card fade-in magic-border">
        <h3>{{ spell.name }}</h3>
        <p><strong>Effekt:</strong> {{ spell.description }}</p>
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
      spells: []
    }
  },
  computed: {
    filteredSpells() {
      if (!this.searchQuery) return this.spells
      const q = this.searchQuery.toLowerCase()
      return this.spells.filter(spell =>
          spell.name.toLowerCase().includes(q) || spell.description.toLowerCase().includes(q)
      )
    }
  },
  mounted() {
    fetch('http://localhost:8080/api/external/spells')
        .then(res => {
          if (!res.ok) throw new Error(`Fehler beim Abruf: ${res.status}`)
          return res.json()
        })
        .then(data => {
          this.spells = data
          this.$emit('names-loaded', data.map(s => s.name))
        })
        .catch(err => {
          console.error('❌ Fehler beim Laden der Zauber:', err)
          this.spells = []
        })
  }
}
</script>

<style scoped>
.spells-container {
  padding: 20px;
  text-align: center;
}

.spell-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

.spell-card {
  background-color: #2c2c2c;
  border-radius: 10px;
  padding: 20px;
  color: #f0e6d2;
  text-align: left;
  box-shadow: 0 0 10px rgba(255, 255, 180, 0.3);
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
  border: 2px solid #f9e76b;
  transition: 0.3s ease;
}
.magic-border:hover {
  box-shadow: 0 0 15px rgba(255, 255, 150, 0.8);
}
</style>
