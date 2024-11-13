<template>
    <form @submit.prevent="addNewActivity">
      <input type="text" v-model="name" placeholder="Activity Name" />
      <input type="datetime-local" v-model="startTime" />
      <input type="datetime-local" v-model="endTime" />
      <button type="submit">Add Activity</button>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useActivityStore } from '@/stores/activities';
  
  const name = ref('');
  const startTime = ref('');
  const endTime = ref('');
  const activityStore = useActivityStore();
  
  const addNewActivity = () => {
    const duration = new Date(endTime.value) - new Date(startTime.value);
    activityStore.addActivity({ id: Date.now(), name: name.value, startTime: startTime.value, endTime: endTime.value, duration });
    name.value = '';
    startTime.value = '';
    endTime.value = '';
  };
  </script>
  