import styles from './button.module.css';

export default function Button({ children, onClick, id, disabled }) {
	return (
		<button id={id} disabled={disabled} onClick={onClick} className={styles.button}>
			{children}
		</button>
	);
}
