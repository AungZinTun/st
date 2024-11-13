<template>
  <form @submit.prevent="addNewActivity">
    <input type="text" v-model="name" placeholder="Activity Name" />
    <input type="datetime-local" v-model="startTime" />
    <input type="datetime-local" v-model="endTime" />
    <select v-model="habitId">
      <option v-for="habit in habitStore.habits" :key="habit._id" :value="habit._id">
        {{ habit.name }}
      </option>
    </select>
    <button type="submit">Add Activity</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useActivityStore } from '@/stores/activities';
import { useHabitStore } from '@/stores/habits';

const activityStore = useActivityStore();
const habitStore = useHabitStore();

const name = ref('');
const startTime = ref('');
const endTime = ref('');
const habitId = ref(''); // Track the selected habit ID

const addNewActivity = () => {
  if (name.value && startTime.value && endTime.value && habitId.value) {
    activityStore.addActivity({
      name: name.value,
      startTime: startTime.value,
      endTime: endTime.value,
      habitId: habitId.value // Associate activity with the selected habit
    });
    name.value = '';
    startTime.value = '';
    endTime.value = '';
    habitId.value = '';
  }
};
</script>
