// pages/api/todos/[id].ts
import { UserModel } from '../../src/app/models';
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../src/app/utils/dbConnect';
import { User } from '../../src/app/models/user';
type UpdateTodoBody = Partial<User>;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // first connect to the database
    await dbConnect();
    const id = req.query.id as string;
    if (req.method === 'GET') {
        // for retrieving a single todo
        const todo = await UserModel.findById(id);
        if (todo) {
            res.status(200).json(todo);
        } else {
            res.status(404);
        }
    } else if (req.method === 'PUT') {
        // updating a single todo
        const body = req.body as UpdateTodoBody;
        const todo = await UserModel.findById(id);
        if (todo) {
            todo.set({ ...body });
            await todo.save();
            res.status(200).json(todo.toJSON());
        } else {
            res.status(404);
        }
    } else if (req.method === 'DELETE') {
        // deleting a single todo
        const todo = await UserModel.findByIdAndRemove(id);
        if (todo) {
            res.status(200).json(todo.toJSON());
        } else {
            res.status(404);
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
