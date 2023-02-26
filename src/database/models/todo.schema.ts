import { Type } from "@sinclair/typebox";
import { RecursiveStatic } from './generics';

export const Todo = Type.Object({
    id: Type.String({ format: 'uuid' }),
    todo: Type.String(),
    status: Type.Union([Type.Literal('unfinished'), Type.Literal('finished')]),
    created_at: Type.Integer(),
    updated_at: Type.Integer(),
});

export type DbTodo = RecursiveStatic<typeof Todo>;