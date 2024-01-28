import { useEffect, useState } from 'react';

export const useRequestGetToDoList = (refreshToDoList) => {
	const [toDoList, setToDoList] = useState([]);


	useEffect(() => {
		fetch('http://localhost:3003/todoList')
			.then((response) => response.json())
			.then((data) => {
				setToDoList(data);
			});
	}, [refreshToDoList]);

	return{
		toDoList
	}
};
