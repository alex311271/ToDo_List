import { useEffect, useState } from 'react';
import './App.css';

export const App = () => {
	const [toDo, setToDo] = useState([]);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setToDo(loadedTodos);
			});
	}, []);
	return (
		<div className="App">
			{toDo.map(({ id, title }) => (
				<div className="todo" key={id}>
					{title}
				</div>
			))}
		</div>
	);
};
