import { useState } from 'react';
import styles from './tasks.module.css';
import Form from './form/Form';

function Tasks() {
  const [screen, changeScreen] = useState(false);
  const [formMethod, setMethod] = useState('POST');
  const [updTaskId, setId] = useState('');

  const editTask = (id) => {
    setMethod('PUT');
    changeScreen(true);
    setId(id);
  };

  const backToList = () => {
    setMethod('POST');
    changeScreen(false);
    alert('Successfully updated!');
  };

  return (
    <section className={styles.container}>
      <h2>Tasks</h2>
      <div>
        <button onMouseDown={() => changeScreen(false)} className={styles.btn}>
          List of Tasks
        </button>
        <button
          onMouseDown={() => {
            changeScreen(true);
            setMethod('POST');
          }}
          className={styles.btn}
        >
          Create Task
        </button>
      </div>
      {screen ? (
        <Form formMethod={formMethod} back={() => backToList()} id={updTaskId} />
      ) : (
        <button onClick={() => editTask('6298bea43c79ac9e521343c0')} className={styles.btn}>
          Update task
        </button>
      )}
    </section>
  );
}

export default Tasks;
