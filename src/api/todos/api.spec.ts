import { describe, expect, it } from '@jest/globals';
import request from 'supertest';

import app from '../../app';

describe('Todos endpoint', () => {
    it('CRUD todos', async () => {
        let id: string = '';

        const createTodo = await request(app)
            .post('/api/v1/todos')
            .send({
                todo: 'Test'
            });
        expect(createTodo.status).toBe(201);
        expect(createTodo.body.data).toBeDefined();
        const created = createTodo.body.data;
        id = createTodo.body.data.id;

        const getAllTodo = await request(app)
            .get('/api/v1/todos');
        expect(getAllTodo.status).toBe(200);
        expect(getAllTodo.body.data).toBeDefined();
        expect(getAllTodo.body.data).toHaveLength(1);

        const getOneTodo = await request(app)
            .get(`/api/v1/todos/${id}`);
        expect(getOneTodo.status).toBe(200);
        expect(getOneTodo.body.data).toBeDefined();
        expect(getOneTodo.body.data).toMatchObject(created);

        const updateOneTodo = await request(app)
            .put(`/api/v1/todos/${id}`)
            .send({
                todo: 'Halo'
            });
        expect(updateOneTodo.status).toBe(200);
        expect(updateOneTodo.body.data).toBeDefined();
        expect(updateOneTodo.body.data).toMatchObject({
            ...created,
            todo: 'Halo'
        });

        const deleteOneTodo = await request(app)
            .delete(`/api/v1/todos/${id}`);
        expect(deleteOneTodo.status).toBe(200);
        expect(deleteOneTodo.body.data).toBeDefined();
    });
});