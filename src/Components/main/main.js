import * as hook from '../../hooks';
import Button from '../button/button/button.jsx';
import styles from './main.module.css';
import { useState, useContext } from 'react';
import { Modal } from '../modal/modal';
import { AppContext } from '../../app-context.js';

export default function Main() {
	const [modal, setModal] = useState(false);
	const togglemodal = () => setModal(!modal);

	const { refreshTodolist, isSorted, dispatch } = useContext(AppContext);
	const refreshtodolist = () => {
		dispatch({ type: 'SET_REFRESH_TODOLIST', payload: !refreshTodolist });
	};
	const onSorted = () => {
		dispatch({ type: 'SET_IS_SORTED', payload: !isSorted });
	};

	const { toDoList } = hook.useRequestGetToDoList(refreshtodolist, isSorted);
	const { requestDeleteToDo } = hook.useRequestDeleteToDo(refreshtodolist);
	const { isEditToDo, setIsEditToDo, id, editToDo } =
		hook.useRequestGetEditToDoList(togglemodal);
	const { requestPutToDo } = hook.useRequestPutEditToDo(
		refreshtodolist,
		togglemodal,
		isEditToDo,
	);

	return (
		<section className={styles.list}>
			{toDoList.map(({ id, description }) => (
				<div className={styles.todo} key={id}>
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
			))}
			<div>
				<Button onClick={onSorted}>Sorted</Button>
			</div>
			<Modal
				requestputtodo={requestPutToDo}
				togglemodal={togglemodal}
				modal={modal}
				isEditToDo={isEditToDo}
				setIsEditToDo={setIsEditToDo}
				id={id}
			/>
		</section>
	);
}
