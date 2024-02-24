import { useState } from 'react';

export const useRequestAddToDo = ({ refreshToDoList }) => {
	const [text, setText] = useState('');

	const requestAddTodo = (e) => {
		e.preventDefault();
		const jsonData = { description: text };
		fetch('http://localhost:3003/todoList', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify(jsonData),
		})
			.then((response) => response.json())
			.then((response) => {
				console.log('Новое дело добавлено, ответ сервера:', response);
			})
			.then(() => {
				setText('');
			})
			.catch((error) => {
				console.error(error);
			});
		refreshToDoList();
	};
	return {
		requestAddTodo,
		text,
		setText,
	};
};
