import { useState } from 'react';

export const useRequestSortToDoList = (refreshToDoList) => {
	const [sortTodoList, setSortTodoList] = useState([]);
	const sortToDoList = () => {
		fetch(`http://localhost:3003/todoList/`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
		})
			.then((response) => response.json())
			.then((data) => {
				const sortToDoList = data.sort((a, b) =>
					a.description.toLowerCase() < b.description.toLowerCase() ? -1 : 1,
				);
				setSortTodoList(sortToDoList);
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => refreshToDoList());
	};
	return {
		sortToDoList,
		sortTodoList,
	};
};
