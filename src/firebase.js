import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyCe7z84MQCUuMlNkyIR0EEvEljvgcD1nTk',
	authDomain: 'todolist-2d74e.firebaseapp.com',
	projectId: 'todolist-2d74e',
	storageBucket: 'todolist-2d74e.appspot.com',
	messagingSenderId: '498165072042',
	appId: '1:498165072042:web:10e77c811be6b4fa9f90d3',
	databaseURL: 'https://todolist-2d74e-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);

export const db_todo = getDatabase(app);
