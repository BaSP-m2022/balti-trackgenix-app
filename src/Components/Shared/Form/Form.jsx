import { useState, useEffect } from 'react';
import { useLocation, useParams, useHistory, withRouter } from 'react-router-dom';
import style from './styles.module.css';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';

const Form = ({ dbPath, data, itemData, submitHandler, modalMessage }) => {
  const { id } = useParams();
  const { goBack } = useHistory();
  const [inputValues, setInputValues] = useState({});
  const [config, setConfig] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const url = dbPath;

  // === Create instance state on mount === //
  useEffect(() => {
    let template = {};
    if (data) {
      setConfig(data);
      if (itemData) {
        let formattedItem = {};
        data.forEach((item) => {
          if (itemData[item.key] && typeof itemData[item.key] === 'object') {
            formattedItem[item.key] = itemData[item.key]._id;
          } else if (item.type === 'date') {
            formattedItem[item.key] = itemData[item.key].substring(0, 10);
          } else formattedItem[item.key] = itemData[item.key];
        });
        setInputValues(formattedItem);
      } else {
        data.forEach((item) => {
          if (item.type === 'checkbox') template[item.key] = false;
          else template[item.key] = '';
        });
        setInputValues(template);
      }
    }
  }, [itemData]);

  // === Handle value change for different input types === //
  const handleChange = (e, input) => {
    if (input.type === 'checkbox')
      setInputValues({ ...inputValues, [input.key]: !inputValues[input.key] });
    else if (input.type === 'date')
      setInputValues({ ...inputValues, [input.key]: e.target.value.substring(0, 10) });
    else setInputValues({ ...inputValues, [input.key]: e.target.value });
  };

  return (
    <form className={style.form} onSubmit={submitHandler}>
      {config.map((item) => {
        return (
          <div
            key={item.key}
            className={item.type === 'checkbox' ? style.check : style.inputContainer}
          >
            {item.type !== 'checkbox' && <label htmlFor={item.key}>{item.header}</label>}
            {item.type === 'select' ? (
              <select
                id={item.key}
                required={item.required && item.required}
                value={inputValues ? inputValues[item.key] : ''}
                onChange={(e) => setInputValues({ ...inputValues, [item.key]: e.target.value })}
              >
                <option selected disabled value="">{`select ${item.header}`}</option>
                {item.options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.text}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={item.type}
                id={item.key}
                required={item.required && item.required}
                {...(item.type === 'checkbox' && { checked: inputValues[item.key] })}
                value={inputValues ? inputValues[item.key] : item.type === 'checkbox' ? true : ''}
                onChange={(e) => handleChange(e, item)}
              />
            )}
            {item.type === 'checkbox' && <label htmlFor={item.key}>{item.header}</label>}
            <Modal
              handleClose={() => {
                setIsAdding(false);
              }}
              isOpen={isAdding}
              isConfirmation={false}
            >
              <h2>{modalMessage}</h2>
            </Modal>
          </div>
        );
      })}
      <div className={style.btnsContainer}>
        <Button classes={'red'} onClick={() => goBack()}>
          Back
        </Button>
        <Button>Save</Button>
      </div>
    </form>
  );
};

export default withRouter(Form);
