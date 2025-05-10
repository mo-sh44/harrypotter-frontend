<template>
  <div>
    <h2>Harry Potter Characters</h2>
    <ul>
      <li v-for="char in characters" :key="char.name">
        {{ char.name }} - {{ char.house || 'No House' }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CharacterList",
  data() {
    return {
      characters: [],
    };
  },
  mounted() {
    fetch("https://spring-boot-harrypotterwebtec-7e3cd5d6a9e7.herokuapp.com/api/external/characters")
        .then((res) => res.json())
        .then((data) => {
          this.characters = data;
        })
        .catch((err) => {
          console.error("Fehler beim Laden:", err);
        });
  },
};
</script>
