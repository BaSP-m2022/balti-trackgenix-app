import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './list.module.css';
import Button from '../Button/Button';

const List = ({ fullList, data, headers, resource, deleteItem, linkData }) => {
  const [instance, setInstance] = useState({});
  // === FORMAT OBJECT TYPE KEYS INTO SOMETHING THE FORM CAN READ === //
  const formatItem = (item, i) => {
    linkData.forEach((input) => {
      if (item[input.key] && typeof item[input.key] === 'object') {
        item[input.key] = input.options[i];
      }
    });
    console.log(item);
    setInstance(item);
    console.log(instance);
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            {headers.map((header, index) => {
              return (
                <th key={index} className={styles.th}>
                  {header.header}
                </th>
              );
            })}
            <th className={styles.th}>Edit</th>
            <th className={styles.th}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            return (
              <tr key={row.id} className={styles.rows}>
                {headers.map((header, index) => {
                  return (
                    <td key={index} className={styles.td}>
                      {row[header.key]}
                    </td>
                  );
                })}
                <td className={styles.td}>
                  <Link
                    to={{
                      pathname: `${resource}/form/${row.id}`,
                      linkData: linkData,
                      DBPath: resource,
                      itemData: instance
                    }}
                    onClick={() =>
                      formatItem(
                        fullList.find((timeSheet) => timeSheet._id === row.id),
                        index
                      )
                    }
                  >
                    <Button classes="edit" _id={row.id} resource={resource}>
                      &#9998;
                    </Button>
                  </Link>
                </td>
                <td className={styles.td}>
                  <Button classes="close">
                    <span _id={row.id} resource={resource} onClick={() => deleteItem(row.id)}>
                      X
                    </span>
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default List;
