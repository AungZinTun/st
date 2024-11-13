import { defineNuxtPlugin } from '#app';
import PouchDB from 'pouchdb';

export default defineNuxtPlugin((nuxtApp) => {
  const activitiesDb = new PouchDB('activities');
  const habitsDb = new PouchDB('habits');

  nuxtApp.provide('pouchdb', {
    activitiesDb,
    habitsDb,
  });
});
