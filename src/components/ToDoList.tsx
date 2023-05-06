import React, {useEffect, useState} from 'react';
import ToDoItem from "../elements/ToDoItem";
import ToDoCreator from "../elements/ToDoCreator";
import {ToDo} from "../types/ToDo";
import {useQuery} from "@apollo/client";
import {toDoGetList} from "../queries/todoQueries";

const ToDoList = () => {
    const [todoList, setTodoList] = useState<ToDo[]>([])

    const {data, error} = useQuery(toDoGetList)
    error && console.error(error)

    useEffect(()=>{
        data && setTodoList(data.toDoQuery.toDoGetList)
    },[data])


    const handleDelete = (id: number) => {
        setTodoList(todoList.filter(item => item.id != id))
    }

    const handleCreate = (toDo: ToDo) => {
        setTodoList([toDo, ...todoList])
    }

    return (
        <section>
            <ToDoCreator handleCreate={handleCreate}/>
            <table className={"todo-list-table"}>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Due Date</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {
                    todoList.map(item => <ToDoItem key={item.id} handleDelete={handleDelete} item={item}/>)
                }
                </tbody>
            </table>
        </section>
    );
};

export default ToDoList;