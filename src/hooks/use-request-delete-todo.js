export const useRequestDeleteToDo = (refreshToDoList) => {
	const requestDeleteToDo = (id) => {
		fetch(`http://localhost:3003/todoList/${id}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
		})
			.then((response) => response.json())
			.then((response) => {
				console.log(`Запись с id ${id} удалена, ответ сервера:`, response);
			})
			.catch((error) => {
				console.error(error);
			})

			.finally(() => refreshToDoList());
	};
	return {
		requestDeleteToDo,
	};
};
