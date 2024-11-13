<template>
    <div>
      <div v-if="chartData && chartData.labels.length">
        <Bar :chart-data="chartData" :options="chartOptions" />
      </div>
      <div v-else>
        <p>Loading chart data or no habits available...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { Bar } from 'vue-chartjs';
  import { ref, watchEffect, onMounted } from 'vue';
  import { useHabitStore } from '@/stores/habits';
  
  const habitStore = useHabitStore();
  const chartData = ref({
    labels: [],
    datasets: [
      {
        label: 'Good Habits',
        backgroundColor: 'green',
        data: []
      },
      {
        label: 'Bad Habits',
        backgroundColor: 'red',
        data: []
      }
    ]
  });
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
  
  const generateChartData = () => {
    const labels = habitStore.habits.map(habit => habit.name);
    const goodData = habitStore.habits.map(habit =>
      habit.type === 'good' ? Object.values(habit.progress || {}).filter(status => status).length : 0
    );
    const badData = habitStore.habits.map(habit =>
      habit.type === 'bad' ? Object.values(habit.progress || {}).filter(status => status).length : 0
    );
  
    chartData.value = {
      labels,
      datasets: [
        {
          label: 'Good Habits',
          backgroundColor: 'green',
          data: goodData
        },
        {
          label: 'Bad Habits',
          backgroundColor: 'red',
          data: badData
        }
      ]
    };
  };
  
  onMounted(async () => {
    await habitStore.fetchHabits();
    generateChartData();
  });
  
  watchEffect(() => {
    generateChartData();
  });
  </script>
  
  <style scoped>
  div {
    height: 400px;
  }
  </style>
  