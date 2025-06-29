<template>
  <div class="ueber-uns-container">
    <div class="background-image">
      <div class="overlay">
        <h1 class="title">Über uns</h1>
        <p class="subtitle">
          Willkommen in der magischen Welt von Harry Potter!<br />
          Dieses Projekt ist eine Hommage an die Bücher, Filme und Charaktere, die Generationen verzaubert haben.<br />
          Entwickelt von Fans – für Fans ✨
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.ueber-uns-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.background-image {
  background-image: url('/images/hp-main7.jpg');
  background-size: cover;
  background-position: center;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 50px;
  border-radius: 12px;
  text-align: center;
  color: #f0e6d2;
  max-width: 90%;
}

.title {
  font-size: 48px;
  font-weight: bold;
  color: #f9e76b;
  font-family: 'Oswald', serif;
  margin-bottom: 20px;
  text-shadow: 0 0 10px #000;
}

.subtitle {
  font-size: 20px;
  line-height: 1.8;
  font-family: 'Georgia', serif;
}
</style>
