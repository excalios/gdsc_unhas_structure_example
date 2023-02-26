import { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";
import { DbTodo } from './todo.schema';

export interface Database {
    todos: TodoTable;
};

// Generics

type Modify<T, R> = Omit<T, keyof R> & R;

type DefaultAutoCols = {
    id: Generated<string>;
    created_at: ColumnType<number, number | undefined, never>;
    updated_at: ColumnType<number, number | undefined, number>;

};

type Entity<T> = {
    table: T;
    select: Selectable<T>;
    insert: Insertable<T>;
    update: Updateable<T>;
};

// Tables

type TodoTable = Modify<DbTodo, DefaultAutoCols>;
export type Todos = Entity<TodoTable>;