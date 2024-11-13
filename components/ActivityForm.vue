// components/ActivityForm.vue
<template>
  <form @submit.prevent="addActivity">
    <input v-model="activityName" placeholder="Activity Name" required />
    <input v-model="startTime" type="datetime-local" placeholder="Start Time" required />
    <input v-model="endTime" type="datetime-local" placeholder="End Time" required />
    <select v-model="habitId">
      <option v-for="habit in habits" :key="habit._id" :value="habit._id">
        {{ habit.name }}
      </option>
    </select>
    <button type="submit">Add Activity</button>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';
import { useHabitStore } from '@/stores/habits';

const activityName = ref('');
const habitId = ref('');
const startTime = ref('');
const endTime = ref('');
const { $pouchdb } = useNuxtApp();
const habitStore = useHabitStore();

const habits = ref([]);

const addActivity = async () => {
  if (activityName.value.trim() && habitId.value && startTime.value && endTime.value) {
    const newActivity = {
      _id: new Date().toISOString(),
      name: activityName.value.trim(),
      habitId: habitId.value,
      startTime: startTime.value,
      endTime: endTime.value,
    };
    try {
      await $pouchdb.activitiesDb.put(newActivity);
      activityName.value = '';
      habitId.value = '';
      startTime.value = '';
      endTime.value = '';
      // Trigger activities list update
      await fetchActivities();
    } catch (error) {
      console.error('Error adding activity:', error);
    }
  }
};

const fetchActivities = async () => {
  try {
    const result = await $pouchdb.activitiesDb.allDocs({ include_docs: true });
    activities.value = result.rows.map(row => row.doc);
  } catch (error) {
    console.error('Error fetching activities:', error);
  }
};

onMounted(async () => {
  await habitStore.fetchHabits();
  habits.value = habitStore.habits;
  await fetchActivities();
});
</script>
