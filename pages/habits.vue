// pages/habits.vue
<template>
  <v-container class="pa-4">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>
            <h2 class="text-h5">Manage Your Habits</h2>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="addNewHabit">
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field v-model="_id" label="Habit ID" placeholder="Manual ID (optional)" outlined dense />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field v-model="habitName" label="Habit Name" required outlined dense />
                </v-col>
                <v-col cols="12" md="4">
                  <v-select v-model="habitType" :items="['good', 'bad']" label="Habit Type" required outlined dense />
                </v-col>
                <v-col cols="12" class="text-center">
                  <v-btn type="submit" color="primary" class="ma-2" elevation="2">Add Habit</v-btn>
                </v-col>
              </v-row>
            </v-form>
            <v-divider class="my-4"></v-divider>
            <v-data-table :headers="habitHeaders" :items="habits" :sort-by="[{ key: 'startDate', order: 'desc' }]">
              <template v-slot:item.actions="{ item }">
                <v-icon class="me-2" size="small" @click="editHabit(item)">mdi-pencil</v-icon>
                <v-icon size="small" @click="deleteHabit(item)">mdi-delete</v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useHabitStore } from '@/stores/habits';

const habitStore = useHabitStore();

const _id = ref('');
const habitName = ref('');
const habitType = ref('good');
const habits = ref([]);

const habitHeaders = [
  { title: 'Habit Name', key: 'name', align: 'start' },
  { title: 'Habit Type', key: 'type' },
  { title: 'Start Date', key: 'startDate' },
  { title: 'Actions', key: 'actions', sortable: false },
];

const addNewHabit = () => {
  if (habitName.value && habitType.value) {
    const serialNumber = String(habitStore.habits.length + 1000).padStart(4, '0');
    const date = new Date().toISOString().split('T')[0];
    const generatedId = _id.value ? _id.value : `${date}-${serialNumber}`;
    const newHabit = {
      _id: generatedId,
      name: habitName.value,
      type: habitType.value,
      startDate: new Date().toISOString(),
      progress: {},
    };
    habitStore.addHabit(newHabit).then(() => {
      fetchHabits();
    });
    _id.value = '';
    habitName.value = '';
    habitType.value = 'good';
  }
};

const editHabit = (habit) => {
  _id.value = habit._id;
  habitName.value = habit.name;
  habitType.value = habit.type;
};

const deleteHabit = (habit) => {
  habitStore.deleteHabit(habit._id).then(() => {
    fetchHabits();
  });
};

const fetchHabits = async () => {
  await habitStore.fetchHabits();
  habits.value = habitStore.habits;
};

onMounted(async () => {
  await fetchHabits();
});

watch(
  () => habitStore.habits,
  (newHabits) => {
    habits.value = newHabits;
  }
);
</script>

<style scoped>
  form {
    margin-bottom: 2rem;
  }
  label {
    margin-right: 1rem;
  }
</style>
