export const useRequestPutEditToDo = (refreshtodoList, togglemodal, isEditToDo) => {
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
				togglemodal();
			})
			.catch((error) => {
				console.error(error);
			})

			.finally(() => refreshtodoList());
	};
	return {
		requestPutToDo,
	};
};
