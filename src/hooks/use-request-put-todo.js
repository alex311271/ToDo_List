export const useRequestPutEditToDo = (refreshToDoList, toggleModal, isEditToDo) => {
	const requestPutToDo = (id) => {
		fetch(`http://localhost:3003/todoList/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				id: id,
				description: isEditToDo,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				console.log(`Зпись с id ${id} изменена, ответ сервера:`, response);
				toggleModal();
			})
			.catch((error) => {
				console.error(error);
			})

			.finally(() => refreshToDoList());
	};
	return {
		requestPutToDo,
	};
};
