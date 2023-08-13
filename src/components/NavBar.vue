<script setup lang="ts">
import { RouterLink } from 'vue-router';

interface RouteLink {
  to:string,
  text:string,
  icon:string
}
const routes = ref<RouteLink[]>(
  [
    {
      to: '/studio',
      text: 'Piano Roll',
      icon: 'mdi-piano'
    },
    {
      to: '/about',
      text: 'About',
      icon: 'mdi-information-outline'
    },
    {
      to: '/mcbot',
      text: 'Lyrics Bot',
      icon: 'mdi-pen'
    }
  ]

)


</script>
<template>
	<div class="sidebar">
  <div class="brand scale-150 font-extrabold row center font-script text-2xl">
    S<span class="link">tudio</span>
  </div>
  <ul class="nav-list">
    <li class="nav-item" v-for="route in routes">
      <RouterLink :to="route.to">
        <span class="nav-item__icon">
        <Icon :icon="route.icon" class="x2"/>
        </span>
        <span class="nav-item__text">
           {{ route.text }}
        </span>
      </RouterLink>
    </li>
  </ul>
  <ul class="nav-list">
    <li class="nav-item">
      <a href="#">
        <span class="nav-item__icon avatar">J</span>
        <span class="nav-item__text">
            John Doe
        </span>
      </a>
    </li>
    <li class="nav-item">
      <a href="#">
        <span class="nav-item__icon logout">
          <ion-icon name="log-out-outline"></ion-icon>
        </span>
        <span class="nav-item__text">
           Logout
        </span>
      </a>
    </li>
  </ul>
</div>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  color: #000;
  text-decoration: none;
}

body {
  font-family: "Roboto", sans-serif;
}

.sidebar {
  width: 4rem;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 100;
  cursor: pointer;
  background: #00ad9f;
  transition: 0.5s;
  overflow: hidden;
}

.sidebar:hover {
  width: 12rem;
}

.brand {
  text-align: center;
  font-size: 1.4rem;
  padding: 1rem 0;
  color: #000;
}

.brand:hover {
  background: #6FF1A8
}

.brand span {
  display: none;
}

.nav-list {
  list-style: none;
}

.nav-item {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-item:hover {
  background: #6FF1A8;
}

.nav-item a {
  position: relative;
  white-space: nowrap;
  display: flex;
  gap: 1rem;
}

.nav-item__icon {
  position: relative;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-item__text {
  position: relative;
  display: none;
  font-size: 1em;
  color: #000;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.avatar {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: #faf4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8em;
  font-weight: 700;
}

.logout {
  margin-left: 0.2rem;
}

.sidebar:hover .brand .link {
  display: inline;  
}

.sidebar:hover .nav-item {
  justify-content: start;
}

.sidebar:hover .nav-item__text {
  display: flex;
  align-items: center;
}
</style>