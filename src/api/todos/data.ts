import { Todos, db } from '../../database';

export async function readMany() {
    const data = await db
        .selectFrom('todos')
        .selectAll()
        .execute();

    return { data };
}

export async function readOne(id: string) {
    const data = await db
        .selectFrom('todos')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirstOrThrow();

    return { data };
}

export async function createOne(body: Todos['insert']) {
    const data = await db
        .insertInto('todos')
        .values(body)
        .returningAll()
        .executeTakeFirstOrThrow();

    return { data };
}

export async function updateOne(id: string, body: Todos['update']) {
    const data = await db
        .updateTable('todos')
        .where('id', '=', id)
        .set(body)
        .returningAll()
        .executeTakeFirstOrThrow();

    return { data };
}

export async function deleteOne(id: string) {
    const data = await db
        .deleteFrom('todos')
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirstOrThrow();

    return { data };
}