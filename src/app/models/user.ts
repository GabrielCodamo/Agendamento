import { prop } from '@typegoose/typegoose';

export class User {
    @prop({ required: true })
    public name!: string;

    @prop({ required: true })
    public email!: string;

    @prop({ required: true })
    public cellphone!: string;

    @prop({ required: true })
    public teacher!: boolean;

    @prop({ default: () => new Date() })
    public createdAt: Date;
}
