import { useState } from 'react';

export const useRequestGetEditToDoList = (toggleModal) => {
	const [isEditToDo, setIsEditToDo] = useState('');
	const [id, setId] = useState('');

	const editToDo = (id) => {
		fetch(`http://localhost:3003/todoList/${id}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
		})
			.then((response) => response.json())
			.then((data) => {
				setIsEditToDo(data.description);
				setId(data.id);
				toggleModal();
			})
			.catch((error) => {
				console.error(error);
			});
	};
	return {
		editToDo,
		isEditToDo,
		setIsEditToDo,
		id,
	};
};
