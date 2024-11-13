<template>
  <div>
    <h1>Track Your Habits</h1>
    <form @submit.prevent="addNewHabit">
      <input type="text" v-model="name" placeholder="Habit Name" />
      <select v-model="type">
        <option value="good">Good Habit</option>
        <option value="bad">Bad Habit</option>
      </select>
      <button type="submit">Add Habit</button>
    </form>

    <div v-if="habitStore.habits.length">
      <h2>Daily Habit Tracker</h2>
      <div v-for="habit in habitStore.habits" :key="habit._id">
        <h3>{{ habit.name }} ({{ habit.type === 'good' ? 'Good' : 'Bad' }})</h3>
        <div>
          <label v-for="day in last7Days" :key="day">
            <input
              type="checkbox"
              :checked="habit.progress && habit.progress[day]"
              @change="toggleHabitStatus(habit._id, day, $event.target.checked)"
            />
            {{ day }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useHabitStore } from '@/stores/habits';

const habitStore = useHabitStore();
const name = ref('');
const type = ref('good');

const addNewHabit = () => {
  if (name.value && type.value) {
    habitStore.addHabit({
      name: name.value,
      type: type.value,
      startDate: new Date().toISOString(),
      progress: {},
    });
    name.value = '';
  }
};

const last7Days = computed(() => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date.toISOString().split('T')[0]);
  }
  return days.reverse();
});

const toggleHabitStatus = (habitId, date, status) => {
  habitStore.updateHabitStatus(habitId, date, status);
};

onMounted(() => {
  habitStore.fetchHabits();
});
</script>

<style scoped>
  form {
    margin-bottom: 2rem;
  }
  label {
    margin-right: 1rem;
  }
</style>
