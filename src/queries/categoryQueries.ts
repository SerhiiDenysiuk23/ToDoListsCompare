import {gql} from "@apollo/client";

export const categoryGetList = gql`
query CategoryGetList{
  categoryQuery {
    categoryGetList {
      id
      name
    }
  }
}
`

export const categoryCreate = gql`
mutation CategoryCreate($category: CategoryInput){
  categoryMutation {
    categoryCreate(category: $category) {
      id
      name
    }
  }
}
`

export const categoryDelete = gql`
mutation categoryDelete($id: ID){
  categoryMutation {
    categoryDelete(id: $id)
  }
}
`