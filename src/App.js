import { useEffect, useState } from 'react';
import './App.css';

export const App = () => {
	const [toDoList, setToDoList] = useState([]);
	const [refreshTodoList, setRefreshTodoList] = useState(false);
	const [text, setText] = useState('');
	const [modal, setModal] = useState(false);
	const [isEditToDo, setIsEditToDo] = useState('');
	const [id, setId] = useState('');

	const inputText = (e) => {
		setText(e.target.value);
	};

	const editText = (e) => {
		setIsEditToDo(e.target.value);
	};

	useEffect(() => {
		fetch('http://localhost:3003/todoList')
			.then((response) => response.json())
			.then((data) => {
				setToDoList(data);
			});
	}, [refreshTodoList]);

	const requestAddTodo = (e) => {
		e.preventDefault();
		const jsonData = { description: text };
		fetch('http://localhost:3003/todoList', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify(jsonData),
		})
			.then((response) => response.json())
			.then((data) => {
				if (text === '') {
					setToDoList(data);
				}
				setText('');
			})
			.catch((error) => {
				console.error(error);
			});
		setRefreshTodoList(!refreshTodoList);
	};

	const requestDeleteToDo = (id) => {
		fetch(`http://localhost:3003/todoList/${id}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
		});
		setRefreshTodoList(!refreshTodoList);
	};

	const editToDo = (id) => {
		fetch(`http://localhost:3003/todoList/${id}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
		})
			.then((response) => response.json())
			.then((data) => {
				setIsEditToDo(data.description);
				setId(data.id);
			});
		setModal(true);
	};

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
				console.log('Ответ сервера:', response);
				setModal(false);
			})
			.catch((error) => {
				console.error(error);
			})

			.finally(() => setRefreshTodoList(!refreshTodoList));
	};

	const sortToDoList = () => {
		fetch(`http://localhost:3003/todoList/${id}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
		})
			.then((response) => response.json())
			.then((data) => {
				const sortToDoList = data.sort((a, b) =>
					a.description.toLowerCase() < b.description.toLowerCase() ? -1 : 1,
				);
				setToDoList(sortToDoList);
			});
	};

	return (
		<div className="App">
			<dialog open={modal}>
				<input
					type="text"
					className="input"
					value={isEditToDo}
					onChange={editText}
				></input>
				<button type="submit" onClick={() => requestPutToDo(id)}>
					Save
				</button>
			</dialog>
			<header>
				<h2>Список дел</h2>
			</header>
			<section>
				<form onSubmit={requestAddTodo}>
					<input type="text" className="input" value={text} onChange={inputText}></input>
					<button disabled={!text} type="submit">
						Add todo
					</button>
				</form>
			</section>

			{toDoList.map(({ id, description }) => (
				<section key={id}>
					<div className="todo" key={id}>
						{description}
						<div>
							<button id={id} onClick={() => requestDeleteToDo(id)}>
								Delete
							</button>
							<button id={id} onClick={() => editToDo(id)}>
								Edit
							</button>
						</div>
					</div>
				</section>
			))}
			<section>
				<button onClick={sortToDoList}>Sorted</button>
			</section>
		</div>
	);
};
