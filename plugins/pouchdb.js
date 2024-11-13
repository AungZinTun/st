import { defineNuxtPlugin } from '#app';
import PouchDB from 'pouchdb';

export default defineNuxtPlugin((nuxtApp) => {
  // Creating PouchDB instances for activities and habits
  const activitiesDb = new PouchDB('activities');
  const habitsDb = new PouchDB('habits');

  // Providing PouchDB instances globally
  nuxtApp.provide('pouchdb', {
    activitiesDb,
    habitsDb,
  });
});
