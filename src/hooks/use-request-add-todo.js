import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db_todo } from '../firebase';

export const useRequestAddToDo = () => {
	const [text, setText] = useState('');

	const requestAddTodo = (e) => {
		e.preventDefault();

		const toDoListDBRef = ref(db_todo, 'todoList');
		push(toDoListDBRef, {
			description: text,
		})
			.then((response) => {
				console.log('Новое дело добавлено, ответ сервера:', response);
			})
			.then(() => {
				setText('');
			})
			.catch((error) => {
				console.error(error);
			});
	};
	return {
		requestAddTodo,
		text,
		setText,
	};
};
