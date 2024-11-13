// pages/activities.vue
<template>
  <div>
    <h1>Activities</h1>
    <ActivityForm />
    <ul>
      <li v-for="activity in activities" :key="activity._id">
        {{ activity.name }} (Habit: {{ getHabitName(activity.habitId) }}) - Start: {{ activity.startTime }} - End: {{ activity.endTime }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';
import { useHabitStore } from '@/stores/habits';
import ActivityForm from '@/components/ActivityForm.vue';

const activities = ref([]);
const { $pouchdb } = useNuxtApp();
const habitStore = useHabitStore();

const fetchActivities = async () => {
  try {
    const result = await $pouchdb.activitiesDb.allDocs({ include_docs: true });
    activities.value = result.rows.map(row => row.doc);
  } catch (error) {
    console.error('Error fetching activities:', error);
  }
};

const getHabitName = (habitId) => {
  const habit = habitStore.habits.find(h => h._id === habitId);
  return habit ? habit.name : 'Unknown Habit';
};

onMounted(() => {
  habitStore.fetchHabits();
  fetchActivities();
});
</script>