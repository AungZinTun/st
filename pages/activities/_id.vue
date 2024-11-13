// pages/activities/_id.vue
<template>
  <v-container class="pa-4">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>
            <h2 class="text-h5">Activity Detail</h2>
          </v-card-title>
          <v-card-text>
            <div>
              <h3>Habit: {{ getHabitName(activity.habitId) }}</h3>
              <p>Start Time: {{ activity.startTime }}</p>
              <p>End Time: <span v-if="activity.endTime">{{ activity.endTime }}</span><span v-else>Ongoing...</span></p>
              <v-btn color="primary" @click="endActivity" v-if="!activity.endTime">Stop Activity</v-btn>
              <v-alert type="info" v-if="activity.endTime" class="mt-4">
                Activity Ended
              </v-alert>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useHabitStore } from '@/stores/habits';
import { useActivityStore } from '@/stores/activities';

const route = useRoute();
const router = useRouter();
const habitStore = useHabitStore();
const activityStore = useActivityStore();

const activity = ref(null);

const fetchActivity = async () => {
  const activityId = route.params.habitId;
  activity.value = activityStore.activities.find(a => a._id === activityId);
};

const getHabitName = (habitId) => {
  const habit = habitStore.habits.find(h => h._id === habitId);
  return habit ? habit.name : 'Unknown Habit';
};

const endActivity = async () => {
  activity.value.endTime = new Date().toISOString();
  await activityStore.updateActivity(activity.value);
  router.push({ name: 'activities' });
};

onMounted(async () => {
  await habitStore.fetchHabits();
  await fetchActivity();
});
</script>

<style scoped>
  h3 {
    margin-bottom: 1rem;
  }
  p {
    margin: 0.5rem 0;
  }
</style>
