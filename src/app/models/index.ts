// models/index.ts
import { User } from '../models/user';
import { getModelForClass } from '@typegoose/typegoose';

export const UserModel = getModelForClass(User);

// "document" has proper (manual) typescript types of KittenClass
// add other models here
