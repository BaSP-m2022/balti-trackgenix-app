import { useState, useEffect } from 'react';
import { useLocation, useParams, useHistory, withRouter } from 'react-router-dom';
import style from './styles.module.css';
import Button from '../Button/Button';

const Form = ({ data, dbPath }) => {
  const { linkData, itemData, DBPath } = useLocation();
  const { id } = useParams();
  const { goBack } = useHistory();
  const [inputValues, setInputValues] = useState({});
  const [config, setConfig] = useState([]);
  const url = dbPath || DBPath;

  // === Create instance state on mount === //
  useEffect(() => {
    console.log();
    let template = {};
    if (data) {
      setConfig(data);
      data.forEach((item) => {
        if (item.type === 'checkbox') template[item.key] = false;
        else template[item.key] = '';
      });
      setInputValues(template);
    } else if (linkData) {
      setConfig(linkData);
      if (itemData) {
        let formattedItem = {};
        linkData.forEach((item) => {
          if (itemData[item.key] && typeof itemData[item.key] === 'object') {
            formattedItem[item.key] = itemData[item.key]._id;
          } else if (item.type === 'date') {
            formattedItem[item.key] = itemData[item.key].substring(0, 10);
          } else formattedItem[item.key] = itemData[item.key];
        });
        setInputValues(formattedItem);
      } else {
        linkData.forEach((item) => {
          if (item.type === 'checkbox') template[item.key] = false;
          else template[item.key] = '';
        });
        setInputValues(template);
      }
    }
  }, []);

  // === Handle value change for different input types === //
  const handleChange = (e, input) => {
    if (input.type === 'checkbox')
      setInputValues({ ...inputValues, [input.key]: !inputValues[input.key] });
    else if (input.type === 'date')
      setInputValues({ ...inputValues, [input.key]: e.target.value.substring(0, 10) });
    else setInputValues({ ...inputValues, [input.key]: e.target.value });
  };

  // === Fetch functions === key
  const createInstance = async (obj) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(obj)
      });
      const body = await res.json();
      return { message: body.message, err: body.error };
    } catch (error) {
      alert(error);
    }
  };

  const updateInstance = async (obj) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}${url}/${id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(obj)
      });
      const body = await res.json();
      return { message: body.message, err: body.error };
    } catch (error) {
      alert(error);
    }
  };

  // === Handle submit data and method === //
  const submitHandler = async (e) => {
    e.preventDefault();
    let result;

    if (id) {
      result = await updateInstance(inputValues);
    } else {
      result = await createInstance(inputValues);
    }

    if (result && result.error === false) setInputValues({});
    alert(result.message);

    if (id) goBack();
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
