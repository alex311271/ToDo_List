import { ref, remove } from 'firebase/database';
import { db_todo } from '../firebase';

export const useRequestDeleteToDo = () => {
	const requestDeleteToDo = (id) => {
		const toDoListDBRef = ref(db_todo, `todoList/${id}`);
		remove(toDoListDBRef)
			.then((response) => {
				console.log(`Запись c id: ${id} удалена, ответ сервера:`, response);
			})
			.catch((error) => {
				console.error(error);
			})

			// .finally(() => refreshToDoList());
	};
	return {
		requestDeleteToDo,
	};
};
