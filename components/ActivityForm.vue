// components/ActivityForm.vue
<template>
  <v-form @submit.prevent="addActivity">
    <v-row>
      <v-col cols="12" md="6">
        <v-btn v-for="habit in habitStore.habits" :key="habit._id" class="pa-3" @click="addActivity(habit._id)"> {{ habit.name}} </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import { ref, computed, defineEmits } from 'vue';
import { useHabitStore } from '@/stores/habits';
import { useActivityStore } from '@/stores/activities';
import { useRouter } from 'vue-router';

const habitStore = useHabitStore();
const activityStore = useActivityStore();
const router = useRouter();


const emit = defineEmits(['activity-added']);

const addActivity = async (h) => {
  if (h) {
    const serialNumber = String(activityStore.activities.length + 1000).padStart(4, '0');
    const date = new Date().toISOString().split('T')[0];
    const newActivity = {
      _id: `${date}-${serialNumber}`,
      habitId: h,
      startTime: new Date().toISOString(),
      endTime: null, // End time will be set when the next activity is added
    };
    try {
      await activityStore.addActivity(newActivity);
      router.push(`/activities/${newActivity._id}`);
      // Emit event to notify parent component
      emit('activity-added');
    } catch (error) {
      console.error('Error adding activity:', error);
    }
  }
};
</script>