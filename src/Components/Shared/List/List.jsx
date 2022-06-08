import React from 'react';
import styles from './list.module.css';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

const List = ({ fullList, data, headers, resource, deleteItem, linkData }) => {
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
                      itemData: fullList[index]
                    }}
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
