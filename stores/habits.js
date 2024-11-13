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
    async updateHabitStatus(habitId, date, status) {
      try {
        const habit = this.habits.find(h => h._id === habitId);
        if (!habit) return;

        if (!habit.progress) {
          habit.progress = {};
        }
        habit.progress[date] = status;

        await habitsDb.put(habit);
        this.fetchHabits();  // Refresh habits list
      } catch (err) {
        console.error('Error updating habit status:', err);
      }
    }
  }
});
