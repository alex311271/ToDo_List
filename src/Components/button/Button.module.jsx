import classes from './Button.css';

export default function Button({ children, onClick, id, disabled }) {
	return (
		<button id={id} disabled={disabled} className={classes.button} onClick={onClick}>
			{children}
		</button>
	);
}
