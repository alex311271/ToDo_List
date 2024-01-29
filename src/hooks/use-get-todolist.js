import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db_todo } from '../firebase';

export const useRequestGetToDoList = () => {
	const [toDoList, setToDoList] = useState({});

	useEffect(() => {
		const toDoListDBRef = ref(db_todo, 'todoList');
		return onValue(toDoListDBRef, (snapshot) => {
			const loadedTodos = snapshot.val() || [];
			setToDoList(loadedTodos)
		});
	}, []);

	return {
		toDoList,
	};
};
