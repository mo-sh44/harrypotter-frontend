<template>
  <section class="landing">
    <div class="landing-content">
      <div class="text-content">
        <h1>Willkommen in der magischen Welt von<br /><span>Harry Potter</span></h1>
        <p>
          Entdecke Charaktere, Zaubersprüche, Bücher und Filme aus dem Harry-Potter-Universum – alles an einem Ort!
        </p>
        <button class="start-btn" @click="$emit('enter')">Los geht's</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.landing {
  height: 100vh;
  background-image: url('/images/hp-main6.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 80px;
  color: #fff;
  font-family: 'Cinzel', serif;
}

.landing-content {
  max-width: 600px;
}

.text-content h1 {
  font-size: 36px;
  color: #f9e76b;
  text-align: left;
}

.text-content span {
  font-size: 42px;
  color: #ffe066;
}

.text-content p {
  font-size: 18px;
  margin: 15px 0;
  text-align: left;
}

.start-btn {
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 16px;
  background-color: #f9e76b;
  color: black;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
}

.start-btn:hover {
  background-color: #fff176;
}
</style>
