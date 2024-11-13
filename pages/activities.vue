<template>
  <div>
    <h1>Activities</h1>
    <ActivityForm />
    <ul>
      <li v-for="activity in activityStore.activities" :key="activity._id">
        {{ activity.name }} (Habit: {{ getHabitName(activity.habitId) }}) - Start: {{ activity.startTime }} - End: {{ activity.endTime }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useActivityStore } from '@/stores/activities';
import { useHabitStore } from '@/stores/habits';
import ActivityForm from '@/components/ActivityForm.vue';

const activityStore = useActivityStore();
const habitStore = useHabitStore();

const getHabitName = (habitId) => {
  const habit = habitStore.habits.find(h => h._id === habitId);
  return habit ? habit.name : 'Unknown Habit';
};
</script>
