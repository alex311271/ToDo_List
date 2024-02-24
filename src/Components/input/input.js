import * as hook from '../../hooks';
import Button from '../button/button/button';
import styles from './input.module.css';

export const Input = ({ refreshToDoList, onSorted }) => {
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
