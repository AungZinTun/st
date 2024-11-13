import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(async (nuxtApp) => {
  if (process.client) {
    const { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } = await import('chart.js');

    Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
  }
});
