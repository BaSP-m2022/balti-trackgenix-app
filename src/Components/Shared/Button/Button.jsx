import styles from './Button.module.css';
import { withRouter } from 'react-router-dom';

const Button = ({ children, classes, onClick }) => {
  switch (classes) {
    case 'red':
      classes = `${styles.btn} ${styles.redBtn}`;
      break;
    case 'block':
      classes = `${styles.btn} ${styles.btnBlock}`;
      break;
    case 'red block':
      classes = `${styles.btn} ${styles.redBtn} ${styles.btnBlock}`;
      break;
    case 'close':
      classes = styles.closeBtn;
      break;
    case 'edit':
      classes = styles.editBtn;
      break;
    default:
      classes = styles.btn;
      break;
  }
  return (
    <button
      className={classes}
      {...(onClick !== undefined && {
        onClick: (e) => {
          e.preventDefault();
          onClick();
        }
      })}
    >
      {classes === 'closeBtn' ? 'X' : children}
    </button>
  );
};

export default withRouter(Button);
