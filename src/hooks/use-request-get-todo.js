import { useState } from 'react';
import { ref, get, child } from 'firebase/database';
import { db_todo } from '../firebase';

export const useRequestGetEditToDoList = (toggleModal) => {
	const [isEditToDo, setIsEditToDo] = useState('');
	const [id, setId] = useState('');

	const editToDo = (id) => {
		const toDoRef = ref(db_todo);
		get(child(toDoRef, `todoList/${id}`))
			.then((snapshot) => {
				const todo = snapshot.val().description;
				setIsEditToDo(todo);
				setId(id);
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				toggleModal();
			});
	};
	return {
		editToDo,
		isEditToDo,
		setIsEditToDo,
		id,
	};
};
