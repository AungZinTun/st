// stores/habits.js
import { defineStore } from 'pinia';
import PouchDB from 'pouchdb';

const habitsDb = new PouchDB('habits');

export const useHabitStore = defineStore('habit', {
  state: () => ({
    habits: [],
  }),
  actions: {
    async fetchHabits() {
      try {
        const result = await habitsDb.allDocs({ include_docs: true });
        this.habits = result.rows.map((row) => row.doc);
      } catch (err) {
        console.error('Error fetching habits:', err);
      }
    },
    async addHabit(habit) {
      try {
        const newHabit = { _id: new Date().toISOString(), ...habit };
        await habitsDb.put(newHabit);
        this.habits.push(newHabit);
      } catch (err) {
        console.error('Error adding habit:', err);
      }
    },
  },
});