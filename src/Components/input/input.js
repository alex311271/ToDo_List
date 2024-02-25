import * as hook from '../../hooks';
import Button from '../button/button/button';
import styles from './input.module.css';
import { useContext } from 'react';
import { AppContext } from '../../app-context';

export const Input = () => {
	const { refreshTodolist, isSorted, dispatch } = useContext(AppContext);
	const refreshToDoList = () => {
		dispatch({ type: 'SET_REFRESH_TODOLIST', payload: !refreshTodolist });
	};
	const onSorted = () => {
		dispatch({ type: 'SET_IS_SORTED', payload: !isSorted });
	};
	const { requestAddTodo, text, setText } = hook.useRequestAddToDo({ refreshToDoList });

	return (
		<section className={styles.section}>
			<form onSubmit={requestAddTodo} className={styles.form}>
				<input
					className={styles.input}
					type="text"
					value={text}
					onChange={(e) => setText(e.target.value)}
				></input>
				<Button disabled={!text} type="submit">
					Add todo
				</Button>
			</form>
			<div className={styles.button_sorted}>
				<Button className={styles.button_sorted} onClick={onSorted}>
					Sorted
				</Button>
			</div>
		</section>
	);
};
