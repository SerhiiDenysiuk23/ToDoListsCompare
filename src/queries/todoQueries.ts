import {gql} from "@apollo/client";

export const toDoGetList = gql(`
query ToDoGetList{
  toDoQuery {
    toDoGetList {
      id
      title
      description
      dueDate
      status
      categoryId
      category {
        id
        name
      }
    }
  }
}
`)

export const toDoCreate = gql(`
mutation ToDoCreate($toDo: ToDoInput){
  toDoMutation {
    toDoCreate(toDo: $toDo) {
      id
      title
      description
      dueDate
      status
      categoryId
      category {
        id
        name
      }
    }
  }
}
`)

export const toDoUpdate = gql(`
mutation ToDoUpdate($toDo: ToDoInput){
  toDoMutation {
    toDoUpdate(toDo: $toDo) {
      id
      title
      description
      dueDate
      status
      categoryId
      category {
        id
        name
      }
    }
  }
}
`)

export const toDoDelete = gql(`
mutation ToDoDelete($id: ID){
  toDoMutation {
    toDoDelete(id: $id)
  }
}
`)