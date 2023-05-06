import React, {FC} from 'react';
import {ToDo} from "../types/ToDo";
import {useMutation} from "@apollo/client";
import {toDoDelete, toDoUpdate} from "../queries/todoQueries";

interface Props {
    item: ToDo,
    handleDelete(id: number): void
}

const ToDoItem: FC<Props> = ({item, handleDelete}) => {
    const [deleteMutation, {data: deleteData, error: deleteError}] = useMutation(toDoDelete)
    const [updateMutation, {data: updateData, error: updateError}] = useMutation(toDoUpdate)


    const handleStatusButtonClick = (): void => {
        updateMutation({
            variables: {
                toDo: {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    dueDate: item.dueDate,
                    categoryId: item.categoryId,
                    status: item.status == "In progress" ? "Completed" : "In progress"
                } as ToDo
            }
        })
    }

    const handleDeleteButtonClick = (): void => {
        deleteMutation({variables: {id: item.id}})
            .then(res => {
                if (res.data.toDoMutation.toDoDelete) {
                    handleDelete(item.id)
                }
            })
    }

    return (
        <tr className={item.status == "Completed" ? "todo-completed" : ""}>
            <td>{item.title}</td>
            <td>{item.description}</td>
            <td>{item.dueDate ? (new Date(item.dueDate)).toDateString() : ""}</td>
            <td>{item.category != null ? item.category.name : "NO CATEGORY"}</td>
            <td>
                <button onClick={handleStatusButtonClick}>{item.status}</button>
            </td>
            <td>
                <button className="delete-btn" onClick={handleDeleteButtonClick}>Delete</button>
            </td>
        </tr>
    );
};

export default ToDoItem;