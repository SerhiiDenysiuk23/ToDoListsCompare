import React, {useEffect, useState} from 'react';
import {Category, EmptyCategory} from "../types/Category";
import {useMutation, useQuery} from "@apollo/client";
import {categoryCreate, categoryDelete, categoryGetList} from "../queries/categoryQueries";

const CategoryList = () => {
    const {data, error} = useQuery(categoryGetList)
    error && console.error(error)

    const [category, setCategory] = useState<Category>(EmptyCategory)
    const [categoryList, setCategoryList] = useState<Category[]>([])

    const [createMutation, {data: createData, error: createError}] = useMutation(categoryCreate)
    const [deleteMutation, {data: deleteData, error: deleteError}] = useMutation(categoryDelete)


    const handleDeleteButtonClick = (id: number): void => {
        deleteMutation({variables: {id}})
            .then(res => {
                if (res.data.categoryMutation.categoryDelete) {
                    setCategoryList(categoryList.filter(item => item.id != id))
                }
            })
    }

    const handleInputNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategory({...category, name: e.target.value})
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createMutation({variables:{category}})
            .then(res => {
                if (res.data.categoryMutation.categoryCreate) {
                    setCategoryList([res.data.categoryMutation.categoryCreate, ...categoryList])
                }
            })
    }

    useEffect(() => {
        data && setCategoryList(data.categoryQuery.categoryGetList)
    }, [data])

    return (
        <section>
            <form onSubmit={handleFormSubmit}>
                <input placeholder="Name" onChange={handleInputNameChange} type="text"/>
                <button type="submit">Create</button>
            </form>
            <ul className="categories">
                {
                    categoryList.map((item: Category) => <li key={item.id}>
                        <div>{item.name}</div>
                        <button className="delete-btn" onClick={() =>{ handleDeleteButtonClick(item.id)}}>Delete</button>
                    </li>)
                }
            </ul>
        </section>
    );
};

export default CategoryList;