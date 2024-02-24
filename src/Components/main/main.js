import * as hook from '../../hooks';
import Button from '../button/button/button.jsx';
import styles from './main.module.css';
import { useState } from 'react';
import { Modal } from '../modal/modal';

export default function Main({ refreshToDoList, onSorted, isSorted }) {
	const [modal, setModal] = useState(false);
	const toggleModal = () => setModal(!modal);

	const { toDoList } = hook.useRequestGetToDoList(refreshToDoList, isSorted);
	const { requestDeleteToDo } = hook.useRequestDeleteToDo(refreshToDoList);
	const { isEditToDo, setIsEditToDo, id, editToDo } =
		hook.useRequestGetEditToDoList(toggleModal);
	const { requestPutToDo } = hook.useRequestPutEditToDo(
		refreshToDoList,
		toggleModal,
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
				requestPutToDo={requestPutToDo}
				refreshToDoList={refreshToDoList}
				toggleModal={toggleModal}
				modal={modal}
				isEditToDo={isEditToDo}
				setIsEditToDo={setIsEditToDo}
				id={id}
			/>
		</section>
	);
}
