import { useState } from 'react';
import './App.css';
import Main from './Components/main/main';
import { Header } from './Components/header/header';
import { Input } from './Components/input/input';

export const App = () => {
	const [refreshTodoList, setRefreshTodoList] = useState(false);
	const refreshToDoList = () => setRefreshTodoList(!refreshTodoList);
	const [isSorted, setIsSorted] = useState(false);
	const onSorted = () => setIsSorted(!isSorted);

	return (
		<div className="App">
			<Header />
			<Input refreshToDoList={refreshToDoList} onSorted={onSorted} />

			<section>
				<Main refreshToDoList={refreshToDoList} onSorted={onSorted} isSorted={isSorted} />
			</section>
		</div>
	);
};
