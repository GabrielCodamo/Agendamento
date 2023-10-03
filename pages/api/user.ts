// pages/api/todos/index.ts
import { UserModel } from '../../src/app/models';
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../src/app/utils/dbConnect';

interface CreateTodoBody {
    name: string;
    email: string;
    cellphone: string;
    teacher: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    if (req.method === 'GET') {
        // for retrieving todos list
        const todos = await UserModel.find({}).limit(10).lean();
        res.status(200).json(todos);
    } else if (req.method === 'POST') {
        const { name, email, cellphone, teacher } = req.body as CreateTodoBody;

        if (!name || !email || !cellphone || !teacher) {
            res.status(400).json({ error: 'Missing body parameter' });
        }

        // creating a single todo
        const body = req.body as CreateTodoBody;
        const todo = new UserModel({
            name: body.name,
            email: body.email,
            cellphone: body.cellphone,
            teacher: body.teacher,
        });

        await todo.save();

        res.status(200).json(todo.toJSON());
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
