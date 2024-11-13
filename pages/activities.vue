// pages/activities.vue
<template>
  <div>
    <h1>Activities</h1>
    <ActivityForm @activity-added="onActivityAdded" />
    <ul>
      <li v-for="activity in activities" :key="activity._id">
        {{ activity.name }} (Habit: {{ getHabitName(activity.habitId) }}) - Start: {{ activity.startTime }} - End: {{ activity.endTime }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useHabitStore } from '@/stores/habits';
import { useActivityStore } from '@/stores/activities';
import ActivityForm from '@/components/ActivityForm.vue';

const habitStore = useHabitStore();
const activityStore = useActivityStore();
const activities = ref(activityStore.activities);

const fetchActivities = async () => {
  try {
    await activityStore.fetchActivities();
  } catch (error) {
    console.error('Error fetching activities:', error);
  }
};

const onActivityAdded = async () => {
  await fetchActivities();
};

const getHabitName = (habitId) => {
  const habit = habitStore.habits.find(h => h._id === habitId);
  return habit ? habit.name : 'Unknown Habit';
};

onMounted(async () => {
  await habitStore.fetchHabits();
  await fetchActivities();
});

watch(
  () => activityStore.activities,
  (newActivities) => {
    activities.value = [...newActivities];
  },
  { deep: true }
);
</script>
