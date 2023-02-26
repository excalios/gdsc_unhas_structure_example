import { Kysely, sql } from 'kysely';

const TABLE_NAME = 'todos';

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema.createTable(TABLE_NAME)
        .addColumn('id', 'uuid', col => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
        .addColumn('todo', 'varchar', col => col.notNull())
        .addColumn('status', 'varchar(10)', col => col.notNull().defaultTo('unfinished'))
        .addCheckConstraint('status_enum', sql`status IN ('unfinished', 'finished')`)
        .addColumn('created_at', 'bigint', col => col.defaultTo(sql`EXTRACT(EPOCH FROM NOW()) * 1000`).notNull())
        .addColumn('updated_at', 'bigint', col => col.defaultTo(sql`EXTRACT(EPOCH FROM NOW()) * 1000`).notNull())
        .execute();

    await db.schema.createIndex(`idx_${TABLE_NAME}_id`)
        .on(TABLE_NAME)
        .columns(['id'])
        .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable(TABLE_NAME).execute();
}