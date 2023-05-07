/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `DateTime` scalar type represents a date and time. `DateTime` expects timestamps to be formatted in accordance with the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) standard. */
  DateTime: any;
};

export type AppMutation = {
  __typename?: 'AppMutation';
  categoryMutation?: Maybe<CategoryMutation>;
  changeDB?: Maybe<Scalars['String']>;
  toDoMutation?: Maybe<ToDoMutation>;
};


export type AppMutationChangeDbArgs = {
  dbSwitchFlag?: InputMaybe<Scalars['String']>;
};

export type AppQuery = {
  __typename?: 'AppQuery';
  categoryQuery?: Maybe<CategoryQuery>;
  currentDB?: Maybe<Scalars['String']>;
  toDoQuery?: Maybe<ToDoQuery>;
};

export type CategoryInput = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};

export type CategoryMutation = {
  __typename?: 'CategoryMutation';
  categoryCreate?: Maybe<CategoryType>;
  categoryDelete?: Maybe<Scalars['Boolean']>;
};


export type CategoryMutationCategoryCreateArgs = {
  category?: InputMaybe<CategoryInput>;
};


export type CategoryMutationCategoryDeleteArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export type CategoryQuery = {
  __typename?: 'CategoryQuery';
  categoryGetList?: Maybe<Array<Maybe<CategoryType>>>;
};

export type CategoryType = {
  __typename?: 'CategoryType';
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
};

export type ToDoInput = {
  category?: InputMaybe<CategoryInput>;
  categoryId?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  dueDate?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['ID']>;
  status?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type ToDoMutation = {
  __typename?: 'ToDoMutation';
  toDoCreate?: Maybe<ToDoType>;
  toDoDelete?: Maybe<Scalars['Boolean']>;
  toDoUpdate?: Maybe<ToDoType>;
};


export type ToDoMutationToDoCreateArgs = {
  toDo?: InputMaybe<ToDoInput>;
};


export type ToDoMutationToDoDeleteArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type ToDoMutationToDoUpdateArgs = {
  toDo?: InputMaybe<ToDoInput>;
};

export type ToDoQuery = {
  __typename?: 'ToDoQuery';
  toDoGetList?: Maybe<Array<Maybe<ToDoType>>>;
};

export type ToDoType = {
  __typename?: 'ToDoType';
  category?: Maybe<CategoryType>;
  categoryId?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  dueDate?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  status?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};
