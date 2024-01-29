import { useState } from 'react';
import { ref, get, child } from 'firebase/database';
import { db_todo } from '../firebase';

export const useRequestSortToDoList = () => {
	const [sortTodoList, setSortTodoList] = useState({});
	const sortToDoList = () => {
		const toDoRef = ref(db_todo);
		get(child(toDoRef, `todoList`))
			.then((snapshot) => {
				const todoList = Object.entries(snapshot.val());
				const toDoList = todoList.sort((a, b) =>
					a[1].description.toLowerCase() < b[1].description.toLowerCase() ? -1 : 1,
				);
				setSortTodoList(toDoList);
			})
			.catch((error) => {
				console.error(error);
			});
	};
	return {
		sortToDoList,
		sortTodoList,
	};
};
