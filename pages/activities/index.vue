// pages/activities.vue
<template>
  <v-container class="pa-4">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>
            <h2 class="text-h5">Available Habits</h2>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col v-for="habit in habitStore.habits" :key="habit._id" cols="auto">
                <v-btn @click="createActivity(habit._id)" outlined>
                  {{ habit.name }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-4">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>
            <h2 class="text-h5">Recent Activities</h2>
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="activity in activityStore.activities" :key="activity._id" @click="goToActivityDetail(activity._id)" :to="`/activities/${activity._id}`" button>
                <v-list-item-content>
                  <v-list-item-title class="text-subtitle-1 font-weight-medium">
                    Habit: {{ getHabitName(activity.habitId) }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-caption">
                    Start Time: {{ activity.startTime }}<br>
                    End Time: {{ activity.endTime || 'Ongoing' }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider v-if="activityStore.activities.length > 0" class="my-2"></v-divider>
            </v-list>
            <v-alert v-if="activityStore.activities.length === 0" type="info" class="mt-4">
              No activities recorded yet. Start by adding a new activity!
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useHabitStore } from '@/stores/habits';
import { useActivityStore } from '@/stores/activities';
import { useRouter } from 'vue-router';

const habitStore = useHabitStore();
const activityStore = useActivityStore();
const router = useRouter();

onMounted(async () => {
  await habitStore.fetchHabits();
  await fetchActivities();
});

const fetchActivities = async () => {
  try {
    await activityStore.fetchActivities();
  } catch (error) {
    console.error('Error fetching activities:', error);
  }
};

const getHabitName = (habitId) => {
  const habit = habitStore.habits.find(h => h._id === habitId);
  return habit ? habit.name : 'Unknown Habit';
};

const createActivity = async (habitId) => {
  const serialNumber = String(activityStore.activities.length + 1000).padStart(4, '0');
  const date = new Date().toISOString().split('T')[0];
  const newActivity = {
    _id: `${date}-${serialNumber}`,
    habitId,
    startTime: new Date().toISOString(),
    endTime: null,
  };
  try {
    await activityStore.addActivity(newActivity);
    router.push(`/activities/${newActivity._id}`);
  } catch (error) {
    if (error.name === 'conflict') {
      console.error('Activity with this ID already exists:', error);
    } else {
      console.error('Error adding activity:', error);
    }
  }
};

const goToActivityDetail = (activityId) => {
  router.push({ name: 'activity-detail', params: { id: activityId } });
};
</script>

<style scoped>
  form {
    margin-bottom: 2rem;
  }
  label {
    margin-right: 1rem;
  }
</style>
