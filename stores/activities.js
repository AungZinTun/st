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
        const newActivity = { _id: new Date().toISOString(), ...activity };
        await activitiesDb.put(newActivity);
        this.activities.push(newActivity);
      } catch (err) {
        console.error('Error adding activity:', err);
      }
    },
  },
});
