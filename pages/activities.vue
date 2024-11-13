<template>
  <div>
    <h1>Activities</h1>
    <form @submit.prevent="addNewActivity">
      <input type="text" v-model="activityName" placeholder="Activity Name" />
      <input type="datetime-local" v-model="startTime" />
      <input type="datetime-local" v-model="endTime" />
      <button type="submit">Add Activity</button>
    </form>

    <ul>
      <li v-for="activity in activityStore.activities" :key="activity._id">
        {{ activity.name }} - Start: {{ activity.startTime }} - End: {{ activity.endTime }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useActivityStore } from '@/stores/activities';

const activityStore = useActivityStore();
const activityName = ref('');
const startTime = ref('');
const endTime = ref('');

const addNewActivity = () => {
  if (activityName.value && startTime.value && endTime.value) {
    activityStore.addActivity({
      name: activityName.value,
      startTime: startTime.value,
      endTime: endTime.value,
    });
    activityName.value = '';
    startTime.value = '';
    endTime.value = '';
  }
};

onMounted(() => {
  activityStore.fetchActivities();
});
</script>
