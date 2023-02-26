import { Router } from 'express';

import { createOne, deleteOne, readMany, readOne, updateOne } from './data';

export const todosRouter = Router();

todosRouter.get('/', async (_, res) => {
    const data = await readMany();
    return res.status(200).json(data);
});

todosRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const data = await readOne(id);

    return res.status(200).json(data);
});

todosRouter.post('/', async (req, res) => {
    const body = req.body;
    const data = await createOne(body);

    return res.status(201).json(data);
});

todosRouter.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    const data = await updateOne(id, body);

    return res.status(200).json(data);
});

todosRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const data = await deleteOne(id);

    return res.status(200).json(data);
});