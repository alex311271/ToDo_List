import { ref, set } from 'firebase/database';
import { db_todo } from '../firebase';

export const useRequestPutEditToDo = (toggleModal, isEditToDo) => {
	const requestPutToDo = (id) => {
		const toDoRef = ref(db_todo, `todoList/${id}`);
		console.log(toDoRef);
		set(toDoRef, {
			description: isEditToDo,
		})
			.then((response) => {
				console.log(`Зпись с id ${id} изменена, ответ сервера:`, response);
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				toggleModal();
			});
	};
	return {
		requestPutToDo,
	};
};
