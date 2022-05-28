import React from 'react';
import ListAdmin from '../ListAdmin/ListAdmin';
import './Admin.module.css';

const Admin = ({ list, deleteAdmin }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th id="id">ID</th>
            <th id="fistName">First Name</th>
            <th id="lastName">Last Name</th>
            <th id="email">Email</th>
            <th id="phone">Phone</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <ListAdmin key={item._id} listItem={item} deleteAdmin={deleteAdmin} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
