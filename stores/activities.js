// stores/activities.js
import { defineStore } from 'pinia';
import PouchDB from 'pouchdb';

const activitiesDb = new PouchDB('activities');

export const useActivityStore = defineStore('activity', {
  state: () => ({
    activities: [],
  }),
  actions: {
    async fetchActivities() {
      try {
        const result = await activitiesDb.allDocs({ include_docs: true });
        this.activities = result.rows.map((row) => row.doc);
      } catch (err) {
        console.error('Error fetching activities:', err);
      }
    },
    async addActivity(activity) {
      try {
        await activitiesDb.put(activity);
        this.activities.push(activity);
      } catch (err) {
        console.error('Error adding activity:', err);
      }
    },
  },
});