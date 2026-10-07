import {rooms} from './rooms-data.js';
export const routeNames = {
  '/':'Sun, peace, Sidemen',
  '/rooms':'Rooms & villas',
  ...Object.fromEntries(rooms.map(room=>['/rooms/'+room.slug,room.title])),
  '/spa':'Spa & rituals',
  '/yoga':'Yoga in Sidemen',
  '/dining':'Dining at Surya Shanti',
  '/our-story':'Our story',
  '/experiences':'Experiences in Sidemen',
  '/gallery':'Surya Shanti in photographs',
  '/contact':'Contact & plan your stay',
};
export const routePaths = Object.keys(routeNames);
