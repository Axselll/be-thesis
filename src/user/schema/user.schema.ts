import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    // @Prop()
    // _id: string;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop({ unique: true })
    email: string;

    @Prop()
    googleId: string;
}

export const UserSchema = SchemaFactory.createForClass(User)
