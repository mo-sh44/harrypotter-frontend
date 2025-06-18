<script setup>
import { ref, onMounted } from 'vue';

const characters = ref([]);

onMounted(async () => {
  try {

    const response = await fetch("http://localhost:8080/api/external/characters"  );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    characters.value = data;
  } catch (error) {
    console.error('Error fetching characters:', error);
  }
});
</script>

<template>
  <div class="characters-container">
    <h1>Harry Potter Characters</h1>
    <div v-if="characters.length" class="character-grid">
      <div v-for="character in characters" :key="character.id" class="character-card">
        <!-- هذا هو المكان الذي يجب أن تضيف فيه منطق الصورة البديلة -->
        <img
            v-if="character.image"
            :src="character.image"
            :alt="character.name"
            class="character-image"
        />
        <img
            v-else
            src="/images/placeholder.png"
            alt="No image available"
            class="character-image"
        />
        <!-- نهاية منطق الصورة البديلة -->

        <h2 class="character-name">{{ character.name }}</h2>
        <p v-if="character.house" class="character-detail">House: {{ character.house }}</p>
        <p v-if="character.wand && character.wand.wood" class="character-detail">Wand Wood: {{ character.wand.wood }}</p>
        <p v-if="character.wand && character.wand.core" class="character-detail">Wand Core: {{ character.wand.core }}</p>
        <!-- يمكنك إضافة المزيد من التفاصيل هنا حسب الحاجة -->
      </div>
    </div>
    <p v-else>Loading characters or no characters found...</p>
  </div>
</template>

<style scoped>
.characters-container {
  padding: 20px;
  text-align: center;
}

.character-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.character-card {
  background-color: #2c2c2c;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.character-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
  border: 2px solid #f0e68c;
}

.character-name {
  color: #f0e68c;
  margin-bottom: 5px;
}

.character-detail {
  color: #ccc;
  font-size: 0.9em;
  margin-bottom: 3px;
}
</style>

