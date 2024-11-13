<template>
    <div>
      <nav>
        <ul>
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/activities">Activities</NuxtLink></li>
          <li><NuxtLink to="/habits">Habits</NuxtLink></li>
          <li><NuxtLink to="/statistics">Statistics</NuxtLink></li>
        </ul>
      </nav>
      <NuxtPage />
    </div>
  </template>
  
  <style scoped>
    nav {
      background-color: #333;
      padding: 1rem;
    }
    ul {
      list-style: none;
      display: flex;
      gap: 1rem;
    }
    li {
      color: white;
    }
  </style>
  