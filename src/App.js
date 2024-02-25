import { useState } from 'react';
import './App.css';
import Main from './Components/main/main';
import { Header } from './Components/header/header';
import { Input } from './Components/input/input';
import { AppContext } from './app-context';

const reducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'SET_REFRESH_TODOLIST': {
			return payload;
		}
		case 'SET_IS_SORTED': {
			return payload;
		}
		default:
			return state;
	}
};

export const App = () => {
	const [refreshTodoList, setRefreshTodoList] = useState(false);
	const [isSorted, setIsSorted] = useState(false);

	const dispatch = (action) => {
		const newRefresh = reducer(refreshTodoList, action);
		setRefreshTodoList(newRefresh);
		const newIsSorted = reducer(isSorted, action);
		setIsSorted(newIsSorted);
	};

	return (
		<AppContext.Provider value={{ refreshTodoList, isSorted, dispatch }}>
			<div className="app">
				<Header />
				<Input />
				<section>
					<Main />
				</section>
			</div>
		</AppContext.Provider>
	);
};
