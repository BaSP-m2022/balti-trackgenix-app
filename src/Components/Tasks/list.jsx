import React from "react";
import ListItem from "./ListItem";

const List = ({list, deleteItem}) => {
    return (
        <div className = "table-container-tasks">
            <table>
                <thead>
                    <tr>
                        <th id = "id">ID</th>
                        <th id = "employee">Employee</th>
                        <th id = "project">Project</th>
                        <th id = "title">Title</th>
                        <th id = "description">Description</th>
                        <th id = "date">Date</th>
                        <th id = "done">Done</th>
                    </tr>
                </thead>
                <tbody>
                {list.map((item) => (
                    <ListItem key = {item.id} listItem = {item} deleteItem = {deleteItem} />
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default List;