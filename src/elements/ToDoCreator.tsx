import React, {FC, useEffect, useState} from 'react';
import {EmptyToDo, ToDo} from "../types/ToDo";
import {useMutation, useQuery} from "@apollo/client";
import {categoryGetList} from "../queries/categoryQueries";
import {Category} from "../types/Category";
import {toDoCreate} from "../queries/todoQueries";

const ToDoCreator: FC<{ handleCreate(toDo: ToDo): void }> = ({handleCreate}) => {
    const [toDo, setToDo] = useState<ToDo>(EmptyToDo)
    const [createMutation, {data: createData, error: createError}] = useMutation(toDoCreate)


    const {data: categoryData, error} = useQuery(categoryGetList)
    error && console.error(error)
    const [categoryList, setCategoryList] = useState<Category[]>([])


    useEffect(() => {
        categoryData && setCategoryList(categoryData.categoryQuery.categoryGetList)
    }, [categoryData])


    const handleInputTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setToDo({...toDo, title: e.target.value})
    }
    const handleTextareaDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setToDo({...toDo, description: e.target.value})
    }
    const handleInputDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dueDate = new Date(e.target.value);
        setToDo({...toDo, dueDate: dueDate.toISOString()})
    }
    const handleSelectCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setToDo({
            ...toDo,
            categoryId: e.target.value != "null" ? parseInt(e.target.value) : null
        })
    }
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createMutation({
            variables: {
                toDo: {
                    title: toDo.title,
                    description: toDo.description,
                    dueDate: toDo.dueDate,
                    categoryId: toDo.categoryId
                } as ToDo
            }
        })
            .then(res => {
                if (res.data.toDoMutation.toDoCreate) {
                    handleCreate(res.data.toDoMutation.toDoCreate)
                }
            })
    }

    useEffect(() => {
        if (toDo.categoryId)
            setToDo({...toDo, category: categoryList.find(item => item.id == toDo.categoryId) ?? null})
    }, [toDo.categoryId])

    return (
        <form onSubmit={handleFormSubmit}>
            <input onChange={handleInputTitleChange} type="text" placeholder="Title"/>
            <textarea onChange={handleTextareaDescriptionChange} placeholder="Description"/>
            <input onChange={handleInputDueDateChange} type="datetime-local"/>
            <select onChange={handleSelectCategoryChange}>
                <option selected={!!toDo.categoryId} value="null">No Choice</option>
                {
                    categoryList.map(item =>
                        <option
                            key={item.id}
                            value={item.id}>
                            {item.name}
                        </option>)
                }
            </select>
            <button type="submit">Create</button>
        </form>
    );
};

export default ToDoCreator;