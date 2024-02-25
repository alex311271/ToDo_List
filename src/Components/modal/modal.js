import { createPortal } from 'react-dom';
import { useRef, useEffect } from 'react';
import styles from './modal.module.css';
import Button from '../button/button/button';

export const Modal = ({ modal, requestputtodo, isEditToDo, setIsEditToDo, id }) => {
	const dialog = useRef();
	useEffect(() => {
		if (modal) {
			dialog.current.showModal();
		} else {
			dialog.current.close();
		}
	}, [modal]);

	return createPortal(
		<dialog ref={dialog} className={styles.dialog}>
			<div className={styles.modal}>
				<input
					type="text"
					className={styles.input}
					value={isEditToDo}
					onChange={(e) => setIsEditToDo(e.target.value)}
				></input>
				<Button
					className={styles.button_dialod}
					type="submit"
					onClick={() => requestputtodo(id)}
				>
					Save
				</Button>
			</div>
		</dialog>,
		document.getElementById('modal'),
	);
};
