import { useState } from 'react';
import './App.css';
import * as hook from './hooks';
import Button from './Components/button/Button.module';

export const App = () => {
	const [refreshTodoList, setRefreshTodoList] = useState(false);
	const [modal, setModal] = useState(false);

	const refreshToDoList = () => setRefreshTodoList(!refreshTodoList);
	const toggleModal = () => setModal(!modal);

	const { toDoList } = hook.useRequestGetToDoList(refreshToDoList);

	const { requestAddTodo, text, setText } = hook.useRequestAddToDo(refreshToDoList);

	const { requestDeleteToDo } = hook.useRequestDeleteToDo(refreshToDoList);

	const { editToDo, isEditToDo, setIsEditToDo, id } =
		hook.useRequestGetEditToDoList(toggleModal);

	const { requestPutToDo } = hook.useRequestPutEditToDo(
		refreshToDoList,
		toggleModal,
		isEditToDo,
	);

	const { sortToDoList, sortTodoList } = hook.useRequestSortToDoList(refreshToDoList);

	return (
		<div className="App">
			<dialog open={modal}>
				<input
					type="text"
					className="input"
					value={isEditToDo}
					onChange={(e) => setIsEditToDo(e.target.value)}
				></input>
				<Button type="submit" onClick={() => requestPutToDo(id)}>
					Save
				</Button>
			</dialog>

			<header>
				<h2>Список дел</h2>
			</header>

			<section>
				<form onSubmit={requestAddTodo}>
					<input
						type="text"
						className="input"
						value={text}
						onChange={(e) => setText(e.target.value)}
					></input>
					<Button disabled={!text} type="submit">
						Add todo
					</Button>
				</form>
			</section>

			{sortTodoList.length > 0
				? sortTodoList.map(({ id, description }) => (
						<section key={id}>
							<div className="todo" key={id}>
								{description}
								<div>
									<Button id={id} onClick={() => requestDeleteToDo(id)}>
										Delete
									</Button>
									<Button id={id} onClick={() => editToDo(id)}>
										Edit
									</Button>
								</div>
							</div>
						</section>
				  ))
				: toDoList.map(({ id, description }) => (
						<section key={id}>
							<div className="todo" key={id}>
								{description}
								<div>
									<Button id={id} onClick={() => requestDeleteToDo(id)}>
										Delete
									</Button>
									<Button id={id} onClick={() => editToDo(id)}>
										Edit
									</Button>
								</div>
							</div>
						</section>
				  ))}
			<section>
				<Button onClick={sortToDoList}>Sorted</Button>
			</section>
		</div>
	);
};
