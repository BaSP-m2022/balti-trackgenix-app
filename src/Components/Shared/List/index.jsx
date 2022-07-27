import React from 'react';
import styles from './list.module.css';
import { Link } from 'react-router-dom';

const List = ({ data, headers, resource, editItem, deleteItem, showButtons }) => {
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
            {showButtons && (
              <>
                <th className={styles.th}>Edit / Delete</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            return (
              <tr key={row.id} className={styles.rows}>
                {headers.map((header, index) => {
                  return (
                    <td key={index} className={styles.td}>
                      {row[header.key]}
                    </td>
                  );
                })}
                {showButtons && (
                  <td className={styles.td}>
                    {editItem ? (
                      <p className={styles.btnsContainer}>
                        <span onClick={() => editItem(row.id)}>&#9998;</span>
                        <span onClick={() => deleteItem(row.id)}> &#128465;</span>
                      </p>
                    ) : (
                      <p className={styles.btnsContainer}>
                        <Link to={`${resource}/${row.id}`}> &#9998;</Link>
                        <span onClick={() => deleteItem(row.id)}> &#128465;</span>
                      </p>
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default List;
