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
        // Create a slug from the habit name by converting to lowercase, replacing spaces with hyphens, and removing invalid characters
        await habitsDb.put(habit);
        this.habits.push(newHabit);
      } catch (err) {
        console.error('Error adding habit:', err);
      }
    }
    
  },
});