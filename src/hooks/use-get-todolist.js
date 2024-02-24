import { useEffect, useState } from 'react';

export const useRequestGetToDoList = (refreshToDoList, isSorted) => {
	const [toDoList, setToDoList] = useState([]);

	useEffect(() => {
		fetch(
			isSorted
				? `http://localhost:3003/todoList?_sort=description`
				: `http://localhost:3003/todoList`,
		)
			.then((response) => response.json())
			.then((data) => {
				setToDoList(data);
			});
	}, [refreshToDoList, isSorted]);

	return {
		toDoList,
	};
};
